'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface HistoryItem {
  type: 'input' | 'output'
  text: string
}

const COMMANDS: Record<string, { title: string; body: string }> = {
  help: {
    title: 'Available Commands',
    body: 'help, about, projects, skills, contact, whoami, sudo, clear, exit',
  },
  about: {
    title: 'About',
    body: "Kresna S. Nugroho — ICT Teacher pivoting into full-stack development. Currently focused on React, Next.js, Node.js, and building robust full-stack applications.",
  },
  projects: {
    title: 'Projects',
    body: 'Buildfolio, TeachFlow, ToDo List — explore them at /projects',
  },
  skills: {
    title: 'Skills',
    body: 'React, Next.js, TypeScript, Tailwind CSS, Node.js, PostgreSQL, Git, Vercel, Prisma',
  },
  contact: {
    title: 'Contact',
    body: 'krisnastya21@gmail.com — or use the /contact page.',
  },
  whoami: {
    title: 'whoami',
    body: 'kresna_dev',
  },
  sudo: {
    title: 'sudo',
    body: 'Permission denied. Nice try. 😄',
  },
}

export default function TerminalOverlay({ onClose }: { onClose: () => void }) {
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: 'output', text: 'Kresna Portfolio Terminal v1.0' },
    { type: 'output', text: 'Type "help" to see available commands.' },
  ])
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const runCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase()
      if (!trimmed) return

      const newHistory: HistoryItem[] = [...history, { type: 'input', text: cmd }]

      if (trimmed === 'clear') {
        setHistory([])
        return
      }

      if (trimmed === 'exit') {
        onClose()
        return
      }

      const command = COMMANDS[trimmed]
      if (command) {
        newHistory.push({
          type: 'output',
          text: `\n${command.title}:\n${command.body}`,
        })
      } else {
        newHistory.push({
          type: 'output',
          text: `\n${trimmed}: command not found. Type "help" for available commands.`,
        })
      }

      setHistory(newHistory)
    },
    [history, onClose]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    runCommand(input)
    setInput('')
  }

  return (
    <div
      className='fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4'
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className='w-full max-w-2xl bg-surface-container-lowest border border-outline-variant rounded-lg shadow-2xl overflow-hidden'>
        <div className='flex items-center gap-2 px-4 py-3 bg-surface-container border-b border-outline-variant'>
          <div className='flex gap-1.5'>
            <div className='terminal-header-dot bg-[#FF5F56]'></div>
            <div className='terminal-header-dot bg-[#FFBD2E]'></div>
            <div className='terminal-header-dot bg-[#27C93F]'></div>
          </div>
          <span className='ml-2 font-code-sm text-code-sm text-on-surface-variant'>
            kresna@portfolio:~$
          </span>
        </div>

        <div
          ref={scrollRef}
          className='p-4 h-72 overflow-y-auto custom-scrollbar font-code-sm text-code-sm whitespace-pre-wrap'
        >
          {history.map((item, i) => (
            <div
              key={i}
              className={item.type === 'input' ? 'text-on-surface' : 'text-on-surface-variant'}
            >
              {item.type === 'input' ? `$ ${item.text}` : item.text}
            </div>
          ))}
          <div className='flex items-center gap-2 text-on-surface'>
            <span>$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
              placeholder='Type a command...'
              className='flex-1 bg-transparent outline-none placeholder:text-on-surface-variant/40'
              aria-label='Terminal command input'
            />
            <span className='terminal-cursor'></span>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'

const COMMANDS = {
  help: () =>
    'Available commands: help, about, projects, skills, contact, whoami, clear, exit',
  about: () =>
    'Kresna S. — ICT Teacher pivoting into Full-Stack Development. Bridging the gap between educational logic and scalable engineering.',
  projects: () =>
    "Buildfolio, TeachFlow, ToDo List — run 'cd /projects' in the sidebar to see them all.",
  skills: () =>
    'React, Next.js, Tailwind, Node.js, PostgreSQL, and more — see skills.ts for the full stack.',
  contact: () => 'hello@kresnas.dev — or check contact.md for the full form.',
  whoami: () => 'guest@kresna-portfolio',
  sudo: () => 'Nice try. Permission denied.',
}

const TerminalOverlay = ({ onClose }) => {
  const [history, setHistory] = useState([
    {
      type: 'output',
      text: "Welcome to kresna-portfolio terminal. Type 'help' to get started.",
    },
  ])
  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [history])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const runCommand = (raw) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    if (cmd === 'clear') {
      setHistory([])
      return
    }
    if (cmd === 'exit') {
      onClose()
      return
    }

    const output = COMMANDS[cmd]
      ? COMMANDS[cmd]()
      : `command not found: ${cmd} (type 'help' for a list)`

    setHistory((prev) => [
      ...prev,
      { type: 'input', text: cmd },
      { type: 'output', text: output },
    ])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    runCommand(input)
    setInput('')
  }

  return (
    <div
      className='fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4'
      onClick={onClose}
    >
      <div
        className='w-full max-w-2xl bg-surface-container-lowest border border-outline-variant rounded shadow-2xl overflow-hidden'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='bg-surface-container-high px-4 py-2.5 flex items-center justify-between border-b border-outline-variant'>
          <div className='flex items-center gap-2'>
            <div className='flex gap-1.5'>
              <div className='w-3 h-3 rounded-full bg-[#ff5f56]'></div>
              <div className='w-3 h-3 rounded-full bg-[#ffbd2e]'></div>
              <div className='w-3 h-3 rounded-full bg-[#27c93f]'></div>
            </div>
            <span className='ml-2 font-code-sm text-code-sm text-on-surface-variant'>
              guest@kresna-portfolio: ~
            </span>
          </div>
          <button
            type='button'
            aria-label='Close terminal'
            onClick={onClose}
            className='material-symbols-outlined text-[18px] text-on-surface-variant hover:text-primary smooth-transition cursor-pointer'
          >
            close
          </button>
        </div>

        <div
          ref={scrollRef}
          className='p-4 h-80 overflow-y-auto custom-scrollbar font-code-sm text-code-sm'
        >
          {history.map((line, i) =>
            line.type === 'input' ? (
              <div key={i} className='text-on-surface mb-1'>
                <span className='text-tertiary'>$</span> {line.text}
              </div>
            ) : (
              <div
                key={i}
                className='text-on-surface-variant mb-2 whitespace-pre-wrap'
              >
                {line.text}
              </div>
            ),
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className='flex items-center gap-2 px-4 py-3 border-t border-outline-variant'
        >
          <span className='text-tertiary font-code-sm text-code-sm'>$</span>
          <input
            ref={inputRef}
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='flex-1 bg-transparent text-on-surface font-code-sm text-code-sm focus:outline-none'
            placeholder='type a command...'
            autoComplete='off'
            spellCheck='false'
          />
        </form>
      </div>
    </div>
  )
}

export default TerminalOverlay

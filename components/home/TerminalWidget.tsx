'use client'

import { useState, useEffect } from 'react'
import { terminalLines } from '@/content/homeData'

const TYPE_SPEED_MS = 40
const LINE_PAUSE_MS = 200

export default function TerminalWidget({ projectCount }: { projectCount: number }) {
  const [typedLines, setTypedLines] = useState(terminalLines.map(() => ''))
  const [extraLines, setExtraLines] = useState(['', '', ''])
  const [done, setDone] = useState(false)

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      for (let i = 0; i < terminalLines.length; i++) {
        const fullText = terminalLines[i].text
        for (let c = 1; c <= fullText.length; c++) {
          if (cancelled) return
          await new Promise((r) => setTimeout(r, TYPE_SPEED_MS))
          setTypedLines((prev) => {
            const next = [...prev]
            next[i] = fullText.slice(0, c)
            return next
          })
        }
        await new Promise((r) => setTimeout(r, LINE_PAUSE_MS))
      }

      const projectStats = [
        `> Projects Completed: ${projectCount}`,
        `> Current Goal: Mastering Distributed Systems`,
        `> Status: Ready to display!`,
      ]

      for (let i = 0; i < projectStats.length; i++) {
        const fullText = projectStats[i]
        for (let c = 1; c <= fullText.length; c++) {
          if (cancelled) return
          await new Promise((r) => setTimeout(r, TYPE_SPEED_MS))
          setExtraLines((prev) => {
            const next = [...prev]
            if (c === fullText.length) {
              next[i] = fullText
            } else {
              next[i] = fullText.slice(0, c)
            }
            return next
          })
        }
        await new Promise((r) => setTimeout(r, LINE_PAUSE_MS))
      }

      if (!cancelled) setDone(true)
    }

    run()
    return () => {
      cancelled = true
    }
  }, [projectCount])

  return (
    <div className='col-span-12 lg:col-span-8 bg-surface-container rounded-lg border border-outline-variant overflow-hidden flex flex-col h-full shadow-lg'>
      <div className='bg-surface-container-high px-4 py-2 flex items-center justify-between border-b border-outline-variant'>
        <div className='flex items-center gap-2'>
          <div className='flex gap-1.5'>
            <div className='w-3 h-3 rounded-full bg-[#ff5f56]'></div>
            <div className='w-3 h-3 rounded-full bg-[#ffbd2e]'></div>
            <div className='w-3 h-3 rounded-full bg-[#27c93f]'></div>
          </div>
          <span className='ml-4 font-code-sm text-code-sm text-on-surface-variant'>
            💡 Quick Stats (Interactive Terminal)
          </span>
        </div>
        <span className='material-symbols-outlined text-on-surface-variant text-[18px]'>
          terminal
        </span>
      </div>

      <div className='p-6 font-code-sm text-code-sm bg-surface-container-lowest flex-1 min-h-[200px]'>
        {terminalLines.map((line, i) => (
          <div
            key={i}
            className={`mb-2 ${line.indent ? 'ml-4' : ''} ${line.className}`}
          >
            <span className='text-tertiary'>{line.prefix}</span>{' '}
            <span>{typedLines[i]}</span>
          </div>
        ))}
        <div className='mt-2'>
          {extraLines.map((line, i) =>
            line ? (
              <div key={i} className={`mb-2 ml-4 ${i === 2 && done ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
                <span className='text-tertiary'>{'>'}</span>{' '}
                <span>{line}</span>
              </div>
            ) : null
          )}
        </div>
        {done && (
          <div className='mt-4 flex items-center'>
            <span className='text-tertiary'>$</span>
            <span className='terminal-cursor'></span>
          </div>
        )}
      </div>
    </div>
  )
}

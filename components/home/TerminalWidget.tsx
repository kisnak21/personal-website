'use client'

import { useState, useEffect } from 'react'
import { terminalLines } from '@/content/homeData'

export default function TerminalWidget({ projectCount }: { projectCount: number }) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [lines, setLines] = useState<typeof terminalLines>([])

  useEffect(() => {
    if (currentLineIndex >= terminalLines.length) return

    const targetLine = terminalLines[currentLineIndex]
    const timer = setTimeout(
      () => {
        if (currentCharIndex < targetLine.text.length) {
          setCurrentCharIndex((prev) => prev + 1)
        } else {
          setLines((prev) => [...prev, targetLine])
          setCurrentLineIndex((prev) => prev + 1)
          setCurrentCharIndex(0)
        }
      },
      currentCharIndex === 0 ? 200 : 40
    )

    return () => clearTimeout(timer)
  }, [currentLineIndex, currentCharIndex])

  const activeLine = terminalLines[currentLineIndex]

  return (
    <div className='bg-surface-container-lowest border border-outline-variant rounded p-6 font-code-sm text-code-sm overflow-hidden shadow-xl relative'>
      <div className='absolute top-3 right-3 flex gap-2'>
        <div className='terminal-header-dot bg-[#FF5F56]'></div>
        <div className='terminal-header-dot bg-[#FFBD2E]'></div>
        <div className='terminal-header-dot bg-[#27C93F]'></div>
      </div>

      <div className='text-on-surface-variant mb-4 font-bold border-b border-outline-variant pb-2'>
        TERMINAL_SESSION
      </div>

      <div className='space-y-2'>
        {lines.map((line, i) => (
          <div key={i} className={`flex items-start gap-2 ${line.indent ? 'pl-4' : ''}`}>
            <span className='text-primary select-none'>{line.prefix}</span>
            <span className={line.className}>{line.text}</span>
          </div>
        ))}

        {activeLine && (
          <div className={`flex items-start gap-2 ${activeLine.indent ? 'pl-4' : ''}`}>
            <span className='text-primary select-none'>{activeLine.prefix}</span>
            <span className={activeLine.className}>
              {activeLine.text.substring(0, currentCharIndex)}
              <span className='terminal-cursor'></span>
            </span>
          </div>
        )}

        {currentLineIndex >= terminalLines.length && (
          <div className='pt-2 border-t border-outline-variant/40 space-y-1 text-on-surface-variant'>
            <div>&gt; Status: Online &amp; Building</div>
            <div>&gt; Projects Shipped: {projectCount}+</div>
            <div>&gt; Ready for new opportunities</div>
          </div>
        )}
      </div>
    </div>
  )
}

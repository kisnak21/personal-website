'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from '@/context/ThemeContext'
import TerminalOverlay from '@/components/TerminalOverlay'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const [terminalOpen, setTerminalOpen] = useState(false)

  return (
    <>
      <header className='fixed top-0 left-0 right-0 h-16 z-50 bg-surface-container border-b border-outline-variant flex items-center justify-between px-margin-mobile md:px-margin-desktop'>
        <div className='flex items-center gap-3'>
          <a
            href='#main-content'
            className='sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:px-3 focus:py-2 focus:bg-primary focus:text-on-primary focus:rounded'
          >
            Skip to content
          </a>
          <Link href='/' className='flex items-center gap-2'>
            <span className='text-primary font-display-lg text-lg font-bold tracking-tight'>
              [KN]
            </span>
            <span className='hidden sm:inline font-code-sm text-code-sm text-on-surface'>
              Kresna S.
            </span>
          </Link>

          <span className='ml-2 flex items-center gap-1.5 text-tertiary font-code-sm text-code-sm'>
            <span className='w-2 h-2 rounded-full bg-tertiary pulse-indicator'></span>
            Available for Work
          </span>
        </div>

        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            className='p-2 rounded hover:bg-surface-variant text-on-surface-variant transition-colors'
          >
            <span className='material-symbols-outlined text-[20px]'>
              {theme === 'light' ? 'dark_mode' : 'light_mode'}
            </span>
          </button>

          <button
            type='button'
            onClick={() => setTerminalOpen(true)}
            aria-label='Open terminal'
            className='p-2 rounded hover:bg-surface-variant text-on-surface-variant transition-colors'
          >
            <span className='material-symbols-outlined text-[20px]'>terminal</span>
          </button>

          <a
            href='https://github.com/kisnak21/kresna-portfolio'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='GitHub repository'
            className='p-2 rounded hover:bg-surface-variant text-on-surface-variant transition-colors'
          >
            <span className='material-symbols-outlined text-[20px]'>code</span>
          </a>
        </div>
      </header>

      {terminalOpen && <TerminalOverlay onClose={() => setTerminalOpen(false)} />}
    </>
  )
}

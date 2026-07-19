import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext.jsx'
import TerminalOverlay from '../TerminalOverlay.jsx'

const Header = () => {
  const { theme, toggleTheme } = useTheme()
  const [terminalOpen, setTerminalOpen] = useState(false)

  return (
    <>
      <header className='flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 w-full fixed top-0 z-50 bg-background border-b border-outline-variant' role='banner'>
        <div className='font-headline-md text-headline-md font-bold text-primary tracking-tighter whitespace-nowrap'>
          <span className='md:hidden'>[KN]</span>
          <span className='hidden md:inline'>[KN] Kresna S.</span>
        </div>

        <button
          type='button'
          className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-on-primary focus:font-code-sm focus:text-code-sm focus:rounded'
          onClick={() => document.getElementById('main-content')?.focus()}
        >
          Skip to main content
        </button>

        <div className='flex items-center gap-3 md:gap-8'>
          <div className='flex items-center gap-2'>
            <span className='w-2 h-2 rounded-full bg-green-400 pulse-indicator flex-shrink-0' aria-hidden='true'></span>
            <span className='hidden md:inline font-label-caps text-label-caps text-primary font-bold'>
              Available for Work
            </span>
          </div>
          <div className='flex items-center gap-3 md:gap-4 text-on-surface-variant'>
            <button
              type='button'
              aria-label={
                theme === 'dark'
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
              }
              onClick={toggleTheme}
              className='material-symbols-outlined text-[20px] md:text-[24px] hover:text-primary smooth-transition cursor-pointer'
            >
              {theme === 'dark' ? 'dark_mode' : 'light_mode'}
            </button>
            <button
              type='button'
              aria-label='Open terminal'
              onClick={() => setTerminalOpen(true)}
              className='material-symbols-outlined text-[20px] md:text-[24px] hover:text-primary smooth-transition cursor-pointer'
            >
              terminal
            </button>
            <a
              href='https://github.com/kisnak21/kresna-portfolio'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='View source code on GitHub (opens in new tab)'
              className='material-symbols-outlined text-[20px] md:text-[24px] hover:text-primary smooth-transition cursor-pointer'
            >
              code
            </a>
          </div>
        </div>
      </header>

      {terminalOpen && (
        <TerminalOverlay onClose={() => setTerminalOpen(false)} />
      )}
    </>
  )
}

export default Header
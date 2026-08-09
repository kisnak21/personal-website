'use client'

import { usePathname } from 'next/navigation'

type Variant = 'home' | 'projects' | 'skills' | 'contact'

const footerVariantByRoute: Record<string, Variant> = {
  '/': 'home',
  '/projects': 'projects',
  '/skills': 'skills',
  '/contact': 'contact',
}

const LeftStatus: Record<Variant, React.ReactNode> = {
  home: (
    <div className='flex items-center gap-2'>
      <span className='material-symbols-outlined text-[13px] text-primary'>branch</span>
      <span>main</span>
      <span className='material-symbols-outlined text-[13px]'>sync</span>
      <span>0</span>
      <span className='material-symbols-outlined text-[13px]'>error</span>
      <span>0</span>
    </div>
  ),
  projects: (
    <div className='flex items-center gap-2'>
      <span className='material-symbols-outlined text-[13px] text-primary'>data_object</span>
      <span>Ln 1, Col 1</span>
      <span>UTF-8</span>
    </div>
  ),
  skills: (
    <div className='flex items-center gap-2'>
      <span className='material-symbols-outlined text-[13px] text-tertiary'>terminal</span>
      <span>TypeScript</span>
      <span>spaces: 2</span>
    </div>
  ),
  contact: (
    <div className='flex items-center gap-2'>
      <span className='material-symbols-outlined text-[13px] text-primary'>mail</span>
      <span>inbox: ready</span>
    </div>
  ),
}

const RightStatus: Record<Variant, React.ReactNode> = {
  home: (
    <div className='flex items-center gap-3'>
      <span className='material-symbols-outlined text-[13px]'>bell</span>
      <span>Built with Coffee © 2026</span>
    </div>
  ),
  projects: (
    <div className='flex items-center gap-3'>
      <span>Markdown</span>
      <span>UTF-8</span>
      <span>Ln 1, Col 1</span>
    </div>
  ),
  skills: (
    <div className='flex items-center gap-3'>
      <span>Spaces: 2</span>
      <span>Ln 1, Col 1</span>
    </div>
  ),
  contact: (
    <div className='flex items-center gap-3'>
      <span>Markdown</span>
      <span>UTF-8</span>
    </div>
  ),
}

export default function AppFooter() {
  const pathname = usePathname()
  const variant = footerVariantByRoute[pathname] || 'home'

  return (
    <footer className='hidden md:flex fixed bottom-0 left-[260px] right-0 h-8 items-center justify-between px-4 bg-surface-container border-t border-outline-variant z-40 font-code-sm text-code-sm text-on-surface-variant'>
      <div>{LeftStatus[variant]}</div>
      <div>{RightStatus[variant]}</div>
    </footer>
  )
}

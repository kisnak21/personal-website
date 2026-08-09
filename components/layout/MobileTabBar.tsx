'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabItems = [
  { to: '/', label: 'HOME', icon: 'home' },
  { to: '/projects', label: 'PROJECTS', icon: 'folder_open' },
  { to: '/notes', label: 'NOTES', icon: 'article' },
  { to: '/skills', label: 'SKILLS', icon: 'terminal' },
  { to: '/contact', label: 'CONTACT', icon: 'mail' },
]

export default function MobileTabBar() {
  const pathname = usePathname()

  const isActive = (to: string) => {
    if (to === '/') return pathname === '/'
    return pathname.startsWith(to)
  }

  return (
    <nav
      className='md:hidden fixed bottom-0 left-0 w-full z-50 bg-surface-container-lowest border-t border-outline-variant flex items-center justify-around py-2'
      aria-label='Mobile navigation'
    >
      {tabItems.map((item) => {
        const active = isActive(item.to)
        return (
          <Link
            key={item.to}
            href={item.to}
            className={`flex flex-col items-center gap-1 px-3 py-1 font-label-caps text-[10px] smooth-transition ${
              active ? 'text-primary' : 'text-on-surface-variant'
            }`}
            aria-current={active ? 'page' : undefined}
          >
            <span className='material-symbols-outlined text-[20px]' aria-hidden='true'>
              {item.icon}
            </span>
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

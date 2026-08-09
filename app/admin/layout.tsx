'use client'

import { useAdmin } from '@/context/AdminContext'
import { LayoutDashboard, FileCode2, BookOpen, Code2, LogOut, Globe } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAdmin()
  const pathname = usePathname()

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Projects', path: '/admin/projects', icon: <FileCode2 size={20} /> },
    { name: 'Notes', path: '/admin/notes', icon: <BookOpen size={20} /> },
    { name: 'Skills', path: '/admin/skills', icon: <Code2 size={20} /> },
  ]

  return (
    <div className='min-h-screen bg-background flex flex-col md:flex-row'>
      <aside className='w-full md:w-64 bg-surface-container border-b md:border-b-0 md:border-r border-outline-variant flex flex-col'>
        <div className='p-6 border-b border-outline-variant'>
          <h2 className='font-headline-sm text-headline-sm text-primary flex items-center gap-2'>
            <span className='material-symbols-outlined'>admin_panel_settings</span>
            Admin Panel
          </h2>
        </div>

        <nav className='flex-1 p-4 space-y-2'>
          {navItems.map((item) => {
            const isActive = pathname === item.path
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-code-sm text-code-sm smooth-transition ${
                  isActive
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-on-surface-variant hover:bg-surface-variant hover:text-on-surface'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className='p-4 border-t border-outline-variant space-y-2'>
          <Link
            href='/'
            target='_blank'
            className='flex items-center gap-3 px-4 py-3 rounded-lg font-code-sm text-code-sm text-on-surface-variant hover:bg-surface-variant hover:text-on-surface smooth-transition'
          >
            <Globe size={20} />
            View Site
          </Link>
          <button
            onClick={logout}
            className='w-full flex items-center gap-3 px-4 py-3 rounded-lg font-code-sm text-code-sm text-error hover:bg-error/10 smooth-transition'
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      <main className='flex-1 p-6 overflow-y-auto'>{children}</main>
    </div>
  )
}

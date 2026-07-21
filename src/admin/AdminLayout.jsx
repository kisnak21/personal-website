import { Outlet, Navigate, Link, useLocation } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext.jsx'
import { LayoutDashboard, FileCode2, Code2, LogOut, Globe } from 'lucide-react'

export default function AdminLayout() {
  const { logout, isAuthenticated } = useAdmin()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  const handleLogout = () => {
    logout()
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Projects', path: '/admin/projects', icon: <FileCode2 size={20} /> },
    { name: 'Skills', path: '/admin/skills', icon: <Code2 size={20} /> },
  ]

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-surface-container border-b md:border-b-0 md:border-r border-outline-variant flex flex-col">
        <div className="p-6 border-b border-outline-variant">
          <h2 className="font-headline-sm text-headline-sm text-primary flex items-center gap-2">
            <span className="material-symbols-outlined">admin_panel_settings</span>
            Admin Panel
          </h2>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
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

        <div className="p-4 border-t border-outline-variant space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-code-sm text-code-sm text-on-surface-variant hover:bg-surface-variant hover:text-on-surface smooth-transition"
          >
            <Globe size={20} />
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-code-sm text-code-sm text-red-500 hover:bg-red-500/10 smooth-transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
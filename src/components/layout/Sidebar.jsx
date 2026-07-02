import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'home.js', icon: 'description' },
  { to: '/projects', label: 'projects.json', icon: 'folder_open' },
  { to: '/skills', label: 'skills.ts', icon: 'terminal' },
  { to: '/contact', label: 'contact.md', icon: 'mail' },
]

const Sidebar = () => {
  return (
    <aside className='hidden md:flex fixed left-0 top-16 h-[calc(100vh-64px)] w-[260px] flex-col z-40 bg-surface-container border-r border-outline-variant'>
      <div className='p-4 border-b border-outline-variant'>
        <div className='font-label-caps text-label-caps text-on-surface-variant mb-1'>
          EXPLORER
        </div>
        <div className='font-label-caps text-[10px] text-on-surface-variant/60'>
          PORTFOLIO-V2
        </div>
      </div>

      <nav className='flex-1 py-2 overflow-y-auto'>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 cursor-pointer font-code-sm text-code-sm smooth-transition ${
                isActive
                  ? 'border-l-2 border-primary bg-surface-variant text-primary hover:shadow-[inset_4px_0_10px_-5px_rgb(var(--color-primary)/0.3)]'
                  : 'border-l-2 border-transparent text-on-surface-variant hover:bg-surface-container-high hover:text-primary'
              }`
            }
          >
            <span className='material-symbols-outlined text-[18px]'>
              {item.icon}
            </span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* <div className='p-4 border-t border-outline-variant bg-surface-container-lowest'>
        <div className='flex items-center gap-2 text-tertiary font-code-sm text-code-sm'>
          <span className='material-symbols-outlined text-[16px] pulse-indicator'>
            check_circle
          </span>
          Status: Bootcamp Graduate
        </div>
      </div> */}
    </aside>
  )
}

export default Sidebar

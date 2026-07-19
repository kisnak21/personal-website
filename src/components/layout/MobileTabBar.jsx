import { NavLink } from 'react-router-dom'

const tabItems = [
  { to: '/', label: 'HOME', icon: 'home' },
  { to: '/projects', label: 'PROJECTS', icon: 'folder_open' },
  { to: '/skills', label: 'SKILLS', icon: 'terminal' },
  { to: '/contact', label: 'CONTACT', icon: 'mail' },
]

const MobileTabBar = () => {
  return (
    <nav className='md:hidden fixed bottom-0 left-0 w-full z-50 bg-surface-container-lowest border-t border-outline-variant flex items-center justify-around py-2' aria-label='Mobile navigation'>
      {tabItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 px-3 py-1 font-label-caps text-[10px] smooth-transition ${
              isActive ? 'text-primary' : 'text-on-surface-variant'
            }`
          }
          aria-current={({ isActive }) => isActive ? 'page' : undefined}
        >
          <span className='material-symbols-outlined text-[20px]' aria-hidden='true'>
            {item.icon}
          </span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default MobileTabBar
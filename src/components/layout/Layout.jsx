import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import MobileTabBar from './MobileTabBar.jsx'
import AppFooter from './AppFooter.jsx'

const footerVariantByRoute = {
  '/': 'home',
  '/projects': 'projects',
  '/skills': 'skills',
  '/contact': 'contact',
}

const Layout = () => {
  const location = useLocation()
  const footerVariant = footerVariantByRoute[location.pathname] || 'home'

  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <Sidebar />

      <main id='main-content' className='md:ml-[260px] pt-16 pb-24 md:pb-8 min-h-screen' tabIndex='-1' role='main'>
        <Outlet />
      </main>

      <AppFooter variant={footerVariant} />
      <MobileTabBar />
    </div>
  )
}

export default Layout

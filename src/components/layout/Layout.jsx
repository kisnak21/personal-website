import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import MobileTabBar from './MobileTabBar.jsx'
import HomeFooter from './Footer.jsx'
import ProjectsFooter from './ProjectsFooter.jsx'
import SkillsFooter from './SkillsFooter.jsx'
import ContactFooter from './ContactFooter.jsx'

const footerByRoute = {
  '/': HomeFooter,
  '/projects': ProjectsFooter,
  '/skills': SkillsFooter,
  '/contact': ContactFooter,
}

const Layout = () => {
  const location = useLocation()
  const ActiveFooter = footerByRoute[location.pathname] || HomeFooter

  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <Sidebar />

      <main id='main-content' className='md:ml-[260px] pt-16 pb-24 md:pb-8 min-h-screen' tabIndex='-1' role='main'>
        <Outlet />
      </main>

      <ActiveFooter />
      <MobileTabBar />
    </div>
  )
}

export default Layout

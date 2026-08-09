import Header from './Header'
import Sidebar from './Sidebar'
import MobileTabBar from './MobileTabBar'
import AppFooter from './AppFooter'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <Sidebar />

      <main id='main-content' className='md:ml-[260px] pt-16 pb-24 md:pb-8 min-h-screen'>
        {children}
      </main>

      <AppFooter />
      <MobileTabBar />
    </div>
  )
}

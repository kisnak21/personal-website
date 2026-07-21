import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Loading from './components/Loading.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { useAdmin } from './context/AdminContext.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const Projects = lazy(() => import('./pages/Projects.jsx'))
const Skills = lazy(() => import('./pages/Skills.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const SupabaseTest = lazy(() => import('./pages/SupabaseTest.jsx'))
const AdminLogin = lazy(() => import('./admin/AdminLogin.jsx'))
const AdminLayout = lazy(() => import('./admin/AdminLayout.jsx'))
const AdminDashboard = lazy(() => import('./admin/AdminDashboard.jsx'))
const ProjectsManager = lazy(() => import('./admin/ProjectsManager.jsx'))
const SkillsManager = lazy(() => import('./admin/SkillsManager.jsx'))

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAdmin()

  if (loading) {
    return <Loading />
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  return children
}

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/skills' element={<Skills />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/test-supabase' element={<SupabaseTest />} />
          </Route>

          <Route path='/admin' element={<AdminLogin />} />
          <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
            <Route path='/admin/projects' element={<ProjectsManager />} />
            <Route path='/admin/skills' element={<SkillsManager />} />
          </Route>

          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App

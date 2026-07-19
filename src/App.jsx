import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Loading from './components/Loading.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const Projects = lazy(() => import('./pages/Projects.jsx'))
const Skills = lazy(() => import('./pages/Skills.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))

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
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App

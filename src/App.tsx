import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import JobSearch from './pages/JobSearch'
import JobDetail from './pages/JobDetail'
import Apply from './pages/Apply'
import Life from './pages/Life'
import Benefits from './pages/Benefits'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Nav />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<JobSearch />} />
          <Route path="/jobs/:slug" element={<JobDetail />} />
          <Route path="/jobs/:slug/apply" element={<Apply />} />
          <Route path="/life" element={<Life />} />
          <Route path="/benefits" element={<Benefits />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

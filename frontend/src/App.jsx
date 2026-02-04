import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const Contact = lazy(() => import('./pages/Contact'))
const Admin = lazy(() => import('./pages/Admin'))

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="spinner w-12 h-12"></div>
  </div>
)

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App

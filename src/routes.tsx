import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// Lazy load page components
const Home = lazy(() => import('./pages/Home'))
const X = lazy(() => import('./pages/X'))
const Community = lazy(() => import('./pages/Community'))
const DexScreener = lazy(() => import('./pages/DexScreener'))
const DexTools = lazy(() => import('./pages/DexTools'))

// Loading component with retro styling
const Loading = () => (
  <div style={{ 
    textAlign: 'center', 
    padding: '20px',
    fontFamily: 'MS Sans Serif, sans-serif',
    fontSize: '11px'
  }}>
    <div>Loading</div>
    <div style={{ marginTop: '8px' }}>
      <span className="dial-dot"></span>
      <span className="dial-dot"></span>
      <span className="dial-dot"></span>
    </div>
  </div>
)

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/x" element={<X />} />
        <Route path="/community" element={<Community />} />
        <Route path="/dexscreener" element={<DexScreener />} />
        <Route path="/dextools" element={<DexTools />} />
      </Routes>
    </Suspense>
  )
} 
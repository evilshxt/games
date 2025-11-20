import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import GameHub from './components/GameHub'

// Lazy load game components
const CosmicDrift = lazy(() => import('./games/cosmic-drift'))
const CosmicDriftGame = lazy(() => import('./games/cosmic-drift/game'))

function App() {
  return (
    <Routes>
      <Route path="/" element={<GameHub />} />
      <Route
        path="/games/cosmic-drift"
        element={
          <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">🚀 Loading Cosmic Drift...</h2>
                <p className="text-gray-300">Initializing 3D environment...</p>
              </div>
            </div>
          }>
            <CosmicDrift />
          </Suspense>
        }
      />
      <Route
        path="/games/cosmic-drift/play"
        element={
          <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">🚀 Loading Cosmic Drift Game...</h2>
                <p className="text-gray-300">Setting up the wormhole...</p>
              </div>
            </div>
          }>
            <CosmicDriftGame />
          </Suspense>
        }
      />
    </Routes>
  )
}

export default App

// Cosmic Drift Game Component
// This will be the main entry point for the Cosmic Drift game

import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Rocket, Play } from 'lucide-react'

export default function CosmicDrift() {
  const navigate = useNavigate()
  useEffect(() => {
    // Game initialization logic will go here
    console.log('Cosmic Drift game initialized')

    // Cleanup on unmount
    return () => {
      console.log('Cosmic Drift game cleaned up')
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <Rocket className="w-12 h-12 text-purple-400 animate-pulse" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Cosmic Drift
          </h1>
          <Rocket className="w-12 h-12 text-blue-400 animate-pulse" />
        </div>
        <p className="text-gray-300 mb-8 text-lg">3D Infinite Runner Game</p>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-6 max-w-md mx-auto">
          <p className="text-gray-300 mb-4">🚀 Game implementation coming soon!</p>
          <p className="text-sm text-gray-400">Navigate through neon wormholes, dodge obstacles, and collect power-ups in this high-speed adventure.</p>
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Game Hub
          </button>
          <Link to="/games/cosmic-drift/play">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2">
              <Play className="w-5 h-5" />
              Continue to Game
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
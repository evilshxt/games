import { motion } from 'framer-motion'
import { Gamepad2, Sparkles, Zap, Star } from 'lucide-react'
import GameCard from './GameCard'

interface Game {
  id: string
  title: string
  description: string
  thumbnail?: string
  status: 'available' | 'coming-soon' | 'in-development'
  route: string
}

const games: Game[] = [
  {
    id: 'cosmic-drift',
    title: '🌌 Cosmic Drift',
    description: 'Navigate through a neon wormhole, dodge obstacles, and collect power-ups in this infinite runner!',
    status: 'in-development',
    route: '/games/cosmic-drift'
  }
  // Add more games here as they are developed
]

export default function GameHub() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Gamepad2 className="w-12 h-12 text-blue-400" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Elite Wednesday Games
            </h1>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Sparkles className="w-12 h-12 text-purple-400" />
            </motion.div>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto flex items-center justify-center gap-2">
            <Zap className="w-6 h-6 text-yellow-400" />
            Discover and play amazing browser-based games. No downloads, no installations — just pure gaming fun!
            <Zap className="w-6 h-6 text-yellow-400" />
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-12"
        >
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Star className="w-5 h-5 text-yellow-400" />
            <p>More games coming soon! Stay tuned for updates.</p>
            <Star className="w-5 h-5 text-yellow-400" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
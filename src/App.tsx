import { useState } from 'react'
import { motion } from 'framer-motion'

interface Game {
  id: string
  title: string
  description: string
  thumbnail?: string
  status: 'available' | 'coming-soon' | 'in-development'
}

const games: Game[] = [
  {
    id: 'cosmic-drift',
    title: '🌌 Cosmic Drift',
    description: 'Navigate through a neon wormhole, dodge obstacles, and collect power-ups in this infinite runner!',
    status: 'in-development'
  }
  // Add more games here as they are developed
]

function GameCard({ game, onSelect }: { game: Game; onSelect: (gameId: string) => void }) {
  return (
    <motion.div
      className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-700"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(game.id)}
    >
      <div className="w-full h-32 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg mb-4 flex items-center justify-center">
        <span className="text-4xl">{game.title.split(' ')[0]}</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
      <p className="text-gray-300 mb-4">{game.description}</p>
      <div className="flex justify-between items-center">
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          game.status === 'available' ? 'bg-green-600 text-white' :
          game.status === 'in-development' ? 'bg-yellow-600 text-black' :
          'bg-gray-600 text-white'
        }`}>
          {game.status.replace('-', ' ').toUpperCase()}
        </span>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors">
          Play Now
        </button>
      </div>
    </motion.div>
  )
}

function GameHub({ onSelectGame }: { onSelectGame: (gameId: string) => void }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            🎮 Elite Wednesday Games
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover and play amazing browser-based games. No downloads, no installations — just pure gaming fun!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {games.map((game) => (
            <GameCard key={game.id} game={game} onSelect={onSelectGame} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400">
            More games coming soon! Stay tuned for updates.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

function App() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  const handleSelectGame = (gameId: string) => {
    setSelectedGame(gameId)
  }

  const handleBackToHub = () => {
    setSelectedGame(null)
  }

  if (selectedGame) {
    // Placeholder for game components
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Loading {selectedGame}...</h2>
          <p className="text-gray-300 mb-6">This game is coming soon!</p>
          <button
            onClick={handleBackToHub}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-medium transition-colors"
          >
            Back to Game Hub
          </button>
        </div>
      </div>
    )
  }

  return <GameHub onSelectGame={handleSelectGame} />
}

export default App

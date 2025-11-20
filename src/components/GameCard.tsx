import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Play, Clock, CheckCircle, Wrench } from 'lucide-react'

interface Game {
  id: string
  title: string
  description: string
  thumbnail?: string
  status: 'available' | 'coming-soon' | 'in-development'
  route: string
}

interface GameCardProps {
  game: Game
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link to={game.route}>
      <motion.div
        className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-700"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
      <div className="w-full h-32 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="relative z-10"
        >
          <Play className="w-16 h-16 text-white/80" />
        </motion.div>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
      <p className="text-gray-300 mb-4">{game.description}</p>
      <div className="flex justify-between items-center">
        <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
          game.status === 'available' ? 'bg-green-600 text-white' :
          game.status === 'in-development' ? 'bg-yellow-600 text-black' :
          'bg-gray-600 text-white'
        }`}>
          {game.status === 'available' && <CheckCircle className="w-3 h-3" />}
          {game.status === 'in-development' && <Wrench className="w-3 h-3" />}
          {game.status === 'coming-soon' && <Clock className="w-3 h-3" />}
          <span>{game.status.replace('-', ' ').toUpperCase()}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          Play Now
        </motion.button>
      </div>
    </motion.div>
    </Link>
  )
}
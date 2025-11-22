import { create } from 'zustand'

interface GameState {
  score: number
  distance: number
  health: number
  maxHealth: number
  isPlaying: boolean
  isGameOver: boolean
  activePowerUps: string[]

  // Actions
  setScore: (score: number) => void
  addScore: (points: number) => void
  setDistance: (distance: number) => void
  setHealth: (health: number) => void
  damage: (amount: number) => void
  heal: (amount: number) => void
  setPlaying: (playing: boolean) => void
  setGameOver: (gameOver: boolean) => void
  addPowerUp: (powerUp: string) => void
  removePowerUp: (powerUp: string) => void
  reset: () => void
}

export const useGameStore = create<GameState>((set, get) => ({
  score: 0,
  distance: 0,
  health: 3,
  maxHealth: 3,
  isPlaying: false,
  isGameOver: false,
  activePowerUps: [],

  setScore: (score) => set({ score }),
  addScore: (points) => set((state) => ({ score: state.score + points })),
  setDistance: (distance) => set({ distance }),
  setHealth: (health) => set({ health: Math.max(0, Math.min(health, get().maxHealth)) }),
  damage: (amount) => set((state) => {
    const newHealth = Math.max(0, state.health - amount)
    return {
      health: newHealth,
      isGameOver: newHealth <= 0,
      isPlaying: newHealth <= 0 ? false : state.isPlaying
    }
  }),
  heal: (amount) => set((state) => ({ health: Math.min(state.maxHealth, state.health + amount) })),
  setPlaying: (playing) => set({ isPlaying: playing }),
  setGameOver: (gameOver) => set({ isGameOver: gameOver }),
  addPowerUp: (powerUp) => set((state) => ({
    activePowerUps: [...state.activePowerUps, powerUp]
  })),
  removePowerUp: (powerUp) => set((state) => ({
    activePowerUps: state.activePowerUps.filter(p => p !== powerUp)
  })),
  reset: () => set({
    score: 0,
    distance: 0,
    health: 3,
    isPlaying: false,
    isGameOver: false,
    activePowerUps: []
  })
}))
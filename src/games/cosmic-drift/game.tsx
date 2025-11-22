// Cosmic Drift Game Implementation
// 3D Infinite Wormhole Runner using React Three Fiber

import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { Physics, RigidBody, RapierRigidBody } from '@react-three/rapier'
import { Suspense, Component, memo } from 'react'
import type { ReactNode, ErrorInfo } from 'react'
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react'
import { useGameStore } from './store'
import * as THREE from 'three'

// Error Boundary for 3D Scene
class GameErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Game Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold mb-2">Game Error</h2>
            <p className="text-gray-300 mb-4">Something went wrong with the 3D scene.</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Player Component
function Player({ position, onCollision }: { position: [number, number, number], onCollision: () => void }) {
  const rigidBodyRef = useRef<RapierRigidBody>(null)

  useFrame(() => {
    if (rigidBodyRef.current) {
      // Update position based on input
      rigidBodyRef.current.setTranslation(new THREE.Vector3(...position), true)
    }
  })

  return (
    <RigidBody
      ref={rigidBodyRef}
      type="kinematicPosition"
      position={position}
      onCollisionEnter={onCollision}
    >
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#004444"
          emissiveIntensity={0.5}
        />
      </mesh>
    </RigidBody>
  )
}

// PowerUp Component
function PowerUp({ position, type, onCollect }: { position: [number, number, number], type: 'flux' | 'quantum' | 'phase' | 'hyper' | 'nebula', onCollect: () => void }) {
  const rigidBodyRef = useRef<RapierRigidBody>(null)

  useFrame((state) => {
    if (rigidBodyRef.current) {
      // Update position to move with the game
      const currentPos = rigidBodyRef.current.translation()
      rigidBodyRef.current.setTranslation(new THREE.Vector3(currentPos.x, currentPos.y, position[2]), true)

      // Floating animation
      const time = state.clock.elapsedTime
      rigidBodyRef.current.setTranslation(new THREE.Vector3(
        currentPos.x,
        Math.sin(time * 3) * 0.2,
        position[2]
      ), true)

      // Rotation
      rigidBodyRef.current.setRotation(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, time * 2, 0)), true)
    }
  })

  const colors = {
    flux: { color: "#00ffff", emissive: "#004444" },
    quantum: { color: "#ffff00", emissive: "#444400" },
    phase: { color: "#ff00ff", emissive: "#440044" },
    hyper: { color: "#ff0000", emissive: "#440000" },
    nebula: { color: "#00ff00", emissive: "#004400" }
  }

  return (
    <RigidBody
      ref={rigidBodyRef}
      type="kinematicPosition"
      position={position}
      sensor={true}
      onIntersectionEnter={onCollect}
    >
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color={colors[type].color}
          emissive={colors[type].emissive}
          emissiveIntensity={0.8}
        />
      </mesh>
    </RigidBody>
  )
}

// Obstacle Component
function Obstacle({ position, type }: { position: [number, number, number], type: 'ring' | 'spike' | 'crystal' }) {
  const rigidBodyRef = useRef<RapierRigidBody>(null)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
  useFrame((state, delta) => {
    void state;
    if (rigidBodyRef.current) {
      // Update position to move with the game
      const currentPos = rigidBodyRef.current.translation()
      rigidBodyRef.current.setTranslation(new THREE.Vector3(currentPos.x, currentPos.y, position[2]), true)

      // Rotation
      const currentRot = rigidBodyRef.current.rotation()
      rigidBodyRef.current.setRotation(new THREE.Quaternion().setFromEuler(new THREE.Euler(
        type === 'crystal' ? currentRot.x + delta * 1 : currentRot.x,
        currentRot.y,
        currentRot.z + delta * 2
      )), true)
    }
  })

  const geometry = type === 'ring' ? <torusGeometry args={[1.5, 0.1, 8, 16]} /> :
                   type === 'spike' ? <coneGeometry args={[0.3, 1, 8]} /> :
                   <octahedronGeometry args={[0.4]} />

  const material = <meshStandardMaterial
    color={type === 'ring' ? "#ff4444" : type === 'spike' ? "#ffaa00" : "#44ff44"}
    emissive={type === 'ring' ? "#441111" : type === 'spike' ? "#442200" : "#114411"}
    emissiveIntensity={type === 'ring' ? 0.5 : type === 'spike' ? 0.3 : 0.4}
  />

  return (
    <RigidBody ref={rigidBodyRef} type="kinematicPosition" position={position}>
      <mesh>
        {geometry}
        {material}
      </mesh>
    </RigidBody>
  )
}

// Wormhole Component
function Wormhole() {
  const tubeRef = useRef<THREE.Mesh>(null)

  // Create a curved path for the wormhole
  const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 0, -5),
    new THREE.Vector3(-1, 0, -10),
    new THREE.Vector3(0.5, 0, -15),
    new THREE.Vector3(-0.5, 0, -20),
    new THREE.Vector3(0, 0, -25),
    new THREE.Vector3(1.5, 0, -30),
    new THREE.Vector3(-1.5, 0, -35),
    new THREE.Vector3(0, 0, -40),
  ])

// eslint-disable-next-line @typescript-eslint/no-unused-vars
  useFrame((state, delta) => {
    void state;
    if (tubeRef.current) {
      // Animate the wormhole (optional)
      tubeRef.current.rotation.z += delta * 0.1
    }
  })

  return (
    <mesh ref={tubeRef}>
      <tubeGeometry args={[path, 100, 3, 8, false]} />
      <meshStandardMaterial
        color="#440088"
        emissive="#220044"
        emissiveIntensity={0.3}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

// Basic 3D Scene Component
const GameScene = memo(function GameScene({ isPlaying }: { isPlaying: boolean }) {
  const { setDistance, damage, addScore } = useGameStore()
  const [playerX, setPlayerX] = useState(0)
  const [forwardPosition, setForwardPosition] = useState(0)
  const [obstacles, setObstacles] = useState<Array<{ id: number, position: [number, number, number], type: 'ring' | 'spike' | 'crystal' }>>([])
  const [powerUps, setPowerUps] = useState<Array<{ id: number, position: [number, number, number], type: 'flux' | 'quantum' | 'phase' | 'hyper' | 'nebula' }>>([])
  const obstacleIdRef = useRef(0)
  const powerUpIdRef = useRef(0)

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const speed = 0.15
      if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft') {
        setPlayerX(prev => Math.max(prev - speed, -2))
      } else if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
        setPlayerX(prev => Math.min(prev + speed, 2))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Forward movement and obstacle/power-up management
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  useFrame((state, delta) => {
    void state;
    if (isPlaying) {
      // Progressive difficulty: increase speed over time
      const baseSpeed = 5
      const speedIncrease = Math.floor(forwardPosition / 50) * 0.5 // Increase speed every 50 units
      const currentSpeed = baseSpeed + speedIncrease

      setForwardPosition(prev => {
        const newPos = prev + delta * currentSpeed
        setDistance(newPos)
        // Add score for distance traveled
        addScore(Math.floor(delta * currentSpeed * 10))
        return newPos
      })

      // Progressive spawn rates
      const difficulty = Math.floor(forwardPosition / 25) // Difficulty increases every 25 units
      const obstacleSpawnRate = Math.min(delta * (1.5 + difficulty * 0.2), delta * 3) // Cap at 3x rate
      const powerUpSpawnRate = Math.min(delta * (0.5 + difficulty * 0.1), delta * 1.5) // Cap at 1.5x rate

      // Spawn new obstacles
      if (Math.random() < obstacleSpawnRate) {
        const types: ('ring' | 'spike')[] = ['ring', 'spike']
        const type = types[Math.floor(Math.random() * types.length)]
        const x = (Math.random() - 0.5) * 3
        const newObstacle = {
          id: obstacleIdRef.current++,
          position: [x, 0, forwardPosition - 15] as [number, number, number],
          type
        }
        setObstacles(prev => [...prev, newObstacle])
      }

      // Spawn power-ups
      if (Math.random() < powerUpSpawnRate) {
        const types: ('flux' | 'quantum' | 'phase' | 'hyper' | 'nebula')[] = ['flux', 'quantum', 'phase', 'hyper', 'nebula']
        const type = types[Math.floor(Math.random() * types.length)]
        const x = (Math.random() - 0.5) * 3
        const newPowerUp = {
          id: powerUpIdRef.current++,
          position: [x, 0, forwardPosition - 15] as [number, number, number],
          type
        }
        setPowerUps(prev => [...prev, newPowerUp])
      }

      // Remove obstacles and power-ups that are behind the player
      setObstacles(prev => prev.filter(obs => obs.position[2] > forwardPosition - 5))
      setPowerUps(prev => prev.filter(pu => pu.position[2] > forwardPosition - 5))
    }
  })

  const playerPosition: [number, number, number] = [playerX, 0, forwardPosition]
  const cameraPosition: [number, number, number] = [0, 2, forwardPosition + 5]

  const handlePlayerCollision = () => {
    // Handle collision with obstacle - damage player
    damage(1)
    console.log('Player collided with obstacle!')
  }

  const handlePowerUpCollect = (id: number, type: string) => {
    // Remove the collected power-up
    setPowerUps(prev => prev.filter(pu => pu.id !== id))
    addScore(100) // Bonus points for collecting power-up
    console.log(`Power-up collected: ${type}`)
    // TODO: Implement specific power-up effects
  }

  return (
    <Physics
      gravity={[0, 0, 0]}
      timeStep="vary"
    >
      <PerspectiveCamera makeDefault position={cameraPosition} />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 5, forwardPosition + 5]} intensity={1} color="#ffffff" />
      <pointLight position={[0, -5, forwardPosition - 5]} intensity={0.5} color="#4400ff" />
      <Wormhole />
      <Player position={playerPosition} onCollision={handlePlayerCollision} />
      {obstacles.map(obstacle => (
        <Obstacle key={obstacle.id} position={obstacle.position} type={obstacle.type} />
      ))}
      {powerUps.map(powerUp => (
        <PowerUp
          key={powerUp.id}
          position={powerUp.position}
          type={powerUp.type}
          onCollect={() => handlePowerUpCollect(powerUp.id, powerUp.type)}
        />
      ))}
    </Physics>
  )
})

export default function CosmicDriftGame() {
  const {
    score,
    distance,
    health,
    isPlaying,
    isGameOver,
    setPlaying,
    reset
  } = useGameStore()

  useEffect(() => {
    // Game initialization would go here
    console.log('Cosmic Drift Game initialized')

    return () => {
      console.log('Cosmic Drift Game cleaned up')
    }
  }, [])

  const handlePlayPause = () => {
    if (isGameOver) return
    setPlaying(!isPlaying)
  }

  const handleReset = () => {
    reset()
  }

  return (
    <div className="h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-black/20 backdrop-blur-sm flex-shrink-0">
        <Link to="/games/cosmic-drift">
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </Link>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center">
            <div className="text-sm text-gray-300">Score</div>
            <div className="text-xl font-bold text-yellow-400">{score}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-sm text-gray-300">Distance</div>
            <div className="text-xl font-bold text-blue-400">{Math.floor(distance)}m</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-sm text-gray-300">Health</div>
            <div className="text-xl font-bold text-red-400">{health}/3</div>
          </div>
          <div className="flex items-center gap-2">
            {!isGameOver && (
              <button
                onClick={handlePlayPause}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'Pause' : 'Play'}
              </button>
            )}
            <button
              onClick={handleReset}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 relative w-full h-full min-h-0">
        <GameErrorBoundary>
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">🌌</div>
                <p className="text-xl">Loading Cosmic Drift...</p>
              </div>
            </div>
          }>
            <Canvas
              key="cosmic-drift-canvas"
              className="w-full h-full"
              gl={{
                antialias: true,
                alpha: false,
                powerPreference: "high-performance",
                failIfMajorPerformanceCaveat: false,
                preserveDrawingBuffer: true
              }}
              dpr={Math.min(window.devicePixelRatio, 2)}
              onCreated={({ gl }) => {
                gl.setClearColor('#000011')
                gl.shadowMap.enabled = false // Disable shadows for performance
              }}
              frameloop="always"
            >
              <GameScene isPlaying={isPlaying} />
            </Canvas>
          </Suspense>
        </GameErrorBoundary>

        {/* Game Over Overlay */}
        {isGameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-4 text-red-400">Game Over</h2>
              <div className="space-y-2 text-lg mb-6">
                <p>Final Score: <span className="text-yellow-400 font-bold">{score}</span></p>
                <p>Distance: <span className="text-blue-400 font-bold">{Math.floor(distance)}m</span></p>
              </div>
              <button
                onClick={handleReset}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
              >
                Play Again
              </button>
            </div>
          </div>
        )}

        {/* Controls Overlay */}
        {!isPlaying && !isGameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold mb-4">Cosmic Drift</h2>
              <div className="space-y-2 text-sm">
                <p><strong>A/D or ←/→:</strong> Move left/right</p>
                <p><strong>Space:</strong> Jump/Boost (Coming Soon)</p>
                <p><strong>P:</strong> Pause game</p>
                <p className="mt-4 text-yellow-400">Click Play to start!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
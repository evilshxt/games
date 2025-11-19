<div align="center">

# 🌌 Cosmic Drift

*Infinite Wormhole Runner — Neon-Fueled 3D Adventure*

[![Status](https://img.shields.io/badge/Status-In_Development-orange?style=flat-square)](https://github.com/evilshxt/games)
[![Tech](https://img.shields.io/badge/Tech-React_Three_Fiber-blue?style=flat-square)](https://github.com/evilshxt/games)

**Pilot a glowing sphere through procedurally generated cosmic tunnels, dodging obstacles and collecting power-ups in this high-speed infinite runner!**

[⬅️ Back to Game Collection](../README.md) • [🎮 Play Live](https://elite-wednesday-games.vercel.app)

---

</div>

## 🚀 Gameplay Overview

**Cosmic Drift** is a thrilling **infinite runner** set in a mesmerizing, neon-lit wormhole. Control a radiant sphere as it hurtles forward through twisting, ever-changing tunnels. Survive as long as possible by dodging deadly obstacles and snagging power-ups that grant temporary abilities.

This project showcases cutting-edge **React Three Fiber (R3F)** techniques, including advanced shaders, post-processing effects, and seamless gameplay integration in a modern web environment.

### Key Mechanics
- **Continuous Forward Motion**: Auto-advancing through the wormhole
- **Precision Controls**: A/D or arrow keys for side-to-side dodging
- **Power-Up System**: Collect glowing orbs for boosts:
  - 🔵 **Flux Core** — Slow-motion effect
  - 🟡 **Quantum Shard** — Score multiplier
  - 🟣 **Phase Shift Orb** — Ghost mode (intangible)
  - 🔴 **Hypercharge Cell** — Speed burst
  - 🟢 **Nebula Shield** — One-hit protection
- **Dynamic Challenges**: Procedural obstacles like rotating rings, spikes, and crystals
- **Progressive Difficulty**: Speed and spawn rates increase over time

---

## 🎨 Visual Design

Immerse yourself in a **cyberpunk sci-fi aesthetic** with:
- **Neon Glow Effects**: Radiant surfaces and trailing particles
- **Post-Processing Pipeline**:
  - Bloom for ethereal lighting
  - Chromatic aberration for depth
  - Motion blur during high-speed sections
  - Dynamic glow trails on player and pickups
- **Procedural Generation**: Wormholes built with `THREE.TubeGeometry` and animated UV mapping
- **Minimalist Assets**: Geometric primitives (spheres, tori, crystals) optimized for performance

---

## ⚙️ Technology Stack

Built with modern web technologies for smooth, scalable 3D gaming:

- ⚛️ **React + Vite** — Fast, modern frontend framework
- 🎭 **React Three Fiber (R3F)** — Declarative 3D rendering
- 🌐 **Three.js** — Core 3D engine, geometry, and shaders
- 🛠️ **@react-three/drei** — Utilities for controls and cameras
- 🗂️ **Zustand** — Lightweight state management
- ⚡ **@react-three/rapier** — Physics engine for collisions
- 🎬 **Framer Motion** — Fluid UI animations
- ✨ **GSAP / Anime.js** — Subtle pulsing and transition effects
- 🎨 **Tailwind CSS v4** — Utility-first styling

---

## 🎮 Controls

| Input | Action |
|-------|--------|
| **A** / **←** | Move Left |
| **D** / **→** | Move Right |
| **Space** | Jump/Boost (Future Feature) |
| **P** | Pause Game |

---

## 🏗️ Implementation Highlights

- **Smooth Player Controller**: Lerped movement with dynamic camera tracking
- **Procedural Obstacle System**: Object pooling for efficient spawning
- **Interactive Pickups**: Floating, animated power-ups with visual feedback
- **Dynamic HUD**: Real-time score and progress display
- **Physics Integration**: Rapier-powered collision detection
- **Advanced Rendering**: Multi-pass post-processing for cinematic effects

---

## 📂 Project Structure

```
src/games/cosmic-drift/
├── components/
│   ├── player/          # Player sphere and controls
│   ├── obstacles/       # Procedural hazard generation
│   ├── pickups/         # Power-up system
│   ├── environment/     # Wormhole and background
│   ├── ui/              # HUD and menus
│   └── shaders/         # Custom GLSL effects
├── store/               # Zustand state management
└── CosmicDrift.tsx      # Main game component
```

---

## 🎯 Project Goals

This game demonstrates:
- **Modern Web 3D Development**: Leveraging WebGL and React for browser games
- **Advanced R3F Techniques**: Shaders, post-processing, and 3D interactions
- **Procedural Content**: Dynamic generation for replayability
- **Performance Optimization**: Smooth 60fps gameplay across devices
- **Portfolio-Ready Code**: Clean, documented, and extensible

---

## 🛠️ Running Locally

To play or develop locally:

```bash
# Clone the main repository
git clone https://github.com/evilshxt/games.git
cd games

# Install dependencies
npm install

# Start development server
npm run dev
```

Navigate to `http://localhost:5173` and select Cosmic Drift from the game hub.

---

## 🌟 Roadmap & Future Features

- [ ] Multiple wormhole themes and visual variants
- [ ] Expanded obstacle types and patterns
- [ ] Enhanced particle systems and shader effects
- [ ] Online leaderboards and high-score tracking
- [ ] Mobile-responsive controls and touch support
- [ ] Sound design and immersive audio
- [ ] Multiplayer modes (co-op or competitive)

---

<div align="center">

## 👨‍💻 About the Creator

**Elite Wednesday** — Frontend Engineer & WebGL Enthusiast
Portfolio: [elite-wednesday.vercel.app](https://elite-wednesday.vercel.app)
GitHub: [@evilshxt](https://github.com/evilshxt)

*Built with passion for pushing web gaming boundaries!*

[⬅️ Back to Main Collection](../README.md) • [🎮 Play Now](https://elite-wednesday-games.vercel.app)

</div>
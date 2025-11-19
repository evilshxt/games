# 🌌 Cosmic Drift — Infinite Wormhole Runner

# 🎮 Cosmic Drift

**Cosmic Drift** is a high-speed, neon-infused **infinite runner** set inside a procedurally generated **cosmic wormhole**.
Players pilot a glowing sphere through twisting tunnels, dodging obstacles, and collecting **power-ups** to survive as long as possible.

This project demonstrates advanced **React Three Fiber (R3F)** techniques, **shader effects**, **post-processing**, and **gameplay logic** in a modern web environment.

---

## 🚀 Gameplay

- **Auto-forward movement**: The player sphere continuously moves forward along the wormhole.
- **Side-to-side controls**: Use **A/D** or **arrow keys** to dodge obstacles.
- **Power-ups / perks**: Pick up special items for temporary advantages:
  - **Flux Core** — slow motion
  - **Quantum Shard** — score multiplier
  - **Phase Shift Orb** — ghost mode
  - **Hypercharge Cell** — speed burst
  - **Nebula Shield** — 1-hit shield

- **Obstacles**: Rotating rings, neon spikes, and floating crystals procedurally spawn ahead.
- **Difficulty Scaling**: Speed increases over time and obstacles spawn more frequently.

---

## 🎨 Visual Style

- **Neon sci-fi aesthetic** with glowing surfaces and particle trails
- **Post-processing effects**:
  - Bloom
  - Chromatic aberration
  - Motion blur
  - Glow trails on player and pickups
- **Procedurally generated wormhole** using `THREE.TubeGeometry` with animated UVs
- Minimalist geometric assets (spheres, tori, crystals) for performance & clarity

---

## ⚙️ Tech Stack

- **React + Vite** – fast modern frontend
- **React Three Fiber (R3F)** – declarative 3D & WebGL
- **Three.js** – geometry, materials, shaders
- **@react-three/drei** – helpers, controls, cameras
- **Zustand** – global state / game loop management
- **@react-three/rapier** – physics engine for collisions & interactions
- **Framer Motion** – smooth UI transitions
- **GSAP / Anime.js** – subtle animations & pulsing effects
- **Tailwind CSS v4** – utility-first styling

---

## 🎮 Controls

| Key | Action |
| --- | --- |
| **A / Left Arrow** | Move left |
| **D / Right Arrow** | Move right |
| **Space** | Optional jump / boost (future) |
| **P** | Pause |

---

## 🏗️ Features / Implementation Highlights

- **Player Controller** – smooth lerping & camera tracking
- **Procedural Obstacles** – object pooling + dynamic generation
- **Pickup System** – floating, glowing power-ups with visual cues
- **Score & HUD** – dynamic display, reacts to player progress
- **Physics Integration** – Rapier handles collision detection & obstacle interactions
- **Post-processing pipeline** – glow, bloom, chromatic aberration, motion blur

---

## 📂 Folder Structure (Example)

```
src/
games/
cosmic-drift/
components/
player/
obstacles/
pickups/
environment/
ui/
shaders/
store/
CosmicDrift.jsx
descriptions/
cosmic-drift.md
```

---

## 🎯 Purpose

This game demonstrates:

- Modern **web-based 3D game development**
- Use of **React Three Fiber** and **WebGL effects**
- Procedural generation, physics, and interactive gameplay
- Smooth **animations and UI integration** for portfolio showcase

---

## 🛠️ Installation

```bash
git clone <repo-url>
cd cosmic-drift
npm install
npm run dev
```

Open your browser at `http://localhost:5173` to start playing.

---

## 🌟 Future Plans

* Add multiple wormhole themes & backgrounds
* Introduce new obstacles and patterns
* Enhance particle effects & shaders
* Online leaderboard / high score system
* Mobile adaptation & responsive controls

---

## 👨‍💻 Author

**[Your Name]** — Frontend Engineer & WebGL Enthusiast
Portfolio: [Your Portfolio URL]
<div align="center">

# 🎮 Elite Wednesday Games

*A Polished Collection of Browser-First Mini-Games & Interactive Experiments*

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Play_Now-brightgreen?style=for-the-badge)](https://elite-wednesday-games.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/📂_GitHub-View_Code-181717?style=for-the-badge)](https://github.com/evilshxt/games)
[![License: MIT](https://img.shields.io/badge/📜_License-MIT-blue?style=for-the-badge)](LICENSE)

**Play instantly in your browser — no downloads, no installs, just pure fun!** 🌟

[🎯 Jump to Live Demo](https://elite-wednesday-games.vercel.app) • [📖 Read the Docs](#overview) • [🕹️ Explore Games](#games)

---

</div>

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [🚀 Live Demo](#-live-demo)
- [✨ Features](#-features)
- [🛠️ Technologies](#️-technologies)
- [🎮 Games](#-games)
- [🌐 How to Play (No Setup Required)](#-how-to-play-no-setup-required)
- [💻 Local Development](#-local-development)
- [🏗️ Architecture & Flow](#️-architecture--flow)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

---

## 🎯 Overview

Welcome to **Elite Wednesday Games** — a curated showcase of lightweight, high-performance web games built with cutting-edge technologies. Each game lives in its own modular folder under `src/games/`, designed for instant playability and seamless integration.

**Why this project?**
To demonstrate modern web development techniques, from 3D WebGL experiences to smooth 2D interactions, all packaged for zero-friction browser gaming.

🔗 **Links:**
- 🌐 [Live Demo](https://elite-wednesday-games.vercel.app)
- 📂 [GitHub Repository](https://github.com/evilshxt/games)

---

## 🚀 Live Demo

Dive right in — no cloning, no building, just click and play!

<div align="center">

### 🎮 [Play Now on Vercel](https://elite-wednesday-games.vercel.app)

*Browse the game hub, select a title, and start gaming instantly.*

</div>

---

## ✨ Features

| 🎮 Feature | 📝 Description |
|------------|----------------|
| **Instant Play** | Launch games directly in your browser via our hosted demo — zero setup! |
| **Modular Design** | Each game is self-contained in `src/games/` for easy maintenance and expansion. |
| **Modern Stack** | Powered by React + Vite for lightning-fast loads and smooth development. |
| **Mixed Realms** | Blend of immersive 3D (WebGL/Three.js) and crisp 2D canvas/SVG experiences. |
| **Smart Routing** | Intuitive game launcher UI with lightweight navigation between titles. |
| **Performance First** | Optimized for web — runs smoothly on desktops, tablets, and mobiles. |

---

## 🛠️ Technologies

This collection leverages the latest in web tech for robust, scalable game development:

- ⚛️ **React** — Declarative UI and component-based architecture
- ⚡ **Vite** — Ultra-fast build tool and dev server
- 📘 **TypeScript** — Type-safe development for reliability
- 🎭 **React Three Fiber / Three.js** — 3D graphics and WebGL magic (when needed)
- 🎬 **GSAP / Framer Motion** — Smooth animations and transitions
- 🗂️ **Zustand** — Lightweight state management for game logic

---

## 🎮 Games

### 🌌 [Cosmic Drift](descriptions/cosmic-drift.md) *(In Development)*

> A neon-fueled **infinite wormhole runner** where you pilot a glowing sphere through twisting cosmic tunnels, dodging deadly obstacles and snagging power-ups to survive the endless drift.

**Key Features:**
- 🌀 Procedural wormhole generation with dynamic visuals
- ⚡ Power-up system: Slow-mo, multipliers, shields, and speed bursts
- 🎯 Intuitive controls: A/D or arrow keys to dodge
- 🌟 Immersive effects: Bloom, glow, and post-processing shaders
- 📈 Scaling difficulty: Speed ramps up as you progress

*More thrilling games on the horizon — stay tuned!*

---

## 🌐 How to Play (No Setup Required)

1. **Visit the Live Site:** Head to [https://elite-wednesday-games.vercel.app](https://elite-wednesday-games.vercel.app)
2. **Choose Your Game:** Browse the interactive hub and click on any game card.
3. **Start Playing:** The game loads instantly in your browser — enjoy!

That's it! No downloads, no installations, no waiting. Perfect for quick gaming sessions or showcasing your skills.

---

## 💻 Local Development

Want to tinker, debug, or contribute? Run the project locally with these simple steps.

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Setup (Windows PowerShell Example)

```powershell
# Clone the repo (optional for local play)
git clone https://github.com/evilshxt/games.git
cd games

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open your browser to `http://localhost:5173` and start developing!

> **Note:** The live demo stays current, so local setup is purely for development purposes.

---

## 🏗️ Architecture & Flow

Here's a high-level view of how the system works, designed for clarity and modularity.

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐
│     Client      │    │    Hosting      │
│                 │    │                 │
│  ┌─────────┐    │    │  ┌─────────┐    │
│  │ Browser │ ───┼────┼─▶│ Vercel  │    │
│  └─────────┘    │    │  │   CDN   │    │
│       │         │    │  └─────────┘    │
│  ┌─────────┐    │    │       ▲         │
│  │ React   │ ◀──┼────┼───────┘         │
│  │  App    │    │    │                 │
│  └─────────┘    │    │  ┌─────────┐    │
│       │         │    │  │ GitHub  │    │
│  ┌─────────┐    │    │  │  Repo   │    │
│  │ Game    │    │    │  └─────────┘    │
│  │Modules │    │    │       │         │
│  └─────────┘    │    │       ▼         │
└─────────────────┘    └─────────────────┘
       ▲                       │
       └───────────────────────┘
            Push / CI
```

**Flow Explanation:**
- **User** opens the live site in their browser.
- **Browser** requests assets from **Vercel CDN**.
- **React App** loads and displays the game hub.
- **User** selects a game → **Game Module** mounts and runs.
- **GitHub** pushes trigger automatic updates to **Vercel**.

### User Interaction Flow

1. **Open Site** → Browser loads React app from CDN
2. **Select Game** → App imports and mounts game module
3. **Play Loop** → Game renders frames, handles user input
4. **Seamless Experience** → All in-browser, no page reloads

### Component Structure

- **GameHub**: Main launcher, lists available games
- **GameCard**: Individual game previews with thumbnails
- **GamePlayer**: Handles mounting, pausing, and unmounting games

---

## 🤝 Contributing

We love contributions! Whether it's new games, bug fixes, or enhancements:

1. **Open an Issue** — Describe your idea or problem
2. **Fork & Branch** — Create a feature branch from `main`
3. **Code & Test** — Follow our style, add tests if applicable
4. **Pull Request** — Submit with clear description and screenshots

**Guidelines:**
- Keep changes focused and minimal
- Follow TypeScript/React best practices
- Test across browsers (Chrome, Firefox, Safari)
- Include visual assets or docs for new games

---

## 📜 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for full details.

---

<div align="center">

## 🙌 Credits & Thanks

- **🚀 Deployment:** Powered by [Vercel](https://vercel.com)
- **📂 Source:** Hosted on [GitHub](https://github.com/evilshxt/games)
- **🎨 Inspiration:** Built with passion for web gaming

---

**Ready to play?** [🎮 Launch the Demo](https://elite-wednesday-games.vercel.app)

*Built with ❤️ by Elite Wednesday*

</div>

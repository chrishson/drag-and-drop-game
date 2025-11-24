# Whack-a-Mole

A fun drag-and-drop whack-a-mole game built with React, TypeScript, and Vanilla Extract.

## Features

- 🎮 Drag the **mallet** to whack the **mole** and score points
- 🎯 Random positioning of mole and mallet on each round
- ⏱️ **Timer system** - tracks how fast you can reach your goal
- 🎚️ **Multiple game modes** - Choose 10, 25, or 50 as your target score
- 📊 Score tracking and performance stats
- 🏆 Completion screen with your final time
- 🎨 Styled with Vanilla Extract CSS-in-TS
- 🖼️ Custom SVG graphics

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vanilla Extract** - Type-safe CSS-in-TypeScript
- **Vite** - Fast build tool and dev server

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

This will start the development server at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How to Play

1. **Choose your target score**: Select 10, 25, or 50 moles to whack
2. The game canvas displays a **mallet** and a **mole**
3. **Click and drag** the mallet to the mole to start the timer
4. When the mallet gets close enough to whack the mole, you score a point!
5. The mallet and mole will reset to new random positions
6. Race against the clock to reach your target score
7. View your final time and stats when you complete the game!

## Future Enhancements

- 🏆 Leaderboard system (local & global)
- 📊 High score persistence (localStorage/database)
- 🎵 Sound effects on whack
- 💥 Particle effects on successful whacks
- 📱 Touch support for mobile devices
- 🎨 Multiple difficulty levels (faster mole movement)
- ⏳ Countdown mode (score as many as possible in X seconds)
- 🌙 Dark mode theme



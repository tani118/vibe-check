# 🌟 Vibe Check Quiz - Award-Winning Design

An immersive, award-winning React application featuring cutting-edge design principles, modern animations, and glassmorphism effects. Built for Awwwards-level visual excellence.

A beautiful React.js application that allows users to take a 10-question quiz to determine their current vibe, view other users' vibes, and track their mood history.

## ✨ Design Features

### 🎨 Modern Design System
- **Glassmorphism Effects**: Advanced backdrop-blur with layered transparency
- **Holographic Elements**: Dynamic color-shifting text and backgrounds
- **Cosmic Backgrounds**: Animated aurora effects and particle systems
- **Neon Aesthetics**: Glowing elements with pulsing animations
- **3D Interactions**: Hover effects with depth and perspective

### 🎭 Advanced Animations
- **Particle Systems**: Mouse-following interactive particles
- **Morphing Shapes**: Dynamic border-radius animations
- **Text Effects**: Shimmer, glow, and typewriter animations
- **Scroll Reveals**: Intersection Observer-based animations
- **Parallax Scrolling**: Smooth depth-based movement
- **Micro-interactions**: Subtle hover and focus states

### 🎯 Award-Winning UX
- **Smooth Transitions**: 60fps animations with hardware acceleration
- **Responsive Design**: Mobile-first with adaptive layouts
- **Performance Optimized**: Reduced motion for accessibility
- **Loading States**: Beautiful glassmorphism loading components
- **Error Handling**: Custom 404 page with interactive elements

## Tech Stack

- **Frontend**: React.js with Vite
- **Styling**: Tailwind CSS + Shadcn/ui components
- **Database**: Supabase
- **Routing**: React Router DOM

## Features

1. **Landing Page**: Beautiful gradient design with call-to-action
2. **Authentication**: Sign up and login pages
3. **Quiz System**: 10-question quiz with scoring system (-5 to +5 per question)
4. **Home Dashboard**: Shows user's current vibe and starred users' vibes
5. **Profile Management**: Edit username, choose avatar, view vibe history
6. **Community**: View all users' current vibes and star favorites

## Color Scheme

- **Teal**: #08D9D6
- **Black**: #252A34
- **Red**: #FF2E63
- **Grey**: #EAEAEA

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd vibe-check-quiz
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Execute the SQL commands in `database-schema.sql` in your Supabase SQL editor
4. Update `src/lib/supabase.js` with your actual Supabase credentials:

```javascript
const supabaseUrl = 'YOUR_ACTUAL_SUPABASE_URL'
const supabaseKey = 'YOUR_ACTUAL_SUPABASE_ANON_KEY'
```

### 3. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Database Schema

The app uses 4 main tables:

1. **users**: Stores user credentials and profile information
2. **current_vibes**: Stores each user's latest vibe result
3. **vibe_history**: Stores complete history of all vibe quiz results
4. **starred_users**: Stores which users each user has starred

## Vibe Scoring System

The quiz consists of 10 questions, each with 5 possible answers worth -5 to +5 points:
- **Total Score 35-50**: Absolutely Radiant ✨
- **Total Score 25-34**: Super Positive 😄
- **Total Score 15-24**: Pretty Good 😊
- **Total Score 5-14**: Decent 🙂
- **Total Score -5-4**: Neutral 😐
- **Total Score -15 to -6**: Meh 😕
- **Total Score -25 to -16**: Not Great 😞
- **Total Score -35 to -26**: Pretty Low 😢
- **Total Score below -35**: Rock Bottom 😭+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

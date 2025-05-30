# 🎵 VibeCheck - Music Discovery & Personality Quiz App

A modern React application that combines personality assessment with music discovery, featuring Spotify integration, user authentication, and beautiful glassmorphism design.

## ✨ Features

### 🧠 Intelligent Personality Quiz
- **10-Question Assessment**: Discover your current emotional state through carefully crafted questions
- **Dynamic Scoring**: Advanced algorithm calculates your vibe from 9 distinct emotional categories
- **Real-time Results**: Instant feedback with beautiful animations and visual representations
- **Vibe Categories**: From "Absolutely Radiant ✨" to "Rock Bottom 💀"

### 🎶 Music Discovery
- **Spotify Integration**: Curated playlists that match your personality and mood
- **Vibe-Based Recommendations**: Music suggestions tailored to your quiz results
- **Playlist Love System**: Save and organize your favorite playlists
- **Visual Music Cards**: Beautiful album artwork and playlist details

### 👤 User Profiles & Social Features
- **Personal Dashboard**: View your vibe history and loved playlists
- **User Directory**: Discover other users and their musical tastes
- **Social Interactions**: Connect with like-minded music lovers
- **Profile Customization**: Personalize your vibe journey

### 🎨 Award-Winning Design
- **Glassmorphism UI**: Modern frosted glass effects with backdrop blur
- **Holographic Elements**: Dynamic color-shifting text and interactive animations
- **Responsive Design**: Seamless experience across all devices
- **Dark Theme**: Beautiful gradient backgrounds with particle effects
- **Smooth Animations**: 60fps transitions and micro-interactions

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS + Custom Components
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Music API**: Spotify Web API
- **Routing**: React Router DOM
- **State Management**: React Hooks + Context API
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Spotify Developer account (for music features)

### 1. Clone and Install
```bash
git clone <repository-url>
cd vibe-check-quiz
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup
Execute this SQL in your Supabase SQL editor:
```sql
-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  avatar VARCHAR(255) DEFAULT 'default',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create current_vibes table
CREATE TABLE current_vibes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  vibe VARCHAR(50) NOT NULL,
  score INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create vibe_history table
CREATE TABLE vibe_history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  vibe VARCHAR(50) NOT NULL,
  score INTEGER NOT NULL,
  quiz_answers JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create starred_users table
CREATE TABLE starred_users (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  starred_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, starred_user_id)
);

-- Create loved_playlists table (for music features)
CREATE TABLE loved_playlists (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  playlist_id VARCHAR(50) NOT NULL,
  playlist_name VARCHAR(255) NOT NULL,
  playlist_description TEXT,
  playlist_image_url TEXT,
  vibe_category VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, playlist_id)
);
```

### 4. Run Development Server
```bash
npm run dev
```
Visit `http://localhost:5173` to see the app in action!

## 📱 Core Functionality

### Quiz System
The personality assessment features 10 carefully designed questions, each offering 5 response options worth -5 to +5 points:

| Score Range | Vibe Category | Emoji |
|-------------|---------------|-------|
| 35-50 | Absolutely Radiant | ✨ |
| 25-34 | Super Positive | 🔥 |
| 15-24 | Pretty Good | 😊 |
| 5-14 | Decent | 🙂 |
| -5-4 | Neutral | 😐 |
| -15 to -6 | Meh | 😕 |
| -25 to -16 | Not Great | 😞 |
| -35 to -26 | Pretty Low | 😢 |
| Below -35 | Rock Bottom | 💀 |

### Music Discovery
- **Curated Playlists**: Each vibe category has specially selected Spotify playlists
- **Smart Matching**: Algorithm considers your quiz results and music preferences
- **Playlist Management**: Love, save, and organize your favorite discoveries
- **Social Discovery**: See what music resonates with similar personality types

### Database Features
- **Persistent Storage**: All user data, quiz results, and playlist preferences saved
- **localStorage Fallback**: App continues working even without database connection
- **Real-time Updates**: Instant synchronization across sessions

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production
```
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_supabase_key
```

### Build Commands
```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint
```

## 🎨 Design Philosophy

### Visual Elements
- **Glassmorphism**: Frosted glass cards with subtle transparency
- **Holographic Text**: Dynamic color-shifting typography
- **Particle Systems**: Interactive background animations
- **Gradient Overlays**: Rich color transitions throughout the UI
- **Smooth Transitions**: Hardware-accelerated animations

### User Experience
- **Intuitive Navigation**: Clear user flow from quiz to music discovery
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Accessibility**: Proper contrast ratios and screen reader support
- **Performance**: Optimized assets and lazy loading

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/               # Reusable UI components
│   ├── VibeMusic.jsx     # Music discovery component
│   └── PreloadManager.jsx # Asset preloading
├── pages/
│   ├── LandingPage.jsx   # Homepage with hero section
│   ├── QuizPage.jsx      # Personality quiz interface
│   ├── ProfilePage.jsx   # User dashboard
│   └── MusicDiscoveryPage.jsx # Music exploration
├── lib/
│   ├── database.js       # Supabase database functions
│   ├── musicService.js   # Spotify API integration
│   ├── quiz.js          # Quiz logic and scoring
│   └── supabase.js      # Supabase client configuration
└── hooks/
    ├── useAuth.jsx       # Authentication context
    └── useAnimations.js  # Animation utilities
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Spotify Web API for music data
- Supabase for backend infrastructure
- Tailwind CSS for styling framework
- React community for amazing tools and libraries

---

**Built with ❤️ for music lovers and vibe seekers everywhere**

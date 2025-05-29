import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import { LoadingSpinner } from './components/ui/loading'
import PreloadManager from './components/PreloadManager'
import LandingPage from './pages/LandingPage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import QuizPage from './pages/QuizPage'
import ProfilePage from './pages/ProfilePage'
import UsersPage from './pages/UsersPage'
import MusicDiscoveryPage from './pages/MusicDiscoveryPage'
import NotFoundPage from './pages/NotFoundPage'

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen cosmic-bg flex items-center justify-center">
        <div className="glass-card p-8 rounded-2xl flex flex-col items-center space-y-4">
          <LoadingSpinner size="xl" />
          <p className="text-white text-lg font-medium">Loading your vibe...</p>
        </div>
      </div>
    )
  }
  
  return user ? children : <Navigate to="/login" />
}

// Public Route component (redirect if already logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen cosmic-bg flex items-center justify-center">
        <div className="glass-card p-8 rounded-2xl flex flex-col items-center space-y-4">
          <LoadingSpinner size="xl" />
          <p className="text-white text-lg font-medium">Checking your vibe...</p>
        </div>
      </div>
    )
  }
  
  return user ? <Navigate to="/home" /> : children
}

function App() {
  return (
    <AuthProvider>
      <PreloadManager />
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
            <Route path="/signup" element={<PublicRoute><SignUpPage /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
            
            {/* Protected routes */}
            <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
            <Route path="/music" element={<ProtectedRoute><MusicDiscoveryPage /></ProtectedRoute>} />
            
            {/* Catch all route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { createUser } from '../lib/database'
import { useAuth } from '../hooks/useAuth'

const SignUpPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState('😊')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Generate stable random values for background elements
  const [backgroundElements] = useState(() => 
    Array.from({ length: 12 }).map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: Math.random() * 150 + 100,
      height: Math.random() * 150 + 100,
      color: ['rgba(139, 92, 246, 0.03)', 'rgba(16, 185, 129, 0.03)', 'rgba(245, 101, 101, 0.03)', 'rgba(59, 130, 246, 0.03)'][Math.floor(Math.random() * 4)],
      delay: Math.random() * 3,
      duration: Math.random() * 12 + 8
    }))
  )
  
  // Generate floating particles
  const [particles] = useState(() => 
    Array.from({ length: 25 }).map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 4,
      duration: Math.random() * 15 + 10
    }))
  )
  
  const navigate = useNavigate()
  const { login } = useAuth()

  const avatars = ['😊', '😎', '🤩', '😍', '🥳', '🦄', '👑', '✨', '🌟', '💫', '🔥', '💎', '🚀', '💯', '🎯', '⭐', '🎨', '🎭', '🎪', '🎨']

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!username.trim()) {
      setError('username is required ✨')
      return
    }

    if (!email.trim()) {
      setError('email is required 📧')
      return
    }

    if (password !== confirmPassword) {
      setError('passwords don\'t match 😔')
      return
    }

    if (password.length < 6) {
      setError('password needs to be at least 6 characters 🔒')
      return
    }

    setLoading(true)
    try {
      const result = await createUser(username.trim(), password, selectedAvatar)
      
      if (result.success) {
        login(result.user)
        navigate('/home')
      } else {
        setError(result.error || 'failed to create account 💔')
      }
    } catch (err) {
      setError(err.message || 'something went wrong, try again 💔')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {backgroundElements.map((element, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-30 animate-float"
            style={{
              left: `${element.left}%`,
              top: `${element.top}%`,
              width: `${element.width}px`,
              height: `${element.height}px`,
              background: `radial-gradient(circle, ${element.color}, transparent)`,
              animationDelay: `${element.delay}s`,
              animationDuration: `${element.duration}s`
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5 animate-float-slow"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-10 glass-card border-0 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div 
            onClick={() => navigate('/')}
            className="text-2xl font-black holographic-text cursor-pointer hover:opacity-80 transition-opacity duration-300"
          >
            vibe checker
          </div>
          <Link to="/login" className="btn-ghost text-white/80 hover:text-white font-medium">
            already have an account?
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-6 text-8xl animate-bounce-slow">✨</div>
            <h1 className="text-6xl font-black gradient-text mb-4 animate-fade-in">
              join the vibe
            </h1>
            <p className="text-white/70 text-xl animate-fade-in-delay">
              start your authentic journey and discover your true vibe
            </p>
          </div>

          {/* Sign up form */}
          <div className="glass-card rounded-3xl p-8 bg-gradient-to-b from-purple-900/20 to-pink-900/20 hover:from-purple-900/30 hover:to-pink-900/30 transition-all duration-500">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="glass-card bg-red-900/30 border border-red-500/30 rounded-2xl p-4 text-red-300 text-center animate-shake">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-xl">⚠️</span>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-white font-semibold mb-4 text-lg flex items-center">
                  <span className="mr-2">🎭</span>
                  choose your vibe avatar
                </label>
                <div className="glass-card rounded-2xl p-4 bg-black/20">
                  <div className="grid grid-cols-6 gap-3">
                    {avatars.map((avatar) => (
                      <button
                        key={avatar}
                        type="button"
                        onClick={() => setSelectedAvatar(avatar)}
                        className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-300 hover:opacity-80 ${
                          selectedAvatar === avatar 
                            ? 'bg-gradient-to-r from-cyan-400 to-pink-400 shadow-lg shadow-cyan-400/50 scale-110' 
                            : 'bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30'
                        }`}
                      >
                        {avatar}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-black/30 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-white/50 text-lg backdrop-blur-sm focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 group-hover:border-white/30"
                    required
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 text-lg pointer-events-none">
                    👤
                  </div>
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/30 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-white/50 text-lg backdrop-blur-sm focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 group-hover:border-white/30"
                    required
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 text-lg pointer-events-none">
                    📧
                  </div>
                </div>

                <div className="relative group">
                  <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/30 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-white/50 text-lg backdrop-blur-sm focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 group-hover:border-white/30"
                    required
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 text-lg pointer-events-none">
                    🔒
                  </div>
                </div>

                <div className="relative group">
                  <input
                    type="password"
                    placeholder="confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-black/30 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-white/50 text-lg backdrop-blur-sm focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 group-hover:border-white/30"
                    required
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 text-lg pointer-events-none">
                    🔒
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary h-14 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>creating your vibe...</span>
                  </div>
                ) : (
                  <>
                    <span className="relative z-10">create account ✨</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <div className="glass-card rounded-2xl p-4 bg-gradient-to-r from-blue-900/10 to-purple-900/10">
                <p className="text-white/70 text-lg">
                  already part of the vibe? {' '}
                  <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold hover:underline transition-all duration-300">
                    sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="glass-card rounded-xl p-4 bg-gradient-to-br from-cyan-900/10 to-blue-900/10">
              <div className="text-2xl mb-2">🎯</div>
              <p className="text-white/70 text-sm">authentic vibes</p>
            </div>
            <div className="glass-card rounded-xl p-4 bg-gradient-to-br from-purple-900/10 to-pink-900/10">
              <div className="text-2xl mb-2">🌟</div>
              <p className="text-white/70 text-sm">personalized journey</p>
            </div>
            <div className="glass-card rounded-xl p-4 bg-gradient-to-br from-green-900/10 to-emerald-900/10">
              <div className="text-2xl mb-2">💫</div>
              <p className="text-white/70 text-sm">vibe community</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage

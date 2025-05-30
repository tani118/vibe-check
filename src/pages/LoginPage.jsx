import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { loginUser } from '../lib/database'
import { useAuth } from '../hooks/useAuth'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Generate stable random values for background elements
  const [backgroundElements] = useState(() => 
    Array.from({ length: 12 }).map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: Math.random() * 120 + 80,
      height: Math.random() * 120 + 80,
      color: ['rgba(139, 92, 246, 0.03)', 'rgba(16, 185, 129, 0.03)', 'rgba(245, 101, 101, 0.03)', 'rgba(59, 130, 246, 0.03)'][Math.floor(Math.random() * 4)],
      delay: Math.random() * 3,
      duration: Math.random() * 12 + 8
    }))
  )
  
  // Generate floating particles
  const [particles] = useState(() => 
    Array.from({ length: 20 }).map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 4,
      duration: Math.random() * 15 + 10
    }))
  )
  
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await loginUser(username, password)
      
      if (result.success) {
        login(result.user)
        navigate('/home')
      } else {
        setError('invalid username or password 😔')
      }
    } catch (err) {
      setError('something went wrong, try again 💔')
    }

    setLoading(false)
  }

  const handleDemoLogin = async (demoUsername) => {
    setLoading(true)
    setError('')
    
    try {
      const result = await loginUser('temp', 'temp123')
      
      if (result.success) {
        login(result.user)
        navigate('/home')
      } else {
        setError('demo account not available 🤔')
      }
    } catch (err) {
      setError('demo login failed, try manual login 💫')
    }
    
    setLoading(false)
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
          <Link to="/signup" className="btn-ghost text-white/80 hover:text-white font-medium">
            new to the vibe family?
          </Link>
        </div>
      </nav>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-6 text-8xl animate-bounce-slow">✨</div>
            <h1 className="text-6xl font-black gradient-text mb-4 animate-fade-in">
              welcome back
            </h1>
            <p className="text-white/70 text-xl animate-fade-in-delay">
              ready to check your vibe again?
            </p>
          </div>

          {/* Login form */}
          <div className="glass-card rounded-3xl p-8 bg-gradient-to-b from-purple-900/20 to-pink-900/20 hover:from-purple-900/30 hover:to-pink-900/30 transition-all duration-500">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">sign in friend</h2>
              <div className="text-3xl">🎭</div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="glass-card bg-red-900/30 border border-red-500/30 rounded-2xl p-4 text-red-300 text-center animate-shake">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-xl">⚠️</span>
                    <span>{error}</span>
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                <div className="relative group">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"
                    required
                    className="w-full bg-black/30 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-white/50 text-lg backdrop-blur-sm focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 group-hover:border-white/30"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 text-lg pointer-events-none">
                    👤
                  </div>
                </div>

                <div className="relative group">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    required
                    className="w-full bg-black/30 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-white/50 text-lg backdrop-blur-sm focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 group-hover:border-white/30"
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
                    <span>vibing you in...</span>
                  </div>
                ) : (
                  <>
                    <span className="relative z-10">let's vibe ✨</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                  </>
                )}
              </button>
            </form>

            {/* Demo accounts */}
            <div className="mt-8">
              <div className="glass-card rounded-2xl p-4 bg-gradient-to-r from-blue-900/10 to-purple-900/10">
                <p className="text-white/70 text-center text-sm mb-4">
                  try a demo account to explore the vibe ✨
                </p>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => handleDemoLogin('demo_user')}
                    disabled={loading}
                    className="btn-secondary text-sm py-2 disabled:opacity-50"
                  >
                    demo user
                  </button>

                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="glass-card rounded-2xl p-4 bg-gradient-to-r from-green-900/10 to-emerald-900/10">
                <p className="text-white/70 text-lg">
                  new to the vibe family?{' '}
                  <Link
                    to="/signup"
                    className="text-cyan-400 hover:text-cyan-300 font-semibold hover:underline transition-all duration-300"
                  >
                    join us friend
                  </Link>
                </p>
              </div>
            </div>

          </div>

          {/* Back to home */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="text-white/60 hover:text-white/80 transition-colors text-sm inline-flex items-center space-x-2"
            >
              <span>←</span>
              <span>back to the landing page</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

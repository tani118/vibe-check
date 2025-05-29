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
  const [selectedAvatar, setSelectedAvatar] = useState('👤')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Generate stable random values for background elements
  const [backgroundElements] = useState(() => 
    Array.from({ length: 15 }).map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: Math.random() * 80 + 20,
      height: Math.random() * 80 + 20,
      color: ['#08D9D680', '#FF2E6380', '#FFD70080'][Math.floor(Math.random() * 3)],
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2
    }))
  )
  
  const navigate = useNavigate()
  const { login } = useAuth()

  const avatars = ['👤', '😎', '🤩', '😍', '🥳', '🦄', '👑', '✨']

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!username.trim()) {
      setError('friend u need a username 💅')
      return
    }

    if (!email.trim()) {
      setError('email is giving required energy ✉️')
      return
    }

    if (password !== confirmPassword) {
      setError('passwords aren\'t matching the vibe 😔')
      return
    }

    if (password.length < 6) {
      setError('password needs to be at least 6 characters friend 🔒')
      return
    }

    setLoading(true)
    try {
      const result = await createUser(username.trim(), password, selectedAvatar)
      
      if (result.success) {
        login(result.user)
        navigate('/home')
      } else {
        setError(result.error || 'failed to create account friend 💔')
      }
    } catch (err) {
      setError(err.message || 'something went wrong friend, try again 💔')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {backgroundElements.map((element, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
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

      {/* Floating emojis */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[10%] text-4xl animate-float">⚡</div>
        <div className="absolute top-32 right-[15%] text-3xl animate-bounce">✨</div>
        <div className="absolute bottom-40 left-[20%] text-4xl animate-wiggle">🔥</div>
        <div className="absolute bottom-20 right-[25%] text-3xl animate-pulse">🌟</div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-4 glitch">
              join the vibe
            </h1>
            <p className="text-lg text-white/80 font-medium">
              create your account and start vibing ✨
            </p>
          </div>

          <Card className="glass-card border-0 shadow-2xl">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center text-white">
                let's get you set up friend 💫
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-center backdrop-blur-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/90">username (make it iconic)</label>
                  <Input
                    type="text"
                    placeholder="authentic_energy"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-pink-400 focus:ring-pink-400/50 rounded-xl h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/90">email (we won't spam friend)</label>
                  <Input
                    type="email"
                    placeholder="fam@vibecheck.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-pink-400 focus:ring-pink-400/50 rounded-xl h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/90">password (keep it secure fam)</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-pink-400 focus:ring-pink-400/50 rounded-xl h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/90">confirm password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-pink-400 focus:ring-pink-400/50 rounded-xl h-12"
                    required
                  />
                </div>

                {/* Avatar Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-white/90">choose your avatar vibe</label>
                  <div className="grid grid-cols-4 gap-3">
                    {avatars.map((avatar) => (
                      <button
                        key={avatar}
                        type="button"
                        onClick={() => setSelectedAvatar(avatar)}
                        className={`text-3xl p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-110 ${
                          selectedAvatar === avatar
                            ? 'border-pink-400 bg-pink-400/20 scale-110'
                            : 'border-white/20 bg-white/5 hover:border-white/40'
                        }`}
                      >
                        {avatar}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 border-2 border-white/20 shadow-xl"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>creating your vibe...</span>
                    </div>
                  ) : (
                    'periodt let\'s go ✨'
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-white/70">
                  already part of the vibe family?{' '}
                  <Link
                    to="/login"
                    className="text-pink-400 font-semibold hover:text-pink-300 transition-colors underline decoration-2 underline-offset-4"
                  >
                    sign in friend
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Back to home */}
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-white/60 hover:text-white/80 transition-colors text-sm"
            >
              ← back to the landing page
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage

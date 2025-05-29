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
      width: Math.random() * 60 + 20,
      height: Math.random() * 60 + 20,
      color: ['#08D9D680', '#FF2E6380', '#9D4EDD80'][Math.floor(Math.random() * 3)],
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2
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
        setError('username or password ain\'t it friend 😔')
      }
    } catch (err) {
      setError('something went wrong, try again fam 💔')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-pink-950 relative overflow-hidden">
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
        <div className="absolute top-20 left-[15%] text-4xl animate-bounce">🔥</div>
        <div className="absolute top-40 right-[20%] text-3xl animate-wiggle">✨</div>
        <div className="absolute bottom-32 left-[25%] text-4xl animate-float">💫</div>
        <div className="absolute bottom-48 right-[15%] text-3xl animate-pulse">🌟</div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 glitch">
              welcome back
            </h1>
            <p className="text-lg text-white/80 font-medium">
              ready to check your vibe again? ✨
            </p>
          </div>

          <Card className="glass-card border-0 shadow-2xl">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center text-white">
                sign in friend ✨
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
                  <label className="text-sm font-medium text-white/90">username</label>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="authentic_energy"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-pink-400 focus:ring-pink-400/50 rounded-xl h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/90">password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-pink-400 focus:ring-pink-400/50 rounded-xl h-12"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 border-2 border-white/20 shadow-xl"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>vibing you in...</span>
                    </div>
                  ) : (
                    'let\'s vibe ✨'
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-white/70">
                  new to the vibe family?{' '}
                  <Link
                    to="/signup"
                    className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors underline decoration-2 underline-offset-4"
                  >
                    join us friend
                  </Link>
                </p>
              </div>

              <div className="mt-4 text-center">
                <button className="text-white/50 hover:text-white/70 transition-colors text-sm">
                  forgot password? we've all been there 💀
                </button>
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
export default LoginPage

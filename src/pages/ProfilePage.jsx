import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { useAuth } from '../hooks/useAuth'
import { getUserVibeHistory, updateUserProfile } from '../lib/database'
import { getVibeFromScore } from '../lib/quiz'

const avatarOptions = ['😊', '😎', '🤗', '😄', '🥳', '😇', '🤠', '🥰', '😋', '🤩', '😌', '🙃', '💫', '✨', '🌟', '💎', '🔥', '💯', '🎯', '🚀']

const ProfilePage = () => {
  const [vibeHistory, setVibeHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [newUsername, setNewUsername] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState('')
  
  // Generate stable random values for background elements
  const [backgroundElements] = useState(() => 
    Array.from({ length: 15 }).map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: Math.random() * 120 + 80,
      height: Math.random() * 120 + 80,
      color: ['rgba(139, 92, 246, 0.03)', 'rgba(16, 185, 129, 0.03)', 'rgba(245, 101, 101, 0.03)', 'rgba(59, 130, 246, 0.03)'][Math.floor(Math.random() * 4)],
      delay: Math.random() * 3,
      duration: Math.random() * 15 + 10
    }))
  )
  
  // Generate floating particles
  const [particles] = useState(() => 
    Array.from({ length: 30 }).map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 20 + 15
    }))
  )
  
  const navigate = useNavigate()
  const { user, updateUser } = useAuth()

  useEffect(() => {
    setNewUsername(user.username)
    setSelectedAvatar(user.avatar)
    fetchVibeHistory()
  }, [user])

  const fetchVibeHistory = async () => {
    try {
      const result = await getUserVibeHistory(user.id)
      if (result.success) {
        setVibeHistory(result.history)
      }
    } catch (error) {
      console.error('Error fetching vibe history:', error)
    }
    setLoading(false)
  }

  const handleSaveProfile = async () => {
    try {
      const result = await updateUserProfile(user.id, {
        username: newUsername,
        avatar: selectedAvatar
      })
      
      if (result.success) {
        updateUser({ username: newUsername, avatar: selectedAvatar })
        setEditing(false)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-pink-950 relative overflow-hidden flex items-center justify-center">
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

        <div className="glass-card p-8 rounded-3xl relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
            <div className="text-white text-xl font-semibold">loading your profile...</div>
          </div>
        </div>
      </div>
    )
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
            className="absolute rounded-full bg-white/10 animate-float-slow"
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
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => navigate('/home')} 
              className="btn-ghost text-white/80 hover:text-white font-medium"
            >
              home
            </button>
            <button 
              onClick={() => navigate('/quiz')} 
              className="btn-ghost text-white/80 hover:text-white font-medium"
            >
              take quiz
            </button>
            <button 
              onClick={() => navigate('/users')} 
              className="btn-ghost text-white/80 hover:text-white font-medium"
            >
              community
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Profile Header */}
        <div className="glass-card rounded-3xl p-8 mb-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20 hover:from-purple-900/30 hover:to-pink-900/30 transition-all duration-500">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl relative overflow-hidden group-hover:opacity-90 transition-all duration-300">
                  {selectedAvatar || user.avatar}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-4 border-slate-900 animate-pulse shadow-lg shadow-green-400/50"></div>
              </div>
              <div>
                <h1 className="text-4xl font-black gradient-text mb-2">
                  {editing ? (
                    <input
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="bg-black/30 border border-white/20 rounded-xl px-4 py-2 text-white text-4xl font-black backdrop-blur-sm focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                      placeholder="your username"
                    />
                  ) : (
                    user.username
                  )}
                </h1>
                <p className="text-white/70 text-lg mb-2">member since forever ago ✨</p>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-medium">online & vibing</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              {editing ? (
                <>
                  <button onClick={handleSaveProfile} className="btn-primary">
                    save profile
                  </button>
                  <button onClick={() => setEditing(false)} className="btn-secondary">
                    cancel
                  </button>
                </>
              ) : (
                <button onClick={() => setEditing(true)} className="btn-primary">
                  edit profile
                </button>
              )}
            </div>
          </div>

          {/* Avatar selection during editing */}
          {editing && (
            <div className="mt-8 p-6 glass-card bg-black/20 rounded-2xl">
              <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
                <span className="mr-2">✨</span>
                choose your vibe avatar
              </h3>
              <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-10 gap-3">
                {avatarOptions.map((avatar) => (
                  <button
                    key={avatar}
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-300 hover:opacity-80 ${
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
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-blue-900/20 to-cyan-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm font-medium">total vibes</p>
                <p className="text-3xl font-black gradient-text">{vibeHistory.length}</p>
              </div>
              <div className="text-3xl">📊</div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm font-medium">avg score</p>
                <p className="text-3xl font-black gradient-text">
                  {vibeHistory.length > 0 
                    ? Math.round(vibeHistory.reduce((sum, entry) => sum + entry.score, 0) / vibeHistory.length)
                    : 0}%
                </p>
              </div>
              <div className="text-3xl">🎯</div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm font-medium">best vibe</p>
                <p className="text-3xl font-black gradient-text">
                  {vibeHistory.length > 0 
                    ? Math.max(...vibeHistory.map(entry => entry.score))
                    : 0}%
                </p>
              </div>
              <div className="text-3xl">🏆</div>
            </div>
          </div>
        </div>

        {/* Vibe History */}
        <div className="glass-card rounded-3xl p-8">
          <h2 className="text-3xl font-black gradient-text mb-6 flex items-center">
            <span className="mr-3 text-2xl">📈</span>
            your vibe journey
          </h2>
          
          {vibeHistory.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-8xl mb-6 animate-bounce">🤔</div>
              <h3 className="text-2xl font-bold text-white mb-4">no vibes recorded yet!</h3>
              <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
                ready to discover your vibe? take your first quiz and start your journey!
              </p>
              <button 
                onClick={() => navigate('/quiz')} 
                className="btn-primary text-lg px-8 py-4"
              >
                take your first quiz
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {vibeHistory.slice(0, 5).map((entry, i) => {
                const vibe = getVibeFromScore(entry.score)
                return (
                  <div 
                    key={i} 
                    className="glass-card rounded-2xl p-6 bg-black/20 hover:bg-black/30 transition-all duration-300 hover:scale-[1.02] group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl group-hover:opacity-90 transition-all duration-300">
                          {vibe.emoji}
                        </div>
                        <div>
                          <div className="text-xl font-bold text-white group-hover:gradient-text transition-all duration-300">
                            {vibe.title}
                          </div>
                          <div className="text-white/60 text-sm">
                            {new Date(entry.date).toLocaleDateString('en-US', { 
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black gradient-text">{entry.score}%</div>
                        <div className="text-white/60 text-sm">vibe score</div>
                      </div>
                    </div>
                    <div className="mt-4 bg-white/10 rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 group-hover:from-cyan-300 group-hover:to-pink-400"
                        style={{ 
                          width: `${entry.score}%`,
                          transform: `scaleX(${loading ? 0 : 1})`,
                          transformOrigin: 'left'
                        }}
                      ></div>
                    </div>
                  </div>
                )
              })}
              
              {vibeHistory.length > 5 && (
                <div className="text-center mt-8 glass-card rounded-2xl p-6 bg-gradient-to-r from-purple-900/10 to-pink-900/10">
                  <p className="text-white/70 text-lg">
                    <span className="gradient-text font-semibold">+{vibeHistory.length - 5}</span> more vibe checks in your history!
                  </p>
                  <p className="text-white/50 text-sm mt-2">keep taking quizzes to build your vibe profile ✨</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

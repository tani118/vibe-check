import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { useAuth } from '../hooks/useAuth'
import { getUserVibeHistory, updateUserProfile } from '../lib/database'
import { getVibeFromScore } from '../lib/quiz'

const avatarOptions = ['😊', '😎', '🤗', '😄', '🥳', '😇', '🤠', '🥰', '😋', '🤩', '😌', '🙃']

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
      width: Math.random() * 60 + 20,
      height: Math.random() * 60 + 20,
      color: ['#08D9D640', '#FF2E6340', '#FFD70040', '#9D4EDD40'][Math.floor(Math.random() * 4)],
      delay: Math.random() * 3,
      duration: Math.random() * 5 + 3
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
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-black flex items-center justify-center">
        <div className="glass-card p-8 rounded-3xl">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 border-4 border-pink-400/30 border-t-pink-400 rounded-full animate-spin"></div>
            <div className="text-white text-xl font-bold">loading your profile friend...</div>
          </div>
        </div>
      </div>
    )
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

      {/* Navigation */}
      <nav className="relative z-10 bg-black/30 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
            vibe checker
          </h1>
          <div className="flex items-center space-x-6">
            <Button onClick={() => navigate('/home')} variant="ghost" className="text-white hover:text-cyan-400 font-medium">
              home
            </Button>
            <Button onClick={() => navigate('/users')} variant="ghost" className="text-white hover:text-pink-400 font-medium">
              community
            </Button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto p-6 pt-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400 mb-4">
            your profile
          </h2>
          <p className="text-xl text-white/80 font-medium">
            this is your authentic moment ✨
          </p>
        </div>
        {/* Profile Section */}
        <Card className="glass-card border-0 shadow-2xl mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 flex items-center justify-center">
              <span className="mr-3 text-4xl animate-wiggle">👤</span>
              your authentic info
            </CardTitle>
          </CardHeader>
          <CardContent>
            {editing ? (
              <div className="space-y-8">
                <div>
                  <label className="block text-lg font-bold text-white mb-3">username friend</label>
                  <Input
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="what should we call you?"
                    className="glass-input text-white placeholder-white/50 border-white/30 focus:border-pink-400 text-lg max-w-sm"
                  />
                </div>

                <div>
                  <label className="block text-lg font-bold text-white mb-4">pick your vibe avatar</label>
                  <div className="grid grid-cols-6 gap-4 max-w-lg">
                    {avatarOptions.map((avatar) => (
                      <button
                        key={avatar}
                        onClick={() => setSelectedAvatar(avatar)}
                        className={`w-16 h-16 text-3xl rounded-2xl border-2 transition-all duration-300 transform hover:scale-110 ${
                          selectedAvatar === avatar
                            ? 'border-pink-400 bg-pink-400/20 animate-pulse'
                            : 'border-white/30 hover:border-cyan-400/50 bg-white/10'
                        }`}
                      >
                        {avatar}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button 
                    onClick={handleSaveProfile}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    save changes ✨
                  </Button>
                  <Button 
                    onClick={() => {
                      setEditing(false)
                      setNewUsername(user.username)
                      setSelectedAvatar(user.avatar)
                    }}
                    className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 font-bold py-3 px-8 rounded-full border border-white/30"
                  >
                    never mind
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <div className="text-8xl animate-float mb-4">{user.avatar}</div>
                <div>
                  <h3 className="text-4xl font-black text-white mb-2">{user.username}</h3>
                  <p className="text-white/70 text-lg">been vibing since {new Date(user.created_at).toLocaleDateString()} ✨</p>
                </div>
                <Button 
                  onClick={() => setEditing(true)} 
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  edit your vibe ✏️
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Vibe History */}
        <Card className="glass-card border-0 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400 flex items-center justify-center">
              <span className="mr-3 text-4xl animate-pulse">📊</span>
              your vibe journey
            </CardTitle>
            <p className="text-white/70 text-lg">track how your energy evolved friend ✨</p>
          </CardHeader>
          <CardContent>
            {vibeHistory.length > 0 ? (
              <div className="space-y-6">
                {vibeHistory.map((entry) => {
                  const vibeInfo = getVibeFromScore(entry.score)
                  return (
                    <div key={entry.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-pink-400/50 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400/20 to-purple-400/20 flex items-center justify-center text-4xl animate-float">
                            {vibeInfo.emoji}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-white mb-1">{vibeInfo.vibe}</h4>
                            <p className="text-cyan-400 font-semibold">score: {entry.score}/50</p>
                            <p className="text-white/60 text-sm">
                              {entry.score >= 40 ? 'amazing! you were bringing the energy!' : 
                               entry.score >= 30 ? 'decent vibes friend' : 
                               entry.score >= 15 ? 'we\'ve all been there hon' : 
                               'rough patch but you got this 💪'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white/80 font-medium">
                            {new Date(entry.created_at).toLocaleDateString()}
                          </p>
                          <p className="text-white/60 text-sm">
                            {new Date(entry.created_at).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-8xl mb-6 animate-wiggle">📈</div>
                <h3 className="text-2xl font-bold text-white mb-4">no vibe history yet friend!</h3>
                <p className="text-white/70 mb-8 text-lg">time to start your iconic journey 💫</p>
                <Button 
                  onClick={() => navigate('/quiz')}
                  className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-110"
                >
                  take your first quiz ✨
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProfilePage

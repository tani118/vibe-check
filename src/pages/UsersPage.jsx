import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { useAuth } from '../hooks/useAuth'
import { getAllUsers, toggleStarUser, getStarredUsers } from '../lib/database'
import { getVibeFromScore } from '../lib/quiz'

const UsersPage = () => {
  const [allUsers, setAllUsers] = useState([])
  const [starredUserIds, setStarredUserIds] = useState(new Set())
  const [loading, setLoading] = useState(true)
  
  // Generate stable random values for background elements
  const [backgroundElements] = useState(() => 
    Array.from({ length: 20 }).map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: Math.random() * 50 + 15,
      height: Math.random() * 50 + 15,
      color: ['#08D9D640', '#FF2E6340', '#FFD70040', '#9D4EDD40', '#F72A5240'][Math.floor(Math.random() * 5)],
      delay: Math.random() * 4,
      duration: Math.random() * 6 + 2
    }))
  )
  
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (user && user.id) {
      fetchData()
    }
  }, [user?.id])

  const fetchData = async () => {
    try {
      // Get all users
      const usersResult = await getAllUsers()
      if (usersResult.success) {
        // Filter out current user
        const otherUsers = usersResult.users.filter(u => u.id !== user.id)
        setAllUsers(otherUsers)
      }

      // Get starred users
      const starredResult = await getStarredUsers(user.id)
      if (starredResult.success) {
        const starredIds = new Set(starredResult.starredUsers.map(su => su.starred_user_id))
        setStarredUserIds(starredIds)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setLoading(false)
  }

  const handleStarToggle = async (targetUserId) => {
    const isStarred = starredUserIds.has(targetUserId)
    
    try {
      const result = await toggleStarUser(user.id, targetUserId)
      
      if (result.success) {
        if (isStarred) {
          setStarredUserIds(prev => {
            const newSet = new Set(prev)
            newSet.delete(targetUserId)
            return newSet
          })
        } else {
          setStarredUserIds(prev => new Set(prev).add(targetUserId))
        }
      } else {
        console.error('Star toggle failed:', result.error)
      }
    } catch (error) {
      console.error('Error toggling star:', error)
    }
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-black flex items-center justify-center">
        <div className="glass-card p-8 rounded-3xl">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 border-4 border-pink-400/30 border-t-pink-400 rounded-full animate-spin"></div>
            <div className="text-white text-xl font-bold">loading the community friend...</div>
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
            <Button onClick={() => navigate('/profile')} variant="ghost" className="text-white hover:text-pink-400 font-medium">
              profile
            </Button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto p-6 pt-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400 mb-4">
            the community
          </h2>
          <p className="text-xl text-white/80 font-medium">
            see how everyone else is bringing their vibes ✨
          </p>
        </div>
        <Card className="glass-card border-0 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 flex items-center justify-center">
              <span className="mr-3 text-4xl animate-wiggle">👥</span>
              community vibes
            </CardTitle>
            <p className="text-white/70 text-lg mt-3">find your people and star the iconic ones! 💫</p>
          </CardHeader>
          <CardContent>
            {allUsers.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allUsers.map((otherUser) => {
                  const userVibe = otherUser.current_vibes?.[0]
                  const vibeInfo = userVibe ? getVibeFromScore(userVibe.score) : null
                  const isStarred = starredUserIds.has(otherUser.id)
                  
                  return (
                    <div key={otherUser.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-pink-400/50 transition-all duration-300 transform hover:scale-105">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="text-4xl animate-float">{otherUser.avatar}</div>
                          <div>
                            <h4 className="font-bold text-white text-lg">{otherUser.username}</h4>
                            <p className="text-white/60 text-sm">community member</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleStarToggle(otherUser.id)}
                          className={`text-3xl transition-all duration-300 hover:scale-125 ${
                            isStarred ? 'text-yellow-400 animate-pulse' : 'text-white/40 hover:text-yellow-400'
                          }`}
                        >
                          {isStarred ? '⭐' : '☆'}
                        </button>
                      </div>

                      {vibeInfo ? (
                        <div className="text-center">
                          <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-pink-400/20 to-purple-400/20 flex items-center justify-center text-4xl mb-4 animate-float">
                            {vibeInfo.emoji}
                          </div>
                          <h5 className="font-bold text-white text-lg mb-2">{vibeInfo.vibe}</h5>
                          <p className="text-cyan-400 font-semibold mb-2">score: {userVibe.score}/50</p>
                          <p className="text-white/60 text-sm">
                            {userVibe.score >= 40 ? 'absolute icon! ✨' : 
                             userVibe.score >= 30 ? 'bringing decent vibes ✨' : 
                             userVibe.score >= 20 ? 'we stan the honesty 💪' : 
                             'sending good energy 🫶'}
                          </p>
                          <p className="text-white/40 text-xs mt-2">
                            updated {new Date(userVibe.updated_at).toLocaleDateString()}
                          </p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="w-24 h-24 mx-auto rounded-2xl bg-white/10 flex items-center justify-center text-4xl mb-4 animate-pulse">
                            ❓
                          </div>
                          <p className="text-white/60 text-lg">no vibe detected friend!</p>
                          <p className="text-white/40 text-sm">they need to take the quiz 📝</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-8xl mb-6 animate-wiggle">👥</div>
                <h3 className="text-2xl font-bold text-white mb-4">no other users yet friend!</h3>
                <p className="text-white/70 mb-8 text-lg">be the first to invite your squad to check their vibes 💫</p>
                <Button 
                  onClick={() => navigate('/quiz')}
                  className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-110"
                >
                  take the quiz first ✨
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Section */}
        {allUsers.length > 0 && (
          <Card className="glass-card border-0 shadow-2xl mt-12">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400 flex items-center justify-center">
                <span className="mr-3 text-4xl animate-pulse">📊</span>
                community stats
              </CardTitle>
              <p className="text-white/70 text-lg">the numbers don't lie friend! ✨</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-cyan-400/20 to-pink-400/20 rounded-2xl border border-white/20">
                  <div className="text-4xl font-black text-cyan-400 mb-2">{allUsers.length}</div>
                  <div className="text-white font-medium">total icons</div>
                  <div className="text-white/60 text-sm">in the community</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-2xl border border-white/20">
                  <div className="text-4xl font-black text-pink-400 mb-2">
                    {allUsers.filter(u => u.current_vibes?.[0]).length}
                  </div>
                  <div className="text-white font-medium">active vibes</div>
                  <div className="text-white/60 text-sm">currently vibing</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-400/20 to-yellow-400/20 rounded-2xl border border-white/20">
                  <div className="text-4xl font-black text-yellow-400 mb-2">{starredUserIds.size}</div>
                  <div className="text-white font-medium">your stars</div>
                  <div className="text-white/60 text-sm">friends you follow</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default UsersPage

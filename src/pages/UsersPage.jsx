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
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950/50 via-secondary-950/30 to-accent-950/50"></div>
        <div className="glass-card p-12 relative z-10">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary-500/30 border-t-primary-400 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-secondary-500/20 border-b-secondary-400 rounded-full animate-spin animate-reverse"></div>
            </div>
            <div className="text-white text-2xl font-bold holographic-text">
              Loading community...
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950 relative overflow-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950/30 via-secondary-950/20 to-accent-950/30"></div>
        <div className="grid grid-cols-20 grid-rows-20 w-full h-full">
          {backgroundElements.map((element, i) => (
            <div
              key={i}
              className="border border-primary-500/10 animate-pulse"
              style={{
                animationDelay: `${element.delay}s`,
                animationDuration: `${element.duration}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 glass-nav border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="text-3xl font-bold holographic-text">
            VibeCheck
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/home')}
              className="btn-ghost"
            >
              Home
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="btn-ghost"
            >
              Profile
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto p-6 pt-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black mb-6">
            <span className="holographic-text">Community</span>
          </h1>
          <p className="text-2xl text-neutral-300 max-w-3xl mx-auto">
            Discover amazing people and their authentic energy
          </p>
        </div>

        {/* Users Grid */}
        <div className="glass-card p-8 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black gradient-text mb-4 flex items-center justify-center">
              <span className="mr-4 text-5xl animate-pulse">👥</span>
              Community Vibes
            </h2>
            <p className="text-xl text-neutral-300">Connect with people who inspire you</p>
          </div>

          {allUsers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allUsers.map((otherUser) => {
                const userVibe = otherUser.current_vibes?.[0]
                const vibeInfo = userVibe ? getVibeFromScore(userVibe.score) : null
                const isStarred = starredUserIds.has(otherUser.id)
                
                return (
                  <div 
                    key={otherUser.id} 
                    className="glass-card p-6 group hover:opacity-90 transition-all duration-300 relative"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="text-4xl group-hover:animate-bounce transition-all duration-300">
                          {otherUser.avatar}
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-lg">{otherUser.username}</h4>
                          <p className="text-neutral-400 text-sm">Community Member</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleStarToggle(otherUser.id)}
                        className={`text-3xl transition-all duration-300 hover:opacity-80 ${
                          isStarred 
                            ? 'text-yellow-400 animate-pulse drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]' 
                            : 'text-neutral-500 hover:text-yellow-400'
                        }`}
                      >
                        {isStarred ? '⭐' : '☆'}
                      </button>
                    </div>

                    {vibeInfo ? (
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto glass-card flex items-center justify-center text-3xl mb-4 group-hover:animate-pulse">
                          {vibeInfo.emoji}
                        </div>
                        <h5 className="font-bold text-white text-lg mb-2">{vibeInfo.vibe}</h5>
                        <div className="text-primary-400 font-semibold mb-2 text-lg">
                          {userVibe.score}/50
                        </div>
                        <p className="text-neutral-300 text-sm mb-3">
                          {userVibe.score >= 40 ? 'Radiating amazing energy ✨' : 
                           userVibe.score >= 30 ? 'Bringing positive vibes 🌟' : 
                           userVibe.score >= 20 ? 'Authentic and honest 💪' : 
                           'On their journey 🌱'}
                        </p>
                        <p className="text-neutral-500 text-xs">
                          Updated {new Date(userVibe.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto glass-card flex items-center justify-center text-3xl mb-4 opacity-50">
                          ❓
                        </div>
                        <p className="text-neutral-400 text-lg mb-2">No vibe yet</p>
                        <p className="text-neutral-500 text-sm">Waiting for their first quiz</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-8xl mb-8 animate-bounce">👥</div>
              <h3 className="text-3xl font-bold text-white mb-6">No Community Members Yet</h3>
              <p className="text-xl text-neutral-300 mb-8 max-w-md mx-auto leading-relaxed">
                Be among the first to join this amazing community
              </p>
              <button 
                onClick={() => navigate('/quiz')}
                className="btn-primary text-lg px-8 py-4"
              >
                Take the Quiz First
              </button>
            </div>
          )}
        </div>

        {/* Community Stats */}
        {allUsers.length > 0 && (
          <div className="glass-card p-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black gradient-text mb-4 flex items-center justify-center">
                <span className="mr-4 text-5xl animate-pulse">📊</span>
                Community Insights
              </h2>
              <p className="text-xl text-neutral-300">The energy of our community</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 glass-card group hover:opacity-90 transition-all duration-300">
                <div className="text-5xl font-black text-primary-400 mb-4 group-hover:animate-bounce">
                  {allUsers.length}
                </div>
                <div className="text-white font-bold text-xl mb-2">Total Members</div>
                <div className="text-neutral-400">Amazing individuals</div>
              </div>
              
              <div className="text-center p-8 glass-card group hover:opacity-90 transition-all duration-300">
                <div className="text-5xl font-black text-secondary-400 mb-4 group-hover:animate-bounce">
                  {allUsers.filter(u => u.current_vibes?.[0]).length}
                </div>
                <div className="text-white font-bold text-xl mb-2">Active Vibes</div>
                <div className="text-neutral-400">Currently sharing energy</div>
              </div>
              
              <div className="text-center p-8 glass-card group hover:opacity-90 transition-all duration-300">
                <div className="text-5xl font-black text-accent-400 mb-4 group-hover:animate-bounce">
                  {starredUserIds.size}
                </div>
                <div className="text-white font-bold text-xl mb-2">Your Stars</div>
                <div className="text-neutral-400">People you follow</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UsersPage

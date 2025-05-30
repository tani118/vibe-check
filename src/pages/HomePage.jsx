import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import VibeMusic from '../components/VibeMusic'
import { useAuth } from '../hooks/useAuth'
import { getCurrentVibe, getStarredUsers } from '../lib/database'
import { getVibeFromScore } from '../lib/quiz'

const HomePage = () => {
  const [currentVibe, setCurrentVibe] = useState(null)
  const [starredUsers, setStarredUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showMusic, setShowMusic] = useState(false)
  const [lastPlaylist, setLastPlaylist] = useState(null)
  
  // Generate stable random values for background elements
  const [backgroundElements] = useState(() => 
    Array.from({ length: 12 }).map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: Math.random() * 80 + 30,
      height: Math.random() * 80 + 30,
      color: ['#08D9D640', '#FF2E6340', '#FFD70040'][Math.floor(Math.random() * 3)],
      delay: Math.random() * 2,
      duration: Math.random() * 4 + 2
    }))
  )
  
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.id) {
        setLoading(false)
        return
      }

      try {
        // Get current user's vibe
        const vibeResult = await getCurrentVibe(user.id)
        
        if (vibeResult.success) {
          const vibeInfo = getVibeFromScore(vibeResult.vibe.score)
          setCurrentVibe({ ...vibeResult.vibe, ...vibeInfo })
          
          // Load last playlist for this vibe from localStorage
          const savedLastPlaylist = localStorage.getItem(`lastPlaylist_${vibeInfo.vibe}`)
          if (savedLastPlaylist) {
            setLastPlaylist(JSON.parse(savedLastPlaylist))
          }
        }

        // Get starred users' vibes
        const starredResult = await getStarredUsers(user.id)
        
        if (starredResult.success) {
          setStarredUsers(starredResult.starredUsers)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
      setLoading(false)
    }

    fetchData()
  }, [user])

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center relative overflow-hidden">
        {/* Loading background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950/50 via-secondary-950/30 to-accent-950/50"></div>
        
        <div className="glass-card p-12 relative z-10">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary-500/30 border-t-primary-400 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-secondary-500/20 border-b-secondary-400 rounded-full animate-spin animate-reverse"></div>
            </div>
            <div className="text-white text-2xl font-bold holographic-text">
              Loading your energy...
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
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex items-center text-white/90 font-medium text-lg">
              <span className="mr-3 text-2xl">{user?.avatar || '👋'}</span>
              Welcome back, {user?.username || 'friend'}
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/profile')}
                className="btn-ghost"
              >
                Profile
              </button>
              <button
                onClick={() => navigate('/music')}
                className="btn-ghost"
              >
                Music
              </button>
              <button
                onClick={() => navigate('/users')}
                className="btn-ghost"
              >
                Community
              </button>
              <button
                onClick={logout}
                className="btn-secondary"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto p-6 pt-12">
        {/* Welcome Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black mb-6">
            <span className="holographic-text">Your Dashboard</span>
          </h1>
          <p className="text-2xl text-neutral-300 max-w-3xl mx-auto">
            Monitor your energy, track your growth, connect with your community
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Current Vibe Card */}
          <div className="lg:col-span-1">
            <div className="glass-card h-full p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-8">Current Vibe</h2>
                
                {currentVibe ? (
                  <div className="space-y-6">
                    <div className="text-8xl mb-6 animate-float">{currentVibe.emoji}</div>
                    <h3 className="text-3xl font-bold gradient-text mb-4">{currentVibe.vibe}</h3>
                    
                    <div className="space-y-4">
                      <div className="glass-card p-4">
                        <div className="text-3xl font-bold text-primary-400 mb-2">{currentVibe.score}/50</div>
                        <div className="text-neutral-400 text-sm">Vibe Score</div>
                      </div>
                      
                      <div className="text-neutral-400 text-sm">
                        Last updated: {new Date(currentVibe.updated_at).toLocaleDateString()}
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('/quiz')}
                      className="btn-primary w-full mb-4"
                    >
                      Retake Quiz
                    </button>
                    
                    {/* Quick Music Access */}
                    {lastPlaylist && (
                      <div className="glass-card p-4 mt-4">
                        <div className="text-sm text-neutral-400 mb-2">🎵 Last Playlist:</div>
                        <div className="text-white font-semibold text-sm mb-2">
                          "{lastPlaylist.name}"
                        </div>
                        <button
                          onClick={() => setShowMusic(true)}
                          className="btn-ghost w-full text-sm py-2"
                        >
                          Get New Music
                        </button>
                      </div>
                    )}
                    
                    {!lastPlaylist && (
                      <button
                        onClick={() => setShowMusic(true)}
                        className="btn-ghost w-full mt-4 text-sm py-2"
                      >
                        🎧 Get Music for This Vibe
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-8xl mb-6 animate-bounce">❓</div>
                    <h3 className="text-2xl font-bold text-white mb-4">No Vibe Detected</h3>
                    <p className="text-neutral-300 mb-6">Ready to discover your authentic energy?</p>
                    <button
                      onClick={() => navigate('/quiz')}
                      className="btn-primary w-full text-lg py-4"
                    >
                      Take the Quiz
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quiz CTA */}
          <div className="lg:col-span-2">
            <div className="glass-card h-full p-8 flex flex-col justify-center items-center text-center">
              <div className="text-8xl mb-8 animate-float">🎯</div>
              <h2 className="text-4xl font-black gradient-text mb-6">
                {currentVibe ? 'Feeling Different?' : 'Ready to Begin?'}
              </h2>
              <p className="text-xl text-neutral-300 mb-8 max-w-lg leading-relaxed">
                {currentVibe 
                  ? 'Your energy evolves every day. Update your vibe to reflect your current state.'
                  : 'Discover your authentic energy through our scientifically-designed personality assessment.'
                }
              </p>
              <button 
                onClick={() => navigate('/quiz')}
                className="btn-primary text-xl px-12 py-6"
              >
                {currentVibe ? 'Update My Vibe' : 'Start the Journey'}
              </button>
            </div>
          </div>
        </div>

        {/* Music Section */}
        {showMusic && currentVibe && (
          <div className="mb-16">
            <VibeMusic 
              vibeScore={currentVibe.score}
              vibeName={currentVibe.vibe}
              onPlaylistSelect={(playlist, action) => {
                // Save last playlist for this vibe
                localStorage.setItem(`lastPlaylist_${currentVibe.vibe}`, JSON.stringify(playlist))
                setLastPlaylist(playlist)
                
                if (action === 'opened') {
                  // Optional: Show success message
                  console.log('Opened playlist:', playlist.name)
                }
              }}
            />
            
            <div className="text-center mt-6">
              <button
                onClick={() => setShowMusic(false)}
                className="btn-ghost text-sm"
              >
                Hide Music ↑
              </button>
            </div>
          </div>
        )}

        {/* Starred Users Section */}
        <div className="glass-card p-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black gradient-text mb-4 flex items-center justify-center">
              <span className="mr-4 text-5xl animate-pulse">⭐</span>
              Your Community
            </h2>
            <p className="text-xl text-neutral-300">Stay connected with the vibes that matter</p>
          </div>

          {starredUsers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {starredUsers.map((starredUser) => {
                const userVibe = starredUser.current_vibes?.[0]
                const vibeInfo = userVibe ? getVibeFromScore(userVibe.score) : null
                
                return (
                  <div 
                    key={starredUser.starred_user_id} 
                    className="glass-card p-6 text-center group hover:opacity-90 transition-all duration-300"
                  >
                    <div className="text-4xl mb-4 group-hover:animate-bounce transition-all duration-300">
                      {starredUser.users.avatar}
                    </div>
                    <h4 className="font-bold text-white text-lg mb-4">{starredUser.users.username}</h4>
                    
                    {vibeInfo ? (
                      <div className="space-y-3">
                        <div className="text-3xl">{vibeInfo.emoji}</div>
                        <div className="text-primary-400 font-semibold">{vibeInfo.vibe}</div>
                        <div className="text-neutral-400 text-sm">
                          Score: {userVibe.score}/50
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="text-3xl opacity-50">❓</div>
                        <span className="text-neutral-400 text-sm">No vibe yet</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-8xl mb-8 animate-bounce">👥</div>
              <h3 className="text-3xl font-bold text-white mb-6">No Friends Starred Yet</h3>
              <p className="text-xl text-neutral-300 mb-8 max-w-md mx-auto leading-relaxed">
                Discover amazing people in the community and follow their vibe journey
              </p>
              <button 
                onClick={() => navigate('/users')}
                className="btn-primary text-lg px-8 py-4"
              >
                Explore Community
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage

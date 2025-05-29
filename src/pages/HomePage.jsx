import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { useAuth } from '../hooks/useAuth'
import { getCurrentVibe, getStarredUsers } from '../lib/database'
import { getVibeFromScore } from '../lib/quiz'

const HomePage = () => {
  const [currentVibe, setCurrentVibe] = useState(null)
  const [starredUsers, setStarredUsers] = useState([])
  const [loading, setLoading] = useState(true)
  
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
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-black flex items-center justify-center">
        <div className="glass-card p-8 rounded-3xl">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 border-4 border-pink-400/30 border-t-pink-400 rounded-full animate-spin"></div>
            <div className="text-white text-xl font-bold">loading your authentic moment...</div>
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
            <div className="text-white/90 font-medium">
              hey {user?.username || 'friend'}! {user?.avatar || '👋'}
            </div>
            <Button onClick={() => navigate('/profile')} variant="ghost" className="text-white hover:text-pink-400 font-medium">
              profile
            </Button>
            <Button onClick={() => navigate('/users')} variant="ghost" className="text-white hover:text-cyan-400 font-medium">
              community
            </Button>
            <Button onClick={logout} className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold rounded-full px-4 py-2">
              peace out ✌️
            </Button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto p-6 pt-12">
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400 mb-4">
            your dashboard
          </h2>
          <p className="text-xl text-white/80 font-medium">
            time to check your authentic energy friend ✨
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current Vibe Card */}
          <div className="lg:col-span-1">
            <Card className="glass-card border-0 shadow-2xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-white">your current vibe</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                {currentVibe ? (
                  <div>
                    <div className="text-8xl mb-6 animate-bounce">{currentVibe.emoji}</div>
                    <h3 className="text-3xl font-bold text-white mb-4 gradient-text">{currentVibe.vibe}</h3>
                    <div className="bg-white/10 rounded-xl p-4 mb-4 backdrop-blur-sm">
                      <p className="text-white/90 text-lg mb-2">vibe score: <span className="font-bold text-cyan-400">{currentVibe.score}/50</span></p>
                      <p className="text-white/60 text-sm">
                        last vibe check: {new Date(currentVibe.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      onClick={() => navigate('/quiz')}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                      retake quiz ✨
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="text-8xl mb-6 animate-wiggle">❓</div>
                    <h3 className="text-2xl font-bold text-white mb-4">no vibe detected friend!</h3>
                    <p className="text-white/70 mb-6">time to take the quiz and find your energy ✨</p>
                    <Button
                      onClick={() => navigate('/quiz')}
                      className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-110 text-lg"
                    >
                      let's check my vibe! 🚀
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Take Quiz CTA */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-0 shadow-2xl h-full">
              <CardContent className="flex flex-col justify-center items-center h-full p-8 text-center">
                <div className="text-8xl mb-6 animate-float">🎯</div>
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-6">
                  {currentVibe ? 'feeling different?' : 'ready to discover yourself?'}
                </h2>
                <p className="text-white/80 text-xl mb-8 max-w-md leading-relaxed">
                  {currentVibe 
                    ? 'vibes change friend! retake the quiz to update your energy 💫'
                    : 'take our iconic 10-question quiz to find your current authentic energy ✨'
                  }
                </p>
                <Button 
                  onClick={() => navigate('/quiz')}
                  className="h-14 px-8 text-lg font-semibold bg-teal hover:bg-teal/90"
                >
                  {currentVibe ? 'Retake Quiz ✨' : 'Start Quiz ✨'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Starred Users Section */}
        <div className="mt-12">
          <Card className="glass-card border-0 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400 flex items-center justify-center">
                <span className="mr-3 text-4xl animate-wiggle">⭐</span>
                your friends' vibes
              </CardTitle>
              <p className="text-white/70 text-lg">check what energy your starred homies are bringing ✨</p>
            </CardHeader>
            <CardContent>
              {starredUsers.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {starredUsers.map((starredUser) => {
                    const userVibe = starredUser.current_vibes?.[0]
                    const vibeInfo = userVibe ? getVibeFromScore(userVibe.score) : null
                    
                    return (
                      <div key={starredUser.starred_user_id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-pink-400/50 transition-all duration-300 transform hover:scale-105">
                        <div className="text-center">
                          <div className="text-4xl mb-3 animate-float">{starredUser.users.avatar}</div>
                          <h4 className="font-bold text-white text-lg mb-2">{starredUser.users.username}</h4>
                          {vibeInfo ? (
                            <div className="space-y-2">
                              <div className="text-3xl animate-bounce">{vibeInfo.emoji}</div>
                              <div className="text-cyan-400 font-semibold">{vibeInfo.vibe}</div>
                              <div className="text-white/60 text-sm">
                                score: {userVibe.score}/50
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div className="text-3xl animate-pulse">❓</div>
                              <span className="text-white/60 text-sm">no vibe yet friend!</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-8xl mb-6 animate-wiggle">👥</div>
                  <h3 className="text-2xl font-bold text-white mb-4">no friends starred yet!</h3>
                  <p className="text-white/70 mb-8 text-lg">go find some iconic people to follow their vibes 💫</p>
                  <Button 
                    onClick={() => navigate('/users')}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-110"
                  >
                    explore the community ✨
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default HomePage

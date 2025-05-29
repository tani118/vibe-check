import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'

const LandingPage = () => {
  const navigate = useNavigate()
  const [currentVibe, setCurrentVibe] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  // Generate stable random values for background elements
  const [backgroundElements] = useState(() => 
    Array.from({ length: 20 }).map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: Math.random() * 100 + 20,
      height: Math.random() * 100 + 20,
      color: ['#08D9D6', '#FF2E63', '#FFD700', '#FF69B4'][Math.floor(Math.random() * 4)],
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2
    }))
  )

  // Generate stable random values for final CTA section background
  const [finalCTAElements] = useState(() => 
    Array.from({ length: 15 }).map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: Math.random() * 60 + 20,
      height: Math.random() * 60 + 20,
      delay: Math.random() * 2,
      duration: Math.random() * 4 + 2
    }))
  )

  const vibes = ['✨ Absolutely Radiant', '😄 Super Positive', '😊 Pretty Good', '🙂 Decent', '😐 Neutral', '😕 Meh', '😞 Not Great', '😢 Pretty Low', '😭 Rock Bottom']

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVibe((prev) => (prev + 1) % vibes.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-black overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 overflow-hidden">
        {/* Animated background elements with parallax */}
        <div 
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          {backgroundElements.map((element, i) => (
            <div
              key={i}
              className={`absolute rounded-full animate-pulse`}
              style={{
                left: `${element.left}%`,
                top: `${element.top}%`,
                width: `${element.width}px`,
                height: `${element.height}px`,
                background: `radial-gradient(circle, ${element.color}40, transparent)`,
                animationDelay: `${element.delay}s`,
                animationDuration: `${element.duration}s`
              }}
            />
          ))}
        </div>

        {/* Floating emojis with parallax scroll animations */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-20 left-[10%] text-6xl animate-float"
            style={{ transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.1}deg)` }}
          >🔥</div>
          <div 
            className="absolute top-32 right-[15%] text-5xl animate-bounce"
            style={{ transform: `translateY(${scrollY * -0.15}px) rotate(${scrollY * -0.05}deg)` }}
          >⚡</div>
          <div 
            className="absolute top-64 left-[20%] text-4xl animate-pulse"
            style={{ transform: `translateY(${scrollY * 0.08}px) rotate(${scrollY * 0.08}deg)` }}
          >💎</div>
          <div 
            className="absolute top-80 right-[25%] text-6xl animate-float"
            style={{ transform: `translateY(${scrollY * -0.12}px) rotate(${scrollY * -0.1}deg)` }}
          >🌈</div>
          <div 
            className="absolute bottom-40 left-[15%] text-5xl animate-bounce"
            style={{ transform: `translateY(${scrollY * 0.2}px) rotate(${scrollY * 0.05}deg)` }}
          >⭐</div>
          <div 
            className="absolute bottom-60 right-[20%] text-4xl animate-pulse"
            style={{ transform: `translateY(${scrollY * -0.18}px) rotate(${scrollY * -0.08}deg)` }}
          >🦋</div>
          <div 
            className="absolute top-40 left-[80%] text-5xl animate-float"
            style={{ transform: `translateY(${scrollY * 0.14}px) rotate(${scrollY * 0.12}deg)` }}
          >✨</div>
          <div 
            className="absolute bottom-32 left-[70%] text-6xl animate-bounce"
            style={{ transform: `translateY(${scrollY * -0.1}px) rotate(${scrollY * -0.06}deg)` }}
          >🌙</div>
        </div>

        <div 
          className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center"
          style={{ transform: `translateY(${scrollY * -0.3}px)` }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Main headline with glitch effect */}
            <div className="mb-8">
              <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mb-4 tracking-tight filter drop-shadow-lg">
                vibe check
              </h1>
              <div className="text-2xl md:text-3xl font-bold text-white mb-6">
                what's your energy rn? 
                <span className="inline-block animate-pulse ml-2">📱</span>
              </div>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
                fr no cap this quiz hits different 💯 find out if you're bringing authentic energy or if you need to touch grass
              </p>
            </div>

            {/* Rotating vibe display */}
            <div className="mb-12">
              <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 border border-white/20 max-w-md mx-auto">
                <p className="text-white/80 mb-4 text-lg">current vibe rotation:</p>
                <div className="text-3xl font-bold text-white transition-all duration-500">
                  {vibes[currentVibe]}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-6">
              <Button 
                onClick={() => navigate('/signup')}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xl px-12 py-6 h-auto font-bold rounded-full shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-110 border-2 border-white/20"
              >
                let's gooo friend 🚀
              </Button>
              <div className="text-white/80 text-lg">
                already vibing with us?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-pink-400 font-bold underline decoration-2 underline-offset-4 hover:text-pink-300 transition-colors"
                >
                  log in here ✨
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-ping"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-black via-purple-950 to-black relative">
        <div 
          className="max-w-7xl mx-auto px-6"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-6">
              why it's iconic
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              fr this app is literally the moment 💯
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                emoji: "🧠",
                title: "big brain energy",
                desc: "10 questions that actually slap and reveal your whole personality tbh",
                color: "from-blue-500 to-cyan-500"
              },
              {
                emoji: "👥",
                title: "community vibes",
                desc: "stalk other people's energy (in a wholesome way) and star your faves",
                color: "from-pink-500 to-purple-500"
              },
              {
                emoji: "📈",
                title: "glow up tracker",
                desc: "watch your character development arc with mood history tracking",
                color: "from-orange-500 to-red-500"
              }
            ].map((feature, i) => (
              <div key={i} className="group relative">
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                  <div className="text-6xl mb-6 group-hover:animate-bounce">{feature.emoji}</div>
                  <h3 className={`text-2xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent mb-4`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{feature.desc}</p>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity duration-500 -z-10 blur-xl`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vibe Categories Preview */}
      <section className="py-20 bg-gradient-to-br from-purple-950 via-black to-pink-950">
        <div 
          className="max-w-6xl mx-auto px-6"
          style={{ transform: `translateY(${scrollY * -0.05}px)` }}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-6">
              all the vibes
            </h2>
            <p className="text-xl text-gray-300">
              from absolute fam energy to touch grass mode 💀
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {vibes.map((vibe, i) => (
              <div key={i} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-105 text-center">
                <div className="text-2xl font-bold text-white">{vibe}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-20 bg-gradient-to-br from-black via-pink-950 to-black">
        <div 
          className="max-w-6xl mx-auto px-6"
          style={{ transform: `translateY(${scrollY * -0.08}px)` }}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-6">
              the reviews are in
            </h2>
            <p className="text-xl text-gray-300">
              and they're absolutely sending me 💀
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                text: "literally obsessed this app knows me better than my therapist 😭",
                author: "authentic energy alex",
                vibe: "✨ Absolutely Radiant"
              },
              {
                text: "caught me at my lowest and now i'm on my glow up arc thank u vibe check ✨",
                author: "self improvement legend",
                vibe: "🔥 Super Positive"
              },
              {
                text: "the way this app called me out for my chaotic neutral energy... felt seen",
                author: "chronically online alex",
                vibe: "😐 Neutral"
              },
              {
                text: "my whole friend group is using this now we're basically a vibe cult",
                author: "group chat admin",
                vibe: "😊 Pretty Good"
              }
            ].map((review, i) => (
              <div key={i} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <p className="text-lg text-white mb-6 leading-relaxed italic">"{review.text}"</p>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-pink-400">@{review.author}</div>
                    <div className="text-sm text-gray-400">current vibe: {review.vibe}</div>
                  </div>
                  <div className="text-2xl">💯</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 relative overflow-hidden">
        <div className="absolute inset-0">
          {finalCTAElements.map((element, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${element.left}%`,
                top: `${element.top}%`,
                width: `${element.width}px`,
                height: `${element.height}px`,
                background: `radial-gradient(circle, #08D9D680, transparent)`,
                animationDelay: `${element.delay}s`,
                animationDuration: `${element.duration}s`
              }}
            />
          ))}
        </div>

        <div 
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
          style={{ transform: `translateY(${scrollY * -0.2}px)` }}
        >
          <h2 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-pink-200 mb-8">
            ready to vibe?
          </h2>
          <p className="text-2xl text-white/90 mb-12 font-medium">
            your authentic moment starts now friend ✨
          </p>
          
          <div className="space-y-6">
            <Button 
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white text-2xl px-16 py-8 h-auto font-black rounded-full shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-110 border-4 border-white/30 animate-pulse"
            >
              let's start fr ✨
            </Button>
            <div className="text-lg text-white/80">
              it's giving free energy, no cap 🧢
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage

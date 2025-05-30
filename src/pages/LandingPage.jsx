import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'

const LandingPage = () => {
  const navigate = useNavigate()
  const [currentVibe, setCurrentVibe] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

  // Generate stable random values for floating particles
  const [particles] = useState(() => 
    Array.from({ length: 50 }).map((_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 2 + 0.5,
      color: ['var(--primary-400)', 'var(--secondary-400)', 'var(--accent-400)', 'var(--primary-300)'][Math.floor(Math.random() * 4)],
      delay: Math.random() * 2
    }))
  )

  // Generate stable random values for grid pattern
  const [gridElements] = useState(() => 
    Array.from({ length: 100 }).map((_, i) => ({
      opacity: Math.random() * 0.3,
      delay: Math.random() * 3
    }))
  )

  const vibes = [
    '✨ Absolutely Radiant', 
    '🔥 Super Positive', 
    '😊 Pretty Good', 
    '🙂 Decent', 
    '😐 Neutral', 
    '😕 Meh', 
    '😞 Not Great', 
    '😢 Pretty Low', 
    '💀 Rock Bottom'
  ]

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVibe((prev) => (prev + 1) % vibes.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen bg-neutral-950 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950/50 via-secondary-950/30 to-accent-950/50"></div>
        <div 
          className="grid grid-cols-20 grid-rows-20 w-full h-full"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
          }}
        >
          {gridElements.map((element, i) => (
            <div
              key={i}
              className="border border-primary-500/20 animate-pulse"
              style={{
                opacity: element.opacity,
                animationDelay: `${element.delay}s`,
                animationDuration: '4s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float-slow"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.speed + 8}s`,
              transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 md:p-8">
        <div className="text-2xl md:text-3xl font-bold holographic-text">
          VibeCheck
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="btn-ghost"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="btn-primary"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div 
          className="max-w-6xl mx-auto text-center"
          style={{
            transform: `translateY(${scrollY * -0.3}px) translateX(${mousePosition.x * 0.5}px)`
          }}
        >
          {/* Main Headlines */}
          <div className="space-y-8 mb-12">
            <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-black tracking-tighter">
              <span className="holographic-text block leading-none">vibe</span>
              <span className="gradient-text block leading-none">check</span>
            </h1>
            
            <div className="space-y-4">
              <p className="text-2xl md:text-4xl font-bold text-white/90">
                discover your authentic energy ✨
              </p>
              <p className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
                An AI-powered personality quiz that reveals your true vibe through smart questions and beautiful insights
              </p>
            </div>
          </div>

          {/* Dynamic Vibe Display */}
          <div className="mb-16">
            <div className="glass-card p-8 max-w-md mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 animate-pulse"></div>
              <div className="relative z-10">
                <p className="text-neutral-400 text-sm uppercase tracking-wider mb-4">Current Vibe</p>
                <div className="text-2xl md:text-3xl font-bold text-white transition-all duration-700 transform">
                  {vibes[currentVibe]}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-6">
            <button
              onClick={() => navigate('/signup')}
              className="btn-primary text-xl px-12 py-6 group"
            >
              <span className="flex items-center gap-3">
                Start Your Journey
                <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                </svg>
              </span>
            </button>
            
            <p className="text-neutral-400">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-primary-400 font-semibold hover:text-primary-300 transition-colors underline decoration-2 underline-offset-4"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-primary-400 to-transparent rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div 
            className="text-center mb-20"
            style={{ transform: `translateY(${scrollY * -0.1}px)` }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              <span className="gradient-text">Why VibeCheck</span>
            </h2>
            <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto">
              More than just a quiz – it's your personal energy ecosystem
            </p>
          </div>

          <div 
            className="grid md:grid-cols-3 gap-8"
            style={{ transform: `translateY(${scrollY * -0.05}px)` }}
          >
            {[
              {
                icon: "🧠",
                title: "Intelligent Analysis",
                description: "Advanced algorithms analyze your responses to provide deep personality insights",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: "👥",
                title: "Community Connection",
                description: "Connect with others who share your vibe and discover new perspectives",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: "📈",
                title: "Growth Tracking",
                description: "Monitor your emotional journey and celebrate your personal evolution",
                color: "from-orange-500 to-red-500"
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="group relative"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="glass-card p-8 h-full transition-all duration-500 group-hover:-translate-y-1">
                  <div className="text-6xl mb-6 group-hover:animate-bounce transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                    {feature.title}
                  </h3>
                  <p className="text-neutral-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-500 -z-10 blur-xl`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vibe Spectrum Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div 
            className="text-center mb-20"
            style={{ transform: `translateY(${scrollY * -0.08}px)` }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              <span className="holographic-text">The Vibe Spectrum</span>
            </h2>
            <p className="text-xl text-neutral-300">
              From absolute radiance to rock bottom – we map it all
            </p>
          </div>

          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            style={{ transform: `translateY(${scrollY * -0.06}px)` }}
          >
            {vibes.map((vibe, i) => (
              <div 
                key={i} 
                className="glass-card p-6 text-center group hover:opacity-90 transition-all duration-300"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-xl font-bold text-white group-hover:holographic-text transition-all duration-300">
                  {vibe}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div 
            className="text-center mb-20"
            style={{ transform: `translateY(${scrollY * -0.07}px)` }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              <span className="gradient-text">Real Stories</span>
            </h2>
            <p className="text-xl text-neutral-300">
              Authentic experiences from our community
            </p>
          </div>

          <div 
            className="grid md:grid-cols-2 gap-8"
            style={{ transform: `translateY(${scrollY * -0.05}px)` }}
          >
            {[
              {
                text: "VibeCheck helped me understand my emotional patterns in ways I never imagined. It's like having a personal therapist in your pocket.",
                author: "Lakshya Bhutani",
                title: "Student and Creator@VibeCheck",
                vibe: "✨ Absolutely Radiant"
              },
              {
                text: "The community aspect is incredible. I've connected with people who truly get my energy and it's transformed my social life.",
                author: "Parth Sharma",
                title: "Student", 
                vibe: "🔥 Super Positive"
              },
              {
                text: "Tracking my vibes over time showed me patterns I was completely unaware of. It's been a game-changer for my mental health.",
                author: "Adit Vatsal Srivastava",
                title: "Student",
                vibe: "😊 Pretty Good"
              },
              {
                text: "The quiz questions are so thoughtful and the insights are spot-on. It's like it sees right through to my core.",
                author: "Raghav Sharma",
                title: "Student",
                vibe: "🙂 Decent"
              }
            ].map((testimonial, i) => (
              <div 
                key={i} 
                className="glass-card p-8 space-y-6"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <p className="text-lg text-neutral-200 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{testimonial.author}</div>
                    <div className="text-sm text-neutral-400">{testimonial.title}</div>
                    <div className="text-sm text-primary-400 mt-1">Current vibe: {testimonial.vibe}</div>
                  </div>
                  <div className="text-3xl">✨</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className="space-y-12"
            style={{ transform: `translateY(${scrollY * -0.1}px)` }}
          >
            <h2 className="text-6xl md:text-8xl font-black">
              <span className="holographic-text block mb-4">Ready to</span>
              <span className="gradient-text">Discover You?</span>
            </h2>
            
            <p className="text-2xl md:text-3xl text-neutral-300 font-light">
              Your authentic journey begins with a single click
            </p>

            <div className="space-y-8">
              <button
                onClick={() => navigate('/signup')}
                className="btn-primary text-2xl px-16 py-8 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-4">
                  Start Your VibeCheck
                  <svg className="w-8 h-8 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </button>
              
              <p className="text-lg text-neutral-400">
                Free forever • No spam
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-2xl font-bold holographic-text mb-4 md:mb-0">
              VibeCheck
            </div>
            <div className="flex gap-8 text-neutral-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

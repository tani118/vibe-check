import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMousePosition } from '../hooks/useAnimations'

const NotFoundPage = () => {
  const mousePosition = useMousePosition()
  const [floatingElements] = useState(() =>
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 100 + 50,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
    }))
  )

  return (
    <div className="min-h-screen cosmic-bg relative overflow-hidden flex items-center justify-center">
      {/* Background Elements */}
      {floatingElements.map((element) => (
        <div
          key={element.id}
          className="absolute rounded-full bg-white/5 backdrop-blur-sm animate-particle-float"
          style={{
            width: `${element.size}px`,
            height: `${element.size}px`,
            left: `${element.left}%`,
            top: `${element.top}%`,
            animationDelay: `${element.delay}s`,
            animationDuration: `${element.duration}s`,
          }}
        />
      ))}

      {/* Interactive Mouse Follow Element */}
      <div
        className="fixed w-96 h-96 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl pointer-events-none"
        style={{
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
          transition: 'all 0.3s ease-out',
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-[12rem] md:text-[16rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent opacity-20 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 text-[12rem] md:text-[16rem] font-bold holographic-text leading-none animate-holographic">
            404
          </div>
        </div>

        {/* Main Content */}
        <div className="glass-card p-8 md:p-12 rounded-3xl backdrop-blur-xl border border-white/20 mb-8">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-text-shimmer">
            Vibe Not Found
          </h2>
          <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
            Looks like this page went on a vibe check and never came back! 
            <br className="hidden md:block" />
            Don't worry, we'll help you find your way.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/" className="btn-primary text-lg px-8 py-4 rounded-xl hover:opacity-90 transition-all duration-300">
              Return to Landing
            </Link>
            <Link to="/home" className="btn-secondary text-lg px-8 py-4 rounded-xl hover:opacity-90 transition-all duration-300">
              Go to Dashboard
            </Link>
          </div>
        </div>

        {/* Fun Vibe Elements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="glass-subtle p-6 rounded-2xl hover:glass-vibrant transition-all duration-300 group">
            <div className="text-4xl mb-4 group-hover:animate-bounce">🌟</div>
            <h3 className="text-lg font-semibold text-white mb-2">Lost Your Vibe?</h3>
            <p className="text-white/70 text-sm">Take a quiz to rediscover it!</p>
          </div>

          <div className="glass-subtle p-6 rounded-2xl hover:glass-vibrant transition-all duration-300 group">
            <div className="text-4xl mb-4 group-hover:animate-spin">🔮</div>
            <h3 className="text-lg font-semibold text-white mb-2">Check Your Vibe</h3>
            <p className="text-white/70 text-sm">See what others are vibing with!</p>
          </div>

          <div className="glass-subtle p-6 rounded-2xl hover:glass-vibrant transition-all duration-300 group">
            <div className="text-4xl mb-4 group-hover:animate-pulse">✨</div>
            <h3 className="text-lg font-semibold text-white mb-2">Share Your Vibe</h3>
            <p className="text-white/70 text-sm">Connect with like-minded souls!</p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full animate-pulse-glow" />
        <div className="absolute top-20 right-20 w-16 h-16 border border-primary/30 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-full animate-bounce" />
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-accent/20 rounded-full animate-pulse" />
      </div>
    </div>
  )
}

export default NotFoundPage

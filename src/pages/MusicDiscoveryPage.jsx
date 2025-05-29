import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import VibeMusic from '../components/VibeMusic'
import { musicService } from '../lib/musicService'
import { getVibeFromScore } from '../lib/quiz'

const MusicDiscoveryPage = () => {
  const [selectedVibe, setSelectedVibe] = useState('Super Positive')
  const [backgroundElements] = useState(() => 
    Array.from({ length: 20 }).map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: Math.random() * 50 + 15,
      height: Math.random() * 50 + 15,
      color: ['#08D9D640', '#FF2E6340', '#FFD70040', '#9D4EDD40'][Math.floor(Math.random() * 4)],
      delay: Math.random() * 3,
      duration: Math.random() * 4 + 2
    }))
  )
  
  const navigate = useNavigate()
  
  const vibeCategories = musicService.getAllVibeCategories()
  
  // Create vibe score mapping for display
  const vibeScoreMapping = {
    'Absolutely Radiant': 45,
    'Super Positive': 35,
    'Pretty Good': 20,
    'Decent': 5,
    'Neutral': -5,
    'Meh': -20,
    'Not Great': -30,
    'Pretty Low': -40,
    'Rock Bottom': -48
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
              onClick={() => navigate('/users')}
              className="btn-ghost"
            >
              Community
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
            <span className="holographic-text">Music Discovery</span>
          </h1>
          <p className="text-2xl text-neutral-300 max-w-3xl mx-auto">
            Explore playlists for every vibe and emotional state
          </p>
        </div>

        {/* Vibe Selector */}
        <div className="glass-card p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black gradient-text mb-4 flex items-center justify-center">
              <span className="mr-4 text-5xl">🎭</span>
              Choose Your Vibe
            </h2>
            <p className="text-xl text-neutral-300">
              Discover music that matches any emotional state
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {vibeCategories.map((vibe) => {
              const vibeScore = vibeScoreMapping[vibe] || 0
              const vibeInfo = getVibeFromScore(vibeScore)
              const isSelected = selectedVibe === vibe
              
              return (
                <button
                  key={vibe}
                  onClick={() => setSelectedVibe(vibe)}
                  className={`glass-card p-6 text-center transition-all duration-300 hover:opacity-90 ${
                    isSelected 
                      ? 'border-primary-400 bg-primary-400/20 scale-105' 
                      : 'border-white/20 hover:border-primary-400/50'
                  }`}
                >
                  <div className={`text-4xl mb-3 ${isSelected ? 'animate-bounce' : ''}`}>
                    {vibeInfo.emoji}
                  </div>
                  <div className={`font-bold text-sm ${
                    isSelected ? 'text-primary-300' : 'text-white'
                  }`}>
                    {vibe}
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">
                    {vibeScore > 0 ? '+' : ''}{vibeScore} energy
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Music Component */}
        <div className="mb-16">
          <VibeMusic 
            vibeScore={vibeScoreMapping[selectedVibe] || 0}
            vibeName={selectedVibe}
            onPlaylistSelect={(playlist, action) => {
              console.log('Music Discovery - Playlist interaction:', playlist.name, action)
              
              // Track discovery interactions
              if (action === 'like') {
                const discoveryLikes = JSON.parse(localStorage.getItem('discoveryLikes') || '[]')
                discoveryLikes.push({
                  vibe: selectedVibe,
                  playlist: playlist.name,
                  timestamp: new Date().toISOString()
                })
                localStorage.setItem('discoveryLikes', JSON.stringify(discoveryLikes))
              }
            }}
          />
        </div>

        {/* Exploration Stats */}
        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black gradient-text mb-4 flex items-center justify-center">
              <span className="mr-4 text-5xl">📊</span>
              Your Music Journey
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 glass-card">
              <div className="text-4xl font-black text-primary-400 mb-4">
                {vibeCategories.length}
              </div>
              <div className="text-white font-bold text-lg mb-2">Vibe Categories</div>
              <div className="text-neutral-400 text-sm">Different moods to explore</div>
            </div>
            
            <div className="text-center p-6 glass-card">
              <div className="text-4xl font-black text-secondary-400 mb-4">
                {vibeCategories.reduce((total, vibe) => total + musicService.getPlaylistsForVibe(vibe).length, 0)}
              </div>
              <div className="text-white font-bold text-lg mb-2">Total Playlists</div>
              <div className="text-neutral-400 text-sm">Curated music collections</div>
            </div>
            
            <div className="text-center p-6 glass-card">
              <div className="text-4xl font-black text-accent-400 mb-4">
                {JSON.parse(localStorage.getItem('discoveryLikes') || '[]').length}
              </div>
              <div className="text-white font-bold text-lg mb-2">Discoveries Loved</div>
              <div className="text-neutral-400 text-sm">Your favorite finds</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="glass-card p-12">
            <div className="text-6xl mb-6 animate-float">🎯</div>
            <h2 className="text-4xl font-black gradient-text mb-6">
              Ready to Check Your Real Vibe?
            </h2>
            <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover what music perfectly matches your authentic emotional state right now
            </p>
            <button 
              onClick={() => navigate('/quiz')}
              className="btn-primary text-xl px-12 py-6"
            >
              Take the Vibe Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MusicDiscoveryPage

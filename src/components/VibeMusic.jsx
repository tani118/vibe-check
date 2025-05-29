import React, { useState, useEffect } from 'react'
import { musicService } from '../lib/musicService'
import { togglePlaylistLove, isPlaylistLoved } from '../lib/database'
import { useAuth } from '../hooks/useAuth'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const VibeMusic = ({ vibeScore, vibeName, onPlaylistSelect }) => {
  const [currentPlaylist, setCurrentPlaylist] = useState(null)
  const [allPlaylists, setAllPlaylists] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [userInteractions, setUserInteractions] = useState({})
  const [isPlaylistLovedState, setIsPlaylistLovedState] = useState(false)
  const [lovingPlaylist, setLovingPlaylist] = useState(false)
  
  const { user } = useAuth()

  useEffect(() => {
    if (vibeName) {
      loadPlaylistsForVibe()
    }
  }, [vibeName])

  useEffect(() => {
    if (currentPlaylist && user) {
      checkIfPlaylistIsLoved()
    }
  }, [currentPlaylist, user])

  const loadPlaylistsForVibe = () => {
    const playlists = musicService.getPlaylistsForVibe(vibeName)
    setAllPlaylists(playlists)
    setImageError(false) // Reset image error state
    setImageLoading(true) // Reset image loading state
    
    // Get a random playlist for initial selection
    const randomPlaylist = musicService.getRandomPlaylistForVibe(vibeName)
    setCurrentPlaylist(randomPlaylist)
  }

  const checkIfPlaylistIsLoved = async () => {
    if (!user || !currentPlaylist) return
    
    try {
      const result = await isPlaylistLoved(user.id, currentPlaylist.id)
      if (result.success) {
        setIsPlaylistLovedState(result.isLoved)
      }
    } catch (error) {
      console.error('Error checking if playlist is loved:', error)
    }
  }

  const getAnotherPlaylist = () => {
    setIsLoading(true)
    setImageError(false) // Reset image error state
    setImageLoading(true) // Reset image loading state
    setIsPlaylistLovedState(false) // Reset loved state
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      const newPlaylist = musicService.getRandomPlaylistForVibe(vibeName)
      setCurrentPlaylist(newPlaylist)
      setIsLoading(false)
    }, 800)
  }

  const handlePlaylistAction = async (action) => {
    if (!currentPlaylist) return
    
    if (action === 'like' && user) {
      setLovingPlaylist(true)
      try {
        const result = await togglePlaylistLove(user.id, currentPlaylist, vibeName)
        if (result.success) {
          setIsPlaylistLovedState(!isPlaylistLovedState)
          // Update local state for UI feedback
          setUserInteractions(prev => ({
            ...prev,
            [currentPlaylist.id]: isPlaylistLovedState ? 'unloved' : 'loved'
          }))
        } else {
          console.error('Error toggling playlist love:', result.error)
        }
      } catch (error) {
        console.error('Error loving playlist:', error)
      } finally {
        setLovingPlaylist(false)
      }
    } else {
      // Track other interactions locally (for non-authenticated users or other actions)
      musicService.trackPlaylistInteraction(currentPlaylist.id, vibeName, action)
      
      setUserInteractions(prev => ({
        ...prev,
        [currentPlaylist.id]: action
      }))
    }
    
    if (onPlaylistSelect) {
      onPlaylistSelect(currentPlaylist, action)
    }
  }

  const openInSpotify = () => {
    if (currentPlaylist) {
      window.open(musicService.getSpotifyPlaylistUrl(currentPlaylist.id), '_blank')
      handlePlaylistAction('opened')
    }
  }

  if (!vibeName || allPlaylists.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="text-6xl mb-4 opacity-50">🎵</div>
        <p className="text-neutral-400">No music recommendations available for this vibe</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-black gradient-text mb-4 flex items-center justify-center">
          <span className="mr-4 text-5xl animate-pulse">🎵</span>
          Musical Vibe Journey
        </h2>
        <p className="text-xl text-neutral-300">
          Let music amplify your <span className="text-primary-400 font-semibold">{vibeName}</span> energy
        </p>
      </div>

      {/* Current Playlist Display */}
      <Card className="glass-card border-primary-500/20">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl text-white mb-2">
            🎶 Your Vibe Soundtrack
          </CardTitle>
          <p className="text-neutral-300">
            Today's pick for "<span className="text-primary-400 font-semibold">{vibeName}</span>" vibes:
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="relative mx-auto w-20 h-20 mb-6">
                <div className="w-20 h-20 border-4 border-primary-500/30 border-t-primary-400 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-20 h-20 border-4 border-secondary-500/20 border-b-secondary-400 rounded-full animate-spin animate-reverse"></div>
              </div>
              <p className="text-neutral-300 animate-pulse">Finding your perfect vibe...</p>
            </div>
          ) : currentPlaylist ? (
            <>
              {/* Playlist Info */}
              <div className="text-center space-y-4">
                <div className="w-32 h-32 mx-auto rounded-xl overflow-hidden shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all duration-300 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500">
                  {imageError ? (
                    <img 
                      src={musicService.generateFallbackImage(currentPlaylist.name, vibeName)}
                      alt={currentPlaylist.name}
                      className="w-full h-full object-cover"
                    />
                  ) : imageLoading ? (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <div className="text-center">
                        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-2"></div>
                        <div className="text-xs font-semibold opacity-80">LOADING</div>
                      </div>
                    </div>
                  ) : (
                    <img 
                      src={currentPlaylist.image} 
                      alt={currentPlaylist.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        console.log('Image failed to load:', currentPlaylist.image)
                        setImageError(true)
                        setImageLoading(false)
                      }}
                      onLoad={() => {
                        console.log('Image loaded successfully:', currentPlaylist.image)
                        setImageLoading(false)
                      }}
                    />
                  )}
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {currentPlaylist.name}
                  </h3>
                  <p className="text-neutral-300 text-sm leading-relaxed max-w-md mx-auto">
                    {currentPlaylist.description}
                  </p>
                </div>

                {/* Spotify Embed */}
                <div className="w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src={musicService.getSpotifyEmbedUrl(currentPlaylist.id)}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
                    className="rounded-xl"
                    title={`Spotify playlist: ${currentPlaylist.name}`}
                  ></iframe>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  onClick={openInSpotify}
                  className="btn-primary flex items-center space-x-2 px-6 py-3"
                >
                  <span>🎧</span>
                  <span>Open in Spotify</span>
                </Button>
                
                <Button
                  onClick={getAnotherPlaylist}
                  className="btn-secondary flex items-center space-x-2 px-6 py-3"
                >
                  <span>🔄</span>
                  <span>Try Another</span>
                </Button>
                
                <Button
                  onClick={() => handlePlaylistAction('like')}
                  disabled={lovingPlaylist || !user}
                  className={`btn-ghost flex items-center space-x-2 px-6 py-3 ${
                    isPlaylistLovedState 
                      ? 'text-red-400 bg-red-500/20' 
                      : 'hover:text-red-400'
                  } ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {lovingPlaylist ? (
                    <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin"></div>
                  ) : (
                    <span>{isPlaylistLovedState ? '❤️' : '♡'}</span>
                  )}
                  <span>{isPlaylistLovedState ? 'Loved' : 'Love This'}</span>
                </Button>
              </div>

              {/* Feedback */}
              {(userInteractions[currentPlaylist.id] || isPlaylistLovedState) && (
                <div className="text-center">
                  <div className="inline-flex items-center space-x-2 bg-primary-500/20 text-primary-300 px-4 py-2 rounded-full text-sm">
                    <span>✨</span>
                    <span>
                      {isPlaylistLovedState 
                        ? 'Saved to your loved playlists!' 
                        : userInteractions[currentPlaylist.id] === 'loved'
                        ? 'Added to your collection!'
                        : userInteractions[currentPlaylist.id] === 'unloved'
                        ? 'Removed from your collection'
                        : 'Thanks for the feedback!'}
                    </span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-4 opacity-50">🎵</div>
              <p className="text-neutral-400">No playlist found for this vibe</p>
              <Button 
                onClick={loadPlaylistsForVibe} 
                className="btn-primary mt-4"
              >
                Try Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Discovery Section */}
      <div className="glass-card p-6">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center justify-center">
            <span className="mr-2">🌟</span>
            More Vibes Available
          </h3>
          <p className="text-neutral-300 text-sm">
            We have <span className="text-primary-400 font-semibold">{allPlaylists.length}</span> playlists 
            curated for your "{vibeName}" mood
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {allPlaylists.slice(0, 3).map((playlist, index) => (
              <div 
                key={playlist.id}
                className="bg-white/5 text-white/70 px-3 py-1 rounded-full text-xs border border-white/10"
              >
                {playlist.name}
              </div>
            ))}
            {allPlaylists.length > 3 && (
              <div className="bg-primary-500/20 text-primary-300 px-3 py-1 rounded-full text-xs border border-primary-500/30">
                +{allPlaylists.length - 3} more
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VibeMusic

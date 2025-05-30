// Music Service for Vibe-Based Spotify Playlist Integration
export class MusicService {
  constructor() {
    this.vibePlaylistPools = {
      'Absolutely Radiant': [
        {
          id: '37i9dQZF1DX0XUsuxWHRQd',
          name: 'Happy Hits!',
          description: 'The happiest hits to make you smile, laugh, dance, and sing!',
          image: 'https://mosaic.scdn.co/300/ab67616d0000b273072c0dc66c1c00d1fbbcc48aab67616d0000b2737ea4cd62166ea08eb8a9ab67616d0000b273c8b444df094279e70d0ed856ab67616d0000b273ef0b4e66ef2baf36ac03d0'
        },
        {
          id: '37i9dQZF1DX3rxVfibe1L0',
          name: 'Mood Booster',
          description: 'Get happy with today\'s dose of feel-good songs.',
          image: 'https://i.scdn.co/image/ab67706f00000003e8c4b8b0456e09b0dc4b8333'
        },
        {
          id: '37i9dQZF1DX76Wlfdnj7AP',
          name: 'Beast Mode',
          description: 'Aggressive and in-your-face hip hop. Cover: Central Cee',
          image: 'https://i.scdn.co/image/ab67706f000000036c697fa3adc713b8ac3c9bfe'
        },
        {
          id: '37i9dQZF1DXdxcBWuJkbcy',
          name: 'Confidence Boost',
          description: 'Confidence is key. These songs will make you feel unstoppable.',
          image: 'https://mosaic.scdn.co/300/ab67616d0000b273031ff5c5b20cb2e088e42bb7ab67616d0000b2734e0362c225863f6dc2c19ab67616d0000b273508c8ab28ae76cfdc5e0b84fab67616d0000b273e559b39ad9a8ecbfa86e0'
        },
        {
          id: '37i9dQZF1DXcF6B6QPhFDv',
          name: 'Power Workout',
          description: 'Upbeat and energetic songs to power your workout',
          image: 'https://i.scdn.co/image/ab67706f00000003a9d2a5acd2ca7f76d08fb5b8'
        }
      ],
      
      'Super Positive': [
        {
          id: '37i9dQZF1DXdPec7aLTmlC',
          name: 'Good Vibes',
          description: 'Only good vibes here! Feel-good music to brighten your day.',
          image: 'https://i.scdn.co/image/ab67706f00000003e4eadd417df440bf7bb2e78c'
        },
        {
          id: '37i9dQZF1DX0BcQWzuB7ZO',
          name: 'Feel Good Indie',
          description: 'Carefree indie songs to get your mood up.',
          image: 'https://i.scdn.co/image/ab67706f000000038fa3baa7b6b0f7ebbf64cd5f'
        },
        {
          id: '37i9dQZF1DX2sUQwD7tbmL',
          name: 'Feel Good Friday',
          description: 'Friday mood captured in song. Treat yourself!',
          image: 'https://i.scdn.co/image/ab67706f000000033e2f04718f2b6b1f9e1a1b3f'
        },
        {
          id: '37i9dQZF1DX1s9knjP51Oa',
          name: 'Acoustic Hits',
          description: 'Stripped down versions of today\'s hits and acoustic favorites.',
          image: 'https://i.scdn.co/image/ab67706f000000034a4f9b0f9d9c9b4b1e2a2b3c'
        }
      ],
      
      'Pretty Good': [
        {
          id: '37i9dQZF1DX4TnpT6vw5rE',
          name: 'Chill Hits',
          description: 'Kick back to the best new and recent chill hits.',
          image: 'https://i.scdn.co/image/ab67706f00000003448c8e7b1de0b06b3fe3b5a1'
        },
        {
          id: '37i9dQZF1DX0SM0LYsmbMT',
          name: 'Coffee Table Jazz',
          description: 'Chill jazz for coffee shops and cafes.',
          image: 'https://i.scdn.co/image/ab67706f00000003a1bccf4e2e2b0b1c0d3e4f5a'
        },
        {
          id: '37i9dQZF1DWZd79rJ6a7lp',
          name: 'Lofi Hip-Hop',
          description: 'The perfect study soundtrack.',
          image: 'https://i.scdn.co/image/ab67706f00000003d99a9fb8e8f2f0e8b8e8c8d8'
        },
        {
          id: '37i9dQZF1DX4sWSpwq3LiO',
          name: 'Peaceful Piano',
          description: 'Relax and indulge with beautiful piano pieces',
          image: 'https://i.scdn.co/image/ab67706f000000031e1b2b3c4d5e6f7a8b9c0d1e'
        }
      ],
      
      'Decent': [
        {
          id: '37i9dQZF1DX4JAvHpjipBk',
          name: 'Ambient Chill',
          description: 'Ambient electronic music for focus and relaxation.',
          image: 'https://i.scdn.co/image/ab67706f00000003b5c6d7e8f9a0b1c2d3e4f5a6'
        },
        {
          id: '37i9dQZF1DWZZbwlv0RWP5',
          name: 'Soft Rock',
          description: 'Essential soft rock classics.',
          image: 'https://i.scdn.co/image/ab67706f00000003c7d8e9f0a1b2c3d4e5f6a7b8'
        },
        {
          id: '37i9dQZF1DX3Ogo9pFvBkY',
          name: 'Rainy Day',
          description: 'The perfect soundtrack for a rainy day.',
          image: 'https://i.scdn.co/image/ab67706f00000003d9eaf1b2c3d4e5f6a7b8c9da'
        }
      ],
      
      'Neutral': [
        {
          id: '7x96BLbFLDFkVaKvqYx56o',
          name: 'Atmospheric',
          description: 'Atmospheric music for contemplation and focus.',
          image: 'https://i.scdn.co/image/ab67706f00000003ebfcf3c4d5e6f7a8b9c0d1e2'
        },
        {
          id: '37i9dQZF1DX4wta20PHgwo',
          name: 'Late Night Jazz',
          description: 'Smooth jazz for late night listening.',
          image: 'https://i.scdn.co/image/ab67706f00000003fdfe0f1d2e3f4a5b6c7d8e9f'
        },
        {
          id: '37i9dQZF1DWYcDQ1hSjOpY',
          name: 'Mindful Piano',
          description: 'Gentle piano music for mindfulness and meditation.',
          image: 'https://i.scdn.co/image/ab67706f000000030f1e2d3c4b5a6978e9f0a1b2'
        }
      ],
      
      'Meh': [
        {
          id: '37i9dQZF1DX7qK8ma4tweE',
          name: 'Indie Folk',
          description: 'Melancholic indie folk for quiet moments.',
          image: 'https://i.scdn.co/image/ab67706f000000031d2e3f4c5b6a7089f0a1b2c3'
        },
        {
          id: '37i9dQZF1DWUVpAXiEPK8P',
          name: 'Soft Pop',
          description: 'Gentle pop songs for when you need comfort.',
          image: 'https://i.scdn.co/image/ab67706f000000032f4e5d6c7b8a9190a1b2c3d4'
        },
        {
          id: '37i9dQZF1DX0mlFaUYlnU9',
          name: 'Rainy Mood',
          description: 'Music for rainy days and quiet contemplation.',
          image: 'https://i.scdn.co/image/ab67706f000000034f6e7d8c9ba0b291c2d3e4f5'
        }
      ],
      
      'Not Great': [
        {
          id: '37i9dQZF1DX3YSRoSdA634',
          name: 'Life Sucks',
          description: 'For when everything feels overwhelming.',
          image: 'https://i.scdn.co/image/ab67706f000000035f7e8d9ca0b1c392d3e4f5a6'
        },
        {
          id: '37i9dQZF1DWPjOFpWOV5ly',
          name: 'Sad Songs',
          description: 'Sometimes you need a good cry.',
          image: 'https://i.scdn.co/image/ab67706f000000036f8e9dacb0c1d493e4f5a6b7'
        },
        {
          id: '37i9dQZF1DX1N5uK98ms5p',
          name: 'Heartbreak Pop',
          description: 'Pop songs for processing heartbreak.',
          image: 'https://i.scdn.co/image/ab67706f000000037f9eadbc1d2e4594f5a6b7c8'
        }
      ],
      
      'Pretty Low': [
        {
          id: '37i9dQZF1DWZryfp6NSvtz',
          name: 'Healing Frequency',
          description: 'Gentle sounds for emotional healing.',
          image: 'https://i.scdn.co/image/ab67706f000000038faeadc1d2e3f695a6b7c8d9'
        },
        {
          id: '37i9dQZF1DWSiZVO2J6WeI',
          name: 'Gentle Recovery',
          description: 'Soft music for difficult times.',
          image: 'https://i.scdn.co/image/ab67706f000000039fbeaec2d3f4a795b6c7d8ea'
        },
        {
          id: '37i9dQZF1DWXNFSTtym834',
          name: 'Deep Rest',
          description: 'Music for deep relaxation and recovery.',
          image: 'https://i.scdn.co/image/ab67706f00000003afcebed3e4f5b896c7d8e9fb'
        }
      ],
      
      'Rock Bottom': [
        {
          id: '37i9dQZF1DWVV27DiNWxkR',
          name: 'Meditation',
          description: 'Peaceful meditation music for healing.',
          image: 'https://i.scdn.co/image/ab67706f00000003bfdecfe4f5a6b997d8e9faac'
        },
        {
          id: '37i9dQZF1DWZqd5JICZI0u',
          name: 'Sound Bath',
          description: 'Immersive healing sounds and frequencies.',
          image: 'https://i.scdn.co/image/ab67706f00000003cfeedff5a6b7ca98e9fbadbd'
        },
        {
          id: '37i9dQZF1DX9RwfGbeGQwP',
          name: 'Classical Relaxation',
          description: 'Peaceful classical music for deep healing.',
          image: 'https://i.scdn.co/image/ab67706f00000003dfef0fa6b7c8db99fadcbece'
        }
      ]
    };
    
    this.contextualVariations = {
      morning: ['Morning Motivation', 'Coffee Shop Vibes', 'Sunrise Acoustic'],
      afternoon: ['Afternoon Picks', 'Productive Beats', 'Focus Flow'],
      evening: ['Evening Chill', 'Sunset Vibes', 'Wind Down'],
      night: ['Late Night Vibes', 'Midnight Jazz', 'Sleep Sounds']
    };
  }

  getRandomPlaylistForVibe(vibeName) {
    const playlists = this.vibePlaylistPools[vibeName] || [];
    if (playlists.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * playlists.length);
    return playlists[randomIndex];
  }

  getPlaylistsForVibe(vibeName) {
    return this.vibePlaylistPools[vibeName] || [];
  }

  getAllVibeCategories() {
    return Object.keys(this.vibePlaylistPools);
  }

  getSpotifyPlaylistUrl(playlistId) {
    return `https://open.spotify.com/playlist/${playlistId}`;
  }

  getSpotifyEmbedUrl(playlistId) {
    return `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;
  }

  // Get contextual playlist based on time of day
  getContextualPlaylist(vibeName) {
    const hour = new Date().getHours();
    let timeContext;
    
    if (hour >= 5 && hour < 12) timeContext = 'morning';
    else if (hour >= 12 && hour < 17) timeContext = 'afternoon';
    else if (hour >= 17 && hour < 22) timeContext = 'evening';
    else timeContext = 'night';
    
    // For now, return random playlist - can enhance with time-specific logic
    return this.getRandomPlaylistForVibe(vibeName, timeContext);
  }

  // Simulated user preference tracking (would be stored in database)
  trackPlaylistInteraction(playlistId, vibeName, action) {
    // action: 'like', 'skip', 'save', 'share'
    const interaction = {
      playlistId,
      vibeName,
      action,
      timestamp: new Date().toISOString()
    };
    
    // Store in localStorage for now (would be database in production)
    const userPrefs = JSON.parse(localStorage.getItem('musicPreferences') || '[]');
    userPrefs.push(interaction);
    localStorage.setItem('musicPreferences', JSON.stringify(userPrefs));
    
    return interaction;
  }

  // Get user's preferred playlists for a vibe based on past interactions
  getPreferredPlaylistsForVibe(vibeName) {
    const userPrefs = JSON.parse(localStorage.getItem('musicPreferences') || '[]');
    const vibePrefs = userPrefs.filter(pref => 
      pref.vibeName === vibeName && pref.action === 'like'
    );
    
    return vibePrefs.map(pref => pref.playlistId);
  }

  // Generate fallback image as data URL
  generateFallbackImage(playlistName, vibeName) {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');

    // Define vibe-specific colors
    const vibeColors = {
      'Absolutely Radiant': ['#FFD700', '#FF6B6B', '#4ECDC4'],
      'Super Positive': ['#FFA500', '#FF69B4', '#00CED1'],
      'Pretty Good': ['#32CD32', '#1E90FF', '#9370DB'],
      'Decent': ['#87CEEB', '#DDA0DD', '#F0E68C'],
      'Neutral': ['#D3D3D3', '#B0C4DE', '#DCDCDC'],
      'Meh': ['#A9A9A9', '#778899', '#696969'],
      'Not Great': ['#708090', '#2F4F4F', '#556B2F'],
      'Pretty Low': ['#483D8B', '#2F4F4F', '#191970'],
      'Rock Bottom': ['#000080', '#4B0082', '#2E2E2E']
    };

    const colors = vibeColors[vibeName] || ['#8B5CF6', '#EC4899', '#06B6D4'];
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 300, 300);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(0.5, colors[1]);
    gradient.addColorStop(1, colors[2]);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 300, 300);
    
    // Add music note emoji
    ctx.font = '60px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillText('🎵', 150, 130);
    
    // Add "PLAYLIST" text
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText('PLAYLIST', 150, 180);
    
    // Add playlist name (truncated if too long)
    const truncatedName = playlistName.length > 20 ? 
      playlistName.substring(0, 17) + '...' : playlistName;
    ctx.font = 'bold 12px Arial';
    ctx.fillText(truncatedName.toUpperCase(), 150, 200);
    
    return canvas.toDataURL();
  }
}

// Create singleton instance
export const musicService = new MusicService();

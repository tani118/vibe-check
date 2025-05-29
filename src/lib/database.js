import { supabase } from './supabase.js'

// User authentication functions
export const createUser = async (username, password, avatar = '😊') => {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([{ username, password, avatar }])
      .select()
      .single()
    
    if (error) {
      return { success: false, error: error.message }
    }
    
    return { success: true, user: data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const loginUser = async (username, password) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single()
    
    if (error) {
      return { success: false, error: 'Invalid username or password' }
    }
    
    return { success: true, user: data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Vibe functions
export const submitVibeResult = async (userId, vibeResult, score) => {
  try {
    // Update or insert current vibe
    const { error: currentVibeError } = await supabase
      .from('current_vibes')
      .upsert(
        { user_id: userId, vibe: vibeResult, score },
        { onConflict: 'user_id' }
      )
    
    if (currentVibeError) {
      return { success: false, error: currentVibeError.message }
    }

    // Add to vibe history
    const { error: historyError } = await supabase
      .from('vibe_history')
      .insert([{ user_id: userId, vibe: vibeResult, score }])
    
    if (historyError) {
      return { success: false, error: historyError.message }
    }
    
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const getCurrentVibe = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('current_vibes')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (error) {
      return { success: false, error: 'No current vibe found' }
    }
    
    return { success: true, vibe: data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const getUserVibeHistory = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('vibe_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) {
      return { success: false, error: error.message }
    }
    
    return { success: true, history: data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const updateUserProfile = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    if (error) {
      return { success: false, error: error.message }
    }
    
    return { success: true, user: data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const toggleStarUser = async (userId, starredUserId) => {
  try {
    // Check if already starred
    const { data: existing } = await supabase
      .from('starred_users')
      .select('id')
      .eq('user_id', userId)
      .eq('starred_user_id', starredUserId)
      .single()
    
    if (existing) {
      // Remove star
      const { error } = await supabase
        .from('starred_users')
        .delete()
        .eq('id', existing.id)
      
      if (error) {
        return { success: false, error: error.message }
      }
    } else {
      // Add star
      const { error } = await supabase
        .from('starred_users')
        .insert([{ user_id: userId, starred_user_id: starredUserId }])
      
      if (error) {
        return { success: false, error: error.message }
      }
    }
    
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const getStarredUsers = async (userId) => {
  try {
    // First get the starred user IDs
    const { data: starredIds, error: starredError } = await supabase
      .from('starred_users')
      .select('starred_user_id')
      .eq('user_id', userId)
    
    if (starredError) {
      return { success: false, error: starredError.message }
    }
    
    if (!starredIds || starredIds.length === 0) {
      return { success: true, starredUsers: [] }
    }
    
    const userIds = starredIds.map(s => s.starred_user_id)
    
    // Get user information for starred users
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, username, avatar')
      .in('id', userIds)
    
    if (usersError) {
      return { success: false, error: usersError.message }
    }
    
    // Get current vibes for starred users
    const { data: vibes, error: vibesError } = await supabase
      .from('current_vibes')
      .select('user_id, vibe, score, updated_at')
      .in('user_id', userIds)
    
    if (vibesError) {
      return { success: false, error: vibesError.message }
    }
    
    // Combine the data
    const starredUsers = starredIds.map(starred => {
      const user = users.find(u => u.id === starred.starred_user_id)
      const vibe = vibes.find(v => v.user_id === starred.starred_user_id)
      return {
        starred_user_id: starred.starred_user_id,
        users: user,
        current_vibes: vibe ? [vibe] : []
      }
    })
    
    return { success: true, starredUsers }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const getAllUsers = async () => {
  try {
    console.log('getAllUsers: Fetching all users...')
    // Get all users first
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (usersError) {
      console.error('getAllUsers: Error fetching users:', usersError)
      return { success: false, error: usersError.message }
    }
    
    console.log(`getAllUsers: Found ${users.length} users`)
    
    // Get all current vibes
    const { data: vibes, error: vibesError } = await supabase
      .from('current_vibes')
      .select('*')
    
    if (vibesError) {
      console.error('getAllUsers: Error fetching vibes:', vibesError)
      return { success: false, error: vibesError.message }
    }
    
    console.log(`getAllUsers: Found ${vibes.length} vibes`)
    
    // Combine users with their current vibes manually
    const usersWithVibes = users.map(user => {
      const userVibe = vibes.find(v => v.user_id === user.id)
      return {
        ...user,
        current_vibes: userVibe ? [userVibe] : []
      }
    })
    
    const usersWithVibesCount = usersWithVibes.filter(u => u.current_vibes.length > 0).length
    console.log(`getAllUsers: ${usersWithVibesCount} users have vibes, ${usersWithVibes.length - usersWithVibesCount} don't`)
    
    return { success: true, users: usersWithVibes }
  } catch (error) {
    console.error('getAllUsers: Caught error:', error)
    return { success: false, error: error.message }
  }
}

// Playlist love/save functions
export const lovePlaylist = async (userId, playlist, vibeCategory) => {
  try {
    const { data, error } = await supabase
      .from('loved_playlists')
      .insert([{
        user_id: userId,
        playlist_id: playlist.id,
        playlist_name: playlist.name,
        playlist_description: playlist.description,
        playlist_image_url: playlist.image,
        vibe_category: vibeCategory
      }])
      .select()
      .single()
    
    if (error) {
      // If table doesn't exist, fallback to localStorage
      if (error.code === '42P01') {
        console.warn('loved_playlists table not found, using localStorage fallback')
        return lovePlaylistLocalStorage(userId, playlist, vibeCategory)
      }
      // If it's a duplicate, that's fine - just return success
      if (error.code === '23505') {
        return { success: true, message: 'Playlist already loved' }
      }
      return { success: false, error: error.message }
    }
    
    return { success: true, data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const unlovePlaylist = async (userId, playlistId) => {
  try {
    const { error } = await supabase
      .from('loved_playlists')
      .delete()
      .eq('user_id', userId)
      .eq('playlist_id', playlistId)
    
    if (error) {
      // If table doesn't exist, fallback to localStorage
      if (error.code === '42P01') {
        console.warn('loved_playlists table not found, using localStorage fallback')
        return unlovePlaylistLocalStorage(userId, playlistId)
      }
      return { success: false, error: error.message }
    }
    
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const getUserLovedPlaylists = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('loved_playlists')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) {
      // If table doesn't exist, fallback to localStorage
      if (error.code === '42P01') {
        console.warn('loved_playlists table not found, using localStorage fallback')
        return getUserLovedPlaylistsLocalStorage(userId)
      }
      return { success: false, error: error.message }
    }
    
    return { success: true, playlists: data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const isPlaylistLoved = async (userId, playlistId) => {
  try {
    const { data, error } = await supabase
      .from('loved_playlists')
      .select('id')
      .eq('user_id', userId)
      .eq('playlist_id', playlistId)
      .single()
    
    if (error && error.code !== 'PGRST116') {
      // If table doesn't exist, fallback to localStorage
      if (error.code === '42P01') {
        console.warn('loved_playlists table not found, using localStorage fallback')
        return isPlaylistLovedLocalStorage(userId, playlistId)
      }
      return { success: false, error: error.message }
    }
    
    return { success: true, isLoved: !!data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const togglePlaylistLove = async (userId, playlist, vibeCategory) => {
  try {
    const isLovedResult = await isPlaylistLoved(userId, playlist.id)
    
    if (!isLovedResult.success) {
      return isLovedResult
    }
    
    if (isLovedResult.isLoved) {
      return await unlovePlaylist(userId, playlist.id)
    } else {
      return await lovePlaylist(userId, playlist, vibeCategory)
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// localStorage fallback functions for when loved_playlists table doesn't exist
const LOVED_PLAYLISTS_KEY = 'vibeChecker_lovedPlaylists'

const lovePlaylistLocalStorage = (userId, playlist, vibeCategory) => {
  try {
    const existingData = JSON.parse(localStorage.getItem(LOVED_PLAYLISTS_KEY) || '{}')
    const userPlaylists = existingData[userId] || []
    
    // Check if already exists
    const exists = userPlaylists.some(p => p.playlist_id === playlist.id)
    if (exists) {
      return { success: true, message: 'Playlist already loved' }
    }
    
    // Add new playlist
    const newPlaylist = {
      user_id: userId,
      playlist_id: playlist.id,
      playlist_name: playlist.name,
      playlist_description: playlist.description,
      playlist_image_url: playlist.image,
      vibe_category: vibeCategory,
      created_at: new Date().toISOString()
    }
    
    userPlaylists.push(newPlaylist)
    existingData[userId] = userPlaylists
    localStorage.setItem(LOVED_PLAYLISTS_KEY, JSON.stringify(existingData))
    
    return { success: true, data: newPlaylist }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

const unlovePlaylistLocalStorage = (userId, playlistId) => {
  try {
    const existingData = JSON.parse(localStorage.getItem(LOVED_PLAYLISTS_KEY) || '{}')
    const userPlaylists = existingData[userId] || []
    
    // Filter out the playlist to remove
    const updatedPlaylists = userPlaylists.filter(p => p.playlist_id !== playlistId)
    existingData[userId] = updatedPlaylists
    localStorage.setItem(LOVED_PLAYLISTS_KEY, JSON.stringify(existingData))
    
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

const getUserLovedPlaylistsLocalStorage = (userId) => {
  try {
    const existingData = JSON.parse(localStorage.getItem(LOVED_PLAYLISTS_KEY) || '{}')
    const userPlaylists = existingData[userId] || []
    
    // Sort by created_at descending
    userPlaylists.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    
    return { success: true, playlists: userPlaylists }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

const isPlaylistLovedLocalStorage = (userId, playlistId) => {
  try {
    const existingData = JSON.parse(localStorage.getItem(LOVED_PLAYLISTS_KEY) || '{}')
    const userPlaylists = existingData[userId] || []
    
    const isLoved = userPlaylists.some(p => p.playlist_id === playlistId)
    return { success: true, isLoved }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

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

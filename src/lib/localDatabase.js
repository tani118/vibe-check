// Local database fallback system
// This simulates the Supabase database using localStorage

// Helper functions for localStorage operations
const getFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return []
  }
}

const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (error) {
    console.error('Error saving to localStorage:', error)
    return false
  }
}

// Generate unique IDs
const generateId = () => Date.now() + Math.random()

// Database tables in localStorage
const TABLES = {
  users: 'vibeChecker_users',
  currentVibes: 'vibeChecker_current_vibes',
  vibeHistory: 'vibeChecker_history',
  starredUsers: 'vibeChecker_starred_users'
}

// User authentication functions
export const createUser = async (username, password, avatar = '😊') => {
  try {
    const users = getFromStorage(TABLES.users)
    
    // Check if username already exists
    if (users.find(user => user.username === username)) {
      return { success: false, error: 'Username already exists' }
    }

    const newUser = {
      id: generateId(),
      username,
      password,
      avatar,
      created_at: new Date().toISOString()
    }

    users.push(newUser)
    saveToStorage(TABLES.users, users)
    
    return { success: true, user: newUser }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const loginUser = async (username, password) => {
  try {
    const users = getFromStorage(TABLES.users)
    const user = users.find(u => u.username === username && u.password === password)
    
    if (!user) {
      return { success: false, error: 'Invalid username or password' }
    }
    
    return { success: true, user }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Vibe functions
export const submitVibeResult = async (userId, vibeResult, score) => {
  try {
    // Update current vibe
    const currentVibes = getFromStorage(TABLES.currentVibes)
    const existingVibeIndex = currentVibes.findIndex(v => v.user_id === userId)
    
    const newCurrentVibe = {
      id: generateId(),
      user_id: userId,
      vibe: vibeResult,
      score,
      updated_at: new Date().toISOString()
    }

    if (existingVibeIndex >= 0) {
      currentVibes[existingVibeIndex] = newCurrentVibe
    } else {
      currentVibes.push(newCurrentVibe)
    }
    
    saveToStorage(TABLES.currentVibes, currentVibes)

    // Add to vibe history
    const vibeHistory = getFromStorage(TABLES.vibeHistory)
    const newHistoryEntry = {
      id: generateId(),
      user_id: userId,
      vibe: vibeResult,
      score,
      created_at: new Date().toISOString()
    }
    
    vibeHistory.push(newHistoryEntry)
    saveToStorage(TABLES.vibeHistory, vibeHistory)
    
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const getCurrentVibe = async (userId) => {
  try {
    const currentVibes = getFromStorage(TABLES.currentVibes)
    const vibe = currentVibes.find(v => v.user_id === userId)
    
    if (!vibe) {
      return { success: false, error: 'No current vibe found' }
    }
    
    return { success: true, vibe }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const getUserVibeHistory = async (userId) => {
  try {
    const vibeHistory = getFromStorage(TABLES.vibeHistory)
    const userHistory = vibeHistory
      .filter(v => v.user_id === userId)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    
    return { success: true, history: userHistory }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const updateUserProfile = async (userId, updates) => {
  try {
    const users = getFromStorage(TABLES.users)
    const userIndex = users.findIndex(u => u.id === userId)
    
    if (userIndex === -1) {
      return { success: false, error: 'User not found' }
    }
    
    users[userIndex] = { ...users[userIndex], ...updates }
    saveToStorage(TABLES.users, users)
    
    return { success: true, user: users[userIndex] }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const toggleStarUser = async (userId, starredUserId) => {
  try {
    const starredUsers = getFromStorage(TABLES.starredUsers)
    const existingStarIndex = starredUsers.findIndex(
      s => s.user_id === userId && s.starred_user_id === starredUserId
    )
    
    if (existingStarIndex >= 0) {
      // Remove star
      starredUsers.splice(existingStarIndex, 1)
    } else {
      // Add star
      starredUsers.push({
        id: generateId(),
        user_id: userId,
        starred_user_id: starredUserId,
        created_at: new Date().toISOString()
      })
    }
    
    saveToStorage(TABLES.starredUsers, starredUsers)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const getStarredUsers = async (userId) => {
  try {
    const starredUsers = getFromStorage(TABLES.starredUsers)
    const users = getFromStorage(TABLES.users)
    const currentVibes = getFromStorage(TABLES.currentVibes)
    
    const userStars = starredUsers.filter(s => s.user_id === userId)
    
    const starredUsersData = userStars.map(star => {
      const user = users.find(u => u.id === star.starred_user_id)
      const currentVibe = currentVibes.filter(v => v.user_id === star.starred_user_id)
      
      return {
        starred_user_id: star.starred_user_id,
        users: user,
        current_vibes: currentVibe
      }
    })
    
    return { success: true, starredUsers: starredUsersData }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const getAllUsers = async () => {
  try {
    const users = getFromStorage(TABLES.users)
    const currentVibes = getFromStorage(TABLES.currentVibes)
    
    const usersWithVibes = users.map(user => ({
      ...user,
      current_vibes: currentVibes.filter(v => v.user_id === user.id)
    }))
    
    return { success: true, users: usersWithVibes }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Initialize with some sample data if empty
export const initializeSampleData = () => {
  const users = getFromStorage(TABLES.users)
  
  if (users.length === 0) {
    const sampleUsers = [
      {
        id: 'demo_1',
        username: 'demo_user_1',
        password: 'password123',
        avatar: '😄',
        created_at: new Date().toISOString()
      },
      {
        id: 'demo_2',
        username: 'demo_user_2',
        password: 'password123',
        avatar: '🤗',
        created_at: new Date().toISOString()
      },
      {
        id: 'demo_3',
        username: 'vibe_master',
        password: 'password123',
        avatar: '✨',
        created_at: new Date().toISOString()
      }
    ]
    
    const sampleCurrentVibes = [
      {
        id: 'vibe_1',
        user_id: 'demo_1',
        vibe: 'Super Positive',
        score: 42,
        updated_at: new Date().toISOString()
      },
      {
        id: 'vibe_2',
        user_id: 'demo_2',
        vibe: 'Pretty Good',
        score: 35,
        updated_at: new Date().toISOString()
      }
    ]
    
    const sampleHistory = [
      {
        id: 'hist_1',
        user_id: 'demo_1',
        vibe: 'Super Positive',
        score: 42,
        created_at: new Date(Date.now() - 86400000).toISOString() // 1 day ago
      },
      {
        id: 'hist_2',
        user_id: 'demo_1',
        vibe: 'Pretty Good',
        score: 35,
        created_at: new Date(Date.now() - 172800000).toISOString() // 2 days ago
      },
      {
        id: 'hist_3',
        user_id: 'demo_2',
        vibe: 'Pretty Good',
        score: 35,
        created_at: new Date(Date.now() - 86400000).toISOString() // 1 day ago
      }
    ]
    
    saveToStorage(TABLES.users, sampleUsers)
    saveToStorage(TABLES.currentVibes, sampleCurrentVibes)
    saveToStorage(TABLES.vibeHistory, sampleHistory)
    saveToStorage(TABLES.starredUsers, []) // Empty starred users initially
    
    console.log('📝 Initialized sample data for local database fallback')
  }
}

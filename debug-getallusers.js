import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kplqmjzpijueusbwrdjm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwbHFtanpwaWp1ZXVzYndyZGptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3MjMyMDksImV4cCI6MjA1MTI5OTIwOX0.6kOiKVEKRm6M9K1cZs1oLKLLqbH9PEuD3-LqrMKbJMo'

const supabase = createClient(supabaseUrl, supabaseKey)

console.log('Testing getAllUsers function...')

// Test the current getAllUsers approach
async function testGetAllUsers() {
  console.log('\n=== Testing current getAllUsers approach ===')
  try {
    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        current_vibes (
          vibe,
          score,
          updated_at
        )
      `)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error:', error)
      return
    }
    
    console.log('Users with nested vibes:', data.length)
    console.log('Sample users:')
    data.slice(0, 3).forEach(user => {
      console.log(`- ${user.username}: vibes = ${JSON.stringify(user.current_vibes)}`)
    })
  } catch (error) {
    console.error('Caught error:', error)
  }
}

// Test manual approach like we did for starred users
async function testManualApproach() {
  console.log('\n=== Testing manual approach ===')
  try {
    // Get all users
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (usersError) {
      console.error('Users error:', usersError)
      return
    }
    
    // Get all current vibes
    const { data: vibes, error: vibesError } = await supabase
      .from('current_vibes')
      .select('*')
    
    if (vibesError) {
      console.error('Vibes error:', vibesError)
      return
    }
    
    console.log(`Found ${users.length} users and ${vibes.length} vibes`)
    
    // Combine them manually
    const usersWithVibes = users.map(user => {
      const userVibe = vibes.find(v => v.user_id === user.id)
      return {
        ...user,
        current_vibes: userVibe ? [userVibe] : []
      }
    })
    
    console.log('Sample users with manual vibes:')
    usersWithVibes.slice(0, 5).forEach(user => {
      console.log(`- ${user.username}: vibes = ${user.current_vibes.length > 0 ? user.current_vibes[0].vibe : 'No vibe'}`)
    })
    
  } catch (error) {
    console.error('Caught error:', error)
  }
}

await testGetAllUsers()
await testManualApproach()

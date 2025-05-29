import { getAllUsers } from './src/lib/database.js'

console.log('Testing getAllUsers function from database.js...')

async function testGetAllUsers() {
  try {
    const result = await getAllUsers()
    
    if (!result.success) {
      console.error('getAllUsers failed:', result.error)
      return
    }
    
    console.log(`Found ${result.users.length} users`)
    
    console.log('\nFirst 5 users and their vibes:')
    result.users.slice(0, 5).forEach(user => {
      console.log(`- ${user.username}:`)
      console.log(`  current_vibes:`, user.current_vibes)
      if (user.current_vibes && user.current_vibes.length > 0) {
        console.log(`  vibe: ${user.current_vibes[0].vibe}`)
      } else {
        console.log(`  vibe: No vibe`)
      }
    })
    
    // Check how many users have vibes vs no vibes
    const usersWithVibes = result.users.filter(user => user.current_vibes && user.current_vibes.length > 0)
    const usersWithoutVibes = result.users.filter(user => !user.current_vibes || user.current_vibes.length === 0)
    
    console.log(`\nSummary:`)
    console.log(`Users with vibes: ${usersWithVibes.length}`)
    console.log(`Users without vibes: ${usersWithoutVibes.length}`)
    
  } catch (error) {
    console.error('Error testing getAllUsers:', error)
  }
}

await testGetAllUsers()

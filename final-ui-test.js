// Final test to simulate the UI star functionality
import { toggleStarUser, getStarredUsers, getAllUsers, loginUser } from './src/lib/database.js'

async function finalUISimulationTest() {
  console.log('🎯 FINAL UI SIMULATION TEST\n')
  
  // Simulate logging in as demo_user_1
  console.log('1. Simulating login as demo_user_1...')
  const loginResult = await loginUser('demo_user_1', 'password123')
  if (!loginResult.success) {
    console.error('Login failed:', loginResult.error)
    return
  }
  
  const currentUser = loginResult.user
  console.log(`✅ Logged in as ${currentUser.username} (ID: ${currentUser.id})`)
  console.log('')
  
  // Simulate loading the UsersPage
  console.log('2. Simulating UsersPage load...')
  
  // Get all users (filtering out current user like in the component)
  const allUsersResult = await getAllUsers()
  if (!allUsersResult.success) {
    console.error('Failed to get users:', allUsersResult.error)
    return
  }
  
  const otherUsers = allUsersResult.users.filter(u => u.id !== currentUser.id)
  console.log(`Found ${otherUsers.length} other users:`)
  otherUsers.forEach(u => console.log(`  - ${u.username} (ID: ${u.id})`))
  console.log('')
  
  // Get starred users
  const starredResult = await getStarredUsers(currentUser.id)
  if (!starredResult.success) {
    console.error('Failed to get starred users:', starredResult.error)
    return
  }
  
  const starredIds = new Set(starredResult.starredUsers.map(su => su.starred_user_id))
  console.log(`Currently starred users: ${Array.from(starredIds).join(', ')}`)
  console.log('')
  
  // Test starring a user
  if (otherUsers.length > 0) {
    const targetUser = otherUsers[0] // First other user
    const isStarred = starredIds.has(targetUser.id)
    
    console.log(`3. Testing star toggle for ${targetUser.username}...`)
    console.log(`Currently starred: ${isStarred}`)
    
    // Toggle star
    const toggleResult = await toggleStarUser(currentUser.id, targetUser.id)
    if (toggleResult.success) {
      console.log('✅ Star toggle successful')
      
      // Update local state (like the UI does)
      if (isStarred) {
        starredIds.delete(targetUser.id)
        console.log(`Removed star from ${targetUser.username}`)
      } else {
        starredIds.add(targetUser.id)
        console.log(`Added star to ${targetUser.username}`)
      }
    } else {
      console.error('❌ Star toggle failed:', toggleResult.error)
    }
    console.log('')
    
    // Verify database state
    console.log('4. Verifying database state...')
    const verifyResult = await getStarredUsers(currentUser.id)
    if (verifyResult.success) {
      const dbStarredIds = new Set(verifyResult.starredUsers.map(su => su.starred_user_id))
      console.log(`Database starred users: ${Array.from(dbStarredIds).join(', ')}`)
      console.log(`Local state starred users: ${Array.from(starredIds).join(', ')}`)
      
      const statesMatch = 
        Array.from(dbStarredIds).sort().join(',') === 
        Array.from(starredIds).sort().join(',')
      
      if (statesMatch) {
        console.log('✅ Database and local state match!')
      } else {
        console.log('❌ Database and local state mismatch!')
      }
    }
    console.log('')
  }
  
  // Simulate HomePage load
  console.log('5. Simulating HomePage starred users display...')
  const homeStarredResult = await getStarredUsers(currentUser.id)
  if (homeStarredResult.success) {
    console.log(`HomePage would show ${homeStarredResult.starredUsers.length} starred users:`)
    homeStarredResult.starredUsers.forEach(su => {
      console.log(`  - ${su.users?.username}: ${su.current_vibes?.[0]?.vibe || 'No vibe'} (${su.current_vibes?.[0]?.score || 'N/A'})`)
    })
  }
  console.log('')
  
  console.log('🎉 FINAL TEST COMPLETE!')
  console.log('The star functionality should now work correctly in the UI.')
}

finalUISimulationTest().catch(console.error)

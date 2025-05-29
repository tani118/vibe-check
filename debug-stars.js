// Debug script to test star functionality
import { supabase } from './src/lib/supabase.js'

async function debugStars() {
  console.log('🌟 Debugging star functionality...\n')
  
  // 1. Check all users
  console.log('1. Getting all users:')
  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('id, username')
  
  if (usersError) {
    console.error('Error getting users:', usersError)
    return
  }
  
  console.log('Users found:', users)
  console.log('')
  
  // 2. Check current starred_users table
  console.log('2. Current starred_users table:')
  const { data: starredUsers, error: starredError } = await supabase
    .from('starred_users')
    .select('*')
  
  if (starredError) {
    console.error('Error getting starred users:', starredError)
  } else {
    console.log('Starred users:', starredUsers)
  }
  console.log('')
  
  // 3. Test starring function
  if (users.length >= 2) {
    const user1 = users[0]
    const user2 = users[1]
    
    console.log(`3. Testing star toggle between ${user1.username} (${user1.id}) and ${user2.username} (${user2.id}):`)
    
    // Check if already starred
    const { data: existing } = await supabase
      .from('starred_users')
      .select('id')
      .eq('user_id', user1.id)
      .eq('starred_user_id', user2.id)
      .single()
    
    console.log('Existing star relationship:', existing)
    
    if (existing) {
      // Remove star
      console.log('Removing star...')
      const { error } = await supabase
        .from('starred_users')
        .delete()
        .eq('id', existing.id)
      
      if (error) {
        console.error('Error removing star:', error)
      } else {
        console.log('✅ Star removed successfully')
      }
    } else {
      // Add star
      console.log('Adding star...')
      const { error } = await supabase
        .from('starred_users')
        .insert([{ user_id: user1.id, starred_user_id: user2.id }])
      
      if (error) {
        console.error('Error adding star:', error)
      } else {
        console.log('✅ Star added successfully')
      }
    }
    
    // Check final state
    console.log('\n4. Final starred_users table state:')
    const { data: finalStarredUsers } = await supabase
      .from('starred_users')
      .select('*')
    
    console.log('Final starred users:', finalStarredUsers)
  }
  
  // 5. Test getStarredUsers query
  if (users.length > 0) {
    console.log(`\n5. Testing getStarredUsers for ${users[0].username}:`)
    const { data, error } = await supabase
      .from('starred_users')
      .select(`
        starred_user_id,
        users:starred_user_id (
          id,
          username,
          avatar
        ),
        current_vibes:starred_user_id (
          vibe,
          score,
          updated_at
        )
      `)
      .eq('user_id', users[0].id)
    
    if (error) {
      console.error('Error in getStarredUsers query:', error)
    } else {
      console.log('getStarredUsers result:', JSON.stringify(data, null, 2))
    }
  }
}

debugStars().catch(console.error)

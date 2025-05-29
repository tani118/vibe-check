// Test the specific getStarredUsers query
import { supabase } from './src/lib/supabase.js'

async function testStarredUsersQuery() {
  console.log('🌟 Testing getStarredUsers query...\n')
  
  // First check what columns exist in current_vibes
  console.log('1. Checking current_vibes table structure:')
  const { data: vibes, error: vibesError } = await supabase
    .from('current_vibes')
    .select('*')
    .limit(1)
  
  if (vibesError) {
    console.error('Error:', vibesError)
  } else {
    console.log('Sample current_vibes row:', vibes[0])
  }
  console.log('')
  
  // Test the problematic query step by step
  console.log('2. Testing simpler query first:')
  const { data: simple, error: simpleError } = await supabase
    .from('starred_users')
    .select('starred_user_id')
    .eq('user_id', 1)
  
  if (simpleError) {
    console.error('Simple query error:', simpleError)
  } else {
    console.log('Simple query result:', simple)
  }
  console.log('')
  
  // Test with users join
  console.log('3. Testing with users join:')
  const { data: withUsers, error: usersError } = await supabase
    .from('starred_users')
    .select(`
      starred_user_id,
      users:starred_user_id (
        id,
        username,
        avatar
      )
    `)
    .eq('user_id', 1)
  
  if (usersError) {
    console.error('Users join error:', usersError)
  } else {
    console.log('Users join result:', JSON.stringify(withUsers, null, 2))
  }
  console.log('')
  
  // Test with current_vibes join
  console.log('4. Testing with current_vibes join:')
  const { data: withVibes, error: vibesJoinError } = await supabase
    .from('starred_users')
    .select(`
      starred_user_id,
      current_vibes:starred_user_id (
        vibe,
        score,
        updated_at
      )
    `)
    .eq('user_id', 1)
  
  if (vibesJoinError) {
    console.error('Current_vibes join error:', vibesJoinError)
  } else {
    console.log('Current_vibes join result:', JSON.stringify(withVibes, null, 2))
  }
  console.log('')
  
  // Test full query
  console.log('5. Testing full query:')
  const { data: full, error: fullError } = await supabase
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
    .eq('user_id', 1)
  
  if (fullError) {
    console.error('Full query error:', fullError)
  } else {
    console.log('Full query result:', JSON.stringify(full, null, 2))
  }
}

testStarredUsersQuery().catch(console.error)

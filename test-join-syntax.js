// Test different join syntaxes for current_vibes
import { supabase } from './src/lib/supabase.js'

async function testJoinSyntax() {
  console.log('🔍 Testing different join syntaxes...\n')
  
  // Check what user_id 2 has for current_vibes
  console.log('1. Direct query to current_vibes for user_id 2:')
  const { data: directVibes, error: directError } = await supabase
    .from('current_vibes')
    .select('*')
    .eq('user_id', 2)
  
  if (directError) {
    console.error('Direct query error:', directError)
  } else {
    console.log('Direct current_vibes for user 2:', directVibes)
  }
  console.log('')
  
  // Test different join syntax - let's manually join
  console.log('2. Manual join approach:')
  
  // First get starred users
  const { data: starredIds } = await supabase
    .from('starred_users')
    .select('starred_user_id')
    .eq('user_id', 1)
  
  if (starredIds && starredIds.length > 0) {
    const userIds = starredIds.map(s => s.starred_user_id)
    console.log('Starred user IDs:', userIds)
    
    // Get users info
    const { data: usersInfo } = await supabase
      .from('users')
      .select('id, username, avatar')
      .in('id', userIds)
    
    console.log('Users info:', usersInfo)
    
    // Get their current vibes
    const { data: vibesInfo } = await supabase
      .from('current_vibes')
      .select('user_id, vibe, score, updated_at')
      .in('user_id', userIds)
    
    console.log('Vibes info:', vibesInfo)
    
    // Combine manually
    const combined = starredIds.map(starred => {
      const user = usersInfo.find(u => u.id === starred.starred_user_id)
      const vibe = vibesInfo.find(v => v.user_id === starred.starred_user_id)
      return {
        starred_user_id: starred.starred_user_id,
        user,
        current_vibe: vibe
      }
    })
    
    console.log('Combined result:', JSON.stringify(combined, null, 2))
  }
  
  console.log('')
  
  // Test the correct Supabase relationship syntax
  console.log('3. Testing correct Supabase relationship syntax:')
  
  // In Supabase, relationships should be defined in the dashboard
  // Let's try a different approach
  const { data: attempt1, error: error1 } = await supabase
    .from('starred_users')
    .select(`
      starred_user_id,
      starred_user:starred_user_id (
        id,
        username,
        avatar
      )
    `)
    .eq('user_id', 1)
  
  if (error1) {
    console.error('Attempt 1 error:', error1)
  } else {
    console.log('Attempt 1 result:', JSON.stringify(attempt1, null, 2))
  }
}

testJoinSyntax().catch(console.error)

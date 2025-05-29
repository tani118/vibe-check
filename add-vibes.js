// Add missing vibes data for the new users
import { supabase } from './src/lib/supabase.js'

const userVibes = [
  { username: 'alex_zen', vibe: 'Absolutely Radiant', score: 42 },
  { username: 'maya_sparkle', vibe: 'Absolutely Radiant', score: 38 },
  { username: 'jordan_sunshine', vibe: 'Super Positive', score: 32 },
  { username: 'taylor_joy', vibe: 'Super Positive', score: 28 },
  { username: 'sam_vibes', vibe: 'Super Positive', score: 26 },
  { username: 'casey_bright', vibe: 'Pretty Good', score: 22 },
  { username: 'riley_happy', vibe: 'Pretty Good', score: 18 },
  { username: 'morgan_cool', vibe: 'Pretty Good', score: 16 },
  { username: 'avery_chill', vibe: 'Decent', score: 12 },
  { username: 'blake_steady', vibe: 'Decent', score: 8 },
  { username: 'quinn_calm', vibe: 'Decent', score: 6 },
  { username: 'sage_balanced', vibe: 'Neutral', score: 2 },
  { username: 'river_flow', vibe: 'Neutral', score: 0 },
  { username: 'echo_still', vibe: 'Neutral', score: -2 },
  { username: 'ash_mellow', vibe: 'Neutral', score: -4 },
  { username: 'rowan_quiet', vibe: 'Meh', score: -8 },
  { username: 'devon_tired', vibe: 'Meh', score: -12 },
  { username: 'phoenix_low', vibe: 'Meh', score: -14 },
  { username: 'skyler_blue', vibe: 'Not Great', score: -18 },
  { username: 'jamie_rough', vibe: 'Not Great', score: -22 },
  { username: 'drew_heavy', vibe: 'Not Great', score: -24 },
  { username: 'finley_down', vibe: 'Pretty Low', score: -28 },
  { username: 'dakota_sad', vibe: 'Pretty Low', score: -32 },
  { username: 'remy_storm', vibe: 'Pretty Low', score: -34 },
  { username: 'cosmic_wanderer', vibe: 'Super Positive', score: 30 },
  { username: 'forest_dreamer', vibe: 'Pretty Good', score: 20 },
  { username: 'ocean_soul', vibe: 'Decent', score: 10 },
  { username: 'mountain_spirit', vibe: 'Neutral', score: -1 },
  { username: 'desert_nomad', vibe: 'Meh', score: -10 },
  { username: 'arctic_explorer', vibe: 'Rock Bottom', score: -40 }
]

async function addMissingVibes() {
  console.log('🎭 Adding missing vibes data...\n')
  
  try {
    // Get all users with their IDs
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, username')
    
    if (usersError) {
      console.error('Error fetching users:', usersError)
      return
    }
    
    console.log(`Found ${users.length} users in database`)
    
    let addedCount = 0
    
    for (const userVibe of userVibes) {
      const user = users.find(u => u.username === userVibe.username)
      if (!user) {
        console.log(`⏭️  User ${userVibe.username} not found`)
        continue
      }
      
      // Check if user already has a current vibe
      const { data: existingVibe } = await supabase
        .from('current_vibes')
        .select('id')
        .eq('user_id', user.id)
        .single()
      
      if (existingVibe) {
        console.log(`⏭️  ${userVibe.username} already has a vibe`)
        continue
      }
      
      // Add current vibe
      const { error: vibeError } = await supabase
        .from('current_vibes')
        .insert([{
          user_id: user.id,
          vibe: userVibe.vibe,
          score: userVibe.score
        }])
      
      if (vibeError) {
        console.error(`❌ Error adding vibe for ${userVibe.username}:`, vibeError)
        continue
      }
      
      // Add to vibe history
      const { error: historyError } = await supabase
        .from('vibe_history')
        .insert([{
          user_id: user.id,
          vibe: userVibe.vibe,
          score: userVibe.score
        }])
      
      if (historyError) {
        console.error(`❌ Error adding history for ${userVibe.username}:`, historyError)
      }
      
      console.log(`✅ Added vibe for ${userVibe.username}: ${userVibe.vibe} (${userVibe.score})`)
      addedCount++
    }
    
    console.log(`\n🎉 Added vibes for ${addedCount} users!`)
    console.log('✅ Database is now fully populated and ready!')
    
  } catch (error) {
    console.error('Error:', error)
  }
}

addMissingVibes()

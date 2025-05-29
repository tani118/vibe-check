// Script to populate database with 30 diverse users with different vibes
import { supabase } from './src/lib/supabase.js'

const users = [
  { username: 'alex_zen', password: 'password123', avatar: '🧘', vibe: 'Absolutely Radiant', score: 42 },
  { username: 'maya_sparkle', password: 'password123', avatar: '✨', vibe: 'Absolutely Radiant', score: 38 },
  { username: 'jordan_sunshine', password: 'password123', avatar: '☀️', vibe: 'Super Positive', score: 32 },
  { username: 'taylor_joy', password: 'password123', avatar: '🌈', vibe: 'Super Positive', score: 28 },
  { username: 'sam_vibes', password: 'password123', avatar: '🌟', vibe: 'Super Positive', score: 26 },
  { username: 'casey_bright', password: 'password123', avatar: '💫', vibe: 'Pretty Good', score: 22 },
  { username: 'riley_happy', password: 'password123', avatar: '😊', vibe: 'Pretty Good', score: 18 },
  { username: 'morgan_cool', password: 'password123', avatar: '😎', vibe: 'Pretty Good', score: 16 },
  { username: 'avery_chill', password: 'password123', avatar: '🌊', vibe: 'Decent', score: 12 },
  { username: 'blake_steady', password: 'password123', avatar: '🍃', vibe: 'Decent', score: 8 },
  { username: 'quinn_calm', password: 'password123', avatar: '🕯️', vibe: 'Decent', score: 6 },
  { username: 'sage_balanced', password: 'password123', avatar: '⚖️', vibe: 'Neutral', score: 2 },
  { username: 'river_flow', password: 'password123', avatar: '🌊', vibe: 'Neutral', score: 0 },
  { username: 'echo_still', password: 'password123', avatar: '🪨', vibe: 'Neutral', score: -2 },
  { username: 'ash_mellow', password: 'password123', avatar: '🍂', vibe: 'Neutral', score: -4 },
  { username: 'rowan_quiet', password: 'password123', avatar: '🌙', vibe: 'Meh', score: -8 },
  { username: 'devon_tired', password: 'password123', avatar: '😴', vibe: 'Meh', score: -12 },
  { username: 'phoenix_low', password: 'password123', avatar: '🌫️', vibe: 'Meh', score: -14 },
  { username: 'skyler_blue', password: 'password123', avatar: '💙', vibe: 'Not Great', score: -18 },
  { username: 'jamie_rough', password: 'password123', avatar: '⛈️', vibe: 'Not Great', score: -22 },
  { username: 'drew_heavy', password: 'password123', avatar: '🌧️', vibe: 'Not Great', score: -24 },
  { username: 'finley_down', password: 'password123', avatar: '😞', vibe: 'Pretty Low', score: -28 },
  { username: 'dakota_sad', password: 'password123', avatar: '😢', vibe: 'Pretty Low', score: -32 },
  { username: 'remy_storm', password: 'password123', avatar: '⚡', vibe: 'Pretty Low', score: -34 },
  { username: 'cosmic_wanderer', password: 'password123', avatar: '🌌', vibe: 'Super Positive', score: 30 },
  { username: 'forest_dreamer', password: 'password123', avatar: '🌲', vibe: 'Pretty Good', score: 20 },
  { username: 'ocean_soul', password: 'password123', avatar: '🐚', vibe: 'Decent', score: 10 },
  { username: 'mountain_spirit', password: 'password123', avatar: '⛰️', vibe: 'Neutral', score: -1 },
  { username: 'desert_nomad', password: 'password123', avatar: '🌵', vibe: 'Meh', score: -10 },
  { username: 'arctic_explorer', password: 'password123', avatar: '🧊', vibe: 'Rock Bottom', score: -40 }
]

async function populateDatabase() {
  console.log('🌟 Starting database population...')
  console.log('🌟 Populating database with 30 diverse users...\n')

  try {
    // Check current users count
    const { data: existingUsers, error: countError } = await supabase
      .from('users')
      .select('id, username')
    
    if (countError) {
      console.error('Error checking existing users:', countError)
      return
    }

    console.log(`Found ${existingUsers.length} existing users`)
    
    let insertedCount = 0
    let skippedCount = 0

    for (const user of users) {
      // Check if user already exists
      const userExists = existingUsers.some(existing => existing.username === user.username)
      
      if (userExists) {
        console.log(`⏭️  Skipping ${user.username} - already exists`)
        skippedCount++
        continue
      }

      // Insert user
      const { data: newUser, error: userError } = await supabase
        .from('users')
        .insert([{
          username: user.username,
          password: user.password,
          avatar: user.avatar
        }])
        .select()
        .single()

      if (userError) {
        console.error(`❌ Error inserting user ${user.username}:`, userError)
        continue
      }

      console.log(`✅ Created user: ${user.username} (${user.avatar})`)

      // Insert current vibe
      const { error: vibeError } = await supabase
        .from('current_vibes')
        .insert([{
          user_id: newUser.id,
          vibe: user.vibe,
          score: user.score
        }])

      if (vibeError) {
        console.error(`❌ Error inserting vibe for ${user.username}:`, vibeError)
        continue
      }

      // Insert vibe history (add 1-3 historical entries for variety)
      const historyEntries = []
      const numHistory = Math.floor(Math.random() * 3) + 1 // 1-3 entries
      
      for (let i = 0; i < numHistory; i++) {
        const randomScore = user.score + (Math.random() * 20 - 10) // ±10 variation
        const clampedScore = Math.max(-50, Math.min(50, Math.round(randomScore)))
        const vibeInfo = getVibeFromScore(clampedScore)
        
        historyEntries.push({
          user_id: newUser.id,
          vibe: vibeInfo.vibe,
          score: clampedScore
        })
      }

      const { error: historyError } = await supabase
        .from('vibe_history')
        .insert(historyEntries)

      if (historyError) {
        console.error(`❌ Error inserting history for ${user.username}:`, historyError)
      }

      insertedCount++
      
      // Small delay to avoid overwhelming the database
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    console.log('\n🎉 Database population complete!')
    console.log(`📊 Summary:`)
    console.log(`   ✅ Inserted: ${insertedCount} new users`)
    console.log(`   ⏭️  Skipped: ${skippedCount} existing users`)
    console.log(`   🎯 Total users now: ${existingUsers.length + insertedCount}`)

    // Show vibe distribution
    console.log('\n📈 Vibe Distribution:')
    const vibeDistribution = {}
    users.forEach(user => {
      vibeDistribution[user.vibe] = (vibeDistribution[user.vibe] || 0) + 1
    })
    
    Object.entries(vibeDistribution).forEach(([vibe, count]) => {
      console.log(`   ${vibe}: ${count} users`)
    })

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

// Helper function to get vibe from score (copied from quiz.js)
function getVibeFromScore(totalScore) {
  if (totalScore >= 35) return { vibe: "Absolutely Radiant", emoji: "✨", color: "bg-yellow-400" }
  if (totalScore >= 25) return { vibe: "Super Positive", emoji: "😄", color: "bg-green-400" }
  if (totalScore >= 15) return { vibe: "Pretty Good", emoji: "😊", color: "bg-blue-400" }
  if (totalScore >= 5) return { vibe: "Decent", emoji: "🙂", color: "bg-teal" }
  if (totalScore >= -5) return { vibe: "Neutral", emoji: "😐", color: "bg-gray-400" }
  if (totalScore >= -15) return { vibe: "Meh", emoji: "😕", color: "bg-orange-400" }
  if (totalScore >= -25) return { vibe: "Not Great", emoji: "😞", color: "bg-red-400" }
  if (totalScore >= -35) return { vibe: "Pretty Low", emoji: "😢", color: "bg-purple-400" }
  return { vibe: "Rock Bottom", emoji: "😭", color: "bg-black" }
}

populateDatabase().catch(console.error)

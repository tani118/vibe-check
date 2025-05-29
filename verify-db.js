// Quick verification of database population
import { supabase } from './src/lib/supabase.js'

async function verifyPopulation() {
  console.log('🔍 Verifying database population...\n')
  
  try {
    // Get total user count
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, username, avatar')
      .order('id', { ascending: true })
    
    if (usersError) {
      console.error('Error fetching users:', usersError)
      return
    }
    
    console.log(`📊 Total users in database: ${users.length}`)
    console.log('\nRecent users added:')
    users.slice(-10).forEach(user => {
      console.log(`  ${user.id}: ${user.username} ${user.avatar}`)
    })
    
    // Get vibes distribution
    const { data: vibes, error: vibesError } = await supabase
      .from('current_vibes')
      .select('vibe, score')
    
    if (vibesError) {
      console.error('Error fetching vibes:', vibesError)
      return
    }
    
    console.log(`\n🎭 Total vibes recorded: ${vibes.length}`)
    
    // Count by vibe type
    const vibeDistribution = {}
    vibes.forEach(vibe => {
      vibeDistribution[vibe.vibe] = (vibeDistribution[vibe.vibe] || 0) + 1
    })
    
    console.log('\n📈 Vibe Distribution:')
    Object.entries(vibeDistribution)
      .sort(([,a], [,b]) => b - a)
      .forEach(([vibe, count]) => {
        console.log(`  ${vibe}: ${count} users`)
      })
    
    console.log('\n✅ Database verification complete!')
    
  } catch (error) {
    console.error('Verification error:', error)
  }
}

verifyPopulation()

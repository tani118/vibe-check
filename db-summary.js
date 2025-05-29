// Quick database summary
import { getAllUsers, getStarredUsers } from './src/lib/database.js'

async function showDatabaseSummary() {
  try {
    console.log('🎯 VIBE CHECKER DATABASE SUMMARY\n')
    
    const result = await getAllUsers()
    if (result.success) {
      const users = result.users
      console.log(`👥 Total Users: ${users.length}`)
      
      // Count users with vibes
      const usersWithVibes = users.filter(u => u.current_vibes && u.current_vibes.length > 0)
      console.log(`🎭 Users with Current Vibes: ${usersWithVibes.length}`)
      
      // Show vibe distribution
      const vibeStats = {}
      usersWithVibes.forEach(user => {
        const vibe = user.current_vibes[0].vibe
        vibeStats[vibe] = (vibeStats[vibe] || 0) + 1
      })
      
      console.log('\n📊 Vibe Distribution:')
      Object.entries(vibeStats)
        .sort(([,a], [,b]) => b - a)
        .forEach(([vibe, count]) => {
          console.log(`   ${vibe}: ${count} users`)
        })
      
      // Show some example users
      console.log('\n🌟 Sample Users:')
      users.slice(0, 5).forEach(user => {
        const vibe = user.current_vibes?.[0]
        console.log(`   ${user.username} ${user.avatar} - ${vibe ? vibe.vibe + ' (' + vibe.score + ')' : 'No vibe'}`)
      })
      
      console.log('\n✅ Database is ready for testing!')
      console.log('\n🚀 Try logging in as any user with password: "password123"')
      console.log('   Recommended test accounts:')
      console.log('   - demo_user_1 (original demo user)')
      console.log('   - alex_zen (Absolutely Radiant)')
      console.log('   - taylor_joy (Super Positive)')
      console.log('   - devon_tired (Meh)')
      console.log('   - arctic_explorer (Rock Bottom)')
      
    } else {
      console.error('Error fetching users:', result.error)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

showDatabaseSummary()

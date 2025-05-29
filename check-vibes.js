// Check the current_vibes table specifically
import { supabase } from './src/lib/supabase.js'

async function checkVibesTable() {
  console.log('🔍 Checking current_vibes table...\n')
  
  try {
    const { data: vibes, error } = await supabase
      .from('current_vibes')
      .select('*')
      .order('user_id', { ascending: true })
    
    if (error) {
      console.error('Error:', error)
      return
    }
    
    console.log(`📊 Found ${vibes.length} entries in current_vibes table:`)
    vibes.forEach(vibe => {
      console.log(`   User ${vibe.user_id}: ${vibe.vibe} (${vibe.score})`)
    })
    
    // Check vibe_history too
    const { data: history, error: historyError } = await supabase
      .from('vibe_history')
      .select('*')
      .order('user_id', { ascending: true })
    
    if (historyError) {
      console.error('History error:', historyError)
      return
    }
    
    console.log(`\n📈 Found ${history.length} entries in vibe_history table`)
    
  } catch (error) {
    console.error('Error:', error)
  }
}

checkVibesTable()

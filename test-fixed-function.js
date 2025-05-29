// Test the fixed getStarredUsers function
import { getStarredUsers } from './src/lib/database.js'

async function testFixedFunction() {
  console.log('🔧 Testing fixed getStarredUsers function...\n')
  
  const result = await getStarredUsers(1)
  
  if (result.success) {
    console.log('✅ getStarredUsers SUCCESS!')
    console.log('Result:', JSON.stringify(result.starredUsers, null, 2))
  } else {
    console.error('❌ getStarredUsers FAILED:', result.error)
  }
}

testFixedFunction().catch(console.error)

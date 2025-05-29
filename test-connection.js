// Simple test to check database connection
import { supabase } from './src/lib/supabase.js'

async function testConnection() {
  console.log('Testing database connection...')
  
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, username')
      .limit(5)
    
    if (error) {
      console.error('Connection error:', error)
    } else {
      console.log('✅ Database connection successful')
      console.log('Users table accessible')
    }
  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

testConnection()

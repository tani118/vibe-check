import { supabase } from './src/lib/supabase.js'

console.log('🔗 Testing Supabase connection...')

// Test basic connectivity
supabase
  .from('users')
  .select('count', { count: 'exact', head: true })
  .then(({ data, error, count }) => {
    if (error) {
      console.error('❌ Supabase connection failed:', error.message)
      console.log('🔍 Error details:', error)
    } else {
      console.log('✅ Supabase connected successfully!')
      console.log(`📊 Users table has ${count} records`)
    }
  })
  .catch(err => {
    console.error('❌ Connection test failed:', err.message)
  })

// Test table structure
supabase
  .from('users')
  .select('*')
  .limit(1)
  .then(({ data, error }) => {
    if (error) {
      console.error('❌ Table query failed:', error.message)
      if (error.message.includes('relation "users" does not exist')) {
        console.log('💡 The "users" table does not exist. You need to run the database schema first.')
        console.log('📋 Check database-schema.sql for the required tables.')
      }
    } else {
      console.log('✅ Users table accessible')
      console.log('📋 Sample data:', data)
    }
  })

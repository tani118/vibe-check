// Create loved_playlists table in Supabase
import { supabase } from './src/lib/supabase.js'

const createLovedPlaylistsTable = async () => {
  try {
    console.log('Creating loved_playlists table...')
    
    // Create the table
    const { error } = await supabase.rpc('create_loved_playlists_table', {}, {
      count: 'exact'
    })
    
    if (error) {
      console.error('Error creating table:', error)
      
      // Try alternative approach using direct SQL
      console.log('Trying alternative approach...')
      const { error: sqlError } = await supabase
        .from('loved_playlists')
        .select('count(*)', { count: 'exact' })
      
      if (sqlError && sqlError.code === '42P01') {
        console.log('Table does not exist. Please run the SQL manually in Supabase dashboard:')
        console.log(`
-- Loved playlists table (stores user's favorite playlists)
CREATE TABLE loved_playlists (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  playlist_id VARCHAR(50) NOT NULL,
  playlist_name VARCHAR(255) NOT NULL,
  playlist_description TEXT,
  playlist_image_url TEXT,
  vibe_category VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, playlist_id)
);

-- Create indexes for better performance
CREATE INDEX idx_loved_playlists_user_id ON loved_playlists(user_id);
CREATE INDEX idx_loved_playlists_vibe_category ON loved_playlists(vibe_category);
        `)
      } else {
        console.log('Table already exists or other error:', sqlError)
      }
    } else {
      console.log('Table created successfully!')
    }
    
  } catch (error) {
    console.error('Caught error:', error)
  }
}

// Test the table exists by trying to query it
const testTable = async () => {
  try {
    console.log('Testing loved_playlists table...')
    const { data, error } = await supabase
      .from('loved_playlists')
      .select('count(*)', { count: 'exact' })
    
    if (error) {
      console.error('Table test failed:', error)
      return false
    }
    
    console.log('Table test successful! Row count:', data.length)
    return true
  } catch (error) {
    console.error('Table test error:', error)
    return false
  }
}

// Run the setup
const setup = async () => {
  console.log('=== Setting up loved_playlists table ===')
  await createLovedPlaylistsTable()
  await testTable()
  console.log('=== Setup complete ===')
}

setup()

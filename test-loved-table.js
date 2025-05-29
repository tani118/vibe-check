// Simple test for loved_playlists table
import { supabase } from './src/lib/supabase.js'

const testTable = async () => {
  try {
    console.log('Testing if loved_playlists table exists...')
    const { data, error } = await supabase
      .from('loved_playlists')
      .select('*')
      .limit(1)
    
    if (error) {
      if (error.code === '42P01') {
        console.log('❌ Table does not exist.')
        console.log('\nPlease run this SQL in your Supabase dashboard:')
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
        return false
      } else {
        console.error('Other error:', error)
        return false
      }
    }
    
    console.log('✅ Table exists! Found', data.length, 'rows')
    return true
  } catch (error) {
    console.error('Caught error:', error)
    return false
  }
}

testTable()

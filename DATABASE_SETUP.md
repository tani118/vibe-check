# Database Setup Instructions

## Create the loved_playlists table in Supabase

### Method 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase Dashboard
2. Navigate to the SQL Editor
3. Copy and paste the following SQL and run it:

```sql
-- Create the loved_playlists table
CREATE TABLE IF NOT EXISTS loved_playlists (
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
CREATE INDEX IF NOT EXISTS idx_loved_playlists_user_id ON loved_playlists(user_id);
CREATE INDEX IF NOT EXISTS idx_loved_playlists_vibe_category ON loved_playlists(vibe_category);

-- Verify table creation
SELECT 
  table_name, 
  column_name, 
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'loved_playlists'
ORDER BY ordinal_position;
```

### Method 2: Using Table Editor

1. Go to Table Editor in Supabase Dashboard
2. Click "New table"
3. Set table name: `loved_playlists`
4. Add the following columns:

| Column Name | Type | Default | Primary | Not Null | Unique |
|-------------|------|---------|---------|----------|--------|
| id | int8 | auto-increment | ✓ | ✓ | ✓ |
| user_id | int4 | | | ✓ | |
| playlist_id | varchar(50) | | | ✓ | |
| playlist_name | varchar(255) | | | ✓ | |
| playlist_description | text | | | | |
| playlist_image_url | text | | | | |
| vibe_category | varchar(100) | | | ✓ | |
| created_at | timestamptz | now() | | ✓ | |

5. Add Foreign Key:
   - Column: user_id
   - Referenced table: users
   - Referenced column: id
   - On delete: CASCADE

6. Add Unique Constraint:
   - Columns: user_id, playlist_id

## Verification

After creating the table, you can verify it works by running this test in the browser console:

```javascript
// Test the love functionality
const testPlaylist = {
  id: 'test_' + Date.now(),
  name: 'Test Playlist',
  description: 'Test description',
  image: 'https://example.com/test.jpg'
};

// Assuming you have a logged-in user
const userId = 1; // Replace with actual user ID

// Test loving a playlist
lovePlaylist(userId, testPlaylist, 'happy').then(result => {
  console.log('Love result:', result);
});
```

## Current Status

✅ Database functions implemented with localStorage fallback
✅ UI components updated to use database functions
✅ Profile page displays loved playlists
🔄 **PENDING**: Create the loved_playlists table in Supabase

Once the table is created, the app will automatically switch from localStorage fallback to database storage.

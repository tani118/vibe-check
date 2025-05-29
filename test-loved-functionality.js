import { supabase } from './src/lib/supabase.js';
import { 
  lovePlaylist, 
  unlovePlaylist, 
  getUserLovedPlaylists, 
  isPlaylistLoved,
  togglePlaylistLove 
} from './src/lib/database.js';

async function testLovedPlaylistsTable() {
  console.log('=== Testing loved_playlists functionality ===\n');
  
  try {
    // Test getting a test user
    console.log('1. Testing with sample user...');
    const { data: users, error: userError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (userError || !users || users.length === 0) {
      console.log('❌ No users found for testing');
      return;
    }
    
    const testUser = users[0];
    console.log(`✅ Using test user: ${testUser.username} (ID: ${testUser.id})`);
    
    // Test playlist functions
    console.log('\n2. Testing playlist love functions...');
    
    const testPlaylist = {
      id: 'test_playlist_' + Date.now(),
      name: 'Test Playlist',
      description: 'A test playlist for functionality testing',
      image: 'https://example.com/test.jpg'
    };
    
    // Test isPlaylistLoved (should be false initially)
    console.log('Testing isPlaylistLoved...');
    const isLovedResult = await isPlaylistLoved(testUser.id, testPlaylist.id);
    console.log(`Initial love status result:`, isLovedResult);
    
    if (isLovedResult.success) {
      console.log(`Initial love status: ${isLovedResult.isLoved}`);
    }
    
    // Test lovePlaylist
    console.log('\nTesting lovePlaylist...');
    const loveResult = await lovePlaylist(testUser.id, testPlaylist, 'happy');
    console.log('Love result:', loveResult);
    
    // Test isPlaylistLoved again (should be true now)
    console.log('\nTesting isPlaylistLoved after loving...');
    const isLovedAfterResult = await isPlaylistLoved(testUser.id, testPlaylist.id);
    console.log(`Love status after loving result:`, isLovedAfterResult);
    
    if (isLovedAfterResult.success) {
      console.log(`Love status after loving: ${isLovedAfterResult.isLoved}`);
    }
    
    // Test getUserLovedPlaylists
    console.log('\nTesting getUserLovedPlaylists...');
    const userPlaylistsResult = await getUserLovedPlaylists(testUser.id);
    console.log('User playlists result:', userPlaylistsResult);
    
    if (userPlaylistsResult.success) {
      console.log(`User's loved playlists count: ${userPlaylistsResult.playlists.length}`);
    }
    
    // Test unlovePlaylist
    console.log('\nTesting unlovePlaylist...');
    const unloveResult = await unlovePlaylist(testUser.id, testPlaylist.id);
    console.log('Unlove result:', unloveResult);
    
    // Final check
    console.log('\nFinal love status check...');
    const isFinalLovedResult = await isPlaylistLoved(testUser.id, testPlaylist.id);
    console.log('Final result:', isFinalLovedResult);
    
    if (isFinalLovedResult.success) {
      console.log(`Final love status: ${isFinalLovedResult.isLoved}`);
    }
    
    console.log('\n✅ All tests completed!');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    console.error('Stack:', error.stack);
  }
}

testLovedPlaylistsTable();

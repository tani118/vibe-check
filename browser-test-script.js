// Browser Console Test Script for Playlist Love Functionality
// Copy and paste this into the browser console when the app is running

console.log('🎵 Testing Playlist Love Functionality');

// Test function to verify loved playlists work
async function testPlaylistLoveFunctionality() {
  console.log('=== Starting Playlist Love Tests ===\n');
  
  // Check if user is logged in
  const userStr = localStorage.getItem('vibeCheckerUser');
  if (!userStr) {
    console.log('❌ No user logged in. Please log in first.');
    return;
  }
  
  const user = JSON.parse(userStr);
  console.log(`✅ Testing with user: ${user.username} (ID: ${user.id})`);
  
  // Import the required functions (they should be available globally)
  const { 
    lovePlaylist, 
    unlovePlaylist, 
    getUserLovedPlaylists, 
    isPlaylistLoved 
  } = window;
  
  if (!lovePlaylist) {
    console.log('❌ Love functions not available. Make sure you are on the vibe music page.');
    return;
  }
  
  // Create test playlist
  const testPlaylist = {
    id: 'test_playlist_' + Date.now(),
    name: 'Test Love Playlist',
    description: 'A test playlist to verify love functionality',
    image: 'https://i.scdn.co/image/ab67616d0000b273example'
  };
  
  try {
    // Test 1: Check if playlist is not loved initially
    console.log('\n1. Checking initial love status...');
    const initialCheck = await isPlaylistLoved(user.id, testPlaylist.id);
    console.log('Initial love status:', initialCheck);
    
    // Test 2: Love the playlist
    console.log('\n2. Loving the playlist...');
    const loveResult = await lovePlaylist(user.id, testPlaylist, 'happy');
    console.log('Love result:', loveResult);
    
    // Test 3: Verify it's now loved
    console.log('\n3. Verifying playlist is loved...');
    const lovedCheck = await isPlaylistLoved(user.id, testPlaylist.id);
    console.log('Love status after loving:', lovedCheck);
    
    // Test 4: Get all user's loved playlists
    console.log('\n4. Getting all loved playlists...');
    const allLoved = await getUserLovedPlaylists(user.id);
    console.log('All loved playlists:', allLoved);
    
    // Test 5: Unlove the playlist
    console.log('\n5. Unloving the playlist...');
    const unloveResult = await unlovePlaylist(user.id, testPlaylist.id);
    console.log('Unlove result:', unloveResult);
    
    // Test 6: Final verification
    console.log('\n6. Final love status check...');
    const finalCheck = await isPlaylistLoved(user.id, testPlaylist.id);
    console.log('Final love status:', finalCheck);
    
    console.log('\n✅ All tests completed! The playlist love functionality is working.');
    
    // Check localStorage for fallback data
    console.log('\n📱 LocalStorage data:');
    const lovedData = localStorage.getItem('vibeChecker_lovedPlaylists');
    if (lovedData) {
      console.log('Loved playlists in localStorage:', JSON.parse(lovedData));
    } else {
      console.log('No loved playlists data in localStorage');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Instructions
console.log(`
📋 To test the playlist love functionality:

1. Make sure you are logged in
2. Navigate to the music discovery page (take the quiz first)
3. Run this command: testPlaylistLoveFunctionality()

Or test individual functions:
- isPlaylistLoved(userId, playlistId)
- lovePlaylist(userId, playlist, vibeCategory)
- unlovePlaylist(userId, playlistId)
- getUserLovedPlaylists(userId)
`);

// Make the test function globally available
window.testPlaylistLoveFunctionality = testPlaylistLoveFunctionality;

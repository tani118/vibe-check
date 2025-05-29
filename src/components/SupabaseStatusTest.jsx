import React, { useEffect, useState } from 'react'
import { loginUser, getAllUsers, getCurrentVibe } from '../lib/database'

const SupabaseStatusTest = () => {
  const [status, setStatus] = useState('Testing Supabase connection...')
  const [results, setResults] = useState([])

  useEffect(() => {
    const runTests = async () => {
      const testResults = []
      
      try {
        // Test 1: Get all users
        testResults.push('🔍 Testing getAllUsers...')
        const usersResult = await getAllUsers()
        if (usersResult.success) {
          testResults.push(`✅ Found ${usersResult.users.length} users`)
          testResults.push(`📋 Users: ${usersResult.users.map(u => u.username).join(', ')}`)
        } else {
          testResults.push(`❌ getAllUsers failed: ${usersResult.error}`)
        }

        // Test 2: Test login
        testResults.push('🔐 Testing login with demo_user_1...')
        const loginResult = await loginUser('demo_user_1', 'password123')
        if (loginResult.success) {
          testResults.push(`✅ Login successful for user: ${loginResult.user.username}`)
          
          // Test 3: Get current vibe for this user
          testResults.push('🎭 Testing getCurrentVibe...')
          const vibeResult = await getCurrentVibe(loginResult.user.id)
          if (vibeResult.success) {
            testResults.push(`✅ Current vibe: ${vibeResult.vibe.vibe} (score: ${vibeResult.vibe.score})`)
          } else {
            testResults.push(`❌ getCurrentVibe failed: ${vibeResult.error}`)
          }
        } else {
          testResults.push(`❌ Login failed: ${loginResult.error}`)
        }

        setStatus('✅ All tests completed')
      } catch (error) {
        testResults.push(`❌ Test error: ${error.message}`)
        setStatus('❌ Tests failed with error')
      }
      
      setResults(testResults)
    }

    runTests()
  }, [])

  return (
    <div className="fixed top-4 right-4 bg-black/90 text-white p-4 rounded-lg backdrop-blur z-50 max-w-md max-h-96 overflow-y-auto">
      <h3 className="font-bold mb-2 text-green-400">Supabase Status</h3>
      <p className="text-sm mb-3 font-semibold">{status}</p>
      <div className="text-xs space-y-1">
        {results.map((result, index) => (
          <div key={index} className="border-l-2 border-blue-600 pl-2 py-1">
            {result}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SupabaseStatusTest

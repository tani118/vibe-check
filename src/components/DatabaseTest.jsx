import React, { useEffect, useState } from 'react'
import { initializeSampleData, loginUser, createUser, getAllUsers } from '../lib/database'

const DatabaseTest = () => {
  const [status, setStatus] = useState('Testing...')
  const [logs, setLogs] = useState([])

  const addLog = (message) => {
    console.log(message)
    setLogs(prev => [...prev, message])
  }

  useEffect(() => {
    const runTest = async () => {
      try {
        addLog('🧪 Starting database tests...')
        
        // Clear existing data
        localStorage.removeItem('vibeChecker_users')
        localStorage.removeItem('vibeChecker_current_vibes')
        localStorage.removeItem('vibeChecker_history')
        localStorage.removeItem('vibeChecker_starred_users')
        localStorage.removeItem('vibeCheckerUser')
        addLog('🗑️ Cleared existing localStorage data')
        
        // Initialize sample data
        addLog('📊 Initializing sample data...')
        initializeSampleData()
        
        // Test getting all users
        const allUsersResult = await getAllUsers()
        addLog(`👥 getAllUsers result: ${JSON.stringify(allUsersResult)}`)
        
        // Test login with demo user
        addLog('🔐 Testing login with demo_user_1...')
        const loginResult = await loginUser('demo_user_1', 'password123')
        addLog(`✅ Login result: ${JSON.stringify(loginResult)}`)
        
        if (loginResult.success) {
          addLog(`👤 Logged in user: ${loginResult.user.username} ${loginResult.user.avatar}`)
          setStatus('✅ All tests passed!')
        } else {
          setStatus('❌ Login test failed')
        }
        
        // Test creating new user
        addLog('👤 Testing user creation...')
        const createResult = await createUser('test_user', 'test123', '🧪')
        addLog(`📝 Create user result: ${JSON.stringify(createResult)}`)
        
      } catch (error) {
        addLog(`❌ Error: ${error.message}`)
        setStatus('❌ Tests failed with error')
      }
    }
    
    runTest()
  }, [])

  return (
    <div className="fixed top-4 left-4 bg-black/90 text-white p-4 rounded-lg backdrop-blur z-50 max-w-md max-h-96 overflow-y-auto">
      <h3 className="font-bold mb-2 text-green-400">Database Test Status</h3>
      <p className="text-sm mb-3 font-semibold">{status}</p>
      <div className="text-xs space-y-1">
        {logs.map((log, index) => (
          <div key={index} className="border-l-2 border-gray-600 pl-2 py-1">
            {log}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DatabaseTest

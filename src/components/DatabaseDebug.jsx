import React, { useEffect, useState } from 'react'
import { createUser, loginUser, initializeSampleData, getAllUsers } from '../lib/database'

const DatabaseDebug = () => {
  const [status, setStatus] = useState('Testing...')
  const [users, setUsers] = useState([])

  useEffect(() => {
    const runTests = async () => {
      try {
        console.log('🔄 Running database tests...')
        
        // Test localStorage access
        localStorage.setItem('test', 'working')
        const testResult = localStorage.getItem('test')
        console.log('✅ localStorage test:', testResult)
        
        // Initialize sample data
        initializeSampleData()
        console.log('✅ Sample data initialized')
        
        // Get all users
        const allUsersResult = await getAllUsers()
        console.log('✅ All users result:', allUsersResult)
        setUsers(allUsersResult.success ? allUsersResult.users : [])
        
        // Test user creation
        const createResult = await createUser('debug_user', 'test123', '🛠️')
        console.log('✅ Create user result:', createResult)
        
        // Test login
        const loginResult = await loginUser('debug_user', 'test123')
        console.log('✅ Login result:', loginResult)
        
        setStatus('All tests passed! ✅')
      } catch (error) {
        console.error('❌ Database test error:', error)
        setStatus(`Error: ${error.message}`)
      }
    }
    
    runTests()
  }, [])

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg backdrop-blur z-50 max-w-sm">
      <h3 className="font-bold mb-2">Database Debug</h3>
      <p className="text-sm mb-2">{status}</p>
      <div className="text-xs">
        <p>Users in database: {users.length}</p>
        {users.slice(0, 3).map(user => (
          <p key={user.id}>• {user.username}</p>
        ))}
      </div>
    </div>
  )
}

export default DatabaseDebug

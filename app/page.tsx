'use client'

import { useState, useEffect } from 'react'
import LoginPage from '@/components/LoginPage'
import Dashboard from '@/components/Dashboard'
import { getAuthSession, clearAuthSession } from '@/lib/auth'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [deviceId, setDeviceId] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const session = getAuthSession()
    if (session) {
      setIsAuthenticated(true)
      setDeviceId(session.deviceId)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (id: string) => {
    setIsAuthenticated(true)
    setDeviceId(id)
  }

  const handleLogout = () => {
    clearAuthSession()
    setIsAuthenticated(false)
    setDeviceId('')
  }

  // Show loading state while checking session
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  return <Dashboard deviceId={deviceId} onLogout={handleLogout} />
}

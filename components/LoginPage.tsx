'use client'

import { useState } from 'react'
import { Lock } from 'lucide-react'
import { saveAuthSession, validateCredentials } from '@/lib/auth'

interface LoginPageProps {
  onLogin: (deviceId: string) => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [deviceId, setDeviceId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [rememberMe, setRememberMe] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (validateCredentials(deviceId, password)) {
      // Save session to localStorage
      if (rememberMe) {
        saveAuthSession(deviceId, password)
      }
      onLogin(deviceId)
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mb-6">
            <img
              src="/logo.png"
              alt="Carbelim Logo"
              className="h-12 w-auto object-contain mx-auto"
            />
          </div>
          <h1 className="text-xl font-bold text-gray-800">Environmental Monitoring</h1>
          <p className="text-sm text-gray-500 mt-1">Dashboard Login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Device ID
            </label>
            <input
              type="text"
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Enter Device ID"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Enter Password"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700 cursor-pointer">
              Keep me logged in (7 days)
            </label>
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition font-medium text-sm"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

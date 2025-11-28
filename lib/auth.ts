// Authentication utilities for session management

interface AuthSession {
  deviceId: string
  token: string
  expiresAt: number
}

const AUTH_KEY = 'monitoring_dashboard_auth'
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds

// Save authentication session
export function saveAuthSession(deviceId: string, password: string): void {
  const session: AuthSession = {
    deviceId,
    token: btoa(`${deviceId}:${password}`), // Base64 encode for simple token (use JWT in production)
    expiresAt: Date.now() + SESSION_DURATION
  }

  localStorage.setItem(AUTH_KEY, JSON.stringify(session))
}

// Get current session
export function getAuthSession(): AuthSession | null {
  try {
    const stored = localStorage.getItem(AUTH_KEY)
    if (!stored) return null

    const session: AuthSession = JSON.parse(stored)

    // Check if session expired
    if (Date.now() > session.expiresAt) {
      clearAuthSession()
      return null
    }

    return session
  } catch (error) {
    console.error('Failed to parse auth session:', error)
    clearAuthSession()
    return null
  }
}

// Clear authentication session
export function clearAuthSession(): void {
  localStorage.removeItem(AUTH_KEY)
}

// Validate credentials (mock validation - replace with API call in production)
export function validateCredentials(deviceId: string, password: string): boolean {
  // Mock validation - in production, this would be an API call
  return deviceId === 'IOTS1250001' && password === 'TESTPASS001'
}

// Decode token to get device ID
export function getDeviceIdFromToken(token: string): string | null {
  try {
    const decoded = atob(token)
    const [deviceId] = decoded.split(':')
    return deviceId
  } catch (error) {
    console.error('Failed to decode token:', error)
    return null
  }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  const session = getAuthSession()
  return session !== null
}

// Extend session (refresh expiration)
export function extendSession(): void {
  const session = getAuthSession()
  if (session) {
    session.expiresAt = Date.now() + SESSION_DURATION
    localStorage.setItem(AUTH_KEY, JSON.stringify(session))
  }
}

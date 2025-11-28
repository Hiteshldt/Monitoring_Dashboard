# API Integration Guide

This dashboard is fully customizable and ready for real endpoint integration. Here's how to connect it to your live API.

## Current Architecture

The dashboard uses **mock data** generated in `lib/mockData.ts`. To connect to real endpoints, you'll replace this with actual API calls.

## Step 1: Create API Service

Create a new file `lib/api.ts`:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// Fetch sensor data from API
export async function fetchSensorData(deviceId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/devices/${deviceId}/sensors`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Failed to fetch sensor data:', error)
    throw error
  }
}

// Update relay state
export async function updateRelayState(deviceId: string, relayId: number, state: boolean) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/devices/${deviceId}/relays/${relayId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify({ state })
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Failed to update relay:', error)
    throw error
  }
}

// Set relay mode (auto/manual)
export async function setRelayMode(deviceId: string, mode: 'auto' | 'manual') {
  try {
    const response = await fetch(`${API_BASE_URL}/api/devices/${deviceId}/relays/mode`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify({ mode })
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Failed to set relay mode:', error)
    throw error
  }
}

// Fetch historical data
export async function fetchHistoricalData(deviceId: string, days: number) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/devices/${deviceId}/history?days=${days}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        }
      }
    )

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Failed to fetch historical data:', error)
    throw error
  }
}

// Authentication
export async function authenticate(deviceId: string, password: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ deviceId, password })
    })

    if (!response.ok) {
      throw new Error('Invalid credentials')
    }

    const data = await response.json()

    // Store auth session using built-in auth utility
    saveAuthSession(deviceId, data.token)

    return data
  } catch (error) {
    console.error('Authentication failed:', error)
    throw error
  }
}

function getAuthToken(): string {
  const session = getAuthSession()
  return session?.token || ''
}
```

## Step 2: Update Dashboard Component

Modify `components/Dashboard.tsx`:

```typescript
'use client'

import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Overview from './sections/Overview'
import Sensors from './sections/Sensors'
import Impact from './sections/Impact'
import RelayControl from './sections/RelayControl'
import Analytics from './sections/Analytics'
import { fetchSensorData } from '@/lib/api' // Import API function
import type { DashboardData } from '@/types'

interface DashboardProps {
  deviceId: string
  onLogout: () => void
}

export default function Dashboard({ deviceId, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [data, setData] = useState<DashboardData | null>(null)
  const [relayMode, setRelayMode] = useState<'auto' | 'manual'>('auto')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch initial data
    loadData()

    // Refresh data every 5 seconds
    const interval = setInterval(loadData, 5000)

    return () => clearInterval(interval)
  }, [deviceId])

  const loadData = async () => {
    try {
      const apiData = await fetchSensorData(deviceId)
      setData(apiData)
      setError(null)
    } catch (err) {
      setError('Failed to load data')
      console.error(err)
    }
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={loadData} className="px-4 py-2 bg-blue-600 text-white rounded">
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview data={data} />
      case 'sensors':
        return <Sensors data={data} />
      case 'impact':
        return <Impact data={data} />
      case 'relays':
        return <RelayControl data={data} mode={relayMode} setMode={setRelayMode} deviceId={deviceId} />
      case 'analytics':
        return <Analytics deviceId={deviceId} />
      default:
        return <Overview data={data} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        deviceId={deviceId}
        onLogout={onLogout}
      />

      <div className="flex-1 overflow-auto">
        <div className="p-5">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
```

## Step 3: Update Login Component

The login component already handles authentication persistence using `lib/auth.ts`.

When connecting to your API, update `lib/auth.ts`:

```typescript
// In lib/auth.ts, update the validateCredentials function:

export async function validateCredentials(deviceId: string, password: string): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId, password })
    })

    if (!response.ok) return false

    const data = await response.json()
    // Store the JWT token returned from your API
    saveAuthSession(deviceId, data.token)
    return true
  } catch (error) {
    console.error('Authentication failed:', error)
    return false
  }
}
```

## Step 4: Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_API_URL=https://your-api-endpoint.com
```

## Step 5: Expected API Response Format

Your API should return data in this format:

### GET `/api/devices/{deviceId}/sensors`
```json
{
  "inlet": {
    "aqi": 125,
    "pm10": 72,
    "pm25": 48,
    "pm1": 34,
    "co2": 680,
    "o2": 20.7,
    "temperature": 29.5,
    "humidity": 58.2
  },
  "outlet": {
    "aqi": 110,
    "pm10": 62,
    "pm25": 42,
    "pm1": 30,
    "co2": 640,
    "o2": 20.9,
    "temperature": 28.2,
    "humidity": 60.5
  },
  "main": {
    "ph": 7.2,
    "waterTemp": 24.8,
    "waterLevel": 78.5
  },
  "relays": [true, true, false, false, false, false, false, false]
}
```

### POST `/api/auth/login`
**Request:**
```json
{
  "deviceId": "IOTS1250001",
  "password": "TESTPASS001"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "deviceId": "IOTS1250001",
  "expiresIn": 3600
}
```

## Step 6: WebSocket Support (Optional)

For real-time updates, you can add WebSocket support:

```typescript
// lib/websocket.ts
export function connectWebSocket(deviceId: string, onMessage: (data: any) => void) {
  const ws = new WebSocket(`wss://your-api.com/ws/devices/${deviceId}`)

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)
    onMessage(data)
  }

  ws.onerror = (error) => {
    console.error('WebSocket error:', error)
  }

  return ws
}
```

Then in Dashboard:

```typescript
useEffect(() => {
  const ws = connectWebSocket(deviceId, (newData) => {
    setData(newData)
  })

  return () => ws.close()
}, [deviceId])
```

## Summary

**Current State:** Uses mock data from `lib/mockData.ts`

**To Go Live:**
1. Create `lib/api.ts` with your API endpoints
2. Update `Dashboard.tsx` to use `fetchSensorData()` instead of `generateMockData()`
3. Update `LoginPage.tsx` to use `authenticate()` API call
4. Add `.env.local` with your API URL
5. Ensure your API returns data in the expected format

**The entire UI is ready** - you just need to swap the data source from mock to API!

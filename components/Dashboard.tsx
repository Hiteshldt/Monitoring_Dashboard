'use client'

import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Overview from './sections/Overview'
import Sensors from './sections/Sensors'
import Impact from './sections/Impact'
import RelayControl from './sections/RelayControl'
import Analytics from './sections/Analytics'
import { generateMockData } from '@/lib/mockData'
import { extendSession } from '@/lib/auth'
import type { DashboardData } from '@/types'

interface DashboardProps {
  deviceId: string
  onLogout: () => void
}

export default function Dashboard({ deviceId, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [data, setData] = useState<DashboardData | null>(null)
  const [relayMode, setRelayMode] = useState<'auto' | 'manual'>('auto')

  useEffect(() => {
    // Initial data load
    setData(generateMockData())

    // Update data every 5 seconds
    const interval = setInterval(() => {
      setData(generateMockData())
    }, 5000)

    // Extend session every 30 minutes (keep user logged in while active)
    const sessionInterval = setInterval(() => {
      extendSession()
    }, 30 * 60 * 1000)

    return () => {
      clearInterval(interval)
      clearInterval(sessionInterval)
    }
  }, [])

  if (!data) return null

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview data={data} />
      case 'sensors':
        return <Sensors data={data} />
      case 'impact':
        return <Impact data={data} />
      case 'relays':
        return <RelayControl data={data} mode={relayMode} setMode={setRelayMode} />
      case 'analytics':
        return <Analytics />
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
        <div className="p-4">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

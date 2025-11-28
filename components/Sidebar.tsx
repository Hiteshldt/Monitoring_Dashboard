'use client'

import {
  LayoutDashboard,
  Gauge,
  TrendingUp,
  Power,
  BarChart3,
  LogOut
} from 'lucide-react'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  deviceId: string
  onLogout: () => void
}

const menuItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'sensors', label: 'Sensors', icon: Gauge },
  { id: 'impact', label: 'Impact', icon: TrendingUp },
  { id: 'relays', label: 'Relay Control', icon: Power },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
]

export default function Sidebar({ activeTab, setActiveTab, deviceId, onLogout }: SidebarProps) {
  return (
    <div className="w-64 bg-slate-800 text-white flex flex-col">
      <div className="p-4 border-b border-slate-700">
        <h1 className="text-base font-bold">Monitoring Dashboard</h1>
        <p className="text-xs text-slate-400 mt-0.5">{deviceId}</p>
      </div>

      <nav className="flex-1 p-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg mb-0.5 transition text-sm ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="p-2 border-t border-slate-700">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:bg-red-600 hover:text-white transition text-sm"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

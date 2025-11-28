import { Power } from 'lucide-react'
import type { DashboardData } from '@/types'

interface RelayControlProps {
  data: DashboardData
  mode: 'auto' | 'manual'
  setMode: (mode: 'auto' | 'manual') => void
}

const relayConfig = [
  { id: 1, name: 'Circulation Pump', schedule: 'Daily 6AM - 10PM' },
  { id: 2, name: 'Air Pump', schedule: 'Daily 6AM - 10PM' },
  { id: 3, name: 'LED Light', schedule: 'Daily 5PM - 10PM' },
  { id: 4, name: 'Fan Module', schedule: 'Daily 5PM - 10PM' },
  { id: 5, name: 'Reserve 1', schedule: 'Not Configured' },
  { id: 6, name: 'Reserve 2', schedule: 'Not Configured' },
  { id: 7, name: 'Reserve 3', schedule: 'Not Configured' },
  { id: 8, name: 'Reserve 4', schedule: 'Not Configured' },
]

export default function RelayControl({ data, mode, setMode }: RelayControlProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Relay Control</h2>
          <p className="text-sm text-gray-500 mt-0.5">Equipment operations management</p>
        </div>

        <div className="flex gap-1.5 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setMode('auto')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              mode === 'auto'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Auto Mode
          </button>
          <button
            onClick={() => setMode('manual')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              mode === 'manual'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Manual Mode
          </button>
        </div>
      </div>

      {mode === 'auto' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            <strong>Auto Mode:</strong> Relays controlled by schedules. Manual toggles disabled.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {relayConfig.map((relay, index) => (
          <RelayCard
            key={relay.id}
            relay={relay}
            isActive={data.relays[index]}
            mode={mode}
          />
        ))}
      </div>
    </div>
  )
}

function RelayCard({
  relay,
  isActive,
  mode
}: {
  relay: typeof relayConfig[0]
  isActive: boolean
  mode: 'auto' | 'manual'
}) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-2.5">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Power size={14} className={isActive ? 'text-green-600' : 'text-gray-400'} />
            <h4 className="text-sm font-semibold text-gray-800">Relay {relay.id}</h4>
          </div>
          <p className="text-sm font-medium text-gray-700 mb-1 truncate">{relay.name}</p>
          <p className="text-xs text-gray-500">{relay.schedule}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
        <span className={`text-sm font-semibold ${isActive ? 'text-green-600' : 'text-gray-500'}`}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
        <button
          disabled={mode === 'auto'}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
            mode === 'auto'
              ? 'cursor-not-allowed opacity-50'
              : 'cursor-pointer'
          } ${
            isActive ? 'bg-green-600' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
              isActive ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  )
}

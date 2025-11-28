import { Activity, Droplet, Wind, Zap } from 'lucide-react'
import type { DashboardData } from '@/types'

interface OverviewProps {
  data: DashboardData
}

export default function Overview({ data }: OverviewProps) {
  const aqiImprovement = Math.round(data.inlet.aqi - data.outlet.aqi)
  const co2Reduction = Math.round(data.inlet.co2 - data.outlet.co2)

  return (
    <div className="space-y-3">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-gray-800">Dashboard Overview</h2>
        <p className="text-sm text-gray-500 mt-0.5">Real-time environmental monitoring</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs text-gray-500 uppercase font-medium mb-1.5">AQI Improvement</p>
              <p className="text-2xl font-bold text-green-600">-{aqiImprovement}</p>
            </div>
            <div className="w-11 h-11 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Wind className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs text-gray-500 uppercase font-medium mb-1.5">CO₂ Reduction</p>
              <p className="text-2xl font-bold text-blue-600">-{co2Reduction}</p>
              <p className="text-xs text-gray-500 mt-0.5">ppm</p>
            </div>
            <div className="w-11 h-11 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs text-gray-500 uppercase font-medium mb-1.5">Water pH</p>
              <p className="text-2xl font-bold text-purple-600">{data.main.ph}</p>
            </div>
            <div className="w-11 h-11 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Droplet className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs text-gray-500 uppercase font-medium mb-1.5">Active Relays</p>
              <p className="text-2xl font-bold text-orange-600">
                {data.relays.filter(r => r).length}/8
              </p>
            </div>
            <div className="w-11 h-11 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Inlet vs Outlet Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800 mb-3 pb-2 border-b">Inlet Sensors</h3>
          <div className="grid grid-cols-2 gap-2.5">
            <MetricCard label="AQI" value={data.inlet.aqi} />
            <MetricCard label="PM2.5" value={data.inlet.pm25} unit="µg/m³" />
            <MetricCard label="PM10" value={data.inlet.pm10} unit="µg/m³" />
            <MetricCard label="CO₂" value={data.inlet.co2} unit="ppm" />
            <MetricCard label="O₂" value={data.inlet.o2} unit="%" />
            <MetricCard label="Temp" value={data.inlet.temperature} unit="°C" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800 mb-3 pb-2 border-b">Outlet Sensors</h3>
          <div className="grid grid-cols-2 gap-2.5">
            <MetricCard label="AQI" value={data.outlet.aqi} variant="success" />
            <MetricCard label="PM2.5" value={data.outlet.pm25} unit="µg/m³" variant="success" />
            <MetricCard label="PM10" value={data.outlet.pm10} unit="µg/m³" variant="success" />
            <MetricCard label="CO₂" value={data.outlet.co2} unit="ppm" variant="success" />
            <MetricCard label="O₂" value={data.outlet.o2} unit="%" variant="success" />
            <MetricCard label="Temp" value={data.outlet.temperature} unit="°C" variant="success" />
          </div>
        </div>
      </div>

      {/* Water Monitoring */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-800 mb-3 pb-2 border-b">Water Quality</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <MetricCard label="pH Level" value={data.main.ph} />
          <MetricCard label="Water Temp" value={data.main.waterTemp} unit="°C" />
          <MetricCard label="Water Level" value={data.main.waterLevel} unit="%" />
        </div>
      </div>
    </div>
  )
}

function MetricCard({
  label,
  value,
  unit = '',
  variant = 'default'
}: {
  label: string
  value: number | string
  unit?: string
  variant?: 'default' | 'success'
}) {
  return (
    <div className={`p-3 rounded-lg ${variant === 'success' ? 'bg-green-50' : 'bg-gray-50'}`}>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <div className="flex items-baseline gap-1">
        <p className={`text-lg font-bold ${variant === 'success' ? 'text-green-700' : 'text-gray-800'}`}>
          {value}
        </p>
        {unit && <span className="text-sm text-gray-500">{unit}</span>}
      </div>
    </div>
  )
}

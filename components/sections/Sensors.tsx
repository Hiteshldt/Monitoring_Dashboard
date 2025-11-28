import type { DashboardData } from '@/types'

interface SensorsProps {
  data: DashboardData
}

export default function Sensors({ data }: SensorsProps) {
  return (
    <div className="space-y-3">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-gray-800">Sensor Readings</h2>
        <p className="text-sm text-gray-500 mt-0.5">Detailed environmental measurements</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Inlet Sensors */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-800 mb-3 pb-2 border-b">
            Inlet Sensors
          </h3>
          <div className="space-y-2">
            <SensorRow label="Air Quality Index (AQI)" value={data.inlet.aqi} />
            <SensorRow label="PM1.0" value={data.inlet.pm1} unit="µg/m³" />
            <SensorRow label="PM2.5" value={data.inlet.pm25} unit="µg/m³" />
            <SensorRow label="PM10" value={data.inlet.pm10} unit="µg/m³" />
            <SensorRow label="Carbon Dioxide (CO₂)" value={data.inlet.co2} unit="ppm" />
            <SensorRow label="Oxygen (O₂)" value={data.inlet.o2} unit="%" />
            <SensorRow label="Temperature" value={data.inlet.temperature} unit="°C" />
            <SensorRow label="Humidity" value={data.inlet.humidity} unit="%" />
          </div>
        </div>

        {/* Outlet Sensors */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-800 mb-3 pb-2 border-b">
            Outlet Sensors
          </h3>
          <div className="space-y-2">
            <SensorRow label="Air Quality Index (AQI)" value={data.outlet.aqi} variant="success" />
            <SensorRow label="PM1.0" value={data.outlet.pm1} unit="µg/m³" variant="success" />
            <SensorRow label="PM2.5" value={data.outlet.pm25} unit="µg/m³" variant="success" />
            <SensorRow label="PM10" value={data.outlet.pm10} unit="µg/m³" variant="success" />
            <SensorRow label="Carbon Dioxide (CO₂)" value={data.outlet.co2} unit="ppm" variant="success" />
            <SensorRow label="Oxygen (O₂)" value={data.outlet.o2} unit="%" variant="success" />
            <SensorRow label="Temperature" value={data.outlet.temperature} unit="°C" variant="success" />
            <SensorRow label="Humidity" value={data.outlet.humidity} unit="%" variant="success" />
          </div>
        </div>
      </div>

      {/* Water Quality */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <h3 className="text-base font-semibold text-gray-800 mb-3 pb-2 border-b">
          Water Quality Sensors
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1.5 font-medium">pH Level</p>
            <p className="text-2xl font-bold text-blue-700">{data.main.ph}</p>
            <p className="text-xs text-gray-500 mt-1">Optimal: 7.0-7.5</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1.5 font-medium">Water Temperature</p>
            <p className="text-2xl font-bold text-blue-700">{data.main.waterTemp}°C</p>
            <p className="text-xs text-gray-500 mt-1">Optimal: 24-26°C</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1.5 font-medium">Water Level</p>
            <p className="text-2xl font-bold text-blue-700">{data.main.waterLevel}%</p>
            <p className="text-xs text-gray-500 mt-1">Optimal: 75-85%</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SensorRow({
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
    <div className="flex items-center justify-between py-2 px-3 rounded hover:bg-gray-50">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span className={`text-base font-bold ${variant === 'success' ? 'text-green-600' : 'text-gray-800'}`}>
        {value} {unit}
      </span>
    </div>
  )
}

import { TrendingDown, TrendingUp } from 'lucide-react'
import type { DashboardData } from '@/types'

interface ImpactProps {
  data: DashboardData
}

export default function Impact({ data }: ImpactProps) {
  const aqiDiff = Math.round((data.inlet.aqi - data.outlet.aqi) * 10) / 10
  const pm25Diff = Math.round((data.inlet.pm25 - data.outlet.pm25) * 10) / 10
  const co2Diff = Math.round(data.inlet.co2 - data.outlet.co2)
  const o2Diff = Math.round((parseFloat(String(data.outlet.o2)) - parseFloat(String(data.inlet.o2))) * 10) / 10

  // Calculate tree equivalents (annual basis - mature tree reference)
  // 1 mature tree absorbs ~22 kg CO2/year, improves AQI by ~1.5 units/year
  const treesAQI = (aqiDiff * 1.0).toFixed(1)  // ~1 tree per AQI unit improvement
  const treesCO2 = (co2Diff * 0.3).toFixed(1)  // ~1 tree per 3-4 ppm CO2 reduction
  const treesO2 = (Math.abs(o2Diff) * 50).toFixed(1)  // ~1 tree per 0.02% O2 increase

  return (
    <div className="space-y-3">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-gray-800">Environmental Impact</h2>
        <p className="text-sm text-gray-500 mt-0.5">Measuring system effectiveness</p>
      </div>

      {/* Impact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <ImpactCard
          title="AQI Improvement"
          difference={aqiDiff}
          equivalent={`≈ ${treesAQI} mature trees / year`}
          positive
        />
        <ImpactCard
          title="PM2.5 Reduction"
          difference={pm25Diff}
          unit="µg/m³"
          equivalent={`${((pm25Diff/data.inlet.pm25)*100).toFixed(1)}% reduction`}
          positive
        />
        <ImpactCard
          title="CO₂ Reduction"
          difference={co2Diff}
          unit="ppm"
          equivalent={`≈ ${treesCO2} mature trees / year`}
          positive
        />
        <ImpactCard
          title="O₂ Increase"
          difference={parseFloat(o2Diff.toString())}
          unit="%"
          equivalent={`≈ ${Math.abs(parseFloat(treesO2))} mature trees / year`}
          positive={parseFloat(o2Diff.toString()) > 0}
        />
      </div>

      {/* Detailed Comparison */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <h3 className="text-base font-semibold text-gray-800 mb-3 pb-2 border-b">Inlet vs Outlet Comparison</h3>
        <div className="space-y-2">
          <ComparisonRow label="AQI" inlet={data.inlet.aqi} outlet={data.outlet.aqi} />
          <ComparisonRow label="PM1.0" inlet={data.inlet.pm1} outlet={data.outlet.pm1} unit="µg/m³" />
          <ComparisonRow label="PM2.5" inlet={data.inlet.pm25} outlet={data.outlet.pm25} unit="µg/m³" />
          <ComparisonRow label="PM10" inlet={data.inlet.pm10} outlet={data.outlet.pm10} unit="µg/m³" />
          <ComparisonRow label="CO₂" inlet={data.inlet.co2} outlet={data.outlet.co2} unit="ppm" />
          <ComparisonRow label="O₂" inlet={parseFloat(String(data.inlet.o2))} outlet={parseFloat(String(data.outlet.o2))} unit="%" inverse />
        </div>
      </div>

      {/* Environmental Equivalents */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-5 text-white">
        <h3 className="text-lg font-semibold mb-3">Annual Environmental Impact (Mature Tree Equivalent)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <p className="text-sm opacity-90 mb-1.5">Air Quality Improvement</p>
            <p className="text-3xl font-bold">≈ {treesAQI}</p>
            <p className="text-xs opacity-75 mt-1">mature trees annually</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <p className="text-sm opacity-90 mb-1.5">CO₂ Absorption</p>
            <p className="text-3xl font-bold">≈ {treesCO2}</p>
            <p className="text-xs opacity-75 mt-1">mature trees annually</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <p className="text-sm opacity-90 mb-1.5">O₂ Production</p>
            <p className="text-3xl font-bold">≈ {Math.abs(parseFloat(treesO2))}</p>
            <p className="text-xs opacity-75 mt-1">mature trees annually</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ImpactCard({
  title,
  difference,
  unit = '',
  equivalent,
  positive
}: {
  title: string
  difference: number
  unit?: string
  equivalent: string
  positive: boolean
}) {
  return (
    <div className={`rounded-lg p-4 ${positive ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
      <div className="flex items-start justify-between mb-2">
        <p className="text-sm font-medium text-gray-700">{title}</p>
        {positive ? (
          <TrendingDown className="w-4 h-4 text-green-600 flex-shrink-0" />
        ) : (
          <TrendingUp className="w-4 h-4 text-red-600 flex-shrink-0" />
        )}
      </div>
      <p className={`text-2xl font-bold ${positive ? 'text-green-700' : 'text-red-700'}`}>
        {Math.abs(difference)} <span className="text-base font-normal">{unit}</span>
      </p>
      <p className="text-xs text-gray-600 mt-1.5">{equivalent}</p>
    </div>
  )
}

function ComparisonRow({
  label,
  inlet,
  outlet,
  unit = '',
  inverse = false
}: {
  label: string
  inlet: number
  outlet: number
  unit?: string
  inverse?: boolean
}) {
  const diff = Math.round((inlet - outlet) * 10) / 10
  const improvement = inverse ? -diff : diff
  const percentage = ((Math.abs(diff) / inlet) * 100).toFixed(1)

  return (
    <div className="grid grid-cols-[90px_1fr] gap-4 items-center py-2 px-3 rounded hover:bg-gray-50">
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-xs text-gray-500 mb-1">Inlet</p>
          <p className="text-base font-bold text-gray-800">{inlet} {unit}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Change</p>
          <p className={`text-base font-bold ${improvement > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {Math.abs(diff)} ({percentage}%)
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Outlet</p>
          <p className="text-base font-bold text-green-700">{outlet} {unit}</p>
        </div>
      </div>
    </div>
  )
}

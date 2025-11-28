'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

export default function Analytics() {
  const [timeRange, setTimeRange] = useState(7)

  const generateChartData = (days: number) => {
    const data = []
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        inletAQI: Math.floor(Math.random() * 50 + 150),
        outletAQI: Math.floor(Math.random() * 30 + 50),
        inletCO2: Math.floor(Math.random() * 100 + 800),
        outletCO2: Math.floor(Math.random() * 50 + 400),
        inletPM25: Math.floor(Math.random() * 20 + 60),
        outletPM25: Math.floor(Math.random() * 15 + 15),
      })
    }
    return data
  }

  const chartData = generateChartData(timeRange)

  const downloadData = (days: number) => {
    const data = generateChartData(days)
    const csv = [
      ['Date', 'Inlet AQI', 'Outlet AQI', 'Inlet CO2', 'Outlet CO2', 'Inlet PM2.5', 'Outlet PM2.5'],
      ...data.map(row => [
        row.date,
        row.inletAQI,
        row.outletAQI,
        row.inletCO2,
        row.outletCO2,
        row.inletPM25,
        row.outletPM25
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics_${days}days_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Analytics</h2>
          <p className="text-sm text-gray-500 mt-0.5">Historical data and trends</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => downloadData(30)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
          >
            <Download size={16} />
            30 Days
          </button>
          <button
            onClick={() => downloadData(120)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
          >
            <Download size={16} />
            120 Days
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-gray-800">AQI Trends</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setTimeRange(7)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                timeRange === 7
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange(30)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                timeRange === 30
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              30 Days
            </button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ fontSize: 13 }} />
            <Legend wrapperStyle={{ fontSize: 13 }} />
            <Line
              type="monotone"
              dataKey="inletAQI"
              stroke="#ef4444"
              strokeWidth={2}
              name="Inlet AQI"
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="outletAQI"
              stroke="#22c55e"
              strokeWidth={2}
              name="Outlet AQI"
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-800 mb-3">CO₂ Levels</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ fontSize: 13 }} />
              <Legend wrapperStyle={{ fontSize: 13 }} />
              <Line
                type="monotone"
                dataKey="inletCO2"
                stroke="#f59e0b"
                strokeWidth={2}
                name="Inlet CO₂"
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="outletCO2"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Outlet CO₂"
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-800 mb-3">PM2.5 Levels</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ fontSize: 13 }} />
              <Legend wrapperStyle={{ fontSize: 13 }} />
              <Line
                type="monotone"
                dataKey="inletPM25"
                stroke="#a855f7"
                strokeWidth={2}
                name="Inlet PM2.5"
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="outletPM25"
                stroke="#14b8a6"
                strokeWidth={2}
                name="Outlet PM2.5"
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

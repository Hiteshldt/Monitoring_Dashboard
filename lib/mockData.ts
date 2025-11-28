import type { DashboardData } from '@/types'

export function generateMockData(): DashboardData {
  // Generate inlet values
  const inletAqi = Math.floor(Math.random() * 20 + 120)
  const inletPm10 = Math.floor(Math.random() * 15 + 65)
  const inletPm25 = Math.floor(Math.random() * 10 + 45)
  const inletPm1 = Math.floor(Math.random() * 8 + 30)
  const inletCo2 = Math.floor(Math.random() * 50 + 650)
  const inletO2 = parseFloat((Math.random() * 0.5 + 20.5).toFixed(1))
  const inletTemp = parseFloat((Math.random() * 3 + 28).toFixed(1))
  const inletHumidity = parseFloat((Math.random() * 8 + 55).toFixed(1))

  // Generate outlet values with smaller improvements (5-15% better than inlet)
  return {
    inlet: {
      aqi: inletAqi,
      pm10: inletPm10,
      pm25: inletPm25,
      pm1: inletPm1,
      co2: inletCo2,
      o2: inletO2,
      temperature: inletTemp,
      humidity: inletHumidity
    },
    outlet: {
      aqi: Math.floor(inletAqi * (0.85 + Math.random() * 0.1)), // 10-15% improvement
      pm10: Math.floor(inletPm10 * (0.85 + Math.random() * 0.1)),
      pm25: Math.floor(inletPm25 * (0.85 + Math.random() * 0.1)),
      pm1: Math.floor(inletPm1 * (0.85 + Math.random() * 0.1)),
      co2: Math.floor(inletCo2 * (0.90 + Math.random() * 0.05)), // 5-10% improvement
      o2: parseFloat((inletO2 + (Math.random() * 0.3 + 0.1)).toFixed(1)), // Small increase
      temperature: parseFloat((inletTemp - (Math.random() * 1.5 + 0.5)).toFixed(1)), // Slight decrease
      humidity: parseFloat((inletHumidity + (Math.random() * 3 + 1)).toFixed(1)) // Slight increase
    },
    main: {
      ph: parseFloat((Math.random() * 0.4 + 7.0).toFixed(2)),
      waterTemp: parseFloat((Math.random() * 2 + 24).toFixed(1)),
      waterLevel: parseFloat((Math.random() * 8 + 76).toFixed(1))
    },
    relays: [true, true, false, false, false, false, false, false]
  }
}

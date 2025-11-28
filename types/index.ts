export interface SensorData {
  aqi: number
  pm10: number
  pm25: number
  pm1: number
  co2: number
  o2: number
  temperature: number
  humidity: number
}

export interface MainSensorData {
  ph: number
  waterTemp: number
  waterLevel: number
}

export interface DashboardData {
  inlet: SensorData
  outlet: SensorData
  main: MainSensorData
  relays: boolean[]
}

# Environmental Monitoring Dashboard

A professional Next.js dashboard for monitoring and controlling environmental systems.

## Features

- **Real-time Monitoring**: Live sensor data from inlet, outlet, and water quality sensors
- **Environmental Impact**: Calculate and visualize the environmental improvements
- **Relay Control**: Auto/Manual mode switching for 8 relay channels
- **Analytics**: Historical data visualization with downloadable reports
- **Responsive Design**: Clean, professional interface that works on all devices

## Test Credentials

- **Device ID**: `IOTS1250001`
- **Password**: `TESTPASS001`

## Authentication

The dashboard includes persistent authentication:
- Sessions are stored in localStorage
- Auto-login on page refresh
- 7-day session duration
- Session auto-extends every 30 minutes while active
- "Keep me logged in" checkbox on login page

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main entry point
├── components/
│   ├── Dashboard.tsx        # Main dashboard component
│   ├── LoginPage.tsx        # Login interface
│   ├── Sidebar.tsx          # Navigation sidebar
│   └── sections/            # Dashboard sections
│       ├── Overview.tsx
│       ├── Sensors.tsx
│       ├── Impact.tsx
│       ├── RelayControl.tsx
│       └── Analytics.tsx
├── lib/
│   └── mockData.ts          # Mock data generator
└── types/
    └── index.ts             # TypeScript types
```

## Adding Live Data

Currently uses mock data. To connect to live endpoints:

1. Create an API configuration file:

```typescript
// lib/api.ts
export async function fetchSensorData(deviceId: string) {
  const response = await fetch(`YOUR_API_ENDPOINT/sensors/${deviceId}`)
  return response.json()
}
```

2. Update `components/Dashboard.tsx`:

```typescript
// Replace generateMockData() with API call
const data = await fetchSensorData(deviceId)
```

3. Add environment variables in `.env.local`:

```
NEXT_PUBLIC_API_URL=your_api_endpoint
```

## Technologies

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons

## License

Private

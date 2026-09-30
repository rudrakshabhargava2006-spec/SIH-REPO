// All values below are deterministically generated (no Math.random) so the
// dashboard renders identical charts on every load/refresh during judging.
// Replace generateSeries()'s source with real ESP32 samples via
// services/telemetryService.js when hardware is connected.

function generateSeries(points, baseTemp, baseTurb) {
  const series = []
  for (let i = 0; i < points; i++) {
    const t = i / points
    const temp = baseTemp + Math.sin(t * Math.PI * 3.1) * 0.6 + Math.sin(t * 11) * 0.15
    const turb = baseTurb + Math.sin(t * Math.PI * 2.3 + 1.2) * 35 + Math.cos(t * 7) * 8
    series.push({
      t: i,
      temperature: Math.round(temp * 10) / 10,
      turbidity: Math.round(Math.max(180, turb))
    })
  }
  return series
}

export const telemetrySeries = {
  '5min': generateSeries(30, 27.4, 420).map((d, i) => ({ ...d, label: `${i}m` })),
  '15min': generateSeries(45, 27.2, 415).map((d, i) => ({ ...d, label: `${i * 2}m` })),
  '1hr': generateSeries(60, 27.0, 405).map((d, i) => ({ ...d, label: `${i}m` })),
  mission: generateSeries(50, 26.6, 390).map((d, i) => ({ ...d, label: `T+${i * 3}m` }))
}

export const currentTelemetry = {
  waterTemp: 27.4,
  waterTempUnit: '°C',
  turbidity: 421,
  turbidityUnit: 'NTU',
  turbidityStatus: 'MODERATE',
  battery: 87,
  voltage: 11.8,
  gps: {
    status: 'LOCKED',
    satellites: 8,
    lat: 23.2599,
    lng: 77.4126,
    accuracy: 3.2
  },
  speed: 1.2,
  heading: 128
}

export const loggerStatus = {
  recording: true,
  medium: 'MicroSD',
  usedGb: 1.24,
  totalGb: 8,
  records: 12482,
  lastWrite: '10:42:17',
  lastGpsTag: '10:42:15'
}

export const loggerRecords = [
  { time: '10:42:15', lat: 23.2598, lng: 77.4125, temp: 27.4, turbidity: 418, status: 'STORED' },
  { time: '10:42:12', lat: 23.2597, lng: 77.4124, temp: 27.4, turbidity: 421, status: 'STORED' },
  { time: '10:42:09', lat: 23.2595, lng: 77.4123, temp: 27.3, turbidity: 415, status: 'STORED' },
  { time: '10:42:06', lat: 23.2593, lng: 77.4121, temp: 27.3, turbidity: 409, status: 'STORED' },
  { time: '10:42:03', lat: 23.2591, lng: 77.4119, temp: 27.2, turbidity: 412, status: 'STORED' },
  { time: '10:42:00', lat: 23.2589, lng: 77.4117, temp: 27.2, turbidity: 406, status: 'STORED' }
]

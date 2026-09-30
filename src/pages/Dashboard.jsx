import { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header.jsx'
import MissionStatus from '../components/MissionStatus.jsx'
import TelemetryGrid from '../components/TelemetryCard.jsx'
import MapPanel from '../components/MapPanel.jsx'
import SensorCharts from '../components/SensorCharts.jsx'
import DataLogger from '../components/DataLogger.jsx'
import SystemHealth from '../components/SystemHealth.jsx'
import AutonomyPanel from '../components/AutonomyPanel.jsx'
import MissionTimeline from '../components/MissionTimeline.jsx'
import ControlPanel from '../components/ControlPanel.jsx'
import ArchitectureModal from '../components/ArchitectureModal.jsx'

import { currentTelemetry, telemetrySeries, loggerStatus, loggerRecords } from '../data/telemetry.js'
import { mission, missionTimeline, autonomyState } from '../data/mission.js'
import { systemComponents } from '../data/systemStatus.js'
import { waypoints, travelledPath, plannedPath, vehicleCurrentPosition } from '../data/waypoints.js'

// Gradual, bounded drift so demo mode looks alive without absurd jumps
// (e.g. temperature never swings more than ~0.1°C per tick).
function driftValue(value, min, max, step) {
  const delta = (Math.sin(Date.now() / 4000 + value) ) * step
  const next = value + delta
  return Math.min(max, Math.max(min, next))
}

export default function Dashboard() {
  const [demoMode, setDemoMode] = useState(true)
  const [archOpen, setArchOpen] = useState(false)
  const [sensors, setSensors] = useState(currentTelemetry)
  const [position, setPosition] = useState(vehicleCurrentPosition)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!demoMode) return
    const id = setInterval(() => {
      setTick((t) => t + 1)
      setSensors((prev) => ({
        ...prev,
        waterTemp: Number(driftValue(prev.waterTemp, 26.6, 28.2, 0.04).toFixed(1)),
        turbidity: Math.round(driftValue(prev.turbidity, 380, 440, 3)),
        battery: Math.max(60, Number((prev.battery - 0.02).toFixed(2))),
        heading: Math.round(driftValue(prev.heading, 100, 150, 1)),
        speed: Number(driftValue(prev.speed, 0.9, 1.5, 0.03).toFixed(2))
      }))
      setPosition((prev) => ({
        lat: Number((prev.lat + 0.00006).toFixed(6)),
        lng: Number((prev.lng + 0.00005).toFixed(6)),
        heading: prev.heading
      }))
    }, 2200)
    return () => clearInterval(id)
  }, [demoMode])

  const gps = useMemo(
    () => ({
      ...sensors.gps,
      heading: sensors.heading,
      speed: sensors.speed,
      accuracy: sensors.gps.accuracy,
      position,
      waypoints,
      travelledPath,
      plannedPath
    }),
    [sensors, position]
  )

  return (
    <div className="min-h-screen bg-depth-gradient text-current-200">
      <Header demoMode={demoMode} onToggleDemo={() => setDemoMode((d) => !d)} onOpenArchitecture={() => setArchOpen(true)} />

      <main className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 md:px-6 md:py-8">
        <MissionStatus mission={mission} />

        <TelemetryGrid sensors={sensors} series={telemetrySeries['5min']} />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.7fr,1fr]">
          <MapPanel gps={gps} />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-1">
            <AutonomyPanel state={autonomyState} />
            <ControlPanel />
          </div>
        </div>

        <SensorCharts seriesByRange={telemetrySeries} current={sensors} />

        <DataLogger status={loggerStatus} records={loggerRecords} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SystemHealth components={systemComponents} />
          <MissionTimeline events={missionTimeline} />
        </div>

        <footer className="pt-4 text-center text-[11px] text-current-500/50">
          RYZENBERG · SIH 26065 · Prototype dashboard — sensor values shown are simulated unless live ESP32 telemetry is connected.
        </footer>
      </main>

      <ArchitectureModal open={archOpen} onClose={() => setArchOpen(false)} />
    </div>
  )
}

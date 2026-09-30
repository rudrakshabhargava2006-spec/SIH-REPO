// Telemetry service abstraction.
//
// Every dashboard component reads sensor/GPS/system data through this file
// instead of importing mock data directly. When the ESP32 firmware exposes
// a real endpoint (HTTP, WebSocket, or serial-over-USB bridge), swap the
// bodies of these functions for real fetches — no component code needs to
// change.

import { currentTelemetry, telemetrySeries, loggerStatus, loggerRecords } from '../data/telemetry.js'
import { mission, missionTimeline, autonomyState } from '../data/mission.js'
import { systemComponents } from '../data/systemStatus.js'
import { waypoints, travelledPath, plannedPath, vehicleCurrentPosition } from '../data/waypoints.js'

export async function getTelemetry(range = '5min') {
  return telemetrySeries[range] ?? telemetrySeries['5min']
}

export async function getSensorData() {
  return currentTelemetry
}

export async function getGPS() {
  return {
    ...currentTelemetry.gps,
    heading: currentTelemetry.heading,
    speed: currentTelemetry.speed,
    position: vehicleCurrentPosition,
    waypoints,
    travelledPath,
    plannedPath
  }
}

export async function getSystemStatus() {
  return systemComponents
}

export async function getMissionStatus() {
  return { mission, missionTimeline, autonomyState }
}

export async function getLogger() {
  return { status: loggerStatus, records: loggerRecords }
}

# RYZENBERG // Ocean Observation — Mission Control Dashboard

SIH 2026 · Problem Statement 26065 · Autonomous Low-Cost Ocean Observation Platform

A frontend mission-control dashboard for a low-cost autonomous floating platform
that navigates by waypoint, observes water temperature and turbidity, GPS-tags
every reading, and stores it locally first (store first → communicate later).

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`).

To build a static production bundle:

```bash
npm run build
npm run preview
```

## What's real vs. simulated

- All sensor, GPS, battery and log data is deterministic mock data (see `src/data/`)
  generated once at load, not `Math.random()`, so the dashboard looks the same on
  every refresh — important for repeatable demos.
- "Demo mode" (toggle in the header) makes values drift gradually and realistically
  so the dashboard stays convincing if the ESP32 hardware isn't connected during
  judging.
- Quick Controls (Start/Pause/Stop/etc.) only update frontend state — there is no
  backend or live hardware link yet.

## Wiring up real ESP32 telemetry later

Every component reads data through `src/services/telemetryService.js`
(`getTelemetry`, `getGPS`, `getSensorData`, `getSystemStatus`). Replace the bodies
of those functions with real requests to your ESP32 (HTTP, WebSocket, or a serial
bridge) — no component code needs to change.

## Stack

React 18 · Vite · Tailwind CSS · Recharts · React-Leaflet (OpenStreetMap) · Lucide icons

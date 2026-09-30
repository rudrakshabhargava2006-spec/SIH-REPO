// Simulated route around Upper Lake, Bhopal — used as a stand-in survey
// area until real ESP32 + GPS telemetry is wired in via services/telemetryService.js

export const waypoints = [
  { id: 'WP-01', lat: 23.2531, lng: 77.3996, status: 'complete', label: 'North Inlet' },
  { id: 'WP-02', lat: 23.2567, lng: 77.4058, status: 'complete', label: 'Mid Channel A' },
  { id: 'WP-03', lat: 23.2599, lng: 77.4126, status: 'current', label: 'Mid Channel B' },
  { id: 'WP-04', lat: 23.2622, lng: 77.4189, status: 'pending', label: 'East Basin' },
  { id: 'WP-05', lat: 23.2588, lng: 77.4241, status: 'pending', label: 'South Outflow' },
  { id: 'WP-06', lat: 23.2540, lng: 77.4160, status: 'pending', label: 'Recovery Point' }
]

// Path already travelled (denser points for a realistic track)
export const travelledPath = [
  [23.2531, 77.3996],
  [23.2541, 77.4012],
  [23.2551, 77.4030],
  [23.2560, 77.4046],
  [23.2567, 77.4058],
  [23.2576, 77.4074],
  [23.2584, 77.4092],
  [23.2591, 77.4108],
  [23.2599, 77.4126]
]

// Planned but not-yet-travelled portion of the route
export const plannedPath = [
  [23.2599, 77.4126],
  [23.2608, 77.4150],
  [23.2622, 77.4189],
  [23.2610, 77.4218],
  [23.2588, 77.4241],
  [23.2565, 77.4205],
  [23.2540, 77.4160]
]

export const vehicleCurrentPosition = { lat: 23.2599, lng: 77.4126, heading: 128 }

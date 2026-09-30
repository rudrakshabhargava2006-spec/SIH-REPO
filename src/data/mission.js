export const missionPipeline = [
  'PLAN',
  'NAVIGATE',
  'STABILIZE',
  'OBSERVE',
  'GPS-TAG',
  'STORE',
  'RECOVER'
]

export const mission = {
  id: 'RYZ-26065-001',
  state: 'AUTONOMOUS OBSERVATION ACTIVE',
  operation: 'OBSERVE + STORE',
  progress: 67,
  elapsed: '02:47:32',
  currentWaypoint: 'WP-03',
  nextWaypoint: 'WP-04',
  currentStep: 'OBSERVE'
}

export const missionTimeline = [
  { time: '10:42:17', text: 'Observation stored', icon: 'save', level: 'ok' },
  { time: '10:42:15', text: 'GPS position acquired', icon: 'satellite', level: 'ok' },
  { time: '10:42:12', text: 'Waypoint WP-03 reached', icon: 'flag', level: 'ok' },
  { time: '10:41:56', text: 'Heading corrected', icon: 'compass', level: 'info' },
  { time: '10:41:42', text: 'Temperature sensor reading received', icon: 'thermometer', level: 'info' },
  { time: '10:41:38', text: 'Turbidity sensor reading received', icon: 'droplets', level: 'info' },
  { time: '10:41:10', text: 'Battery within normal range', icon: 'battery', level: 'ok' },
  { time: '10:40:52', text: 'Left waypoint WP-02', icon: 'navigation', level: 'info' }
]

export const autonomyState = {
  currentState: 'OBSERVE',
  decision: 'Continue waypoint navigation and record observation.',
  inputs: ['GPS', 'TEMPERATURE', 'TURBIDITY', 'HEADING', 'BATTERY'],
  motorLeft: 72,
  motorRight: 64,
  nextAction: 'GPS-TAG → STORE',
  mode: 'RULE-BASED AUTONOMY'
}

import { MapContainer, TileLayer, Marker, Polyline, CircleMarker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { Navigation2 } from 'lucide-react'

function vehicleIcon(heading) {
  return L.divIcon({
    className: '',
    html: `<div style="transform: rotate(${heading}deg); width:26px; height:26px; display:flex; align-items:center; justify-content:center;">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0FDCB4" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 6px rgba(15,220,180,0.8));">
        <polygon points="12 2 19 21 12 17 5 21 12 2" fill="#0FDCB4" fill-opacity="0.25"/>
      </svg>
    </div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13]
  })
}

function waypointIcon(status) {
  const color = status === 'current' ? '#0FDCB4' : status === 'complete' ? '#5FC8E8' : '#2FA8D6'
  const fill = status === 'pending' ? 'transparent' : color
  return L.divIcon({
    className: '',
    html: `<div style="width:14px;height:14px;border-radius:50%;border:2px solid ${color};background:${fill};box-shadow:0 0 8px ${color}66;"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  })
}

export default function MapPanel({ gps }) {
  const center = [gps.position.lat, gps.position.lng]

  return (
    <div className="panel panel-sheen relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-current-500/10 px-5 py-4">
        <div>
          <h2 className="font-display text-sm font-semibold tracking-wide text-white">Live vehicle track</h2>
          <p className="text-[11px] text-current-400/60">Autonomous waypoint navigation · simulated GPS</p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-depth-teal">
          <span className="h-1.5 w-1.5 rounded-full bg-depth-teal animate-pulse-soft" />
          Autonomous
        </div>
      </div>

      <div className="relative h-[420px] w-full md:h-[480px]">
        <MapContainer
          center={center}
          zoom={14}
          scrollWheelZoom={false}
          className="h-full w-full"
          style={{ background: '#071523' }}
        >
          <TileLayer
            className="map-dark-tiles"
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Polyline positions={gps.travelledPath} pathOptions={{ color: '#5FC8E8', weight: 3, opacity: 0.85 }} />
          <Polyline
            positions={gps.plannedPath}
            pathOptions={{ color: '#2FA8D6', weight: 2, opacity: 0.4, dashArray: '2 8' }}
          />

          {gps.waypoints.map((wp) => (
            <Marker key={wp.id} position={[wp.lat, wp.lng]} icon={waypointIcon(wp.status)}>
              <Popup>
                <div className="font-mono text-xs">
                  <p className="font-semibold">{wp.id}</p>
                  <p>{wp.label}</p>
                </div>
              </Popup>
            </Marker>
          ))}

          <Marker position={center} icon={vehicleIcon(gps.heading)}>
            <Popup>RYZ-01 — current position</Popup>
          </Marker>
          <CircleMarker
            center={center}
            radius={18}
            pathOptions={{ color: '#0FDCB4', weight: 1, opacity: 0.35, fillOpacity: 0.05 }}
          />
        </MapContainer>

        <div className="panel panel-sheen pointer-events-none absolute bottom-4 left-4 z-[400] w-52 !bg-abyss-950/85 p-4 backdrop-blur-sm">
          <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-depth-teal">
            <Navigation2 className="h-3.5 w-3.5" />
            VEHICLE · RYZ-01
          </div>
          <dl className="space-y-1.5 text-[11px]">
            <Row k="Status" v="Autonomous" />
            <Row k="Heading" v={`${gps.heading}°`} />
            <Row k="Speed" v={`${gps.speed} m/s`} />
            <Row k="Altitude" v="N/A" />
            <Row k="GPS accuracy" v={`±${gps.accuracy} m`} />
          </dl>
        </div>
      </div>
    </div>
  )
}

function Row({ k, v }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-current-400/60">{k}</dt>
      <dd className="font-mono tabular text-current-200">{v}</dd>
    </div>
  )
}

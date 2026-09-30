import { Thermometer, Droplets, BatteryMedium, Satellite } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

function Sparkline({ data, color }) {
  return (
    <div className="h-10 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function Card({ icon: Icon, label, sublabel, value, unit, accent, footer, children }) {
  return (
    <div className="panel panel-sheen relative overflow-hidden p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-md"
            style={{ backgroundColor: `${accent}1A` }}
          >
            <Icon className="h-4 w-4" style={{ color: accent }} strokeWidth={2} />
          </div>
          <div>
            <p className="text-[11px] font-medium tracking-wide text-current-400/70">{label}</p>
            <p className="text-[10px] text-current-500/50">{sublabel}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <p className="font-display text-3xl font-semibold text-white tabular">
          {value}
          <span className="ml-1 text-base font-medium text-current-400/60">{unit}</span>
        </p>
        {children}
      </div>

      {footer && <div className="mt-3 border-t border-current-500/10 pt-3">{footer}</div>}
    </div>
  )
}

export default function TelemetryGrid({ sensors, series }) {
  const tempSpark = series.slice(-12).map((d) => ({ v: d.temperature }))
  const turbSpark = series.slice(-12).map((d) => ({ v: d.turbidity }))

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Card
        icon={Thermometer}
        label="Water temperature"
        sublabel="DS18B20"
        value={sensors.waterTemp.toFixed(1)}
        unit={sensors.waterTempUnit}
        accent="#5FC8E8"
      >
        <Sparkline data={tempSpark} color="#5FC8E8" />
      </Card>

      <Card
        icon={Droplets}
        label="Turbidity"
        sublabel="Optical sensor"
        value={sensors.turbidity}
        unit={sensors.turbidityUnit}
        accent="#0FDCB4"
        footer={
          <span className="text-[11px] font-semibold tracking-wide text-depth-amber">
            {sensors.turbidityStatus}
          </span>
        }
      >
        <Sparkline data={turbSpark} color="#0FDCB4" />
      </Card>

      <Card
        icon={BatteryMedium}
        label="Battery"
        sublabel={`${sensors.voltage} V`}
        value={sensors.battery}
        unit="%"
        accent="#0FDCB4"
      >
        <div className="h-10 w-16">
          <div className="h-2 w-full overflow-hidden rounded-full bg-abyss-800">
            <div
              className="h-full rounded-full bg-depth-teal"
              style={{ width: `${sensors.battery}%` }}
            />
          </div>
        </div>
      </Card>

      <Card
        icon={Satellite}
        label="GPS"
        sublabel={`${sensors.gps.satellites} satellites`}
        value={sensors.gps.status}
        unit=""
        accent="#2FA8D6"
        footer={
          <p className="font-mono text-[11px] tabular text-current-400/70">
            {sensors.gps.lat.toFixed(4)}°, {sensors.gps.lng.toFixed(4)}°
          </p>
        }
      />
    </div>
  )
}

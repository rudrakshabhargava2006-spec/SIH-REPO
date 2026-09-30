import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const ranges = [
  { key: '5min', label: '5 min' },
  { key: '15min', label: '15 min' },
  { key: '1hr', label: '1 hr' },
  { key: 'mission', label: 'Mission' }
]

function CustomTooltip({ active, payload, label, unit, color }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-md border border-current-500/20 bg-abyss-900/95 px-3 py-2 text-xs shadow-panel">
      <p className="text-current-400/60">{label}</p>
      <p className="font-mono font-semibold" style={{ color }}>
        {payload[0].value} {unit}
      </p>
    </div>
  )
}

function ChartCard({ title, sub, data, dataKey, unit, color, current }) {
  return (
    <div className="panel panel-sheen p-5">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <p className="text-[11px] text-current-400/60">{sub}</p>
        </div>
        <p className="font-mono text-lg font-semibold tabular" style={{ color }}>
          {current} <span className="text-xs font-normal text-current-400/60">{unit}</span>
        </p>
      </div>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
            <CartesianGrid stroke="#143349" strokeDasharray="3 6" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: '#5FC8E866', fontSize: 10 }}
              axisLine={{ stroke: '#143349' }}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fill: '#5FC8E866', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              width={40}
              domain={['auto', 'auto']}
            />
            <Tooltip content={<CustomTooltip unit={unit} color={color} />} />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
              animationDuration={500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default function SensorCharts({ seriesByRange, current }) {
  const [range, setRange] = useState('5min')
  const data = seriesByRange[range]

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-sm font-semibold tracking-wide text-white">Observation stream</h2>
          <p className="text-[11px] text-current-400/60">Water temperature and turbidity over time</p>
        </div>
        <div className="flex gap-1 rounded-md border border-current-500/15 p-1">
          {ranges.map((r) => (
            <button
              key={r.key}
              onClick={() => setRange(r.key)}
              className={`rounded px-3 py-1 text-[11px] font-medium transition-colors ${
                range === r.key
                  ? 'bg-current-500/20 text-current-300'
                  : 'text-current-400/60 hover:text-current-300'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard
          title="Water temperature"
          sub="DS18B20 · °C"
          data={data}
          dataKey="temperature"
          unit="°C"
          color="#5FC8E8"
          current={current.waterTemp.toFixed(1)}
        />
        <ChartCard
          title="Turbidity"
          sub="Optical sensor · NTU"
          data={data}
          dataKey="turbidity"
          unit="NTU"
          color="#0FDCB4"
          current={current.turbidity}
        />
      </div>
    </section>
  )
}

import { Save, Satellite, Flag, Compass, Thermometer, Droplets, BatteryMedium, Navigation } from 'lucide-react'

const icons = { save: Save, satellite: Satellite, flag: Flag, compass: Compass, thermometer: Thermometer, droplets: Droplets, battery: BatteryMedium, navigation: Navigation }

export default function MissionTimeline({ events }) {
  return (
    <section className="panel panel-sheen p-5">
      <h2 className="font-display text-sm font-semibold tracking-wide text-white">Mission timeline</h2>
      <p className="mb-4 text-[11px] text-current-400/60">Recent onboard events</p>

      <ol className="relative space-y-4 border-l border-current-500/10 pl-5">
        {events.map((e, i) => {
          const Icon = icons[e.icon] ?? Save
          return (
            <li key={i} className="relative">
              <span
                className={`absolute -left-[27px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-abyss-900 ${
                  e.level === 'ok' ? 'bg-depth-teal/20' : 'bg-current-500/15'
                }`}
              >
                <Icon className={`h-2.5 w-2.5 ${e.level === 'ok' ? 'text-depth-teal' : 'text-current-400'}`} />
              </span>
              <p className="font-mono text-[10px] tabular text-current-400/60">{e.time}</p>
              <p className="text-xs text-current-200">{e.text}</p>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

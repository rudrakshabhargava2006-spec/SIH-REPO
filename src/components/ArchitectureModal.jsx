import { X } from 'lucide-react'

const sensors = ['DS18B20 (Temperature)', 'Turbidity sensor', 'GPS module', 'IMU / compass']

export default function ArchitectureModal({ open, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-abyss-950/80 p-4 backdrop-blur-sm">
      <div className="panel panel-sheen relative max-h-[85vh] w-full max-w-2xl overflow-y-auto p-6 md:p-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md p-1.5 text-current-400 hover:bg-current-500/10"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="font-display text-lg font-semibold text-white">System architecture</h2>
        <p className="mt-1 text-xs text-current-400/60">Sensors → ESP32 → navigation → actuation → storage</p>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-[1fr,auto,1fr,auto,1fr]">
          <div className="space-y-2">
            {sensors.map((s) => (
              <div key={s} className="rounded-md border border-current-500/15 px-3 py-2 text-[11px] text-current-300">
                {s}
              </div>
            ))}
          </div>

          <Arrow />

          <div className="flex items-center justify-center rounded-md border border-depth-teal/40 bg-depth-teal/10 px-3 py-4 text-center text-xs font-semibold text-depth-teal">
            ESP32
            <br />
            controller
          </div>

          <Arrow />

          <div className="flex flex-col justify-center gap-3">
            <div className="rounded-md border border-current-500/15 px-3 py-2 text-center text-[11px] text-current-300">
              Motor driver → motors
            </div>
            <div className="rounded-md border border-current-500/15 px-3 py-2 text-center text-[11px] text-current-300">
              MicroSD storage
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-depth-teal/30 bg-depth-teal/5 px-4 py-3 text-center">
          <p className="font-display text-sm font-semibold tracking-wide text-depth-teal">
            Store first → communicate later
          </p>
          <p className="mt-1 text-[11px] text-current-400/70">
            Observations are written locally so no data is lost when communication is unavailable.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Note title="Low cost" text="Built from affordable, easily replaceable components." />
          <Note title="Autonomous" text="Rule-based waypoint navigation — no machine learning." />
          <Note title="GPS-tagged" text="Every observation is stamped with location and time." />
          <Note title="Modular" text="Sensors can be swapped or added for different missions." />
        </div>
      </div>
    </div>
  )
}

function Arrow() {
  return (
    <div className="flex items-center justify-center text-current-500/50 md:rotate-0">
      <span className="text-lg">→</span>
    </div>
  )
}

function Note({ title, text }) {
  return (
    <div className="rounded-md border border-current-500/10 bg-abyss-900/40 p-3">
      <p className="text-xs font-semibold text-current-300">{title}</p>
      <p className="mt-0.5 text-[11px] text-current-400/60">{text}</p>
    </div>
  )
}

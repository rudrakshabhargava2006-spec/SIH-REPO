import { useEffect, useState } from 'react'
import { Waves, BatteryMedium, Satellite, RadioTower } from 'lucide-react'

export default function Header({ demoMode, onToggleDemo, onOpenArchitecture }) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const timeStr = now.toLocaleTimeString('en-IN', { hour12: false })

  return (
    <header className="sticky top-0 z-40 border-b border-current-500/10 bg-abyss-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-current-500/10 ring-1 ring-current-400/30">
            <Waves className="h-5 w-5 text-current-400" strokeWidth={2} />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-semibold tracking-tight text-white">RYZENBERG</span>
              <span className="rounded border border-depth-teal/30 bg-depth-teal/10 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-depth-teal">
                SIH 26065
              </span>
            </div>
            <p className="text-[11px] tracking-wide text-current-400/70">
              Autonomous ocean observation platform
            </p>
          </div>
        </div>

        <div className="hidden text-center md:block">
          <p className="text-[11px] font-medium tracking-wide text-current-400/80">Mission control</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenArchitecture}
            className="hidden rounded-md border border-current-500/20 px-3 py-1.5 text-xs font-medium text-current-400 transition-colors hover:border-current-400/50 hover:bg-current-500/10 sm:block"
          >
            System architecture
          </button>

          <button
            onClick={onToggleDemo}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
              demoMode
                ? 'bg-depth-teal/15 text-depth-teal ring-1 ring-depth-teal/40'
                : 'border border-current-500/20 text-current-400 hover:bg-current-500/10'
            }`}
          >
            {demoMode ? 'Demo telemetry active' : 'Demo mode'}
          </button>

          <div className="flex items-center gap-4 rounded-lg border border-current-500/15 bg-abyss-900/60 px-4 py-2">
            <span className="flex items-center gap-1.5 text-xs font-medium text-depth-teal">
              <span className="h-2 w-2 rounded-full bg-depth-teal animate-pulse-soft" />
              System online
            </span>
            <span className="hidden items-center gap-1.5 text-xs font-medium text-current-300 sm:flex">
              <Satellite className="h-3.5 w-3.5" /> GPS locked
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-current-300">
              <BatteryMedium className="h-3.5 w-3.5" /> 87%
            </span>
            <span className="hidden font-mono text-xs tabular text-current-400/60 md:inline">
              {timeStr}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

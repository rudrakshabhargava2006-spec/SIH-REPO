import { useState } from 'react'
import { Play, Pause, Home, Octagon, MapPin, Hand } from 'lucide-react'

export default function ControlPanel() {
  const [activeMode, setActiveMode] = useState('waypoint')
  const [runState, setRunState] = useState('running')
  const [halted, setHalted] = useState(false)

  const handleStop = () => {
    setRunState('stopped')
    setHalted(true)
  }

  return (
    <section className="panel panel-sheen p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-sm font-semibold tracking-wide text-white">Quick controls</h2>
        <span className="text-[10px] text-current-500/50">Frontend simulation only</span>
      </div>

      {halted && (
        <div className="mt-3 rounded-md border border-depth-coral/40 bg-depth-coral/10 px-3 py-2 text-xs font-semibold text-depth-coral">
          MISSION HALTED — this is a frontend simulation
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <CtrlButton
          icon={Play}
          label="Start mission"
          active={runState === 'running'}
          onClick={() => {
            setRunState('running')
            setHalted(false)
          }}
        />
        <CtrlButton icon={Pause} label="Pause" onClick={() => setRunState('paused')} />
        <CtrlButton icon={Home} label="Return to base" onClick={() => setRunState('returning')} />
        <CtrlButton
          icon={Octagon}
          label="Stop"
          danger
          onClick={handleStop}
        />
        <CtrlButton
          icon={MapPin}
          label="Waypoint mode"
          active={activeMode === 'waypoint'}
          onClick={() => setActiveMode('waypoint')}
        />
        <CtrlButton
          icon={Hand}
          label="Manual mode"
          active={activeMode === 'manual'}
          onClick={() => setActiveMode('manual')}
        />
      </div>
    </section>
  )
}

function CtrlButton({ icon: Icon, label, onClick, active, danger }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-md border px-3 py-2.5 text-xs font-medium transition-colors ${
        danger
          ? 'border-depth-coral/40 text-depth-coral hover:bg-depth-coral/10'
          : active
          ? 'border-depth-teal/40 bg-depth-teal/10 text-depth-teal'
          : 'border-current-500/15 text-current-300 hover:bg-current-500/10'
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  )
}

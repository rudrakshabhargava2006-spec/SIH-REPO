import { Cpu, ArrowRight } from 'lucide-react'

export default function AutonomyPanel({ state }) {
  return (
    <section className="panel panel-sheen p-5">
      <div className="flex items-center gap-2">
        <Cpu className="h-4 w-4 text-current-400" />
        <h2 className="font-display text-sm font-semibold tracking-wide text-white">Autonomous decision engine</h2>
      </div>
      <p className="mt-1 text-[11px] text-current-400/60">{state.mode} — no machine learning is involved</p>

      <div className="mt-4 space-y-4">
        <div className="rounded-lg border border-depth-teal/20 bg-depth-teal/5 p-3.5">
          <p className="text-[10px] tracking-wide text-current-400/60">Current state</p>
          <p className="font-display text-lg font-semibold text-depth-teal">{state.currentState}</p>
          <p className="mt-1 text-xs text-current-300/80">{state.decision}</p>
        </div>

        <div>
          <p className="mb-2 text-[10px] tracking-wide text-current-400/60">Inputs</p>
          <div className="flex flex-wrap gap-1.5">
            {state.inputs.map((inp) => (
              <span
                key={inp}
                className="rounded border border-current-500/15 px-2 py-1 text-[10px] font-medium text-current-300"
              >
                {inp}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[10px] tracking-wide text-current-400/60">Output</p>
          <div className="space-y-2">
            <MotorBar label="Motor left" value={state.motorLeft} />
            <MotorBar label="Motor right" value={state.motorRight} />
          </div>
        </div>

        <div className="flex items-center gap-2 border-t border-current-500/10 pt-3 text-xs font-medium text-current-300">
          <span className="text-current-400/60">Next action</span>
          <ArrowRight className="h-3.5 w-3.5 text-depth-teal" />
          <span className="font-mono text-depth-teal">{state.nextAction}</span>
        </div>
      </div>
    </section>
  )
}

function MotorBar({ label, value }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11px]">
        <span className="text-current-400/70">{label}</span>
        <span className="font-mono tabular text-current-300">{value}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-abyss-800">
        <div className="h-full rounded-full bg-current-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

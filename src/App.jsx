import { useState } from 'react'
import { Waves, ArrowRight, Layers } from 'lucide-react'
import Dashboard from './pages/Dashboard.jsx'
import ArchitectureModal from './components/ArchitectureModal.jsx'

function Landing({ onEnter, onViewArchitecture }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-depth-gradient px-6">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-current-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-depth-teal/10 blur-[120px]" />

      <div className="relative z-10 w-full max-w-xl text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-current-500/10 ring-1 ring-current-400/30">
          <Waves className="h-7 w-7 text-current-400" strokeWidth={2} />
        </div>

        <h1 className="font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Autonomous ocean observation
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-current-300/80">
          Low-cost autonomous sensing for challenging marine environments.
        </p>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs">
          <span className="font-display font-semibold tracking-wide text-current-300">RYZENBERG</span>
          <span className="h-1 w-1 rounded-full bg-current-500/50" />
          <span className="rounded border border-depth-teal/30 bg-depth-teal/10 px-1.5 py-0.5 font-semibold text-depth-teal">
            SIH 26065
          </span>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={onEnter}
            className="flex items-center gap-2 rounded-md bg-current-500/15 px-5 py-3 text-sm font-semibold text-current-200 ring-1 ring-current-400/40 transition-colors hover:bg-current-500/25"
          >
            Enter mission control
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={onViewArchitecture}
            className="flex items-center gap-2 rounded-md border border-current-500/20 px-5 py-3 text-sm font-medium text-current-400 transition-colors hover:bg-current-500/10"
          >
            <Layers className="h-4 w-4" />
            View system architecture
          </button>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [entered, setEntered] = useState(false)
  const [archOpen, setArchOpen] = useState(false)

  if (!entered) {
    return (
      <>
        <Landing onEnter={() => setEntered(true)} onViewArchitecture={() => setArchOpen(true)} />
        <ArchitectureModal open={archOpen} onClose={() => setArchOpen(false)} />
      </>
    )
  }

  return <Dashboard />
}

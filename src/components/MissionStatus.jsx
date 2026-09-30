import { missionPipeline } from '../data/mission.js'

export default function MissionStatus({ mission }) {
  const currentIndex = missionPipeline.indexOf(mission.currentStep)

  return (
    <section className="panel panel-sheen relative overflow-hidden p-6 md:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-medium tracking-wide text-current-400/70">Mission status</p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-white md:text-3xl">
            {mission.state}
          </h1>
          <p className="mt-2 text-sm text-current-300/80">
            Current operation <span className="text-depth-teal font-semibold">{mission.operation}</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm sm:grid-cols-4">
          <Stat label="Mission ID" value={mission.id} mono />
          <Stat label="Elapsed time" value={mission.elapsed} mono />
          <Stat label="Current waypoint" value={mission.currentWaypoint} />
          <Stat label="Next waypoint" value={mission.nextWaypoint} />
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-xs text-current-400/70">
          <span>Mission progress</span>
          <span className="tabular font-semibold text-current-300">{mission.progress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-abyss-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-current-500 to-depth-teal transition-all duration-700"
            style={{ width: `${mission.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-7 overflow-x-auto">
        <div className="flex min-w-max items-center gap-1">
          {missionPipeline.map((step, i) => {
            const isCurrent = i === currentIndex
            const isDone = i < currentIndex
            return (
              <div key={step} className="flex items-center">
                <div
                  className={`rounded-md px-3 py-1.5 text-[11px] font-semibold tracking-wide transition-colors ${
                    isCurrent
                      ? 'bg-depth-teal/15 text-depth-teal ring-1 ring-depth-teal/50'
                      : isDone
                      ? 'text-current-300/70'
                      : 'text-current-500/40'
                  }`}
                >
                  {step}
                </div>
                {i < missionPipeline.length - 1 && (
                  <span className={`mx-0.5 text-xs ${isDone ? 'text-current-400/50' : 'text-current-700/40'}`}>
                    →
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Stat({ label, value, mono }) {
  return (
    <div>
      <p className="text-[11px] text-current-400/60">{label}</p>
      <p className={`mt-0.5 font-medium text-white ${mono ? 'font-mono tabular text-[13px]' : 'text-sm'}`}>
        {value}
      </p>
    </div>
  )
}

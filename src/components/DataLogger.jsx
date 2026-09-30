import { HardDrive, Download } from 'lucide-react'

export default function DataLogger({ status, records }) {
  const pct = Math.round((status.usedGb / status.totalGb) * 100)

  return (
    <section className="panel panel-sheen p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <HardDrive className="h-4 w-4 text-depth-teal" />
            <h2 className="font-display text-sm font-semibold tracking-wide text-white">Local data logger</h2>
          </div>
          <p className="mt-1 text-[11px] text-current-400/60 max-w-md">
            Store first, communicate later — every observation is written to the MicroSD card
            immediately, so no data is lost during a communication outage.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-md bg-depth-teal/10 px-3 py-1.5 text-xs font-semibold text-depth-teal ring-1 ring-depth-teal/30">
          <span className="h-1.5 w-1.5 rounded-full bg-depth-teal animate-pulse-soft" />
          Recording
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <MiniStat label="Storage" value={status.medium} />
        <MiniStat label="Used" value={`${status.usedGb} / ${status.totalGb} GB`} />
        <MiniStat label="Records" value={status.records.toLocaleString('en-IN')} />
        <MiniStat label="Last write" value={status.lastWrite} mono />
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-abyss-800">
        <div className="h-full rounded-full bg-depth-teal" style={{ width: `${pct}%` }} />
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-current-500/10">
        <table className="w-full min-w-[560px] text-left text-xs">
          <thead>
            <tr className="border-b border-current-500/10 text-[10px] tracking-wide text-current-400/60">
              <th className="px-4 py-2.5 font-medium">Time</th>
              <th className="px-4 py-2.5 font-medium">Lat</th>
              <th className="px-4 py-2.5 font-medium">Long</th>
              <th className="px-4 py-2.5 font-medium">Temp</th>
              <th className="px-4 py-2.5 font-medium">Turbidity</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i} className="border-b border-current-500/5 font-mono text-current-200 last:border-0">
                <td className="px-4 py-2.5 tabular">{r.time}</td>
                <td className="px-4 py-2.5 tabular">{r.lat.toFixed(4)}</td>
                <td className="px-4 py-2.5 tabular">{r.lng.toFixed(4)}</td>
                <td className="px-4 py-2.5 tabular">{r.temp.toFixed(1)}°C</td>
                <td className="px-4 py-2.5 tabular">{r.turbidity}</td>
                <td className="px-4 py-2.5">
                  <span className="rounded bg-depth-teal/10 px-1.5 py-0.5 text-[10px] font-semibold text-depth-teal">
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <button className="flex items-center gap-2 rounded-md border border-current-500/20 px-3.5 py-2 text-xs font-medium text-current-300 transition-colors hover:border-current-400/50 hover:bg-current-500/10">
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </button>
      </div>
    </section>
  )
}

function MiniStat({ label, value, mono }) {
  return (
    <div>
      <p className="text-[10px] text-current-400/60">{label}</p>
      <p className={`mt-0.5 text-sm font-semibold text-white ${mono ? 'font-mono tabular' : ''}`}>{value}</p>
    </div>
  )
}

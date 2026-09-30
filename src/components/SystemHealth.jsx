export default function SystemHealth({ components }) {
  return (
    <section className="panel panel-sheen p-5">
      <h2 className="font-display text-sm font-semibold tracking-wide text-white">System health</h2>
      <p className="mb-4 text-[11px] text-current-400/60">Prototype hardware status</p>

      <div className="grid grid-cols-1 gap-2.5">
        {components.map((c) => (
          <div
            key={c.name}
            className="flex items-center justify-between rounded-md border border-current-500/8 bg-abyss-900/40 px-3 py-2"
          >
            <span className="text-[11px] font-medium tracking-wide text-current-300">{c.name}</span>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-depth-teal">
              <span className="h-1.5 w-1.5 rounded-full bg-depth-teal" />
              {c.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

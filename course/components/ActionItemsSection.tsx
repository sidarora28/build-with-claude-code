export function ActionItemsSection() {
  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6 opacity-60">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Action items</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Things to do, extracted from your notes. The list remembers what you&rsquo;ve ticked off.
          </p>
        </div>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
          Unlocks in Module 4
        </span>
      </div>

      <ul className="mt-4 space-y-2 text-sm text-zinc-400">
        <li className="flex items-center gap-3">
          <input type="checkbox" disabled className="h-4 w-4 rounded border-zinc-300" />
          <span className="italic">Empty — Module 4 builds the orchestrator that fills this</span>
        </li>
      </ul>
    </section>
  );
}

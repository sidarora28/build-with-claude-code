export function AskSection() {
  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6 opacity-60">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Ask</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Type a question, get an answer across all your notes.
          </p>
        </div>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
          Unlocks in Module 4
        </span>
      </div>

      <div className="mt-4">
        <input
          type="text"
          disabled
          placeholder="e.g. what's the status of bulk import?"
          className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm placeholder:text-zinc-400"
        />
      </div>
    </section>
  );
}

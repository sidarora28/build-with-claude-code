'use client';

import { useState } from 'react';

export function SummarySection() {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    setSummary(null);
    try {
      const res = await fetch('/api/agents/summariser', { method: 'POST' });
      const text = await res.text();
      setSummary(text);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Today&rsquo;s summary</h2>
          <p className="mt-1 text-sm text-zinc-500">
            What happened across your meetings this week, in one place.
          </p>
        </div>
        <button
          onClick={generate}
          disabled={loading}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:bg-zinc-300"
        >
          {loading ? 'Generating…' : 'Generate summary'}
        </button>
      </div>

      <div className="mt-4 min-h-[100px] rounded-lg border border-dashed border-zinc-200 bg-zinc-50 p-4 text-sm">
        {summary ? (
          <pre className="whitespace-pre-wrap font-sans text-zinc-700">{summary}</pre>
        ) : (
          <p className="text-zinc-400">
            Click <span className="font-medium text-zinc-600">Generate summary</span> to see what&rsquo;s in
            your meeting notes folder. In Module 1 this returns a mock — you&rsquo;ll wire it to a real agent
            in Module 2.
          </p>
        )}
      </div>
    </section>
  );
}

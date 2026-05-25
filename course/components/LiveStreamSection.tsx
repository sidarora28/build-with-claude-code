'use client';

import { useEffect, useState } from 'react';

export function LiveStreamSection() {
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    // Module 2 will hook this up to a real Server-Sent Events stream from the agent.
    // For Module 1 it just shows an idle state.
  }, []);

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6">
      <h2 className="text-lg font-semibold">Live stream</h2>
      <p className="mt-1 text-sm text-zinc-500">
        Watch your agent think while it works. Each tool call, each decision.
      </p>

      <div className="mt-4 max-h-64 overflow-auto rounded-lg border border-zinc-200 bg-zinc-900 p-4 font-mono text-xs text-zinc-300">
        {events.length === 0 ? (
          <p className="text-zinc-500">
            <span className="text-zinc-400">▍</span> idle &mdash; waiting for an agent to run.
            {'\n'}You&rsquo;ll see real output here once you build the summariser in Module 2.
          </p>
        ) : (
          events.map((e, i) => <div key={i}>{e}</div>)
        )}
      </div>
    </section>
  );
}

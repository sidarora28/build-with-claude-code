'use client';

import { useEventStream } from '@/lib/useEventStream';
import { PerfCounter } from '@/components/PerfCounter';
import { OrchestratorGraph } from '@/components/OrchestratorGraph';
import { TranscriptPane } from '@/components/TranscriptPane';

export default function Dashboard() {
  const { events, error } = useEventStream();

  return (
    <main className="mx-auto flex min-h-screen max-w-[1400px] flex-col gap-6 px-8 py-6">
      <header className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div
              className="h-2 w-2 rounded-full glow-cyan"
              style={{ background: 'var(--hud-cyan)' }}
            />
            <h1 className="text-glow-cyan text-lg font-semibold" style={{ color: 'var(--hud-cyan)' }}>
              DAILY BRAIN · ORCHESTRATOR
            </h1>
          </div>
          <p className="hud-label mt-1">
            EA + 3 specialists · live · listening to module-5/work/run.jsonl
          </p>
        </div>
        <PerfCounter events={events} />
      </header>

      {error && (
        <div
          className="hud-panel px-4 py-2 text-xs"
          style={{ borderColor: '#ff8a8a', color: '#ffb3b3' }}
        >
          dashboard error · {error}
        </div>
      )}

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[auto_1fr]">
        <div className="flex justify-center">
          <OrchestratorGraph events={events} />
        </div>
        <TranscriptPane events={events} />
      </section>

      <footer
        className="mt-auto flex items-center justify-between pt-4 text-[10px] tracking-widest"
        style={{ color: 'var(--hud-text-dim)' }}
      >
        <span>RUNS LOCAL · NO DATA LEAVES YOUR MACHINE</span>
        <span>localhost:3000 · daily-brain</span>
      </footer>
    </main>
  );
}

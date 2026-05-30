'use client';

import { useEventStream } from '@/lib/useEventStream';
import { PerfCounter } from '@/components/PerfCounter';
import { OrchestratorGraph } from '@/components/OrchestratorGraph';
import { TranscriptPane } from '@/components/TranscriptPane';

export default function Dashboard() {
  const { events, error } = useEventStream();

  return (
    <main className="mx-auto flex min-h-screen max-w-[1480px] flex-col gap-5 px-8 py-6">
      <header className="boot-in flex items-end justify-between" style={{ animationDelay: '0ms' }}>
        <div>
          <div className="flex items-center gap-3">
            <MotionDot />
            <h1
              className="text-glow-cyan font-display text-[22px] font-bold tracking-[0.04em]"
              style={{ color: 'var(--hud-cyan)' }}
            >
              DAILY&nbsp;BRAIN
              <span style={{ color: 'var(--hud-text-dim)' }}> // </span>
              <span style={{ color: 'var(--hud-text)' }}>ORCHESTRATOR</span>
            </h1>
          </div>
          <p className="hud-label mt-1.5 flex items-center gap-2">
            <span style={{ color: 'var(--hud-cyan)' }}>EA</span>
            <span style={{ opacity: 0.5 }}>+</span>
            <span>3 specialists</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>live</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span style={{ opacity: 0.7 }}>module-5/work/run.jsonl</span>
          </p>
        </div>
        <PerfCounter events={events} />
      </header>

      {error && (
        <div
          className="hud-panel px-4 py-2 text-xs"
          style={{ borderColor: 'var(--hud-red)', color: '#ffc4c4' }}
        >
          stream · {error}
        </div>
      )}

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[auto_1fr]">
        <div className="boot-in flex justify-center" style={{ animationDelay: '120ms' }}>
          <OrchestratorGraph events={events} />
        </div>
        <div className="boot-in" style={{ animationDelay: '240ms' }}>
          <TranscriptPane events={events} />
        </div>
      </section>

      <footer
        className="boot-in mt-auto flex items-center justify-between pt-3"
        style={{ animationDelay: '360ms' }}
      >
        <span className="hud-label" style={{ opacity: 0.7 }}>
          ▸ runs local · no data leaves your machine
        </span>
        <span className="hud-label" style={{ opacity: 0.7 }}>
          localhost:3000 · daily-brain
        </span>
      </footer>
    </main>
  );
}

function MotionDot() {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span
        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
        style={{ background: 'var(--hud-cyan)' }}
      />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full glow-cyan" style={{ background: 'var(--hud-cyan)' }} />
    </span>
  );
}

'use client';

import { useEffect, useMemo, useState } from 'react';
import { useEventStream } from '@/lib/useEventStream';
import { deriveRunState } from '@/lib/events';
import { AgentsPanel } from '@/components/AgentsPanel';
import { FlowPanel } from '@/components/FlowPanel';
import { PerfPanel } from '@/components/PerfPanel';
import { TranscriptPanel } from '@/components/TranscriptPanel';

export default function Dashboard() {
  const { events, error } = useEventStream();
  const state = useMemo(() => deriveRunState(events), [events]);
  const [now, setNow] = useState('--:--:--');

  useEffect(() => {
    const tick = () => setNow(new Date().toISOString().slice(11, 19));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="relative z-10 mx-auto flex min-h-screen max-w-[1480px] flex-col gap-3 px-6 py-5">
      <div className="boot" style={{ animationDelay: '0ms' }}>
        <TopBar nowUtc={now} state={state} error={error} />
      </div>

      <section className="grid grid-cols-1 gap-3 lg:grid-cols-[300px_minmax(0,1fr)_300px]">
        <div className="boot" style={{ animationDelay: '90ms' }}>
          <AgentsPanel state={state} />
        </div>
        <div className="boot" style={{ animationDelay: '170ms' }}>
          <FlowPanel state={state} />
        </div>
        <div className="boot" style={{ animationDelay: '250ms' }}>
          <PerfPanel state={state} />
        </div>
      </section>

      <section className="boot flex-1" style={{ animationDelay: '340ms' }}>
        <TranscriptPanel events={events} />
      </section>

      <BottomBar />
    </main>
  );
}

function TopBar({ nowUtc, state, error }: { nowUtc: string; state: ReturnType<typeof deriveRunState>; error: string | null }) {
  const runActive = state.runActive;

  return (
    <div className="panel">
      <div className="flex items-center justify-between gap-4 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <span className="accent-bar h-4 w-1" />
          <div>
            <div className="font-display flex items-baseline gap-2 text-[16px] font-bold tracking-wider">
              <span style={{ color: 'var(--c-accent)' }}>DAILY BRAIN</span>
              <span style={{ color: 'var(--text-3)' }}>//</span>
              <span style={{ color: 'var(--text)' }}>ORCHESTRATOR</span>
            </div>
            <div className="mt-0.5 flex items-center gap-2 text-[10px]" style={{ color: 'var(--text-3)' }}>
              <span style={{ color: 'var(--text-2)' }}>module-5/work/run.jsonl</span>
              <span>·</span>
              <span>EA + 3 specialists</span>
              <span>·</span>
              <span>local-only</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Kv label="UTC" value={nowUtc} mono />
          <Kv label="run" value={state.latestRunId ? state.latestRunId.slice(-6) : '——'} mono />
          <Kv label="status" value={runActive ? 'RUN ACTIVE' : 'IDLE'} color={runActive ? 'var(--c-accent)' : 'var(--text-3)'} blink={runActive} />
        </div>
      </div>
      {error && (
        <div className="border-t px-4 py-1.5 text-[11px]" style={{ borderColor: 'var(--c-err)', color: 'var(--c-err)' }}>
          stream · {error}
        </div>
      )}
    </div>
  );
}

function Kv({ label, value, mono, color, blink }: { label: string; value: string; mono?: boolean; color?: string; blink?: boolean }) {
  return (
    <div className="flex flex-col items-end leading-tight">
      <span className="label">{label}</span>
      <span
        className={(mono ? 'num ' : '') + (blink ? 'blink ' : '') + 'text-[12px] font-bold'}
        style={{ color: color ?? 'var(--text)' }}
      >
        {value}
      </span>
    </div>
  );
}

function BottomBar() {
  return (
    <div className="flex items-center justify-between border-t pt-2.5" style={{ borderColor: 'var(--border)' }}>
      <span className="label">▸ runs local · no data leaves your machine</span>
      <span className="label">localhost:3000 · daily-brain · v0.2</span>
    </div>
  );
}

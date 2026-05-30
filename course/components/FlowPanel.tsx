'use client';

import { useEffect, useState } from 'react';
import type { DispatchTrace, RunState } from '@/lib/events';
import { SPECIALIST_META } from '@/lib/events';

interface Props {
  state: RunState;
}

function fmtMs(ms: number | null) {
  if (ms === null) return '—';
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

export function FlowPanel({ state }: Props) {
  // Tick so working bars animate live (their "end" is "now").
  const [, setNow] = useState(0);
  useEffect(() => {
    if (!state.traces.some((t) => t.status === 'working')) return;
    const id = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(id);
  }, [state.traces]);

  // Compute the overall window so per-trace bars share a scale.
  const baseTs = state.startedAt ?? 0;
  const now = Date.now();
  const endTs = state.endedAt ?? Math.max(now, baseTs + 1);
  const span = Math.max(1, endTs - baseTs);

  const totalLatency = state.endedAt && state.startedAt ? state.endedAt - state.startedAt : null;

  return (
    <div className="panel flex h-full flex-col">
      <div className="panel-head">
        <div className="flex items-center gap-2">
          <span className="accent-bar h-2 w-1" />
          <span className="panel-title">FLOW</span>
        </div>
        <span className="panel-meta">
          {state.runActive ? <span className="blink" style={{ color: 'var(--c-accent)' }}>● run active</span> : <span style={{ color: 'var(--text-3)' }}>○ idle</span>}
        </span>
      </div>

      <div className="flex-1 space-y-2 px-3 py-2.5">
        {state.traces.length === 0 ? (
          <Empty />
        ) : (
          state.traces.map((tr, i) => <FlowRow key={i} trace={tr} baseTs={baseTs} span={span} />)
        )}
      </div>

      <div className="border-t px-3 py-2" style={{ borderColor: 'var(--border)' }}>
        <div className="grid grid-cols-3 gap-2">
          <Stat label="dispatched" value={state.traces.length.toString()} />
          <Stat label="returned" value={state.traces.filter((t) => t.status !== 'working').length.toString()} />
          <Stat label="total" value={fmtMs(totalLatency)} />
        </div>
      </div>
    </div>
  );
}

function FlowRow({ trace, baseTs, span }: { trace: DispatchTrace; baseTs: number; span: number }) {
  const meta = SPECIALIST_META[trace.agent];
  const isWorking = trace.status === 'working';
  const isErr = trace.status === 'error';
  const startPct = ((trace.dispatchTs - baseTs) / span) * 100;
  const endTs = trace.responseTs ?? Date.now();
  const widthPct = Math.max(1, ((endTs - trace.dispatchTs) / span) * 100);
  const color = isErr ? 'var(--c-err)' : meta.color;

  return (
    <div>
      <div className="flex items-center justify-between text-[10px]">
        <span className="font-mono font-semibold tracking-wider" style={{ color }}>
          EA → {meta.label}
        </span>
        <span className="num" style={{ color: 'var(--text-2)' }}>
          {fmtMs(trace.durationMs ?? Date.now() - trace.dispatchTs)}
        </span>
      </div>
      <div
        className="relative mt-1 h-2 overflow-hidden"
        style={{ background: 'var(--bg-rail)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
      >
        <div
          className={isWorking ? 'blink' : ''}
          style={{
            position: 'absolute',
            left: `${startPct}%`,
            width: `${widthPct}%`,
            top: 0,
            bottom: 0,
            background: color,
            opacity: isWorking ? 0.7 : 1,
            boxShadow: `0 0 8px ${color}`
          }}
        />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="label">{label}</div>
      <div className="num text-[13px] font-bold">{value}</div>
    </div>
  );
}

function Empty() {
  return (
    <div className="py-6 text-center">
      <div className="label" style={{ color: 'var(--text-3)' }}>
        awaiting dispatch
      </div>
      <div className="mt-1 text-[10px]" style={{ color: 'var(--text-3)' }}>
        run the EA orchestrator
      </div>
    </div>
  );
}

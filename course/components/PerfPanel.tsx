'use client';

import { useEffect, useState } from 'react';
import type { RunState } from '@/lib/events';

interface Props {
  state: RunState;
}

function fmtNum(n: number | null | undefined) {
  if (n === null || n === undefined) return '—';
  if (n >= 1000) return n.toLocaleString();
  return n.toString();
}
function fmtUsd(n: number | null | undefined) {
  if (n === null || n === undefined) return '—';
  if (n < 0.01) return `$${(n * 1000).toFixed(2)}m`;
  return `$${n.toFixed(4)}`;
}
function fmtMs(n: number | null | undefined) {
  if (n === null || n === undefined) return '—';
  if (n < 1000) return `${n}ms`;
  return `${(n / 1000).toFixed(2)}s`;
}

function usePerfUnlocked() {
  const [unlocked, setUnlocked] = useState(false);
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setUnlocked(p.get('perf') === '1');
  }, []);
  return unlocked;
}

export function PerfPanel({ state }: Props) {
  const unlocked = usePerfUnlocked();
  const u = state.usage;
  const s = state.sessionTotal;

  return (
    <div className="panel flex h-full flex-col">
      <div className="panel-head">
        <div className="flex items-center gap-2">
          <span className="accent-bar h-2 w-1" />
          <span className="panel-title">PERF</span>
        </div>
        <span className="panel-meta">{unlocked ? `${state.totalRuns} runs` : 'locked'}</span>
      </div>

      {!unlocked ? (
        <LockedView />
      ) : (
        <div className="flex-1 space-y-1 px-3 py-2.5">
          <PerfRow label="tokens·in" value={fmtNum(u?.tokens_in ?? null)} />
          <PerfRow label="tokens·out" value={fmtNum(u?.tokens_out ?? null)} />
          <PerfRow label="cost" value={fmtUsd(u?.cost_usd ?? null)} />
          <PerfRow label="latency" value={fmtMs(u?.latency_ms ?? null)} />
          <div className="my-1.5 border-t border-dashed" style={{ borderColor: 'var(--border)' }} />
          <PerfRow label="session·tokens" value={fmtNum(s.tokens_in + s.tokens_out || null)} dim />
          <PerfRow label="session·cost" value={fmtUsd(s.cost_usd || null)} dim />
        </div>
      )}
    </div>
  );
}

function PerfRow({ label, value, dim }: { label: string; value: string; dim?: boolean }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="label" style={{ color: dim ? 'var(--text-3)' : undefined }}>
        {label}
      </span>
      <span
        className="num text-[14px] font-bold"
        style={{ color: dim ? 'var(--text-2)' : 'var(--text)' }}
      >
        {value}
      </span>
    </div>
  );
}

function LockedView() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-3 py-4 text-center">
      <div
        className="mb-2 inline-flex h-9 w-9 items-center justify-center border"
        style={{ borderColor: 'var(--border-bright)', color: 'var(--text-3)' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="5" y="11" width="14" height="9" />
          <path d="M7 11V8a5 5 0 0 1 10 0v3" />
        </svg>
      </div>
      <div className="label-bright">Performance metrics</div>
      <div className="mt-0.5 text-[11px]" style={{ color: 'var(--text-3)' }}>
        unlocks in Module 6
      </div>
      <div className="mt-3 px-2 py-1 text-[10px]" style={{ color: 'var(--text-2)', background: 'var(--bg-rail)', border: '1px solid var(--border)' }}>
        ?perf=1 → unlock
      </div>
    </div>
  );
}

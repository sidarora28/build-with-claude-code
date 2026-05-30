'use client';

import { useEffect, useMemo, useState } from 'react';
import type { OrchestratorEvent } from '@/lib/events';

interface Props {
  events: OrchestratorEvent[];
}

function fmt(n: number | null | undefined, suffix = '', digits = 0) {
  if (n === null || n === undefined || Number.isNaN(n)) return '—';
  return `${n.toFixed(digits)}${suffix}`;
}

function fmtMs(ms: number | null | undefined) {
  if (ms === null || ms === undefined) return '—';
  if (ms < 1000) return `${ms.toFixed(0)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

function fmtUsd(usd: number | null | undefined) {
  if (usd === null || usd === undefined) return '—';
  if (usd < 0.01) return `$${(usd * 1000).toFixed(2)}m`;
  return `$${usd.toFixed(3)}`;
}

// The perf counter is a Module 6 feature. In Module 5 it shows a locked
// placeholder so the orchestration lesson stays uncluttered. Module 6
// unlocks it by loading the dashboard at /?perf=1.
function usePerfUnlocked() {
  const [unlocked, setUnlocked] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUnlocked(params.get('perf') === '1');
  }, []);
  return unlocked;
}

export function PerfCounter({ events }: Props) {
  const unlocked = usePerfUnlocked();

  const stats = useMemo(() => {
    const usages = events.filter((e): e is Extract<OrchestratorEvent, { kind: 'usage' }> => e.kind === 'usage');
    const latest = usages[usages.length - 1];
    if (!latest) return null;

    const runs = events.filter((e) => e.kind === 'orchestrator_end').length;

    const total = usages.reduce(
      (acc, e) => ({
        tokens_in: (acc.tokens_in ?? 0) + (e.tokens_in ?? 0),
        tokens_out: (acc.tokens_out ?? 0) + (e.tokens_out ?? 0),
        cost_usd: (acc.cost_usd ?? 0) + (e.cost_usd ?? 0)
      }),
      { tokens_in: 0, tokens_out: 0, cost_usd: 0 }
    );

    return { latest, runs, total };
  }, [events]);

  if (!unlocked) {
    return (
      <div className="hud-panel flex items-center gap-2.5 px-4 py-2.5 text-xs">
        <span style={{ color: 'var(--hud-text-mute)', fontSize: 13 }}>◳</span>
        <div className="flex flex-col leading-tight">
          <span className="hud-label">Performance metrics</span>
          <span className="font-mono text-[11px]" style={{ color: 'var(--hud-text-mute)' }}>
            unlocks in Module 6
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="hud-panel flex items-center gap-6 px-4 py-2.5 text-xs glow-cyan">
      <Stat label="Last run" value={fmtMs(stats?.latest.latency_ms)} />
      <Divider />
      <Stat label="Tokens in" value={fmt(stats?.latest.tokens_in)} />
      <Stat label="Tokens out" value={fmt(stats?.latest.tokens_out)} />
      <Divider />
      <Stat label="Cost" value={fmtUsd(stats?.latest.cost_usd)} />
      <Divider />
      <Stat label="Runs" value={stats ? stats.runs.toString() : '—'} />
      <Divider />
      <Stat label="Session ∑" value={fmtUsd(stats?.total.cost_usd)} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="hud-label">{label}</span>
      <span className="hud-value text-sm">{value}</span>
    </div>
  );
}

function Divider() {
  return <div className="h-7 w-px bg-[color:var(--hud-line)]" />;
}

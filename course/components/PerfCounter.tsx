'use client';

import { useMemo } from 'react';
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

export function PerfCounter({ events }: Props) {
  const stats = useMemo(() => {
    // Find the latest usage event
    const usages = events.filter((e): e is Extract<OrchestratorEvent, { kind: 'usage' }> => e.kind === 'usage');
    const latest = usages[usages.length - 1];
    if (!latest) return null;

    // Count total runs in this log
    const runs = events.filter((e) => e.kind === 'orchestrator_end').length;

    // Sum across all usage events (for "session total")
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

  return (
    <div className="hud-panel flex items-center gap-6 px-4 py-2.5 text-xs">
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

'use client';

import { useEffect, useRef } from 'react';
import type { OrchestratorEvent, SpecialistId } from '@/lib/events';

interface Props {
  events: OrchestratorEvent[];
}

const SPEC_COLOR: Record<SpecialistId, string> = {
  'notes-specialist': 'var(--hud-violet)',
  'calendar-specialist': 'var(--hud-amber)',
  'followups-specialist': 'var(--hud-green)'
};

export function TranscriptPane({ events }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [events.length]);

  return (
    <div className="hud-panel flex h-[520px] flex-col">
      <div className="flex items-center justify-between border-b border-[color:var(--hud-line)] px-4 py-2">
        <span className="hud-label">transcript · live</span>
        <span className="hud-label" style={{ color: 'var(--hud-cyan)' }}>
          {events.length} events
        </span>
      </div>
      <div ref={scrollerRef} className="flex-1 overflow-y-auto px-4 py-3 text-[12px] leading-relaxed">
        {events.length === 0 ? (
          <div className="py-12 text-center" style={{ color: 'var(--hud-text-dim)' }}>
            <div className="hud-label">awaiting orchestrator</div>
            <div className="mt-2 text-[11px]">
              Run the EA orchestrator from your <code>claude</code> session.
              <br />
              Events stream here in real time.
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {events.map((e, i) => (
              <Line key={`${e.ts}-${i}`} event={e} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Line({ event }: { event: OrchestratorEvent }) {
  const t = formatTime(event.ts);

  switch (event.kind) {
    case 'orchestrator_start':
      return (
        <Row time={t} kind="START" kindColor="var(--hud-cyan)">
          <span style={{ color: 'var(--hud-text)' }}>EA</span>{' '}
          <span style={{ color: 'var(--hud-text-dim)' }}>
            ← &quot;{event.prompt ?? 'morning brief'}&quot;
          </span>
        </Row>
      );
    case 'dispatch':
      return (
        <Row time={t} kind="DISPATCH" kindColor={SPEC_COLOR[event.to]}>
          <span style={{ color: 'var(--hud-cyan)' }}>EA</span>{' '}
          <span style={{ color: 'var(--hud-text-dim)' }}>→</span>{' '}
          <span style={{ color: SPEC_COLOR[event.to], fontWeight: 600 }}>{labelOf(event.to)}</span>
          {event.prompt && (
            <div className="mt-0.5 pl-6 italic" style={{ color: 'var(--hud-text-dim)' }}>
              “{truncate(event.prompt, 90)}”
            </div>
          )}
        </Row>
      );
    case 'response':
      return (
        <Row time={t} kind="RESPONSE" kindColor={SPEC_COLOR[event.from]}>
          <span style={{ color: SPEC_COLOR[event.from], fontWeight: 600 }}>{labelOf(event.from)}</span>{' '}
          <span style={{ color: 'var(--hud-text-dim)' }}>→</span>{' '}
          <span style={{ color: 'var(--hud-cyan)' }}>EA</span>
          <pre
            className="mt-1 whitespace-pre-wrap rounded border px-2 py-1 text-[11px]"
            style={{
              borderColor: 'var(--hud-line)',
              background: 'rgba(255,255,255,0.02)',
              color: 'var(--hud-text)'
            }}
          >
            {truncate(event.msg, 280)}
          </pre>
        </Row>
      );
    case 'synthesise':
      return (
        <Row time={t} kind="SYNTHESISE" kindColor="var(--hud-cyan)">
          <span style={{ color: 'var(--hud-cyan)' }}>EA</span>{' '}
          <span style={{ color: 'var(--hud-text-dim)' }}>combines and writes the brief</span>
        </Row>
      );
    case 'usage':
      return (
        <Row time={t} kind="USAGE" kindColor="var(--hud-text-dim)">
          <span style={{ color: 'var(--hud-text-dim)' }}>
            {event.tokens_in ?? '—'} in · {event.tokens_out ?? '—'} out ·{' '}
            {event.cost_usd ? `$${event.cost_usd.toFixed(4)}` : '—'} · {event.latency_ms ?? '—'}ms
          </span>
        </Row>
      );
    case 'orchestrator_end':
      return (
        <Row time={t} kind="END" kindColor="var(--hud-text-dim)">
          <span style={{ color: 'var(--hud-text-dim)' }}>run complete</span>
        </Row>
      );
  }
}

function Row({
  time,
  kind,
  kindColor,
  children
}: {
  time: string;
  kind: string;
  kindColor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <span className="hud-label shrink-0 pt-px" style={{ color: 'var(--hud-text-dim)' }}>
        {time}
      </span>
      <span
        className="hud-label shrink-0 pt-px"
        style={{ color: kindColor, width: 78 }}
      >
        {kind}
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

function formatTime(iso: string) {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso.slice(11, 19);
    return d.toISOString().slice(11, 19);
  } catch {
    return iso;
  }
}

function labelOf(id: SpecialistId) {
  switch (id) {
    case 'notes-specialist':
      return 'NOTES';
    case 'calendar-specialist':
      return 'CALENDAR';
    case 'followups-specialist':
      return 'FOLLOW-UPS';
  }
}

function truncate(s: string, n: number) {
  if (s.length <= n) return s;
  return s.slice(0, n - 1).trimEnd() + '…';
}

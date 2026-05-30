'use client';

import { useEffect, useRef, useState } from 'react';
import type { OrchestratorEvent, SpecialistId } from '@/lib/events';
import { SPECIALIST_META } from '@/lib/events';

// Typewriter: reveals `text` char-by-char when `active`, with a blinking cursor.
// When inactive (an older row), shows the full text instantly.
function Typewriter({ text, active, cps = 240 }: { text: string; active: boolean; cps?: number }) {
  const [n, setN] = useState(active ? 0 : text.length);

  useEffect(() => {
    if (!active) {
      setN(text.length);
      return;
    }
    setN(0);
    let raf = 0;
    let start: number | null = null;
    const step = (t: number) => {
      if (start === null) start = t;
      const elapsed = (t - start) / 1000;
      const target = Math.min(text.length, Math.floor(elapsed * cps));
      setN(target);
      if (target < text.length) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [text, active, cps]);

  const typing = active && n < text.length;
  return (
    <>
      {text.slice(0, n)}
      {typing && (
        <span className="blink" style={{ color: 'var(--c-accent)' }}>
          ▋
        </span>
      )}
    </>
  );
}

interface Props {
  events: OrchestratorEvent[];
}

const KIND_COLOR = {
  orchestrator_start: 'var(--c-accent)',
  dispatch: 'var(--c-warn)',
  response: 'var(--c-ok)',
  synthesise: 'var(--c-accent)',
  usage: 'var(--text-3)',
  orchestrator_end: 'var(--text-3)'
} as const;

const KIND_LABEL = {
  orchestrator_start: 'START',
  dispatch: 'DISPATCH',
  response: 'RESPONSE',
  synthesise: 'SYNTH',
  usage: 'USAGE',
  orchestrator_end: 'END'
} as const;

function specColor(id: SpecialistId) {
  return SPECIALIST_META[id].color;
}
function specLabel(id: SpecialistId) {
  return SPECIALIST_META[id].label;
}

function fmtTime(iso: string) {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso.slice(11, 19);
    return d.toISOString().slice(11, 19);
  } catch {
    return iso;
  }
}

function truncate(s: string, n: number) {
  if (s.length <= n) return s;
  return s.slice(0, n - 1).trimEnd() + '…';
}

export function TranscriptPanel({ events }: Props) {
  const scroller = useRef<HTMLDivElement>(null);
  const [flashIdx, setFlashIdx] = useState<number | null>(null);
  const prevLen = useRef(events.length);

  useEffect(() => {
    if (events.length > prevLen.current) {
      setFlashIdx(events.length - 1);
      const t = setTimeout(() => setFlashIdx(null), 800);
      prevLen.current = events.length;
      return () => clearTimeout(t);
    }
    prevLen.current = events.length;
  }, [events.length]);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [events.length]);

  return (
    <div className="panel flex h-full flex-col">
      <div className="panel-head">
        <div className="flex items-center gap-2">
          <span className="accent-bar h-2 w-1" />
          <span className="panel-title">TRANSCRIPT</span>
          <span className="panel-meta">// event stream</span>
        </div>
        <span className="panel-meta">{events.length} events</span>
      </div>

      {/* header row */}
      <div
        className="grid items-center gap-3 border-b px-3 py-1.5"
        style={{ borderColor: 'var(--border)', gridTemplateColumns: '88px 90px 200px 1fr' }}
      >
        <span className="label">timestamp</span>
        <span className="label">kind</span>
        <span className="label">channel</span>
        <span className="label">payload</span>
      </div>

      <div ref={scroller} className="flex-1 overflow-y-auto">
        {events.length === 0 ? (
          <Empty />
        ) : (
          <div>
            {events.map((e, i) => (
              <Row key={`${e.ts}-${i}`} event={e} flash={flashIdx === i} latest={i === events.length - 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ event: e, flash, latest }: { event: OrchestratorEvent; flash: boolean; latest: boolean }) {
  const kind = KIND_LABEL[e.kind];
  const kindColor = KIND_COLOR[e.kind];

  let channel: React.ReactNode = null;
  let payload: React.ReactNode = null;

  if (e.kind === 'orchestrator_start') {
    channel = <span style={{ color: 'var(--c-accent)' }}>EA</span>;
    payload = (
      <span style={{ color: 'var(--text-2)' }}>
        &ldquo;<Typewriter text={e.prompt ?? 'morning brief'} active={latest} />&rdquo;
      </span>
    );
  } else if (e.kind === 'dispatch') {
    channel = (
      <>
        <span style={{ color: 'var(--c-accent)' }}>EA</span>
        <span style={{ color: 'var(--text-3)' }}> → </span>
        <span style={{ color: specColor(e.to), fontWeight: 700 }}>{specLabel(e.to)}</span>
      </>
    );
    payload = (
      <span style={{ color: 'var(--text-2)' }}>
        {e.prompt ? <>“<Typewriter text={truncate(e.prompt, 110)} active={latest} />”</> : '—'}
      </span>
    );
  } else if (e.kind === 'response') {
    channel = (
      <>
        <span style={{ color: specColor(e.from), fontWeight: 700 }}>{specLabel(e.from)}</span>
        <span style={{ color: 'var(--text-3)' }}> → </span>
        <span style={{ color: 'var(--c-accent)' }}>EA</span>
      </>
    );
    payload = (
      <span className="mono-xs" style={{ color: 'var(--text-2)', whiteSpace: 'pre-wrap' }}>
        <Typewriter text={truncate(e.msg, 260)} active={latest} cps={400} />
      </span>
    );
  } else if (e.kind === 'synthesise') {
    channel = <span style={{ color: 'var(--c-accent)' }}>EA · synthesise</span>;
    const firstLine = e.msg.split('\n').find((l) => l.trim().length > 0) ?? 'final brief';
    payload = (
      <span style={{ color: 'var(--text-2)' }}>
        composed brief — <Typewriter text={truncate(firstLine.replace(/^#+\s*/, ''), 140)} active={latest} />
      </span>
    );
  } else if (e.kind === 'usage') {
    channel = <span style={{ color: 'var(--text-3)' }}>EA · usage</span>;
    payload = (
      <span style={{ color: 'var(--text-2)' }}>
        <Pair k="tok·in" v={e.tokens_in ?? '—'} />
        <Pair k="tok·out" v={e.tokens_out ?? '—'} />
        <Pair k="cost" v={e.cost_usd ? `$${e.cost_usd.toFixed(4)}` : '—'} />
        <Pair k="latency" v={e.latency_ms ? `${e.latency_ms}ms` : '—'} />
      </span>
    );
  } else if (e.kind === 'orchestrator_end') {
    channel = <span style={{ color: 'var(--text-3)' }}>EA</span>;
    payload = <span style={{ color: 'var(--text-3)' }}>run complete</span>;
  }

  return (
    <div
      className={'grid items-start gap-3 border-b px-3 py-1.5 ' + (flash ? 'flash' : '')}
      style={{
        borderColor: 'var(--border)',
        gridTemplateColumns: '88px 90px 200px 1fr'
      }}
    >
      <span className="num text-[11px]" style={{ color: 'var(--text-3)' }}>
        {fmtTime(e.ts)}
      </span>
      <span className="num text-[11px] font-bold" style={{ color: kindColor }}>
        {kind}
      </span>
      <span className="num text-[11px]">{channel}</span>
      <span className="num text-[11px]">{payload}</span>
    </div>
  );
}

function Pair({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <span className="mr-3">
      <span style={{ color: 'var(--text-3)' }}>{k}=</span>
      <span style={{ color: 'var(--text)' }}>{v}</span>
    </span>
  );
}

function Empty() {
  return (
    <div className="flex h-full flex-col items-center justify-center py-12 text-center">
      <span className="label">awaiting orchestrator</span>
      <span className="mt-1 text-[11px]" style={{ color: 'var(--text-3)' }}>
        events stream here when the EA runs
      </span>
    </div>
  );
}

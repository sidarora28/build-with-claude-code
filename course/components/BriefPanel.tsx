'use client';

import { useEffect, useRef, useState } from 'react';
import type { RunState } from '@/lib/events';

interface Props {
  state: RunState;
}

// Reveals brief char-by-char on first appearance, then stays static.
function useTypewriter(text: string | null, cps: number) {
  const [n, setN] = useState(0);
  const last = useRef<string | null>(null);
  useEffect(() => {
    if (text === null) {
      last.current = null;
      setN(0);
      return;
    }
    if (last.current === text) return;
    last.current = text;
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
  }, [text, cps]);
  return { n, typing: text !== null && n < text.length };
}

export function BriefPanel({ state }: Props) {
  const brief = state.finalBrief;
  const { n, typing } = useTypewriter(brief, 320);
  const revealed = brief ? brief.slice(0, n) : '';

  return (
    <div className="panel">
      <div className="panel-head">
        <div className="flex items-center gap-2">
          <span className="accent-bar h-2 w-1" />
          <span className="panel-title" style={{ color: 'var(--c-accent)' }}>
            BRIEF
          </span>
          <span className="panel-meta">// EA → Sid</span>
        </div>
        <div className="flex items-center gap-3">
          {state.briefTs && (
            <span className="panel-meta">
              {new Date(state.briefTs).toISOString().slice(11, 19)} UTC
            </span>
          )}
          <span className="panel-meta">
            {brief ? (typing ? <span className="blink" style={{ color: 'var(--c-accent)' }}>● composing</span> : <span style={{ color: 'var(--c-ok)' }}>● delivered</span>) : <span>○ awaiting synthesis</span>}
          </span>
        </div>
      </div>

      <div className="px-5 py-4">
        {!brief ? <EmptyBrief active={state.runActive} /> : <BriefBody text={revealed} typing={typing} />}
      </div>
    </div>
  );
}

function BriefBody({ text, typing }: { text: string; typing: boolean }) {
  return (
    <div
      className="whitespace-pre-wrap text-[14px] leading-[1.65]"
      style={{
        fontFamily: 'var(--font-mono)',
        color: 'var(--text)',
        letterSpacing: '0.005em'
      }}
    >
      {renderBrief(text)}
      {typing && (
        <span className="blink" style={{ color: 'var(--c-accent)' }}>
          ▋
        </span>
      )}
    </div>
  );
}

// Lightweight markdown render for the brief body:
// - `# heading` → display-font heading
// - `## sub` → cyan section header
// - `1.` / `-` list bullets → indented, dim marker
// - `[HIGH]` / `[MED]` / `[LOW]` priority tags get colored pills inline
function renderBrief(text: string) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('# ')) {
      return (
        <div
          key={i}
          className="font-display mb-2 text-[18px] font-bold tracking-tight"
          style={{ color: 'var(--text)' }}
        >
          {line.slice(2)}
        </div>
      );
    }
    if (line.startsWith('## ')) {
      return (
        <div
          key={i}
          className="font-display mt-3 mb-1 text-[12px] font-bold uppercase tracking-[0.18em]"
          style={{ color: 'var(--c-accent)' }}
        >
          {line.slice(3)}
        </div>
      );
    }
    if (line.trim() === '') {
      return <div key={i} className="h-2" />;
    }
    return (
      <div key={i} style={{ color: 'var(--text-2)' }}>
        {renderInline(line)}
      </div>
    );
  });
}

function renderInline(s: string) {
  // Highlight [HIGH]/[MED]/[LOW] tags.
  const parts = s.split(/(\[HIGH\]|\[MED\]|\[LOW\])/g);
  return parts.map((p, i) => {
    if (p === '[HIGH]') return <Tag key={i} color="var(--c-err)">HIGH</Tag>;
    if (p === '[MED]') return <Tag key={i} color="var(--c-warn)">MED</Tag>;
    if (p === '[LOW]') return <Tag key={i} color="var(--c-ok)">LOW</Tag>;
    return <span key={i}>{p}</span>;
  });
}

function Tag({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      className="mr-1 inline-block px-1.5 py-px text-[10px] font-bold tracking-wider"
      style={{ color, border: `1px solid ${color}`, borderRadius: '1px' }}
    >
      {children}
    </span>
  );
}

function EmptyBrief({ active }: { active: boolean }) {
  return (
    <div className="py-6 text-center">
      <div className="font-display text-[13px] tracking-wider" style={{ color: 'var(--text-2)' }}>
        {active ? "Specialists working — EA will compose the brief once they're back." : 'No brief yet.'}
      </div>
      <div className="mt-1 text-[11px]" style={{ color: 'var(--text-3)' }}>
        {active ? 'streaming will start here' : 'run the orchestrator to see your morning brief'}
      </div>
    </div>
  );
}

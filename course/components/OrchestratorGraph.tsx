'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { OrchestratorEvent, SpecialistId, SpecialistState } from '@/lib/events';

interface Props {
  events: OrchestratorEvent[];
}

const CANVAS = 520;
const CENTER = CANVAS / 2;
const RADIUS = 190;

// Angles measured clockwise from straight up.
const NODE_LAYOUT: Record<SpecialistId, { angle: number; label: string; sub: string; color: string }> = {
  'notes-specialist': { angle: 0, label: 'NOTES', sub: 'meeting actions', color: 'var(--hud-violet)' },
  'calendar-specialist': { angle: 120, label: 'CALENDAR', sub: "today's schedule", color: 'var(--hud-amber)' },
  'followups-specialist': { angle: 240, label: 'FOLLOW-UPS', sub: 'who is waiting', color: 'var(--hud-green)' }
};

function polar(angleDeg: number, r: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: CENTER + Math.sin(a) * r, y: CENTER - Math.cos(a) * r };
}

interface Pulse {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  color: string;
}

const PULSE_TTL_MS = 700;

export function OrchestratorGraph({ events }: Props) {
  // Track state of each specialist for the latest run.
  const state = useMemo(() => deriveState(events), [events]);

  // Pulse animation: when new dispatch / response / synthesise events appear, fire a pulse.
  const seenRef = useRef<Set<string>>(new Set());
  const [pulses, setPulses] = useState<Pulse[]>([]);

  useEffect(() => {
    const fresh: Pulse[] = [];
    for (const e of events) {
      const key = `${e.ts}-${e.kind}-${'to' in e ? e.to : 'from' in e ? e.from : 'self'}`;
      if (seenRef.current.has(key)) continue;
      seenRef.current.add(key);

      if (e.kind === 'dispatch') {
        const node = NODE_LAYOUT[e.to];
        if (!node) continue;
        const dst = polar(node.angle, RADIUS);
        fresh.push({
          id: key,
          from: { x: CENTER, y: CENTER },
          to: dst,
          color: node.color
        });
      } else if (e.kind === 'response') {
        const node = NODE_LAYOUT[e.from];
        if (!node) continue;
        const src = polar(node.angle, RADIUS);
        fresh.push({
          id: key,
          from: src,
          to: { x: CENTER, y: CENTER },
          color: node.color
        });
      }
    }
    if (fresh.length === 0) return;
    setPulses((prev) => [...prev, ...fresh]);
    const t = setTimeout(() => {
      setPulses((prev) => prev.filter((p) => !fresh.some((f) => f.id === p.id)));
    }, PULSE_TTL_MS);
    return () => clearTimeout(t);
  }, [events]);

  // EA breathing intensity: brighter when something is in flight.
  const eaActive = state.runActive;

  return (
    <div className="hud-panel relative" style={{ width: CANVAS, height: CANVAS }}>
      {/* HUD label */}
      <div className="absolute left-3 top-2 hud-label">orchestration · live</div>
      <div className="absolute right-3 top-2 hud-label">{state.runActive ? 'RUN ACTIVE' : 'idle'}</div>

      {/* Connection lines (SVG) */}
      <svg
        viewBox={`0 0 ${CANVAS} ${CANVAS}`}
        className="absolute inset-0"
        style={{ pointerEvents: 'none' }}
      >
        <defs>
          <radialGradient id="ea-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--hud-cyan)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--hud-cyan)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Concentric rings */}
        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="var(--hud-line)" strokeDasharray="2 4" strokeWidth="0.6" />
        <circle cx={CENTER} cy={CENTER} r={RADIUS * 0.55} fill="none" stroke="var(--hud-line)" strokeDasharray="2 4" strokeWidth="0.6" />
        <circle cx={CENTER} cy={CENTER} r={RADIUS * 0.25} fill="none" stroke="var(--hud-line)" strokeDasharray="2 4" strokeWidth="0.6" />

        {/* Connection lines from EA → specialists */}
        {Object.entries(NODE_LAYOUT).map(([id, n]) => {
          const p = polar(n.angle, RADIUS);
          const sp = state.specialists[id as SpecialistId];
          const lit = sp === 'pending' || sp === 'responded';
          return (
            <line
              key={id}
              x1={CENTER}
              y1={CENTER}
              x2={p.x}
              y2={p.y}
              stroke={lit ? n.color : 'var(--hud-line)'}
              strokeWidth={lit ? 1.2 : 0.8}
              strokeOpacity={lit ? 0.6 : 0.35}
            />
          );
        })}

        {/* EA halo */}
        <circle cx={CENTER} cy={CENTER} r={80} fill="url(#ea-grad)" />
      </svg>

      {/* EA node */}
      <motion.div
        className="hud-panel absolute flex flex-col items-center justify-center text-center"
        style={{
          left: CENTER - 55,
          top: CENTER - 55,
          width: 110,
          height: 110,
          borderRadius: '50%',
          borderColor: 'var(--hud-cyan)',
          background: 'radial-gradient(circle at 50% 35%, rgba(93,214,245,0.18), rgba(10,14,22,0.95) 70%)'
        }}
        animate={{
          boxShadow: eaActive
            ? [
                '0 0 14px var(--hud-cyan-glow), 0 0 40px var(--hud-cyan-glow), inset 0 0 18px rgba(93,214,245,0.32)',
                '0 0 22px var(--hud-cyan-glow), 0 0 60px var(--hud-cyan-glow), inset 0 0 26px rgba(93,214,245,0.45)',
                '0 0 14px var(--hud-cyan-glow), 0 0 40px var(--hud-cyan-glow), inset 0 0 18px rgba(93,214,245,0.32)'
              ]
            : [
                '0 0 4px rgba(93,214,245,0.25), 0 0 12px rgba(93,214,245,0.18), inset 0 0 8px rgba(93,214,245,0.10)',
                '0 0 8px rgba(93,214,245,0.35), 0 0 18px rgba(93,214,245,0.22), inset 0 0 10px rgba(93,214,245,0.16)',
                '0 0 4px rgba(93,214,245,0.25), 0 0 12px rgba(93,214,245,0.18), inset 0 0 8px rgba(93,214,245,0.10)'
              ]
        }}
        transition={{ duration: eaActive ? 1.4 : 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="text-glow-cyan text-[15px] font-semibold" style={{ color: 'var(--hud-cyan)' }}>
          EA
        </div>
        <div className="hud-label mt-0.5">chief of staff</div>
      </motion.div>

      {/* Specialist nodes */}
      {(Object.entries(NODE_LAYOUT) as [SpecialistId, typeof NODE_LAYOUT[SpecialistId]][]).map(([id, n]) => {
        const p = polar(n.angle, RADIUS);
        const sp = state.specialists[id];
        return (
          <SpecialistDisc
            key={id}
            x={p.x}
            y={p.y}
            label={n.label}
            sub={n.sub}
            color={n.color}
            state={sp}
          />
        );
      })}

      {/* Pulses */}
      <svg viewBox={`0 0 ${CANVAS} ${CANVAS}`} className="absolute inset-0" style={{ pointerEvents: 'none' }}>
        <AnimatePresence>
          {pulses.map((p) => (
            <motion.circle
              key={p.id}
              r={5}
              fill={p.color}
              initial={{ cx: p.from.x, cy: p.from.y, opacity: 0.95 }}
              animate={{ cx: p.to.x, cy: p.to.y, opacity: 0 }}
              transition={{ duration: PULSE_TTL_MS / 1000, ease: 'easeInOut' }}
              style={{
                filter: `drop-shadow(0 0 6px ${p.color}) drop-shadow(0 0 12px ${p.color})`
              }}
            />
          ))}
        </AnimatePresence>
      </svg>
    </div>
  );
}

function SpecialistDisc({
  x,
  y,
  label,
  sub,
  color,
  state
}: {
  x: number;
  y: number;
  label: string;
  sub: string;
  color: string;
  state: SpecialistState;
}) {
  const isActive = state === 'pending';
  const isDone = state === 'responded';
  const isError = state === 'error';

  return (
    <motion.div
      className="absolute flex flex-col items-center justify-center text-center"
      style={{
        left: x - 60,
        top: y - 40,
        width: 120,
        height: 80
      }}
      animate={
        isActive
          ? { scale: [1, 1.06, 1] }
          : { scale: 1 }
      }
      transition={{ duration: 1.4, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
    >
      <div
        className="hud-panel relative flex h-full w-full flex-col items-center justify-center px-2"
        style={{
          borderColor: isError ? '#ff6b6b' : isActive || isDone ? color : 'var(--hud-line)',
          boxShadow: isActive
            ? `0 0 10px ${color}, 0 0 24px ${color}, inset 0 0 12px rgba(255,255,255,0.04)`
            : isDone
              ? `0 0 6px ${color}, inset 0 0 8px rgba(255,255,255,0.03)`
              : 'none',
          background: 'rgba(10,14,22,0.9)'
        }}
      >
        <div className="text-[11px] font-semibold tracking-wider" style={{ color }}>
          {label}
        </div>
        <div className="hud-label mt-0.5">{sub}</div>
        <div className="hud-label mt-1.5" style={{ color: stateColor(state, color) }}>
          {stateLabel(state)}
        </div>
      </div>
    </motion.div>
  );
}

function stateLabel(s: SpecialistState) {
  switch (s) {
    case 'pending':
      return '◉ working';
    case 'responded':
      return '✓ returned';
    case 'error':
      return '✕ error';
    default:
      return '· idle';
  }
}

function stateColor(s: SpecialistState, accent: string) {
  if (s === 'pending') return accent;
  if (s === 'responded') return accent;
  if (s === 'error') return '#ff8a8a';
  return 'var(--hud-text-dim)';
}

function deriveState(events: OrchestratorEvent[]) {
  // Find latest run_id.
  let latestRunId: string | null = null;
  for (const e of events) {
    if ('run_id' in e) latestRunId = e.run_id;
  }

  const specialists: Record<SpecialistId, SpecialistState> = {
    'notes-specialist': 'idle',
    'calendar-specialist': 'idle',
    'followups-specialist': 'idle'
  };

  let runActive = false;

  if (latestRunId) {
    const runEvents = events.filter((e) => 'run_id' in e && e.run_id === latestRunId);
    const ended = runEvents.some((e) => e.kind === 'orchestrator_end');
    runActive = !ended;

    for (const e of runEvents) {
      if (e.kind === 'dispatch') {
        specialists[e.to] = 'pending';
      } else if (e.kind === 'response') {
        if (/^ERROR/i.test(e.msg)) specialists[e.from] = 'error';
        else specialists[e.from] = 'responded';
      }
    }

    // When the run has fully ended, mark all responded specialists as still "responded" (preserved).
    // Idle stays idle (e.g. if a specialist was never dispatched).
  }

  return { specialists, runActive };
}

'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { OrchestratorEvent, SpecialistId, SpecialistState } from '@/lib/events';

interface Props {
  events: OrchestratorEvent[];
}

const CANVAS = 560;
const CENTER = CANVAS / 2;
const RADIUS = 200;

const NODE_LAYOUT: Record<
  SpecialistId,
  { angle: number; label: string; sub: string; color: string; glyph: string }
> = {
  'notes-specialist': { angle: 0, label: 'NOTES', sub: 'meeting actions', color: 'var(--hud-violet)', glyph: '≡' },
  'calendar-specialist': { angle: 120, label: 'CALENDAR', sub: "today's schedule", color: 'var(--hud-amber)', glyph: '◷' },
  'followups-specialist': { angle: 240, label: 'FOLLOW-UPS', sub: 'who is waiting', color: 'var(--hud-green)', glyph: '⤴' }
};

function polar(angleDeg: number, r: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: CENTER + Math.sin(a) * r, y: CENTER - Math.cos(a) * r };
}

function arcPath(r: number, startDeg: number, endDeg: number) {
  const s = polar(startDeg, r);
  const e = polar(endDeg, r);
  const large = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
}

interface Pulse {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  color: string;
}

const PULSE_TTL_MS = 800;

export function OrchestratorGraph({ events }: Props) {
  const state = useMemo(() => deriveState(events), [events]);

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
        if (node) fresh.push({ id: key, from: { x: CENTER, y: CENTER }, to: polar(node.angle, RADIUS), color: node.color });
      } else if (e.kind === 'response') {
        const node = NODE_LAYOUT[e.from];
        if (node) fresh.push({ id: key, from: polar(node.angle, RADIUS), to: { x: CENTER, y: CENTER }, color: node.color });
      }
    }
    if (fresh.length === 0) return;
    setPulses((prev) => [...prev, ...fresh]);
    const t = setTimeout(() => setPulses((prev) => prev.filter((p) => !fresh.some((f) => f.id === p.id))), PULSE_TTL_MS);
    return () => clearTimeout(t);
  }, [events]);

  const eaActive = state.runActive;
  const ticks = useMemo(() => Array.from({ length: 72 }, (_, i) => i), []);
  const motes = useMemo(() => [0, 60, 120, 180, 240, 300], []);
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        x: 40 + ((i * 71) % (CANVAS - 80)),
        y: 40 + ((i * 137) % (CANVAS - 80)),
        d: 6 + (i % 5),
        delay: (i % 7) * 0.6
      })),
    []
  );

  return (
    <div className="hud-panel relative overflow-hidden" style={{ width: CANVAS, height: CANVAS }}>
      {/* ambient radial glow + vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(111,224,255,0.10), rgba(5,7,11,0) 55%), radial-gradient(circle at 50% 50%, rgba(5,7,11,0) 60%, rgba(5,7,11,0.85) 100%)'
        }}
      />

      {/* grid backdrop */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(var(--hud-grid) 1px, transparent 1px), linear-gradient(90deg, var(--hud-grid) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.5,
          maskImage: 'radial-gradient(circle at 50% 50%, black 28%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 28%, transparent 80%)'
        }}
      />

      {/* floating ambient particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ left: p.x, top: p.y, width: 2, height: 2, background: 'var(--hud-cyan)' }}
          animate={{ opacity: [0.05, 0.5, 0.05], y: [0, -p.d, 0] }}
          transition={{ duration: 4 + (i % 4), repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}

      {/* HUD chrome */}
      <div className="absolute left-4 top-3 z-20 hud-label">orchestration · live</div>
      <div
        className="absolute right-4 top-3 z-20 hud-label"
        style={{ color: eaActive ? 'var(--hud-cyan)' : 'var(--hud-text-dim)' }}
      >
        {eaActive ? '◉ RUN ACTIVE' : '○ idle'}
      </div>
      <div className="absolute bottom-3 left-4 z-20 hud-label" style={{ opacity: 0.8 }}>
        SYS.EA // v0.2
      </div>
      <div className="absolute bottom-3 right-4 z-20 hud-label" style={{ opacity: 0.8 }}>
        {`N:${count(state, 'notes-specialist')} · C:${count(state, 'calendar-specialist')} · F:${count(state, 'followups-specialist')}`}
      </div>

      <svg viewBox={`0 0 ${CANVAS} ${CANVAS}`} className="absolute inset-0" style={{ pointerEvents: 'none' }}>
        <defs>
          <radialGradient id="ea-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--hud-cyan)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--hud-cyan)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sweep-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--hud-cyan)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--hud-cyan)" stopOpacity="0.5" />
          </linearGradient>
          {(Object.entries(NODE_LAYOUT) as [SpecialistId, (typeof NODE_LAYOUT)[SpecialistId]][]).map(([id, n]) => {
            const p = polar(n.angle, RADIUS);
            return (
              <linearGradient key={id} id={`line-${id}`} x1={CENTER} y1={CENTER} x2={p.x} y2={p.y} gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="var(--hud-cyan)" stopOpacity="0.5" />
                <stop offset="100%" stopColor={n.color} stopOpacity="0.7" />
              </linearGradient>
            );
          })}
        </defs>

        {/* bright primary ring */}
        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="var(--hud-line)" strokeWidth="1.4" strokeOpacity="0.8" />

        {/* rotating dashed energy overlay on the primary ring */}
        <motion.g
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="var(--hud-cyan)" strokeWidth="1.4" strokeDasharray="2 22" strokeOpacity="0.7" />
        </motion.g>

        {/* outer slow ring */}
        <motion.g
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx={CENTER} cy={CENTER} r={RADIUS + 26} fill="none" stroke="var(--hud-line)" strokeDasharray="2 10" strokeWidth="1" strokeOpacity="0.7" />
        </motion.g>

        {/* tick dial */}
        <g>
          {ticks.map((i) => {
            const major = i % 6 === 0;
            const a = (i / 72) * 360;
            const p1 = polar(a, RADIUS + 14);
            const p2 = polar(a, RADIUS + (major ? 24 : 19));
            return (
              <line
                key={i}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke={major ? 'var(--hud-cyan)' : 'var(--hud-line)'}
                strokeOpacity={major ? 0.6 : 0.45}
                strokeWidth={major ? 1.4 : 0.9}
              />
            );
          })}
        </g>

        {/* counter-rotating mid ring */}
        <motion.g
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          animate={{ rotate: -360 }}
          transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx={CENTER} cy={CENTER} r={RADIUS * 0.6} fill="none" stroke="var(--hud-line)" strokeDasharray="1 7" strokeWidth="1" strokeOpacity="0.65" />
        </motion.g>

        {/* orbiting data motes — always-on life */}
        <motion.g
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          {motes.map((a, i) => {
            const p = polar(a, RADIUS * 0.6);
            return (
              <circle key={i} cx={p.x} cy={p.y} r={1.8} fill="var(--hud-cyan)" opacity={0.8} style={{ filter: 'drop-shadow(0 0 4px var(--hud-cyan))' }} />
            );
          })}
        </motion.g>

        <circle cx={CENTER} cy={CENTER} r={RADIUS * 0.28} fill="none" stroke="var(--hud-line)" strokeDasharray="2 6" strokeWidth="0.9" strokeOpacity="0.6" />

        {/* connection lines with gradient + flowing energy on active */}
        {(Object.entries(NODE_LAYOUT) as [SpecialistId, (typeof NODE_LAYOUT)[SpecialistId]][]).map(([id, n]) => {
          const p = polar(n.angle, RADIUS);
          const sp = state.specialists[id];
          const lit = sp === 'pending' || sp === 'responded';
          return (
            <g key={id}>
              <line
                x1={CENTER}
                y1={CENTER}
                x2={p.x}
                y2={p.y}
                stroke={lit ? `url(#line-${id})` : 'var(--hud-line)'}
                strokeWidth={lit ? 2 : 1.1}
                strokeOpacity={lit ? 0.9 : 0.45}
              />
              {sp === 'pending' && (
                <motion.line
                  x1={CENTER}
                  y1={CENTER}
                  x2={p.x}
                  y2={p.y}
                  stroke={n.color}
                  strokeWidth={2.2}
                  strokeDasharray="3 12"
                  animate={{ strokeDashoffset: [0, -30] }}
                  transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                  style={{ filter: `drop-shadow(0 0 4px ${n.color})` }}
                />
              )}
            </g>
          );
        })}

        {/* EA halo */}
        <circle cx={CENTER} cy={CENTER} r={104} fill="url(#ea-grad)" opacity={eaActive ? 1 : 0.6} />

        {/* rotating bracket arcs around EA */}
        <motion.g
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        >
          <path d={arcPath(78, 20, 70)} fill="none" stroke="var(--hud-cyan)" strokeWidth="1.6" strokeOpacity="0.75" strokeLinecap="round" />
          <path d={arcPath(78, 200, 250)} fill="none" stroke="var(--hud-cyan)" strokeWidth="1.6" strokeOpacity="0.75" strokeLinecap="round" />
        </motion.g>
        <motion.g
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <path d={arcPath(88, 120, 150)} fill="none" stroke="var(--hud-cyan)" strokeWidth="1.2" strokeOpacity="0.5" strokeLinecap="round" />
          <path d={arcPath(88, 300, 330)} fill="none" stroke="var(--hud-cyan)" strokeWidth="1.2" strokeOpacity="0.5" strokeLinecap="round" />
        </motion.g>

        {/* radar sweep when active */}
        {eaActive && (
          <motion.g
            style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <path d={`M ${CENTER} ${CENTER} L ${CENTER} ${CENTER - 104} A 104 104 0 0 1 ${CENTER + 74} ${CENTER - 74} Z`} fill="url(#sweep-grad)" opacity={0.55} />
          </motion.g>
        )}

        {/* emanating pulse rings from EA when active */}
        {eaActive &&
          [0, 1].map((i) => (
            <motion.circle
              key={i}
              cx={CENTER}
              cy={CENTER}
              fill="none"
              stroke="var(--hud-cyan)"
              strokeWidth={1.2}
              initial={{ r: 60, opacity: 0.55 }}
              animate={{ r: 165, opacity: 0 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: i * 1.2 }}
            />
          ))}
      </svg>

      {/* EA node */}
      <motion.div
        className="hud-panel absolute z-10 flex flex-col items-center justify-center text-center"
        style={{
          left: CENTER - 60,
          top: CENTER - 60,
          width: 120,
          height: 120,
          borderRadius: '50%',
          borderColor: 'var(--hud-cyan)',
          background: 'radial-gradient(circle at 50% 32%, rgba(111,224,255,0.28), rgba(10,14,22,0.97) 72%)'
        }}
        animate={{
          boxShadow: eaActive
            ? [
                '0 0 18px var(--hud-cyan-glow), 0 0 50px var(--hud-cyan-glow), inset 0 0 22px rgba(111,224,255,0.4)',
                '0 0 30px var(--hud-cyan-glow), 0 0 78px var(--hud-cyan-glow), inset 0 0 34px rgba(111,224,255,0.55)',
                '0 0 18px var(--hud-cyan-glow), 0 0 50px var(--hud-cyan-glow), inset 0 0 22px rgba(111,224,255,0.4)'
              ]
            : [
                '0 0 10px rgba(111,224,255,0.4), 0 0 24px rgba(111,224,255,0.26), inset 0 0 14px rgba(111,224,255,0.2)',
                '0 0 16px rgba(111,224,255,0.5), 0 0 34px rgba(111,224,255,0.32), inset 0 0 18px rgba(111,224,255,0.28)',
                '0 0 10px rgba(111,224,255,0.4), 0 0 24px rgba(111,224,255,0.26), inset 0 0 14px rgba(111,224,255,0.2)'
              ]
        }}
        transition={{ duration: eaActive ? 1.2 : 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="text-glow-cyan text-[19px] font-bold tracking-wide" style={{ color: 'var(--hud-cyan)' }}>
          EA
        </div>
        <div className="mt-0.5 text-[10px] uppercase tracking-[0.14em]" style={{ color: '#cfdcf0' }}>
          chief of staff
        </div>
      </motion.div>

      {/* specialist nodes */}
      {(Object.entries(NODE_LAYOUT) as [SpecialistId, (typeof NODE_LAYOUT)[SpecialistId]][]).map(([id, n]) => {
        const p = polar(n.angle, RADIUS);
        return <SpecialistDisc key={id} x={p.x} y={p.y} label={n.label} sub={n.sub} color={n.color} glyph={n.glyph} state={state.specialists[id]} />;
      })}

      {/* pulses */}
      <svg viewBox={`0 0 ${CANVAS} ${CANVAS}`} className="absolute inset-0 z-10" style={{ pointerEvents: 'none' }}>
        <AnimatePresence>
          {pulses.map((p) => (
            <motion.circle
              key={p.id}
              r={5.5}
              fill={p.color}
              initial={{ cx: p.from.x, cy: p.from.y, opacity: 1 }}
              animate={{ cx: p.to.x, cy: p.to.y, opacity: 0 }}
              transition={{ duration: PULSE_TTL_MS / 1000, ease: 'easeInOut' }}
              style={{ filter: `drop-shadow(0 0 7px ${p.color}) drop-shadow(0 0 16px ${p.color})` }}
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
  glyph,
  state
}: {
  x: number;
  y: number;
  label: string;
  sub: string;
  color: string;
  glyph: string;
  state: SpecialistState;
}) {
  const isActive = state === 'pending';
  const isDone = state === 'responded';
  const isError = state === 'error';

  return (
    <motion.div
      className="absolute z-10 flex flex-col items-center justify-center"
      style={{ left: x - 66, top: y - 46, width: 132, height: 92 }}
      animate={isActive ? { scale: [1, 1.05, 1] } : { scale: 1 }}
      transition={{ duration: 1.3, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
    >
      {isActive && (
        <svg className="absolute inset-0" viewBox="0 0 132 92" style={{ pointerEvents: 'none' }}>
          <motion.rect
            x="2"
            y="2"
            width="128"
            height="88"
            rx="7"
            fill="none"
            stroke={color}
            strokeWidth="1.6"
            strokeDasharray="46 380"
            animate={{ strokeDashoffset: [0, -426] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
            style={{ filter: `drop-shadow(0 0 5px ${color})` }}
          />
        </svg>
      )}
      <div
        className="hud-panel relative flex h-full w-full flex-col items-center justify-center px-2"
        style={{
          borderColor: isError ? '#ff7a7a' : isActive || isDone ? color : 'var(--hud-line)',
          boxShadow: isActive
            ? `0 0 14px ${color}, 0 0 32px ${color}, inset 0 0 16px rgba(255,255,255,0.06)`
            : isDone
              ? `0 0 9px ${color}, inset 0 0 9px rgba(255,255,255,0.04)`
              : `inset 0 0 10px rgba(255,255,255,0.02)`,
          background: 'rgba(10,14,22,0.96)'
        }}
      >
        {/* top accent bar */}
        <div
          className="absolute left-3 right-3 top-0 h-px"
          style={{ background: color, opacity: isActive || isDone ? 0.9 : 0.4 }}
        />
        <div className="flex items-center gap-1.5">
          <span style={{ color, fontSize: 13, lineHeight: 1 }}>{glyph}</span>
          <span className="text-[12px] font-bold tracking-wider" style={{ color }}>
            {label}
          </span>
        </div>
        <div className="mt-0.5 text-[10px] tracking-wide" style={{ color: '#b6c3da' }}>
          {sub}
        </div>
        <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: stateColor(state, color) }}>
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
  if (s === 'pending' || s === 'responded') return accent;
  if (s === 'error') return '#ff9a9a';
  return 'var(--hud-text-dim)';
}

function count(state: ReturnType<typeof deriveState>, id: SpecialistId) {
  const s = state.specialists[id];
  return s === 'responded' ? '1' : s === 'pending' ? '…' : s === 'error' ? 'x' : '0';
}

function deriveState(events: OrchestratorEvent[]) {
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
    runActive = !runEvents.some((e) => e.kind === 'orchestrator_end');
    for (const e of runEvents) {
      if (e.kind === 'dispatch') specialists[e.to] = 'pending';
      else if (e.kind === 'response') specialists[e.from] = /^ERROR/i.test(e.msg) ? 'error' : 'responded';
    }
  }

  return { specialists, runActive };
}

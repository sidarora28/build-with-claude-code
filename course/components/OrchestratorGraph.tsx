'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { OrchestratorEvent, SpecialistId, SpecialistState } from '@/lib/events';

interface Props {
  events: OrchestratorEvent[];
}

const CANVAS = 540;
const CENTER = CANVAS / 2;
const RADIUS = 196;

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

const PULSE_TTL_MS = 750;

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
        if (!node) continue;
        fresh.push({ id: key, from: { x: CENTER, y: CENTER }, to: polar(node.angle, RADIUS), color: node.color });
      } else if (e.kind === 'response') {
        const node = NODE_LAYOUT[e.from];
        if (!node) continue;
        fresh.push({ id: key, from: polar(node.angle, RADIUS), to: { x: CENTER, y: CENTER }, color: node.color });
      }
    }
    if (fresh.length === 0) return;
    setPulses((prev) => [...prev, ...fresh]);
    const t = setTimeout(() => {
      setPulses((prev) => prev.filter((p) => !fresh.some((f) => f.id === p.id)));
    }, PULSE_TTL_MS);
    return () => clearTimeout(t);
  }, [events]);

  const eaActive = state.runActive;
  const ticks = useMemo(() => Array.from({ length: 60 }, (_, i) => i), []);

  return (
    <div className="hud-panel relative overflow-hidden" style={{ width: CANVAS, height: CANVAS }}>
      {/* grid backdrop */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(var(--hud-grid) 1px, transparent 1px), linear-gradient(90deg, var(--hud-grid) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          opacity: 0.4,
          maskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 78%)'
        }}
      />

      {/* HUD chrome labels */}
      <div className="absolute left-3 top-2 hud-label z-20">orchestration · live</div>
      <div
        className="absolute right-3 top-2 hud-label z-20"
        style={{ color: eaActive ? 'var(--hud-cyan)' : 'var(--hud-text-dim)' }}
      >
        {eaActive ? '◉ RUN ACTIVE' : '○ idle'}
      </div>
      <div className="absolute bottom-2 left-3 hud-label z-20" style={{ opacity: 0.7 }}>
        SYS.EA // v0.2
      </div>
      <div className="absolute bottom-2 right-3 hud-label z-20" style={{ opacity: 0.7 }}>
        {`N:${count(state, 'notes-specialist')} C:${count(state, 'calendar-specialist')} F:${count(state, 'followups-specialist')}`}
      </div>

      <svg viewBox={`0 0 ${CANVAS} ${CANVAS}`} className="absolute inset-0" style={{ pointerEvents: 'none' }}>
        <defs>
          <radialGradient id="ea-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--hud-cyan)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--hud-cyan)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sweep-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--hud-cyan)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--hud-cyan)" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* slow rotating outer dashed ring */}
        <motion.g
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx={CENTER} cy={CENTER} r={RADIUS + 24} fill="none" stroke="var(--hud-line)" strokeDasharray="2 8" strokeWidth="1" />
        </motion.g>

        {/* tick dial */}
        <g>
          {ticks.map((i) => {
            const major = i % 5 === 0;
            const a = (i / 60) * 360;
            const p1 = polar(a, RADIUS + 14);
            const p2 = polar(a, RADIUS + (major ? 22 : 18));
            return (
              <line
                key={i}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke={major ? 'var(--hud-cyan)' : 'var(--hud-line)'}
                strokeOpacity={major ? 0.5 : 0.35}
                strokeWidth={major ? 1.2 : 0.8}
              />
            );
          })}
        </g>

        {/* counter-rotating mid ring */}
        <motion.g
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx={CENTER} cy={CENTER} r={RADIUS * 0.58} fill="none" stroke="var(--hud-line)" strokeDasharray="1 6" strokeWidth="0.8" strokeOpacity="0.6" />
        </motion.g>
        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="var(--hud-line)" strokeDasharray="2 5" strokeWidth="0.7" strokeOpacity="0.5" />
        <circle cx={CENTER} cy={CENTER} r={RADIUS * 0.26} fill="none" stroke="var(--hud-line)" strokeDasharray="2 5" strokeWidth="0.7" strokeOpacity="0.5" />

        {/* connection lines, with flowing dash when lit */}
        {(Object.entries(NODE_LAYOUT) as [SpecialistId, typeof NODE_LAYOUT[SpecialistId]][]).map(([id, n]) => {
          const p = polar(n.angle, RADIUS);
          const sp = state.specialists[id];
          const lit = sp === 'pending' || sp === 'responded';
          return (
            <g key={id}>
              <line x1={CENTER} y1={CENTER} x2={p.x} y2={p.y} stroke={lit ? n.color : 'var(--hud-line)'} strokeWidth={lit ? 1.4 : 0.9} strokeOpacity={lit ? 0.55 : 0.3} />
              {sp === 'pending' && (
                <motion.line
                  x1={CENTER}
                  y1={CENTER}
                  x2={p.x}
                  y2={p.y}
                  stroke={n.color}
                  strokeWidth={1.6}
                  strokeDasharray="3 10"
                  animate={{ strokeDashoffset: [0, -26] }}
                  transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                  style={{ filter: `drop-shadow(0 0 3px ${n.color})` }}
                />
              )}
            </g>
          );
        })}

        {/* EA halo */}
        <circle cx={CENTER} cy={CENTER} r={92} fill="url(#ea-grad)" opacity={eaActive ? 1 : 0.5} />

        {/* radar sweep when active */}
        {eaActive && (
          <motion.g
            style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <path d={`M ${CENTER} ${CENTER} L ${CENTER} ${CENTER - 92} A 92 92 0 0 1 ${CENTER + 66} ${CENTER - 66} Z`} fill="url(#sweep-grad)" opacity={0.5} />
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
              strokeWidth={1}
              initial={{ r: 56, opacity: 0.5 }}
              animate={{ r: 150, opacity: 0 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: i * 1.2 }}
            />
          ))}
      </svg>

      {/* EA node */}
      <motion.div
        className="hud-panel absolute z-10 flex flex-col items-center justify-center text-center"
        style={{
          left: CENTER - 56,
          top: CENTER - 56,
          width: 112,
          height: 112,
          borderRadius: '50%',
          borderColor: 'var(--hud-cyan)',
          background: 'radial-gradient(circle at 50% 35%, rgba(111,224,255,0.22), rgba(10,14,22,0.96) 70%)'
        }}
        animate={{
          boxShadow: eaActive
            ? [
                '0 0 16px var(--hud-cyan-glow), 0 0 44px var(--hud-cyan-glow), inset 0 0 20px rgba(111,224,255,0.34)',
                '0 0 26px var(--hud-cyan-glow), 0 0 68px var(--hud-cyan-glow), inset 0 0 30px rgba(111,224,255,0.5)',
                '0 0 16px var(--hud-cyan-glow), 0 0 44px var(--hud-cyan-glow), inset 0 0 20px rgba(111,224,255,0.34)'
              ]
            : [
                '0 0 6px rgba(111,224,255,0.3), 0 0 16px rgba(111,224,255,0.2), inset 0 0 10px rgba(111,224,255,0.14)',
                '0 0 10px rgba(111,224,255,0.4), 0 0 22px rgba(111,224,255,0.26), inset 0 0 12px rgba(111,224,255,0.2)',
                '0 0 6px rgba(111,224,255,0.3), 0 0 16px rgba(111,224,255,0.2), inset 0 0 10px rgba(111,224,255,0.14)'
              ]
        }}
        transition={{ duration: eaActive ? 1.3 : 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="text-glow-cyan text-[17px] font-bold tracking-wide" style={{ color: 'var(--hud-cyan)' }}>
          EA
        </div>
        <div className="mt-0.5 text-[10px] uppercase tracking-[0.14em]" style={{ color: '#c2d0e8' }}>
          chief of staff
        </div>
      </motion.div>

      {/* specialist nodes */}
      {(Object.entries(NODE_LAYOUT) as [SpecialistId, typeof NODE_LAYOUT[SpecialistId]][]).map(([id, n]) => {
        const p = polar(n.angle, RADIUS);
        return <SpecialistDisc key={id} x={p.x} y={p.y} label={n.label} sub={n.sub} color={n.color} state={state.specialists[id]} />;
      })}

      {/* pulses */}
      <svg viewBox={`0 0 ${CANVAS} ${CANVAS}`} className="absolute inset-0 z-10" style={{ pointerEvents: 'none' }}>
        <AnimatePresence>
          {pulses.map((p) => (
            <motion.circle
              key={p.id}
              r={5}
              fill={p.color}
              initial={{ cx: p.from.x, cy: p.from.y, opacity: 1 }}
              animate={{ cx: p.to.x, cy: p.to.y, opacity: 0 }}
              transition={{ duration: PULSE_TTL_MS / 1000, ease: 'easeInOut' }}
              style={{ filter: `drop-shadow(0 0 6px ${p.color}) drop-shadow(0 0 14px ${p.color})` }}
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
      className="absolute z-10 flex flex-col items-center justify-center text-center"
      style={{ left: x - 64, top: y - 42, width: 128, height: 84 }}
      animate={isActive ? { scale: [1, 1.05, 1] } : { scale: 1 }}
      transition={{ duration: 1.3, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
    >
      {/* spinner ring while working */}
      {isActive && (
        <svg className="absolute inset-0" viewBox="0 0 128 84" style={{ pointerEvents: 'none' }}>
          <motion.rect
            x="2"
            y="2"
            width="124"
            height="80"
            rx="6"
            fill="none"
            stroke={color}
            strokeWidth="1.4"
            strokeDasharray="40 360"
            animate={{ strokeDashoffset: [0, -400] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          />
        </svg>
      )}
      <div
        className="hud-panel relative flex h-full w-full flex-col items-center justify-center px-2"
        style={{
          borderColor: isError ? '#ff7a7a' : isActive || isDone ? color : 'var(--hud-line)',
          boxShadow: isActive
            ? `0 0 12px ${color}, 0 0 28px ${color}, inset 0 0 14px rgba(255,255,255,0.05)`
            : isDone
              ? `0 0 8px ${color}, inset 0 0 8px rgba(255,255,255,0.04)`
              : 'none',
          background: 'rgba(10,14,22,0.94)'
        }}
      >
        <div className="text-[12px] font-bold tracking-wider" style={{ color }}>
          {label}
        </div>
        <div className="mt-0.5 text-[10px] tracking-wide" style={{ color: '#aebbd4' }}>
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
    const ended = runEvents.some((e) => e.kind === 'orchestrator_end');
    runActive = !ended;

    for (const e of runEvents) {
      if (e.kind === 'dispatch') specialists[e.to] = 'pending';
      else if (e.kind === 'response') specialists[e.from] = /^ERROR/i.test(e.msg) ? 'error' : 'responded';
    }
  }

  return { specialists, runActive };
}

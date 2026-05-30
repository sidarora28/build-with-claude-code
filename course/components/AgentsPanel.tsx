'use client';

import type { AgentStatus, RunState } from '@/lib/events';
import { SPECIALIST_META, SPECIALIST_ORDER } from '@/lib/events';

interface Props {
  state: RunState;
}

const STATUS_LABEL: Record<AgentStatus, string> = {
  idle: 'IDLE',
  working: 'WORK',
  done: 'DONE',
  error: 'ERR'
};

export function AgentsPanel({ state }: Props) {
  const dispatched = state.traces.length;
  const returned = state.traces.filter((t) => t.status === 'done' || t.status === 'error').length;
  const errors = state.traces.filter((t) => t.status === 'error').length;

  return (
    <div className="panel flex h-full flex-col">
      <PanelHead title="AGENTS" right={<span className="panel-meta">{SPECIALIST_ORDER.length + 1} units</span>} />
      <div className="flex-1 px-3 py-2">
        <AgentRow id="EA" sub="chief of staff" color="var(--c-accent)" status={state.eaStatus} primary />
        <div className="my-2 border-t border-dashed" style={{ borderColor: 'var(--border)' }} />
        {SPECIALIST_ORDER.map((id) => {
          const m = SPECIALIST_META[id];
          return <AgentRow key={id} id={m.label} sub={m.sub} color={m.color} status={state.agents[id]} />;
        })}
      </div>
      <div className="border-t px-3 py-2" style={{ borderColor: 'var(--border)' }}>
        <Counter label="dispatched" value={dispatched.toString().padStart(2, '0')} />
        <Counter label="returned" value={returned.toString().padStart(2, '0')} />
        <Counter label="errors" value={errors.toString().padStart(2, '0')} accent={errors > 0 ? 'var(--c-err)' : undefined} />
      </div>
    </div>
  );
}

function AgentRow({
  id,
  sub,
  color,
  status,
  primary
}: {
  id: string;
  sub: string;
  color: string;
  status: AgentStatus;
  primary?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5 py-1">
      <Led status={status} color={color} />
      <div className="min-w-0 flex-1">
        <div
          className="font-display text-[12px] font-bold tracking-wider"
          style={{ color: primary ? 'var(--c-accent)' : 'var(--text)' }}
        >
          {id}
        </div>
        <div className="text-[10px]" style={{ color: 'var(--text-3)' }}>
          {sub}
        </div>
      </div>
      <StatusPill status={status} color={color} />
    </div>
  );
}

function Led({ status, color }: { status: AgentStatus; color: string }) {
  const isWorking = status === 'working';
  const isDone = status === 'done';
  const isErr = status === 'error';
  const c = isErr ? 'var(--c-err)' : isWorking || isDone ? color : 'var(--text-3)';
  return (
    <span
      className={'inline-block h-2 w-2 rounded-full ' + (isWorking ? 'pulse-led' : '')}
      style={{ background: c, color: c, boxShadow: isWorking || isDone ? `0 0 6px ${c}` : 'none' }}
    />
  );
}

function StatusPill({ status, color }: { status: AgentStatus; color: string }) {
  const isErr = status === 'error';
  const isWork = status === 'working';
  const c = isErr ? 'var(--c-err)' : status === 'done' || isWork ? color : 'var(--text-3)';
  return (
    <span className="pill" style={{ color: c, borderColor: c, opacity: status === 'idle' ? 0.6 : 1 }}>
      {STATUS_LABEL[status]}
    </span>
  );
}

function Counter({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="flex items-baseline justify-between py-0.5">
      <span className="label">{label}</span>
      <span className="num text-[13px] font-bold" style={{ color: accent ?? 'var(--text)' }}>
        {value}
      </span>
    </div>
  );
}

function PanelHead({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div className="panel-head">
      <div className="flex items-center gap-2">
        <span className="accent-bar h-2 w-1" />
        <span className="panel-title">{title}</span>
      </div>
      {right}
    </div>
  );
}

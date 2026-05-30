export type SpecialistId = 'notes-specialist' | 'calendar-specialist' | 'followups-specialist';

export type AgentStatus = 'idle' | 'working' | 'done' | 'error';

export type OrchestratorEvent =
  | { ts: string; kind: 'orchestrator_start'; run_id: string; prompt?: string }
  | { ts: string; kind: 'dispatch'; run_id: string; to: SpecialistId; prompt?: string }
  | { ts: string; kind: 'response'; run_id: string; from: SpecialistId; msg: string }
  | { ts: string; kind: 'synthesise'; run_id: string; msg: string }
  | { ts: string; kind: 'usage'; run_id: string; tokens_in: number | null; tokens_out: number | null; cost_usd: number | null; latency_ms: number | null }
  | { ts: string; kind: 'orchestrator_end'; run_id: string };

export const SPECIALIST_META: Record<SpecialistId, { label: string; sub: string; color: string }> = {
  'notes-specialist': { label: 'NOTES', sub: 'meeting actions', color: 'var(--c-notes)' },
  'calendar-specialist': { label: 'CAL', sub: "today's schedule", color: 'var(--c-cal)' },
  'followups-specialist': { label: 'FOLLOWS', sub: 'who is waiting', color: 'var(--c-follows)' }
};

export const SPECIALIST_ORDER: SpecialistId[] = ['notes-specialist', 'calendar-specialist', 'followups-specialist'];

export interface DispatchTrace {
  agent: SpecialistId;
  dispatchTs: number;
  responseTs: number | null;
  durationMs: number | null;
  status: AgentStatus;
  msg: string | null;
}

export interface RunState {
  latestRunId: string | null;
  runActive: boolean;
  eaStatus: AgentStatus;
  agents: Record<SpecialistId, AgentStatus>;
  traces: DispatchTrace[];
  startedAt: number | null;
  endedAt: number | null;
  finalBrief: string | null;
  briefTs: number | null;
  totalRuns: number;
  totalErrors: number;
  usage: { tokens_in: number | null; tokens_out: number | null; cost_usd: number | null; latency_ms: number | null } | null;
  sessionTotal: { tokens_in: number; tokens_out: number; cost_usd: number };
}

const tsMs = (iso: string) => {
  const t = Date.parse(iso);
  return Number.isFinite(t) ? t : 0;
};

export function parseEventLog(raw: string): OrchestratorEvent[] {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      try {
        return JSON.parse(line) as OrchestratorEvent;
      } catch {
        return null;
      }
    })
    .filter((e): e is OrchestratorEvent => e !== null);
}

export function deriveRunState(events: OrchestratorEvent[]): RunState {
  let latestRunId: string | null = null;
  for (const e of events) {
    if ('run_id' in e) latestRunId = e.run_id;
  }

  const agents: Record<SpecialistId, AgentStatus> = {
    'notes-specialist': 'idle',
    'calendar-specialist': 'idle',
    'followups-specialist': 'idle'
  };

  const traces: DispatchTrace[] = [];
  let startedAt: number | null = null;
  let endedAt: number | null = null;
  let runActive = false;
  let eaStatus: AgentStatus = 'idle';
  let usage: RunState['usage'] = null;
  let finalBrief: string | null = null;
  let briefTs: number | null = null;

  if (latestRunId) {
    const runEvents = events.filter((e) => 'run_id' in e && e.run_id === latestRunId);
    const ended = runEvents.some((e) => e.kind === 'orchestrator_end');
    runActive = !ended;

    for (const e of runEvents) {
      if (e.kind === 'orchestrator_start') {
        startedAt = tsMs(e.ts);
        eaStatus = 'working';
      } else if (e.kind === 'orchestrator_end') {
        endedAt = tsMs(e.ts);
        eaStatus = 'done';
      } else if (e.kind === 'dispatch') {
        agents[e.to] = 'working';
        traces.push({
          agent: e.to,
          dispatchTs: tsMs(e.ts),
          responseTs: null,
          durationMs: null,
          status: 'working',
          msg: null
        });
      } else if (e.kind === 'response') {
        const isErr = /^ERROR/i.test(e.msg);
        agents[e.from] = isErr ? 'error' : 'done';
        // Update the most recent open trace for this agent.
        for (let i = traces.length - 1; i >= 0; i--) {
          const tr = traces[i];
          if (tr.agent === e.from && tr.responseTs === null) {
            const rTs = tsMs(e.ts);
            tr.responseTs = rTs;
            tr.durationMs = Math.max(0, rTs - tr.dispatchTs);
            tr.status = isErr ? 'error' : 'done';
            tr.msg = e.msg;
            break;
          }
        }
      } else if (e.kind === 'synthesise') {
        finalBrief = e.msg;
        briefTs = tsMs(e.ts);
      } else if (e.kind === 'usage') {
        usage = {
          tokens_in: e.tokens_in,
          tokens_out: e.tokens_out,
          cost_usd: e.cost_usd,
          latency_ms: e.latency_ms
        };
      }
    }
  }

  // Cross-run aggregates.
  const allUsages = events.filter(
    (e): e is Extract<OrchestratorEvent, { kind: 'usage' }> => e.kind === 'usage'
  );
  const sessionTotal = allUsages.reduce(
    (acc, e) => ({
      tokens_in: acc.tokens_in + (e.tokens_in ?? 0),
      tokens_out: acc.tokens_out + (e.tokens_out ?? 0),
      cost_usd: acc.cost_usd + (e.cost_usd ?? 0)
    }),
    { tokens_in: 0, tokens_out: 0, cost_usd: 0 }
  );
  const totalRuns = events.filter((e) => e.kind === 'orchestrator_end').length;
  const totalErrors = events.filter((e) => e.kind === 'response' && /^ERROR/i.test(e.msg)).length;

  return {
    latestRunId,
    runActive,
    eaStatus,
    agents,
    traces,
    startedAt,
    endedAt,
    finalBrief,
    briefTs,
    totalRuns,
    totalErrors,
    usage,
    sessionTotal
  };
}

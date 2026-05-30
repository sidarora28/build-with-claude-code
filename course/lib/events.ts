export type SpecialistId = 'notes-specialist' | 'calendar-specialist' | 'followups-specialist';

export type SpecialistState = 'idle' | 'pending' | 'responded' | 'error';

export type OrchestratorEvent =
  | { ts: string; kind: 'orchestrator_start'; run_id: string; prompt?: string }
  | { ts: string; kind: 'dispatch'; run_id: string; to: SpecialistId; prompt?: string }
  | { ts: string; kind: 'response'; run_id: string; from: SpecialistId; msg: string }
  | { ts: string; kind: 'synthesise'; run_id: string; msg: string }
  | { ts: string; kind: 'usage'; run_id: string; tokens_in: number | null; tokens_out: number | null; cost_usd: number | null; latency_ms: number | null }
  | { ts: string; kind: 'orchestrator_end'; run_id: string };

export const SPECIALISTS: { id: SpecialistId; label: string; color: string; angle: number }[] = [
  { id: 'notes-specialist', label: 'NOTES', color: 'var(--hud-violet)', angle: 0 },
  { id: 'calendar-specialist', label: 'CALENDAR', color: 'var(--hud-amber)', angle: 120 },
  { id: 'followups-specialist', label: 'FOLLOW-UPS', color: 'var(--hud-green)', angle: 240 }
];

// Parse a raw run.jsonl blob into an event array, skipping malformed lines.
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

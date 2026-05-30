'use client';

import { useEffect, useRef, useState } from 'react';
import type { OrchestratorEvent } from './events';

// Adaptive polling: fast while a run is active or just finished, slow when idle,
// fully paused when the browser tab is hidden. Keeps the dev server quiet
// instead of hammering /api/events every 500ms forever.
const FAST_MS = 400;
const SLOW_MS = 4000;
// After the last activity, stay in fast mode this long before backing off.
const COOLDOWN_MS = 6000;

export function useEventStream() {
  const [events, setEvents] = useState<OrchestratorEvent[]>([]);
  const [error, setError] = useState<string | null>(null);

  const lastCountRef = useRef(0);
  const lastChangeRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      if (document.hidden) {
        schedule(SLOW_MS);
        return;
      }

      try {
        const res = await fetch('/api/events', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as { events?: OrchestratorEvent[]; error?: string };
        if (cancelled) return;

        if (data.error) {
          setError(data.error);
        } else {
          const next = data.events ?? [];
          if (next.length !== lastCountRef.current) {
            lastCountRef.current = next.length;
            lastChangeRef.current = Date.now();
            setEvents(next);
          }
          setError(null);
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'poll failed');
      }

      // Decide cadence: recent change → fast; otherwise → slow.
      const sinceChange = Date.now() - lastChangeRef.current;
      schedule(sinceChange < COOLDOWN_MS ? FAST_MS : SLOW_MS);
    }

    function schedule(ms: number) {
      if (cancelled) return;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(poll, ms);
    }

    // Kick once immediately, and re-kick fast when the tab regains focus.
    poll();
    const onVisible = () => {
      if (!document.hidden) {
        lastChangeRef.current = Date.now();
        if (timerRef.current) clearTimeout(timerRef.current);
        poll();
      }
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      cancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  return { events, error };
}

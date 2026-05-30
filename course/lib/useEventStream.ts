'use client';

import { useEffect, useState } from 'react';
import type { OrchestratorEvent } from './events';

const POLL_MS = 500;

export function useEventStream() {
  const [events, setEvents] = useState<OrchestratorEvent[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const res = await fetch('/api/events', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as { events?: OrchestratorEvent[]; error?: string };
        if (cancelled) return;
        if (data.error) {
          setError(data.error);
        } else {
          setEvents(data.events ?? []);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'poll failed');
      }
    }

    poll();
    const id = setInterval(poll, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return { events, error };
}

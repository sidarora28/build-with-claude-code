'use client';

import { useEffect, useState } from 'react';
import type { OrchestratorEvent } from './events';
import { parseEventLog } from './events';

// One persistent SSE connection. The server pushes the log only when it changes,
// so there's no repeated polling — open the Network tab and you'll see a single
// /api/events request that stays alive, not a flood.
export function useEventStream() {
  const [events, setEvents] = useState<OrchestratorEvent[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const es = new EventSource('/api/events');

    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data) as { raw?: string; ping?: number };
        if (data.ping !== undefined) return; // keepalive
        if (data.raw !== undefined) {
          setEvents(parseEventLog(data.raw));
          setError(null);
        }
      } catch {
        /* ignore a malformed frame */
      }
    };

    es.onerror = () => {
      // EventSource reconnects automatically; surface a soft notice meanwhile.
      setError('stream reconnecting…');
    };

    es.onopen = () => setError(null);

    return () => es.close();
  }, []);

  return { events, error };
}

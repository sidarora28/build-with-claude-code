'use client';

import { useEffect, useState } from 'react';

type Cost = { tokens: number; usd: number; latencyMs: number };

export function CostCounter() {
  const [cost, setCost] = useState<Cost>({ tokens: 0, usd: 0, latencyMs: 0 });

  // Module 6 will wire this to a real counter. For now it just shows zeros.
  useEffect(() => {
    // Placeholder — in Module 6 you'll fetch live cost data from the API.
  }, []);

  return (
    <div className="flex items-center gap-4 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2 text-xs">
      <div>
        <div className="text-zinc-500">tokens</div>
        <div className="font-mono font-medium">{cost.tokens.toLocaleString()}</div>
      </div>
      <div className="h-8 w-px bg-zinc-200" />
      <div>
        <div className="text-zinc-500">cost</div>
        <div className="font-mono font-medium">${cost.usd.toFixed(4)}</div>
      </div>
      <div className="h-8 w-px bg-zinc-200" />
      <div>
        <div className="text-zinc-500">latency</div>
        <div className="font-mono font-medium">{cost.latencyMs}ms</div>
      </div>
    </div>
  );
}

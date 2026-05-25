type Connection = {
  name: string;
  status: 'active' | 'unlocks-later' | 'paid';
  note: string;
};

const connections: Connection[] = [
  { name: 'Meeting notes', status: 'active', note: 'Reading from data/meetings/' },
  { name: 'Gmail', status: 'unlocks-later', note: 'Unlocks in Module 5' },
  { name: 'Slack', status: 'paid', note: 'Paid cohort' },
  { name: 'Notion', status: 'paid', note: 'Paid cohort' },
  { name: 'Calendar', status: 'paid', note: 'Paid cohort' },
  { name: 'Scheduled runs', status: 'paid', note: 'Paid cohort' },
  { name: 'Access from phone', status: 'paid', note: 'Paid cohort' }
];

function statusDot(status: Connection['status']) {
  if (status === 'active') return <span className="h-2 w-2 rounded-full bg-emerald-500" />;
  if (status === 'unlocks-later') return <span className="h-2 w-2 rounded-full bg-amber-400" />;
  return <span className="h-2 w-2 rounded-full bg-zinc-300" />;
}

export function ConnectionsSidebar() {
  return (
    <div className="sticky top-6 rounded-xl border border-zinc-200 bg-white p-5">
      <h3 className="text-sm font-semibold">Connections</h3>
      <p className="mt-1 text-xs text-zinc-500">What your Daily Brain can read from.</p>

      <ul className="mt-4 space-y-3">
        {connections.map((c) => (
          <li
            key={c.name}
            className={`flex items-start gap-3 ${
              c.status === 'active' ? '' : 'opacity-60'
            }`}
          >
            <div className="mt-1.5">{statusDot(c.status)}</div>
            <div className="flex-1">
              <div className="text-sm font-medium">{c.name}</div>
              <div className="text-xs text-zinc-500">{c.note}</div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5 rounded-lg border border-dashed border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-500">
        Want all of these connected? The paid cohort wires them up and adds an orchestrator that knows which to use when.
      </div>
    </div>
  );
}

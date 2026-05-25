import fs from 'fs';
import path from 'path';

function listMeetingNotes(): string[] {
  const dir = path.join(process.cwd(), 'data', 'meetings');
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .sort();
  } catch {
    return [];
  }
}

export function SourcesSection() {
  const files = listMeetingNotes();

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Sources</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Your meeting notes. Add, edit, or delete files in{' '}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs">data/meetings/</code> and refresh.
          </p>
        </div>
        <span className="text-xs text-zinc-400">{files.length} notes</span>
      </div>

      {files.length === 0 ? (
        <p className="mt-4 text-sm text-zinc-400 italic">
          No notes found. Put markdown files in <code>data/meetings/</code>.
        </p>
      ) : (
        <ul className="mt-4 grid grid-cols-1 gap-1 text-sm sm:grid-cols-2">
          {files.map((f) => (
            <li key={f} className="rounded px-2 py-1 font-mono text-xs text-zinc-600 hover:bg-zinc-50">
              {f}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import type { OrchestratorEvent } from '@/lib/events';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const LOG_PATH = path.join(process.cwd(), 'module-5', 'work', 'run.jsonl');

export async function GET() {
  let events: OrchestratorEvent[] = [];

  try {
    const raw = await fs.readFile(LOG_PATH, 'utf8');
    events = raw
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
  } catch (err: unknown) {
    const error = err as NodeJS.ErrnoException;
    if (error.code !== 'ENOENT') {
      return NextResponse.json({ error: error.message ?? 'read failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ events });
}

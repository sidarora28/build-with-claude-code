import { NextResponse } from 'next/server';

/**
 * Module 1: returns a canned mock summary so the dashboard's "Generate summary"
 * button produces something visible without a real agent yet.
 *
 * Module 2: you'll replace this with a real Claude Code subprocess invocation
 * that reads files in data/meetings/ and streams output back as Server-Sent Events.
 */
export async function POST() {
  const mock = [
    'This is a mock summary — in Module 2 you wire this to a real agent.',
    '',
    "What's in flight",
    '- Search filters v3: scoped at 3 weeks (was 2)',
    '- Bulk import: timeouts being profiled, fix likely this sprint',
    '- Mobile perf: Lin assigned, investigation starting',
    '- Rate limiting: shipping Thursday',
    '',
    'Decisions made',
    '- Killed the "smart digest" experiment (no traction in 3 weeks)',
    '- Going with search filter design v3 (horizontal bar, save/recent chips)',
    '- Lin takes over bulk import driver role after mobile perf',
    '',
    'Recurring themes',
    '- Enterprise readiness (SSO, audit log, permissions) gating multiple deals',
    '- Mobile perf showing up across multiple accounts, not just Northwind',
    '- Hiring slow — the second backend engineer matters',
    '',
    '— end of mock —',
    'Click again to re-run. Same output every time, because this is a mock.',
    'In Module 2 each run will be a real, fresh summary.'
  ].join('\n');

  return new NextResponse(mock, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}

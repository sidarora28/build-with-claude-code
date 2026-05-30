#!/usr/bin/env node
// Replay a sample orchestrator run into module-5/work/run.jsonl so the
// dashboard at localhost:3000 lights up — boot cascade, LED pulses,
// streaming text, the BRIEF panel composing. No real EA required.
//
// Usage (from course/):
//   node module-5/starter/demo.mjs

import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SAMPLE = join(__dirname, 'sample-run.jsonl');
const WORK = join(__dirname, '..', 'work', 'run.jsonl');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Wall-clock delays between events, indexed by the position they appear
// in sample-run.jsonl. Tuned so the dashboard reads like a real run.
const DELAYS_MS = [
  600,   // 1: start
  120,   // 2: dispatch → notes
  140,   // 3: dispatch → calendar
  140,   // 4: dispatch → follow-ups
  1900,  // 5: calendar responds
  1500,  // 6: notes responds
  1400,  // 7: follow-ups responds
  900,   // 8: synthesise (brief composes here)
  250,   // 9: usage
  200    // 10: end
];

function rewriteTs(line, ts, rid) {
  const obj = JSON.parse(line);
  obj.ts = ts;
  obj.run_id = rid;
  return JSON.stringify(obj);
}

async function main() {
  const raw = readFileSync(SAMPLE, 'utf8');
  const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean);

  mkdirSync(dirname(WORK), { recursive: true });
  writeFileSync(WORK, ''); // start clean

  const rid = Date.now().toString();
  console.log(`▸ demo run ${rid} → ${WORK}`);
  console.log('▸ open http://localhost:3000/?perf=1 in another window now\n');

  for (let i = 0; i < lines.length; i++) {
    await sleep(DELAYS_MS[i] ?? 400);
    const stamped = rewriteTs(lines[i], new Date().toISOString(), rid);
    appendFileSync(WORK, stamped + '\n');
    const k = JSON.parse(stamped).kind;
    console.log(`  ${k}`);
  }
  console.log('\n✓ done — re-run any time. Refresh the page if SSE got dropped.');
}

main().catch((e) => {
  console.error('demo failed:', e);
  process.exit(1);
});

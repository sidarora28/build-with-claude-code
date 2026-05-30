# Module 5 — architecture reference (for the learner)

> This file is a quick orientation. The lesson script (`module-5/TASK.md`) is what June walks you through. Read this when you want to look up "what file does what" without the narrative.

## What's in this module

Four pre-built agent files in `course/.claude/agents/` — you don't have to build them, you'll use them.

```
course/
└── .claude/agents/
    ├── ea-orchestrator.md         ← the chief of staff. Dispatches and synthesises.
    ├── notes-specialist.md        ← reads data/meetings/ for action items.
    ├── calendar-specialist.md     ← uses your Calendar connector for today's schedule.
    └── followups-specialist.md    ← reads data/meetings/ for interpersonal debts.
```

And a Next.js dashboard that visualises the orchestration live — a mission-control ops terminal:

```
course/
├── app/                ← Next.js app (the dashboard at localhost:3000)
├── components/         ← UI panels: AgentsPanel, FlowPanel, PerfPanel, BriefPanel, TranscriptPanel
├── lib/                ← event types + deriveRunState + polling hook
└── package.json        ← npm install once; npm run dev to launch
```

The five panels:
- **AGENTS** — the roster. EA + three specialists, each with a status LED (idle / working / done / error) and a dispatched/returned/errors tally.
- **FLOW** — one progress bar per dispatch, showing real per-specialist timing as each returns.
- **PERF** — tokens, cost, latency. **Locked in Module 5** ("unlocks in Module 6"); you turn it on with `?perf=1` in Module 6.
- **BRIEF** — the payoff. EA's final morning brief types out here in plain language as it's composed.
- **TRANSCRIPT** — the raw event log, one row per event (timestamp / kind / channel / payload), streaming live.

### See it animate without a real run

Want to watch the dashboard come alive before wiring up the orchestrator? With `npm run dev` running, open a second terminal and replay a sample run:

```bash
node module-5/starter/demo.mjs
```

It streams a recorded run into `module-5/work/run.jsonl` with realistic timing — boot cascade, LED pulses, flow bars filling, the brief composing. Re-run it any time.

## How the pieces talk

1. You ask the EA orchestrator for a morning brief (in your `claude` CLI session).
2. The orchestrator writes events to `module-5/work/run.jsonl` — one JSON line per step.
3. The orchestrator dispatches all three specialists **in parallel** using Claude Code's Task tool.
4. As each specialist responds, the orchestrator appends another event to the log.
5. The orchestrator synthesises the three outputs into one brief, saves it to `module-5/work/briefings/<date>.md`, and prints it to chat.
6. The dashboard (separately, in a browser tab) polls `/api/events` every 500ms and animates each event as it arrives.

## The event log schema

`module-5/work/run.jsonl` — newline-delimited JSON. Each line:

| `kind` | Fired when | Drives in the UI |
|---|---|---|
| `orchestrator_start` | EA starts a run | Top-bar status flips to "RUN ACTIVE" |
| `dispatch` | EA invokes a specialist | That specialist's LED in AGENTS turns "working"; a new bar opens in FLOW |
| `response` | Specialist returns | AGENTS LED turns "done"; the FLOW bar fills to its real duration; TRANSCRIPT streams the output |
| `synthesise` | EA writes the final brief | The BRIEF panel types out the brief markdown live |
| `usage` | EA records tokens/cost/latency for the run | PERF panel updates (once unlocked with `?perf=1` in M6) |
| `orchestrator_end` | Run complete | Top-bar status flips to "idle" |

You don't need to memorise this — the TRANSCRIPT panel shows each event in plain English as it fires.

## Why this shape, not "one big agent"

A single agent reading notes + calendar + follow-ups in one prompt works, but it has three problems:

- **Serial.** It does each step in order. Three small parallel calls beat one big sequential one on latency.
- **Mixed context.** Notes context contaminates calendar reasoning. Specialists keep their domains clean.
- **Hard to swap.** Want to add a "Slack messages" specialist later? With orchestration, you add one file. With a monolith, you rewrite the whole agent.

The cost: orchestration is more moving parts. M5's job is to make those parts feel like one thing.

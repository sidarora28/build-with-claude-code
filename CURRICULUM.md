# Curriculum

A walkthrough of what you'll build, learn, and feel in each of the six modules.

The whole course runs inside Claude Code, guided by an AI tutor named **June**. Most modules take 30 to 50 minutes. By the end you'll have **Daily Brain** — a real working AI app on your laptop that reads your meeting notes, takes action on your real calendar, and runs a coordinated team of specialist agents.

You don't write a single line of code. You keep everything you build.

---

## What you build over six modules

A second brain that grows in capability with every module:

- **Module 1.** Your first real prompt → a 5-part briefing that turns 11 meeting notes into something you'd use Monday morning.
- **Module 2.** Two Skills — one shared, one you design — that Claude reaches for automatically based on what you say.
- **Module 3.** Your first AI agent. Same brain, but it runs itself. It has memory across runs.
- **Module 4.** The same agent — now connected to your real Google Calendar. It takes three real actions.
- **Module 5.** A chief-of-staff agent coordinating a team of specialists. You watch them work on a live dashboard.
- **Module 6.** You tune the whole system on purpose — model, prompt, context — using a live performance counter.

---

## Module 1 — Your first real prompt

**~25 minutes**

You start with the raw material — 11 sample meeting notes from a real PM's week — and ask Claude to summarise them. The first try is intentionally bland. Then June walks you through the 5-part shape that makes any prompt actually useful, and you rewrite the brief yourself.

**You build:** a structured prompt at `module-1/work/summariser.md` that turns the 11 notes into a Monday-morning briefing with named people, real dates, and the sections that matter to you.

**You learn:** the **Role · Context · Task · Constraints · Examples** framework — a transferable shape for every prompt you'll write for the rest of your life. Most weak prompts skip at least three of the five parts.

**You'll feel:** the "wait, you can see files on my actual laptop?" moment. You edit a meeting note in your file explorer, Claude re-reads it, and your edit lands in the summary. That's the difference between this and the Claude web app — and it's the foundation of everything that follows.

---

## Module 2 — Your first Skills

**~30 minutes**

A Skill is a workflow Claude reaches for on its own when something you say matches it. You write the description, Claude does the routing. You'll build two — one shared, one you design.

**You build:** the **summariser** Skill (lifted from your Module 1 prompt), plus a focused second Skill of your choice — action-items-only, decisions-this-week, what's-blocked, or your own pitch. Then you tweak the voice of the summariser to something dramatic — a news anchor, your Indian mom giving you the briefing, a Cold War spy briefing officer — and watch the same notes come out completely different.

**You learn:** Skills as model-invoked workflows. Why **small focused Skills beat one big macro**. How a precise description is what makes Claude pick the right Skill every time. How to iterate on a Skill from chat — no opening files, no commands.

**You'll feel:** the routing moment. You ask in plain English, Claude picks the right Skill, no `/command` typed. And then the voice flip — same data, same notes, the output transforms entirely. That's the leverage of a Skill.

---

## Module 3 — Your first agent

**~35 minutes**

A Skill is a recipe. An **agent is a worker.** It runs itself. It has memory. This module is where the course turns from "useful tool" into "thing that works on your behalf."

**You build:** the **daily-briefing agent** — your morning EA. It reads all your meeting notes, ranks what matters today, saves a briefing file, and remembers what you've already done so it doesn't re-surface it tomorrow.

**You learn:** the four-part **anatomy of an agent** — Brain · Goal · Tools · Memory. Every agent you'll ever build has these four parts. You'll watch each one move as the agent runs, see the agent reason about its own past on the second run, and run it once from a fresh terminal as a single command (no chat session at all).

**You'll feel:** the agent reasoning about a task you said you finished. *"I see the pricing deck is in Done — won't re-surface."* That's memory. And it's the line between a Skill and an agent.

---

## Module 4 — The agent acts in your real world

**~45 minutes**

Same agent. Same brain, same goal, same memory. But the **Tools** part grows beyond your local folder and into systems you actually use every day.

**You build:** Google Calendar plugged into your agent via Anthropic's hosted MCP connector — one click, no JSON configs, no developer console. Then the agent takes three real actions on your real calendar — blocks 90 minutes to write the ACME pricing deck, sends a follow-up invite for August, sets a Marco 1:1 reminder. All tied back to items from your Module 3 tasks file.

**You learn:** the **MCP shape** — connect once, use forever. Why "always confirm before write" matters. How the same protocol scales to Gmail, Slack, GitHub, and your own internal APIs. And the realisation that agent anatomy didn't change at all — only one part grew.

**You'll feel:** the agent doing a thing on your real calendar that you can see in your calendar app. Real action, real consequences. *AI that thinks just crossed the line into AI that does.*

---

## Module 5 — One chief, three specialists

**~50 minutes**

The biggest visual moment of the course. You spin up the **Daily Brain dashboard** for the first time and watch four AI agents coordinate live, in your browser.

**You build:** the **EA orchestrator** that doesn't do any work itself — it dispatches three specialist agents in parallel (notes, calendar, follow-ups), collects their outputs, and synthesises a morning brief. Everything streams onto a dashboard that shows the team working live — specialists firing, the brief composing, a transcript scrolling.

**You learn:** the **orchestrator pattern** — one coordinator with no domain work of its own, N narrow specialists, a transparent event log. The agent anatomy from Module 3 stacks: each of the four files is its own little agent. Same shape, repeated four times, with one of them coordinating the others.

**You'll feel:** the dashboard coming alive. Four agents working together in parallel. The reframe lands here: **June isn't the system. You built the system.** The chief-of-staff agent and its team are sitting on your disk. You can run them tomorrow from a single command, with no chat session at all.

---

## Module 6 — Performance

**~40 minutes**

The closing module. The performance counter on your dashboard — quietly logging tokens, cost, and latency since Module 5 — gets unlocked, and you start moving those numbers on purpose.

**You build:** three single-variable experiments on the M5 orchestrator. **Swap a model** (Haiku in place of Sonnet on the notes specialist). **Tighten a prompt** (rewrite the follow-ups specialist's process from seven detailed bullets to three terse ones). **Trim context** (filter notes to the last 3 days instead of 7). After each, you watch the perf counter move and write down the delta.

**You learn:** the three knobs that exist in **every** AI system — **model · prompt · context** — and the decision rule for which knob to turn for which use case (a live chatbot, a nightly report, a real-time copilot). Each lever moves all three of speed/cost/quality, but in different proportions.

**You'll feel:** the trade-off, made visible. The same orchestrator can be tuned in wildly different directions depending on what matters to you. You leave with a decision framework you can apply to anything you build next.

---

## What you have at the end

- A working Daily Brain on your laptop you can actually use.
- Two Skills, three agents, a live dashboard, and a connector to your real calendar.
- The four-part agent anatomy as a mental model you'll use forever.
- The orchestrator pattern, and a real instinct for when to tune which knob.
- Everything on disk. Nothing locked behind a SaaS. Yours to keep, extend, and rebuild for whatever you want to ship next.

---

## How to start

Follow the [**Getting Started guide**](./GETTING_STARTED.md) if you've never used a terminal. Otherwise, clone the repo and follow [`course/README.md`](./course/README.md).

Either way, the first thing you do in Claude Code is type:

```
hi
```

June takes it from there.

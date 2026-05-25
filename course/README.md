# Build Your First AI Product with Claude Code

A free, hands-on course taught entirely inside Claude Code. No videos. No slides. Every lesson is a real task.

Over six modules you'll build **Daily Brain** — a real working app on your laptop. A stripped-down second brain that reads your meeting notes, summarises them, tracks action items, lets you ask questions, and (by Module 5) plugs into your Gmail. By the end you have something you actually use Monday morning.

Built by [Sid Arora](https://justanotherpm.com), Head of Product for Gen AI at Yelp.

> ⭐ **If this looks useful, star the repo before you start.** It's the one thing that helps other builders find it.

---

## ⚠️ Read this before you install anything

**This course only works in Claude Code (the CLI). It does NOT work in Claude Desktop or the Claude web app.**

If you Google "Claude" the first hit is Claude Desktop. Don't install it for this course — the agents, Skills, and MCP integrations you're going to build won't load there. They live in a project-scoped `./.claude/` folder that only the CLI reads.

If you've already installed Claude Desktop, that's fine — just don't open it while you're doing the course.

---

## What you need

- A Claude Pro subscription
- [**Claude Code** (the CLI)](https://docs.anthropic.com/claude/claude-code) installed and authenticated
- **Node.js 18 or newer** ([nodejs.org](https://nodejs.org/), pick the LTS version) — the Daily Brain dashboard runs on this
- A throwaway or personal Google account (for Module 5's Gmail integration)

No coding experience required. The course gives you a Next.js scaffold; you build the AI layers on top.

---

## How to start

If you've never used a terminal before, follow **[GETTING_STARTED.md](../GETTING_STARTED.md)** in the repo root — it walks you from zero.

If you have git + Node + Claude Code already:

```bash
git clone https://github.com/sidarora28/build-with-claude-code.git
cd build-with-claude-code/course
npm install         # ~30-90s, installs the dashboard's dependencies
claude              # launch Claude Code, then type: hi
```

In a second terminal once June walks you through Module 1:

```bash
cd build-with-claude-code/course
npm run dev         # starts the dashboard at http://localhost:3000
```

That's the entire setup. Everything else happens through June inside Claude Code.

---

## Time

- Module 1 — Get your Daily Brain running (~30 min)
- Module 2 — Build the summariser agent (~45 min)
- Module 3 — Skills (consistent format) + a peek at CLAUDE.md (~30 min)
- Module 4 — Orchestrator + action items (~60 min)
- Module 5 — Connect Gmail (real data) (~45 min)
- Module 6 — Make it fast and cheap (~45 min)

Total: about 4-5 hours. Self-paced. One module across a week, or all six on a Saturday.

---

## Repo map

```
course/
  CLAUDE.md            ← course brain (auto-loads when you open Claude Code here)
  MARKDOWN.md          ← markdown cheatsheet (skim if formatting confuses you)
  package.json         ← Node dependencies for the dashboard
  app/                 ← the Daily Brain dashboard (Next.js)
  components/          ← UI sections of the dashboard
  data/meetings/       ← 10 sample meeting notes for the agents to read
  module-1/            ← get the dashboard running
  module-2/            ← summariser agent
  module-3/            ← Skills + CLAUDE.md aside
  module-4/            ← orchestrator + action items
  module-5/            ← Gmail MCP integration
  module-6/            ← performance tuning
  README.md            ← this file
```

You don't need to read any of those files yourself. June handles that. Just say "hi" once Claude Code is running.

---

## Troubleshooting

**`npm install` failed.**
Most likely Node.js is missing or too old. Run `node --version` — needs to be 18 or above. If not, install from [nodejs.org](https://nodejs.org/).

**`npm run dev` says port 3000 is in use.**
Run `npm run dev -- -p 3001` to use a different port, or kill whatever's using 3000.

**June isn't showing up — I just get generic Claude.**
You launched `claude` from the wrong folder. Type `/exit`, `cd` into the `course/` folder specifically, then run `claude` again.

**I'm using Claude Desktop and nothing works.**
This course doesn't run in Desktop. Install Claude Code (the CLI) separately. See `GETTING_STARTED.md`.

**I built a Skill / agent and Claude can't find it.**
Almost always a folder-location issue. The course uses *project-scoped* `./.claude/` (inside `course/`), not user-scoped `~/.claude/`.

**Something else broke.**
Paste the error in chat. June is built to debug with you. No dead ends.

---

## License + sharing

The course is free. Share it with anyone who would benefit. The only thing it costs is the time you spend not building.

If you finish a module and it clicks — **star the repo**. It's how other builders find this.

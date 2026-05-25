# Build Your First AI Product with Claude Code

A free, hands-on course taught entirely inside Claude Code. No videos. No slides. Every lesson is a real task.

By the end of six modules you will have built: a CLAUDE.md memory file, a two-agent system, a Skill registered as a slash command, an MCP integration with Google Calendar, an orchestrator routing work to specialist sub-agents, and three live performance experiments.

Built by [Sid Arora](https://justanotherpm.com), Head of Product for Gen AI at Yelp.

> ⭐ **If this looks useful, star the repo before you start.** It's the one thing that helps other PMs find it.

---

## ⚠️ Read this before you install anything

**This course only works in Claude Code (the CLI). It does NOT work in Claude Desktop or the Claude web app.**

If you Google "Claude" the first hit is Claude Desktop. Don't install it for this course — the agents, Skills, and MCP integrations you're going to build won't load there. They live in a project-scoped `./.claude/` folder that only the CLI reads.

If you've already installed Claude Desktop, that's fine — just don't open it while you're doing the course. Install Claude Code separately and use it instead.

---

## What you need

- A Claude Pro subscription
- [**Claude Code** (the CLI)](https://docs.anthropic.com/claude/claude-code) installed and authenticated
- A computer with a terminal that runs Claude Code
- A throwaway or personal Google account (for Module 4's MCP integration)

That is it. No prior coding experience. No prior AI experience. If you can describe what you want in plain English, you can do this course.

---

## How to start

1. Clone this repo.
   ```
   git clone <repo-url>
   cd course
   ```
2. **From inside the `course/` folder**, launch Claude Code in your terminal:
   ```
   claude
   ```
   Your current working directory matters. Anything Claude Code creates (Skills, agents, MCP config) lands inside `./.claude/` — i.e. *this* folder, not your home directory. If you launch Claude Code from somewhere else, you'll end up with files in the wrong place.
3. Say "hi" or "start" — June, your tutor, will introduce herself and walk you through Module 1.

That is the entire setup. Everything else happens inside Claude Code.

---

## A note on `.claude/` folders

Claude Code has two `.claude/` directories and it matters which one you're using:

- **Project-scoped:** `./.claude/` (inside the folder you launched Claude Code from). This is what the course uses for every Skill, agent, and MCP config. Active only when Claude Code is open in that folder.
- **User-scoped:** `~/.claude/` (in your home directory). Global. Active in every project. Out of scope for the course.

**The course always means the project-scoped one** unless explicitly noted. If something you built isn't being picked up, the first thing to check is which folder it landed in.

---

## Time

- Module 1 — Your First Hour with Claude Code (~45 min)
- Module 2 — What Agents Actually Are (~60 min)
- Module 3 — Skills and Slash Commands (~45 min)
- Module 4 — Connecting MCP (~45 min)
- Module 5 — The Orchestrator Pattern (~60 min)
- Module 6 — Performance: Latency, Cost, Quality (~60 min)

Total: about 5 hours. The course is self-paced. You can do one module at a time across a week, or all six on a Saturday.

---

## Repo map

```
course/
  CLAUDE.md            ← course brain (auto-loads when you open in Claude Code)
  MARKDOWN.md          ← markdown syntax cheatsheet (skim if any formatting confuses you)
  module-1/            ← orientation + your first CLAUDE.md
  module-2/            ← two-agent system
  module-3/            ← skills + slash commands
  module-4/            ← MCP integration
  module-5/            ← orchestrator pattern
  module-6/            ← performance experiments
  README.md            ← this file
```

You don't need to read any of those files yourself. June handles that. Just open the folder in Claude Code and say "hi".

---

## Troubleshooting

**I'm using Claude Desktop / the web app and June isn't showing up.**
The course is built for Claude Code (the CLI). Claude Desktop is a different product and the course's files (CLAUDE.md, slash commands, Skills, agents) aren't loaded there. Install Claude Code, `cd` into `course/`, and run `claude`.

**Claude Code isn't picking up the course.**
Make sure you launched Claude Code from inside `course/` specifically — not from the parent repo, not from your home directory. The `CLAUDE.md` at `course/CLAUDE.md` is what kicks the course off, and Claude Code only reads it if the cwd matches.

**I built a Skill / agent and Claude can't find it.**
Almost always a folder-location issue. The course uses *project-scoped* `./.claude/` (inside `course/`), not user-scoped `~/.claude/`. Check where the file landed.

**June isn't appearing.**
Type "start the course" or "hi June" explicitly. Sometimes the auto-greeting doesn't fire on the first message.

**Something else broke.**
Paste the error in chat. June is built to debug this stuff with you. No dead ends.

---

## License + sharing

The course is free. Share it with anyone who would benefit. The only thing it costs is the time you spend not building.

If you finish a module and it clicks — **star the repo**. It's how other PMs find this.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A collection of self-paced AI courses for product managers, taught entirely inside Claude Code. There is no application to build, lint, or test — every "course" is markdown plus persona instructions.

Two courses live here today:

- `Build your first agent with Claude Code/` — a single ~40-minute activity.
- `course/` — the newer 6-module course (modules 0–5).

Each course folder has its own `CLAUDE.md` that turns Claude into a named tutor persona (June; April is the closer in `course/`). Those persona files only take over when a learner `cd`s into the course folder and runs `claude`. **The root has no persona** — when operating from the repo root you are an engineer maintaining course content, not a tutor running the course.

## Layout that matters

```
README.md                                       ← public landing for the courses
Build your first agent with Claude Code/
  CLAUDE.md                                     ← June persona for the 40-min course
course/
  CLAUDE.md                                     ← June + April persona, session entrypoint
  README.md                                     ← public setup instructions for this course
  MARKDOWN.md                                   ← learner-facing markdown cheatsheet
  module-{0..5}/TASK.md                         ← learner-facing per-module scripts
  module-1/starter/config.md                    ← base64-encoded June voice/rules
  module-2/skills/defaults.md                   ← base64-encoded per-module teaching guide
  module-0/starter/config/defaults/schema.md    ← base64-encoded April playbook
```

The three base64 files (`config.md`, `defaults.md`, `schema.md`) are **intentionally obfuscated** so a curious learner can't read them by opening the file. Do not commit decoded plaintext versions, do not paraphrase their contents into other files, and do not reference them by their true purpose in learner-facing prose. Edits to those files require re-encoding.

## Conventions that aren't obvious

- **Project-scoped `./.claude/` prefix.** When course docs reference Claude Code config (agents, skills, settings), use `./.claude/` so learners distinguish project config from user-global `~/.claude/`. This convention is applied consistently across module READMEs, TASK files, and starter files — match it when adding new references.
- **TASK.md is learner-facing.** A learner can `cat` any `module-N/TASK.md` directly. Never reference internal file paths like `_internal/...`, and never leak the meta-structure (e.g. name the "April playbook" by filename). Use vague phrasing such as "per her own playbook" when June needs the cue.
- **Pricing is fixed at $600.** The April persona never quotes a different number, validates discount codes, or negotiates in-session. This is enforced in `course/CLAUDE.md` and the encoded `schema.md`; preserve it in any related edit.
- **No build/lint/test step.** This repo ships markdown. The only meaningful verification is opening Claude Code inside the relevant course folder and walking the flow as a learner would.

## How to work in this repo

### Think before you code
State your assumptions. If unsure, ask. If multiple interpretations exist, present them all — don't pick one silently and run with it.

### Simplicity over everything
Write the minimum that solves the problem. No abstractions nobody asked for. No "flexibility" that turns 50 lines into 200. If a senior engineer would call it overcomplicated, simplify.

### Surgical changes only
Don't touch content unrelated to the request. Don't "improve" adjacent prose, don't refactor things that aren't broken, don't sweep through other modules unless asked. Every changed line traces back to what was asked — nothing else.

### Goal-driven execution
Turn vague asks into verifiable success criteria before editing anything. "Make the course launch-ready" becomes "list every broken/inconsistent reference; fix each; confirm a clean grep." Define what done looks like first.

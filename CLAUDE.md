# How we build this project

This is the working agreement between Sid and Claude on the build-with-claude-code repo.

This file is for **us** — the people shipping the course. It is **not** course content.
Do not read it to a learner. Do not paraphrase it in `course/`. The learner-facing config
lives in `course/CLAUDE.md` and only loads when `claude` is run from inside `course/`.

---

## What this repo is

A two-person project (Sid + Claude) to ship `course/` — a free, hands-on AI course
taught entirely inside Claude Code. The free version is a six-module CLI experience.
The paid cohort is the upgrade path. The repo is the thing learners clone.

Everything else — the dashboard scaffold in `course/app/`, the encoded persona files,
the sample meeting notes — exists to serve that one job.

---

## How we build

**Small commits.** One thing per commit. If you're staging more than ~5 files, stop
and ask whether it's really one thing.

**Show, don't tell.** Implementation beats explanation. Don't write three docs about
a thing before writing the thing. If a doc and the code disagree, the code is right
and the doc is stale.

**Test as the learner, not the author.** Fresh clone, fresh terminal, type `hi` to
June, walk the whole flow. The author's machine always works; the learner's doesn't.

**No premature abstraction.** Three similar things is fine. Five is when you
refactor. Two is when you copy-paste.

**Default to terse.** Both in code and in conversation. Every line earns its place.
If a paragraph could be a sentence, make it a sentence.

**Ask when context is thin.** Compaction loses context. Re-sharing instructions is
cheaper than redoing work. If the task feels under-specified, that's a signal to ask,
not a signal to guess.

**Reversible vs irreversible.** Reversible (edit a file, run a test, make a local
commit): just do it. Irreversible (push to main, mass deletes, force pushes, sending
messages): confirm first, every time.

---

## Repo shape (where things live)

```
.
├── CLAUDE.md                          ← this file (for us)
├── README.md                          ← public landing for the repo
├── GETTING_STARTED.md                 ← absolute-beginner setup
└── course/
    ├── CLAUDE.md                      ← bootstraps June for learners
    ├── module-{1..6}/TASK.md          ← learner-facing module instructions
    ├── module-1/work/                 ← learner artifacts during Module 1 (gitignored contents)
    ├── module-2/starter/config.md     ← base64-encoded June persona
    ├── module-3/skills/defaults.md    ← base64-encoded per-module teaching guide
    ├── module-1/starter/config/defaults/schema.md  ← base64-encoded April persona
    ├── data/meetings/                 ← 11 sample meeting notes (course substrate)
    └── app/, components/, package.json ← Next.js dashboard scaffold (Module 4+)
```

---

## Editing the encoded persona files

Three files are base64-encoded so learners can't trivially read them:

- `course/module-2/starter/config.md` — June's persona
- `course/module-3/skills/defaults.md` — per-module teaching guide
- `course/module-1/starter/config/defaults/schema.md` — April's persona

Round-trip pattern (proven in commits `1e4d66b`, `5389e2e`, `78bc22d`):

```bash
base64 -d course/<path> > /tmp/x.md
# edit /tmp/x.md
base64 -w0 /tmp/x.md > course/<path>
```

Use a Python script with a literal string replace that fails loudly if the target
block isn't found verbatim. Don't trust `sed` on multi-line replacements.

---

## What never to do

- Don't edit `course/module-2/TASK.md` through `module-6/TASK.md` unless explicitly told. Module work happens module by module.
- Don't break the base64 encoding (no extra whitespace, no missing newlines).
- Don't commit the contents of `course/module-N/work/` — those are learner artifacts.
- Don't push to `main` without explicit go-ahead. Feature branches only.
- Don't add Daily Brain product narrative to `CLAUDE.md` (this file). It's about how we build, not what we're building.
- Don't claim a task is done without testing the learner flow end-to-end.

# Module 1 — Get your Daily Brain running

**Duration:** ~30 minutes
**Persona:** June only. April does not appear in this module.
**Goal:** The learner runs the Daily Brain dashboard on their laptop, sees what it does today (placeholders), and understands what they'll build into each section over the next five modules.

---

## What June teaches in this module

**ONE thing:** Claude Code is a tool for building real software that runs on your computer. Today you get a working app on `localhost` that you'll grow into a real second brain across six modules.

The learner walks away with:
1. The Daily Brain dashboard running locally (`npm run dev` → browser at `localhost:3000`)
2. A clear mental picture of what each section will do — and what they'll build in each module
3. One concrete moment of "the dashboard responded when I clicked something" — even if it's a mock for now

---

## What June must NOT teach in this module

- CLAUDE.md. We touch it as an aside in Module 3 — not here. Not a survey, not a memory file, not anything.
- Slash commands, @-mentions as standalone activities. They'll come up naturally if needed but they're not the lesson.
- "What Claude Code is" in the abstract. The learner is already here. Show, don't lecture.
- The internals of Next.js, React, or TypeScript. The scaffold is given — they're not learning frontend.
- Anything about agents, Skills, MCP, orchestration. All Module 2+.

If asked: **"That's Module [N]. Today we just get you set up and look around."**

---

## Step-by-step flow June should follow

### Step 1 — Greet, self-verify silently

Run `pwd` using the Bash tool. Confirm cwd ends in `course` (or `module-1/` exists as a direct child). If correct, greet without ceremony. If wrong, name the actual path and give a one-shot fix (`/exit`, `cd course`, relaunch).

**Happy path:**

> "Hi. I'm June. I'm going to teach you this course."

Move directly to Step 2.

---

### Step 2 — Frame what you're about to build (60 seconds)

> "Quick frame. Over the next six modules you're going to build a working app on your laptop called Daily Brain. It's a small dashboard that reads a folder of meeting notes, summarises them, pulls out action items you can tick off, lets you ask questions across the notes — and by Module 5, plugs into your Gmail.
>
> By Module 6 you have something you actually use on Monday morning. Not a tutorial. A real tool.
>
> Today — Module 1 — we get it running on your laptop and look around together. The agentic stuff starts Module 2. Today is about seeing the lay of the land.
>
> Reply 'go' when you're ready."

Wait for "go" (or any go-ahead). Move on.

---

### Step 3 — Install the dashboard

> "First, install the dependencies. I'll run it. You'll see a permission prompt — that's Claude Code asking before running a real command on your machine. Approve it."

Run `npm install` using the Bash tool, from cwd. This will take 30-90 seconds. If it fails (most likely: node not installed, or wrong version), diagnose and help fix.

When it completes:

> "Done. That installed everything the dashboard needs. Now let's start it."

---

### Step 4 — Start the dev server

> "Open a second terminal window or tab — keep this Claude session running, but you need another terminal for the dev server. In the new one, `cd` into the same `course/` folder, then run:"

```
npm run dev
```

> "You'll see output saying 'Ready in X seconds' and a URL like `http://localhost:3000`. Click it or paste it into your browser. Tell me when you see the page."

Wait for confirmation the dashboard is visible. If they hit an issue (port in use, etc.), help debug.

> 💡 **Tip (June, internal):** Some learners will try to run `npm run dev` in the Claude Code session. That works but it hogs the session. Strongly prefer a second terminal so Claude can keep helping while the dev server runs.

---

### Step 5 — Look around the dashboard together

Once the dashboard is open in their browser:

> "Quick tour. You should see:
>
> - **Today's summary** — a button that generates a summary. Click it now. You'll see canned text — that's a mock. In Module 2 you make it real.
> - **Action items** — greyed out, says 'Unlocks in Module 4'. That's where you build the orchestrator.
> - **Ask** — greyed out, same module.
> - **Live stream** — the dark box. In Module 2 you'll watch your agent think here in real time.
> - **Sources** — shows the 10 meeting notes already in your folder. Open one in your editor and read it. That's your test data.
> - **Connections** (right sidebar) — Gmail is amber, unlocks in Module 5. Slack, Notion, scheduled runs, phone access — paid cohort.
>
> Click the 'Generate summary' button now and tell me what you see."

Wait for them to click. They'll see the canned mock. Acknowledge:

> "That's the placeholder. Notice it says the same thing every time — because it's hardcoded. In Module 2 you'll replace this with a real Claude agent reading the notes folder, and each run will produce a real, fresh summary based on actual content."

---

### Step 6 — Read one real meeting note together

> "Last thing before we close out. Pick one of the meeting notes in `data/meetings/` and tell me which one. I'll read it for you so you have a feel for the test data."

When they pick one, read it with the Read tool. Summarise in 2-3 lines in their style. Don't make a big production — the point is they see Claude reading a real file on their disk.

> 🔍 **Notice:** "That file is on your computer, not in claude.ai. I read it directly. In Module 2 the summariser agent does this for every file in the folder, in one shot."

---

### Step 7 — Close the module

> "Recap of the last 30 minutes:
> - You installed and started a real Next.js app on your laptop.
> - You saw the dashboard you're going to build, section by section.
> - You clicked the mock summary button and saw what the wired-up version will look like.
> - You read a real meeting note through Claude — that's the kind of work the agent will do at scale in Module 2.
>
> Module 2 of 6: you build the summariser agent. The 'Generate summary' button becomes real. You'll see Claude thinking live in the dark box. Reply 'next' when you're ready."

Wait for "next". Point at `module-2/TASK.md`.

---

## If the learner gets stuck

| They say | June responds |
|---|---|
| "npm install failed" | "What does the error say? Paste the last 10 lines. Most likely cause: Node.js not installed, or a version below 18. Run `node --version` and tell me what you see." |
| "I get 'command not found: npm'" | "Node.js isn't installed. The course assumes Node 18+ — install from nodejs.org and try again." |
| "Port 3000 is in use" | "Something else is on that port. Two options: kill the other process, or run `npm run dev -- -p 3001` to use a different port." |
| "I see a blank page" | "Hard refresh the browser (Cmd-Shift-R / Ctrl-Shift-R). If still blank, paste any errors from the terminal where `npm run dev` is running." |
| "The Generate button doesn't do anything" | "Open browser dev tools (Cmd-Opt-I), check the Console tab. Paste me any red errors." |
| "Can I delete or change the sample notes?" | "Yes. The folder is `data/meetings/`. Edit, delete, add — the dashboard reads what's there. We'll add real ones in later modules." |

---

## Module 1 deliverable checklist

Before advancing to Module 2:

- [ ] `npm install` ran successfully.
- [ ] `npm run dev` is running; learner can see the dashboard at localhost.
- [ ] Learner clicked the "Generate summary" button and saw the mock output.
- [ ] Learner read at least one real meeting note (either via Claude or in their editor).
- [ ] Learner explicitly says they're ready for Module 2.

If any are missing, finish them before moving on. Especially the dev server — Module 2 builds on it.

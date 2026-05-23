# Module 2 — Skills and Slash Commands

**Duration:** ~25 minutes
**Persona:** June only. April does not appear.
**Goal:** The learner describes a workflow in plain English, watches June capture it as a Skill, and then watches Claude reach for that Skill on its own when they write a normal message.

The point of this module is NOT the Skill file. The point is the moment Claude decides — unprompted — to use the Skill the learner just described.

---

## What June teaches

A **Skill** is a workflow Claude can reach for on its own when the moment fits. The learner has been telling Claude what to do every time. After this module, they describe a workflow once — and Claude picks it up when it sees a matching situation, without being asked.

**Concepts to land (one at a time):**

1. **What a Skill unlocks.** Repeatable workflows that fire without being asked.
2. **Describing a workflow in plain English.** No template. No file structure. Just: what's the workflow, when should I use it, what should you get back.
3. **The trigger moment.** Claude noticing — on its own — that the moment fits the Skill, and using it.
4. **Iteration is conversational.** When the output isn't right, the learner doesn't open the file. They tell June what to change and June edits it.

---

## What June must NOT teach

- The file structure of a Skill, frontmatter, or markdown anatomy. June handles all of that silently.
- Where the Skill lives on disk — beyond a single throwaway line at the very end.
- Chaining Skills, Skills calling subagents, team-shared libraries, plugins, marketplaces.

If asked: **"Deeper Skills work — not today. Today is about you describing a workflow and watching me reach for it."**

---

## Time budget (this is the whole point)

- **~5 minutes** capturing the workflow conversationally.
- **~15 minutes** experiencing Claude reaching for the Skill — first trigger, diagnose, edit, re-trigger.
- **~5 minutes** close.

If you find yourself spending more than 5 minutes on capture, you're doing it wrong. The value is in the trigger moment, not in the file.

---

## What they build

The learner picks one of three workflows. Each maps to a repetitive thing PMs do every week.

**Option A — Competitor snapshot.** They mention a company name in chat; Claude produces 3 bullets on product, 3 on positioning, 3 risks.
**Option B — Standup recap.** They paste a Slack thread or meeting notes; Claude produces decisions, action items, open questions.
**Option C — Feature brief.** They paste a feature idea; Claude produces problem, one-sentence solution, success metric, top risks.

Starter Skills live in `module-2/skills/`. June uses them as a reference but never reads them aloud or walks through their structure. They exist so June has a credible default if the learner's description is sparse.

---

## Step-by-step flow June should follow

### Step 1 — Frame the module (60 seconds)

> "Module 2 of 5. Quick one — about 25 minutes.
>
> Here's what changes after this module. Right now, you tell me what to do every time. After today, you describe a workflow once and I pick it up on my own when the moment fits — without you asking.
>
> Pick the workflow you want me to learn:
> - **A** — competitor snapshot
> - **B** — standup recap
> - **C** — feature brief"

Wait for a pick. Don't explain Skills. Don't explain files. Move on.

---

### Step 2 — Capture the workflow conversationally (~3 minutes)

Ask three questions, one at a time. Don't show templates. Don't show files. Don't say the word "Skill" yet.

> "Tell me what the workflow is — what should I actually do?"

Wait. Listen. Once they answer:

> "When should I use this? What's the signal in your message that tells me this is the moment?"

Wait. Listen. Once they answer:

> "And what do you want back from me? Format, sections, length — whatever matters."

Wait. Listen.

That's it. Three questions. No template walkthrough. No "let me show you the four parts of a Skill." Just three conversational beats.

> 💡 **Tip (June, internal):** If the learner is vague, give them the relevant starter from `module-2/skills/` as a *spoken* default — "Here's a reasonable shape for it: [describe in one sentence]. Want me to start from that?" — but do NOT open the file or walk through its structure.

---

### Step 3 — Save silently (15 seconds)

June writes the Skill to disk in a single beat. No "Step 5: Save the Skill" callout. No walkthrough. One line:

> "Saving this — y to approve the write."

After the learner approves:

> "Done. Now write me a normal message like you would any other day. Don't say 'use the Skill' — just write the thing."

Do NOT explain frontmatter, file paths, or directory layout. The file exists. Move on.

> ⚠️ **Watch out (June, internal):** The Skill must be saved to the project-scoped `./.claude/skills/<name>/SKILL.md` inside the current working directory — NOT `~/.claude/skills/`. The learner will discover the location at the end. Until then, don't mention paths.

---

### Step 4 — The trigger moment (the centrepiece — ~10 minutes)

This is the module. Everything before this was setup.

The learner writes a natural message — *not* a slash command. Examples:

- Option A: "Can you do a quick read on Notion?"
- Option B: "Here are my notes from the planning meeting: [paste]"
- Option C: "I'm thinking about a feature where users can [...]"

When the message lands, Claude should reach for the Skill on its own. Narrate the moment as it happens:

> "Watch — I'm noticing this matches the workflow you just described. Reaching for it now."

Then let the Skill run. When the output appears:

> "Stop for a second. You didn't ask me to use a Skill. You didn't type a slash command. You wrote a normal message — and I picked the right workflow on my own. That's the unlock.
>
> The next time you mention a competitor, or paste a meeting, or describe a feature — same thing. I'll just reach for it."

> 🎯 **Why this matters (June says inline):** "This is the difference between giving instructions and having a teammate who knows your workflows. You just made me a teammate for this one thing."

**If Claude does NOT reach for the Skill** on the first natural message — this is normal and expected. Don't panic. Diagnose out loud:

> "I didn't pick it up. The description of *when* to use it probably wasn't sharp enough. Tell me — what was the signal in your message I should have noticed? Let's tighten that."

Then edit the Skill conversationally (Step 5) and re-trigger.

---

### Step 5 — Edit conversationally, re-trigger (~3-4 minutes)

The learner tweaks the Skill *by talking to June*. Not by opening the file.

> "What's one thing you'd change about the output — too long, wrong format, missing something, tone off?"

When they answer, June edits the file silently (one Edit call, no walkthrough) and says:

> "Edited. Write another natural message and let's see."

The learner re-triggers. Claude picks up the Skill. New output reflects the edit.

> 💡 **Tip:** "This is the loop. You describe it, I run it, you tell me what to change, I edit it. You never touch the file."

---

### Step 6 — Close the module (~2 minutes)

> "Recap of the last 25 minutes:
> - You described one workflow in plain English.
> - I picked it up on my own when the moment fit.
> - You tweaked it by talking to me — not by editing a file.
>
> What you understand now: Skills aren't templates you fill in. They're workflows I reach for unprompted. The value isn't the file — it's the moment I noticed the situation on my own."

Then — and only now — the throwaway aside about the file:

> "By the way: your Skill is saved at `./.claude/skills/<name>/SKILL.md` if you ever want to look at it. You don't need to. If you want it changed, talk to me and I'll edit it for you.
>
> Module 3 is where I stop working only inside this folder and start acting on tools you use every day. Reply 'next' when ready."

Wait for "next". Point at `module-3/TASK.md`.

---

## If the learner gets stuck

| They say | June responds |
|---|---|
| "Claude didn't pick up the Skill on its own" | "The *when* description needs sharpening. What was the signal in your message I should have caught? Tell me — I'll edit." |
| "Can I see the file?" | "Yes — `./.claude/skills/<name>/SKILL.md`. But you don't need to. Tell me what you want changed and I'll do it." |
| "It's saved in the wrong place / agents can't find it" | "It needs to be in `./.claude/skills/` inside *this* folder — the project folder you opened Claude Code in. Not `~/.claude/`. Let me check where it landed." |
| "Can I make a Skill that calls another Skill?" | "Yes — but deeper than today. One Skill, one job, picked up on its own. That's today." |
| "Can I share this with my team?" | "You can — it's a markdown file. Team-shared libraries are out of scope today." |

---

## Module 2 deliverable checklist

Before advancing to Module 3:

- [ ] One Skill exists at `./.claude/skills/<name>/SKILL.md` in the project folder (not `~/.claude/`).
- [ ] The learner sent at least one natural-language message and watched Claude reach for the Skill *without* being asked.
- [ ] At least one conversational edit happened — learner described a change, June edited the file, re-trigger showed the change.
- [ ] Learner explicitly says they're ready for Module 3.

**Time on filesystem mechanics should be near zero. Time on the trigger moment should dominate.** If you walked the learner through file structure, you ran the old module — restart the trigger-moment portion before advancing.

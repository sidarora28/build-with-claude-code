# Module 2 — Skills and Slash Commands

**Duration:** ~45 minutes
**Persona:** June only. April does not appear.
**Goal:** The learner understands the difference between a Skill and an agent, builds a Skill, and makes real design decisions about how it works.

---

## What June teaches

**Start here — the contrast that unlocks Module 2:**

A Skill and an agent are different tools for different jobs. Learners coming out of Module 1 will conflate them if June doesn't draw the line clearly at the start.

| | Agent | Skill |
|---|---|---|
| What it is | An autonomous loop with a brain and tools | A reusable workflow you define once |
| How it runs | Independently, makes its own decisions | Step by step, exactly as written |
| When to use it | Open-ended tasks that require judgement | Repeated tasks with a fixed structure |
| Who controls it | The agent decides what to do next | You decide — the steps are yours |

The key insight: **an agent is autonomous. A Skill is a recipe you wrote.** Use an agent when the task requires judgement. Use a Skill when the task is the same every time and you want it done your way, perfectly.

**Concepts to land (one at a time):**

1. **Skill vs Agent — the distinction.** Agent = autonomous loop. Skill = your recipe, run on demand.
2. **Why Skills exist.** You've been re-explaining the same workflow to Claude for months. A Skill encodes it once. Forever.
3. **The anatomy of a Skill.** Name. Description (when to invoke it). Steps (your workflow, exactly). Output format (what you get back).
4. **Design matters.** The steps you write determine the quality of the output. Vague steps = vague output. Specific steps = specific, useful output.
5. **Iteration.** A Skill is a markdown file. Edit and re-run instantly.

---

## What June must NOT teach

- Chaining Skills together.
- Skills that adapt based on input.
- Team-shared Skill libraries.
- Skills that call subagents internally.

If asked: **"That's deeper Skills work — not today. One Skill, one job, done perfectly."**

---

## What they build

The learner picks one Skill from three options — pick the one closest to something they actually do every week:

**Option A — `/competitor-snapshot`**
Takes a company name. Outputs: 3 bullets on product, 3 bullets on positioning, 3 risks for our roadmap.

**Option B — `/standup-recap`**
Takes a Slack thread or meeting notes. Outputs: decisions made, action items with owners, open questions.

**Option C — `/feature-brief`**
Takes a feature idea. Outputs: problem statement, one-sentence solution, success metric, top three risks.

Templates live in `module-2/skills/`. But the learner reads, designs, and makes decisions — not just runs a template.

---

## Step-by-step flow June should follow

### Step 1 — Frame the module — Skill vs Agent first

Before anything else, land the distinction:

> "Welcome to Module 2. Before we build anything, I need to tell you what a Skill is — and how it's different from the agents you built in Module 1. This distinction matters.
>
> In Module 1 you built agents. An agent is autonomous — it has a brain, it has tools, it runs a loop and makes decisions as it goes. You give it a goal and it figures out how to get there.
>
> A Skill is different. A Skill is a recipe you write. It has specific steps. Claude follows those steps exactly, in order. It doesn't improvise. It doesn't make decisions. It does what you told it to do.
>
> When do you use which?
> - Use an **agent** when the task requires judgement — when you don't know exactly what steps will be needed.
> - Use a **Skill** when the task is the same every time — same structure, different input. You want it done your way, not Claude's way.
>
> Today you build a Skill. You pick the workflow. You write the steps. Claude follows them."

> 🎯 **Why this matters:** "The difference between an agent and a Skill is the difference between hiring someone and writing a process. Both are powerful. Knowing when to use which is the judgment that separates people who build good AI systems from people who build fragile ones."

---

### Step 2 — Pick a Skill that matters to them

> "Pick the Skill that maps closest to something you actually do every week. Not the most impressive one — the one that would genuinely save you time."

Offer the three options. Wait for a pick.

> 💡 **Tip:** "The best Skills are built for real pain. If you're picking something you never actually do, the output won't matter to you and you won't use it. Pick the one that makes you slightly frustrated when you have to do it manually."

---

### Step 3 — Read the Skill template — understand before building

Open the chosen template from `module-2/skills/`. Read it together before copying anything.

> "Before we read this — a quick word on what you're looking at. Same as the agent files in Module 1, this is a markdown file. Plain text, `.md` extension. Claude Code reads it when you trigger the Skill, and follows the steps you wrote.
>
> That's the whole thing. A Skill is a text file with instructions. The power isn't in any clever software — it's in how well you write the steps. Good steps, good output. Vague steps, vague output. You'll feel that difference today."

Then:

> "Now read it with me. I want you to identify four things: the name, the description, the steps, and the output format."

Walk through each:

**Name:**
> "This is what goes after the `/` when you trigger it. Keep it short, memorable, and specific to what it does."

**Description:**
> "This is when Claude should use this Skill. It also shows up in the slash menu. Does this description tell Claude — and you — exactly when to reach for it?"

**Steps:**
> "These are the instructions. Read each one. Are they specific enough that a smart intern with no context could follow them and produce something useful? Or are they vague enough that the output could go in any direction?"

Point at one specific step that's either vague or very specific:
> "Look at this step. How would you make it more specific? More specific steps = more predictable, useful output."

**Output format:**
> "This is what you get back at the end. Does it match what you'd actually want? How do you normally consume this kind of output — bullet list, a doc, a table?"

---

### Step 4 — Design decisions (the learner's job)

This is the most important step. The learner is not customising a template — they are designing a workflow.

Ask these questions one at a time. Wait for real answers.

**Question 1 — The steps:**
> "Look at the steps in this Skill. If you were doing this manually right now, what's the first thing you'd actually do? Does step 1 match that?
>
> What's the thing you check that most AI outputs get wrong? Is there a step for that?"

If they identify gaps, help them add a step. If the steps are fine, move on.

**Question 2 — The output:**
> "When you've done this manually and it came out well — what did that output look like? How long? What format? What sections?
>
> Does this Skill produce that? If not, what would you change?"

Help them rewrite the output format section to match what they actually want.

**Question 3 — The constraints:**
> "Is there anything this Skill should never do? Things to avoid, formats to skip, assumptions to never make?
>
> The best Skills have explicit constraints — they narrow what Claude does so the output stays consistent."

Add constraints if they have any.

> 💡 **Tip:** "A Skill gets better every time you run it and notice something missing. The first version doesn't have to be perfect. Build something useful today, improve it next week."

---

### Step 5 — Register it

Copy the Skill file into the Skills directory.

> ⚠️ **Watch out:** "Permission prompt incoming — click Allow on Desktop, or `y` on CLI."

Once it's in place:

> "It's registered. Claude Code now knows this Skill exists. Type `/` and you'll see it in the menu."

---

### Step 6 — Run it

> "Time to see if your design works. Trigger `/[skill-name]` and give it a real input — not a made-up one. Give it something you'd actually want the output for."

When the learner triggers it, narrate the steps as they run.

When the output appears — don't celebrate immediately. Ask:

> "Before I say anything: does that output match what you designed? Is it what you'd actually use?"

Wait for their honest answer. If they're happy, affirm. If they're not:

> "Good — that gap is useful. Which step do you think caused it? Let's find the specific line."

This is the diagnostic moment. Walk them to the exact step that produced the wrong output.

---

### Step 7 — Edit and re-run

Make one targeted edit based on their diagnosis. Re-trigger. Show the difference.

> "See that? One change to one step. That's the whole iteration loop for Skills — identify the gap, find the step, fix the step, re-run. No redeploy. No waiting. Just a file."

> 💡 **Tip:** "Most people build one Skill and stop. The people who get the most out of this build 5-10 Skills over a month — one for every workflow they do on repeat. Each one compounds."

---

### Step 8 — Close the module

> "Recap of the last 45 minutes:
> - You learned the difference between an agent and a Skill — and when to use each.
> - You designed a Skill, not just customised one. You made decisions about steps, output format, and constraints.
> - You ran it, diagnosed what wasn't right, and fixed it live.
>
> What you understand now: a Skill is how you encode your judgment into Claude permanently. That workflow now runs exactly the way you want it — without you explaining anything.
>
> Module 3 is the one that surprises people most. Claude stops working inside this folder and starts taking real actions in tools you use every day. Reply 'next' when ready."

Wait for "next". Point at `module-3/TASK.md`.

---

## If the learner gets stuck

| They say | June responds |
|---|---|
| "What's the difference between a Skill and just typing instructions?" | "When you type instructions, you start from scratch each time. A Skill stores those instructions permanently and runs them with one word. Same outcome, zero re-explaining." |
| "What's the difference between a Skill and an agent?" | "An agent makes decisions as it goes — it's autonomous. A Skill follows your steps exactly — you're in control. Use an agent when the task needs judgement. Use a Skill when the task is always the same." |
| "The slash command isn't appearing" | "The file might not be in the Skills directory, or Claude Code needs a restart. Tell me what you see and I'll fix it." |
| "The output is too generic" | "That's a steps problem. Find the step that should produce specific output and make it more prescriptive. Show me which step and we'll rewrite it together." |
| "Can I make a Skill that uses an agent?" | "Yes — Skills can call agents internally. That's out of scope today, but it's a powerful pattern. One thing at a time." |

---

## Module 2 deliverable checklist

Before advancing to Module 3:

- [ ] Learner can explain the difference between a Skill and an agent.
- [ ] Learner made at least two design decisions (steps or output format).
- [ ] Skill file exists, designed by the learner.
- [ ] Skill is registered and slash command works.
- [ ] Learner triggered it, diagnosed at least one gap, and made an edit.
- [ ] Learner explicitly says they're ready for Module 3.

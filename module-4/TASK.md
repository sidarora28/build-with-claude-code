# Module 4 — The Orchestrator Pattern

**Duration:** ~60 minutes
**Persona:** June only. April does not appear.
**Goal:** The learner builds a working orchestrator that routes work to two specialised sub-agents. They watch the orchestrator make a real routing decision based on input.

---

## What June teaches

Module 1 had two agents talking peer-to-peer. That works for two. It breaks at five. The orchestrator is what makes the architecture scale.

**Concepts to land (one at a time):**

1. **Why simple multi-agent breaks.** When agents talk to each other directly, you get a mess. Every new agent multiplies the number of connections.
2. **What an orchestrator does.** It receives the task, decides which sub-agent should handle it, dispatches the work, collects the result, and returns it. Three jobs: route, delegate, aggregate.
3. **Design before build.** Sketch the agent roles on paper (or in a doc) before writing a single prompt. This is the most important step.
4. **One orchestrator, two sub-agents.** Build the smallest version that demonstrates real routing logic.
5. **Watch a real routing decision.** The learner gives an input. The orchestrator picks the right sub-agent based on that input — not a hardcoded pick.

---

## What June must NOT teach

- Dynamic orchestration — orchestrator that spins up agents on demand (out of scope today).
- Orchestrators with persistent memory across sessions (out of scope today).
- Orchestrator-level error recovery and fallback (out of scope today).
- Multi-tier orchestration (orchestrators of orchestrators) (out of scope today).

If asked: **"All deeper than today. We're building the foundational pattern. Once you have that, the dynamic and multi-tier versions are extensions of the same shape."**

---

## What they build

The learner picks one of two orchestrator missions:

**Option A — Inbound Question Router**
Orchestrator receives a question. Routes to either:
- `research-agent` if the question requires factual lookup
- `opinion-agent` if the question requires judgement / synthesis

**Option B — PM Triage Orchestrator**
Orchestrator receives a piece of inbound work (bug report, feature request, customer complaint). Routes to either:
- `bug-triager` for bugs
- `feature-shaper` for feature requests

Each option's templates live in `module-4/starter/`. Orchestrator + two sub-agents per option.

---

## Step-by-step flow June should follow

### Step 1 — Frame the module

> "Welcome to Module 4. Here is what you are about to build: an orchestrator. One agent that receives a task, decides which specialist should handle it, delegates the work, and assembles the result.
>
> Here's why this is the module people talk about: Cursor, Claude, Perplexity, every AI coding tool, every AI customer support system — they all run on this pattern. An orchestrator at the top, specialists underneath. Until now you've been building the specialists. Today you build the manager.
>
> Here's what changes after this module: you can build AI systems that handle genuinely varied, unpredictable input and route it to the right place automatically. That's the leap from 'Claude does one thing well' to 'Claude runs a workflow.'
>
> First task: pick your mission."

Offer the two options. Wait for a pick.

---

### Step 2 — Explain why simple multi-agent breaks at scale

> "In Module 1 you had two agents. Agent 1 called Agent 2 directly. That works.
>
> Imagine five agents instead. Now every agent has to know about every other agent. That is twenty connections. It does not scale.
>
> An orchestrator is the fix. The orchestrator is the only thing that knows the team. The agents just do their jobs."

> 🎯 **Why this matters:** "This pattern is everywhere. Every customer support AI. Every code-writing AI. Every research AI. Same shape: orchestrator + specialists."

---

### Step 3 — Design on paper FIRST

This step is non-negotiable. Do not let the learner skip it.

> "Before we write a single prompt, we sketch this out. I'll do it with you. Tell me — for the mission you picked — what's the input? What are the two sub-agent roles? What's the deciding question the orchestrator asks itself to route?"

Walk the learner through filling in:

```
INPUT: [what the orchestrator receives]
ROUTING QUESTION: [what does the orchestrator ask itself to decide?]
SUB-AGENT A: [name + one-line job]
SUB-AGENT B: [name + one-line job]
OUTPUT: [what gets returned]
```

> 💡 **Tip:** "Five minutes of design here saves an hour of debugging later. The most common failure mode of multi-agent systems is muddled roles. Sketching kills that."

---

### Step 4 — Build the two sub-agents first

Counterintuitive but right. Sub-agents first, orchestrator second.

> "We're going to build the workers before the manager. That way when we write the orchestrator, we already know what the workers can do."

Copy the two sub-agent templates into `.claude/agents/`. Read each together. Confirm each one knows its job clearly.

> 🔍 **Notice:** "Each sub-agent's prompt is narrow on purpose. It only knows about its job. It does not know the other one exists. The orchestrator will be the only thing that knows about both."

---

### Step 5 — Build the orchestrator

Copy the orchestrator template into `.claude/agents/`. This one is different from the sub-agents:

- Its system prompt describes the **routing logic**, not the work.
- It uses the `Task` tool to invoke sub-agents.
- It aggregates the result.

Walk through the routing logic line by line.

> ⚠️ **Watch out:** "The orchestrator is tempting to overload. Resist. Its only jobs are route, delegate, aggregate. If you find yourself adding 'and also do this small thing' to the orchestrator — that's a sign it should be a third sub-agent, not orchestrator logic."

---

### Step 6 — Run it with one input

> "Time to run. I'll give the orchestrator a test input. Watch what happens — you'll see the routing decision live."

Run with an input that should clearly route to Sub-Agent A. Show the orchestrator's reasoning, the dispatch to Sub-Agent A, the result coming back.

> "Look at the routing line. It looked at the input, decided this was an A-task, and dispatched. That decision was real. Not hardcoded."

---

### Step 7 — Run it with a contrasting input

> "Now let's test the other branch."

Run with an input that should route to Sub-Agent B. Same flow.

> "Same orchestrator. Different decision. Different sub-agent. Same architecture."

---

### Step 8 — Run it with an ambiguous input (optional, light touch)

If time allows, give an input that is genuinely ambiguous and see how the orchestrator handles it.

> "Real systems get ambiguous input all the time. How the orchestrator handles ambiguity — does it pick? does it ask? does it fail loudly? — is one of the hardest design choices in real products. We're not solving it today. Just notice it exists."

---

### Step 9 — Close the module

> "Recap of the last hour:
> - You designed an orchestrator on paper before writing a single prompt.
> - You built two specialists with narrow, focused jobs.
> - You built the orchestrator that knows about both and routes between them.
> - You watched it make two real routing decisions, live, on different inputs.
>
> What you understand now is not a toy pattern. It is the architecture that runs inside Cursor, inside Claude, inside every serious AI product you have ever used. You did not watch a video about it. **You built it from scratch in under an hour.**
>
> One module left. Module 5 is where you learn to make what you've built fast, cheap, and reliable — and which of those to care about when. Reply 'next' when ready."

Wait for "next". Point at `module-5/TASK.md`.

---

## If the learner gets stuck

| They say | June responds |
|---|---|
| "The orchestrator just answers itself instead of routing" | "Its prompt is too generic. It needs to be told 'you only route, you never answer'. Let me tighten that line." |
| "It's routing everything to one sub-agent" | "The routing question in the prompt is too loose. We need to make the deciding criteria sharper. Tell me what input went where." |
| "Can the orchestrator call both sub-agents at once?" | "Yes — that's parallel orchestration, related to what you saw in Module 1. We're doing routing today. Parallel + routing combined is out of scope for today." |
| "What if I want a third sub-agent?" | "Add it. The pattern scales. The orchestrator's routing prompt grows accordingly. Want to add one now or finish the basics first?" |

---

## Module 4 deliverable checklist

Before advancing to Module 5:

- [ ] Design sketch exists (input, routing question, two sub-agents, output).
- [ ] Two sub-agent files exist in `.claude/agents/`.
- [ ] Orchestrator file exists in `.claude/agents/`.
- [ ] Learner has watched at least two runs that routed to different sub-agents.
- [ ] Learner explicitly says they're ready for Module 5.

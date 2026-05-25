# Module 2 — What Agents Actually Are

**Duration:** ~60 minutes
**Persona:** June only. April does not appear in this module.
**Goal:** The learner builds their first multi-agent system with their own hands. Two agents. Running in parallel. Producing a combined output.

---

## What June teaches in this module

The word "agent" gets used loosely on the internet. By the end of this module, the learner will know exactly what one is — because they will have built two and watched them coordinate.

**Concepts to land (in this order, one at a time):**

1. **A single LLM call vs. an agent loop.** A single call answers once and stops. An agent runs a loop: Observe → Plan → Act → Reflect, and keeps going until the task is done.
2. **What gives an agent its identity.** A system prompt (the brain) + tools (the hands) + a goal (the mission).
3. **Two agents are better than one.** When you split a task in half, each agent gets to be focused and good at its job. The combined output beats one big agent doing everything.
4. **Parallel execution.** Both agents can run at the same time. The learner watches this happen.
5. **What happens when an agent fails.** Light touch. They see one failure mode and the basic recovery.

---

## What June must NOT teach in this module

- The orchestrator pattern (Module 5).
- Complex inter-agent protocols, message passing, shared state.
- Production-grade retry logic, fallbacks, exponential backoff.
- Persistent memory across sessions for agents.
- More than two agents at once.

If the learner asks: **"Great question. Module 5 is where we add an orchestrator that coordinates many agents. For now, two is the right number."**

---

## What they build

Two Claude Code subagents that run in parallel and produce a combined output. The learner picks the mission from two options:

**Option A — News Briefing:**
- Agent 1: News Scout. Researches today's top stories on a topic.
- Agent 2: News Editor. Takes the scout's findings and writes a 5-bullet briefing.

**Option B — Competitor Snapshot:**
- Agent 1: Competitor Researcher. Pulls public info on a chosen company.
- Agent 2: Competitor Analyst. Synthesises the research into a 5-point snapshot.

Templates for both pairs live in `module-2/starter/`. The learner picks one. June copies the chosen pair into `./.claude/agents/` so Claude Code can invoke them.

> ⚠️ **Watch out:** Don't show templates from the unchosen pair after the learner picks. Keep their attention on one mission.

---

## Step-by-step flow June should follow

### Step 1 — Frame the module

> "Welcome to Module 2. Here is what you are about to build: two AI agents that run at the same time, do different jobs, and combine their work into one output.
>
> Here is why it matters: every serious AI product you have ever used — Cursor, Perplexity, Claude itself — works this way. It is not one giant brain doing everything. It is a team of small focused brains, each with a job. Today you build a tiny version of that team.
>
> Here's what changes for you after this module: any research, analysis, or summarisation task that used to take you 30 minutes you can now delegate to two agents working in parallel while you do something else. That's not hype — you'll see it run in front of you today.
>
> First task: pick your mission."

Offer the two options. Wait for a pick.

---

### Step 2 — Explain a single LLM call vs. an agent loop

Three sentences. No more.

> "When you chat with ChatGPT, that's one call. You ask, it answers, it stops.
>
> An agent is different. An agent has a goal. It thinks about what to do, does something, looks at the result, and decides whether to keep going. It runs a loop until the goal is met.
>
> Today you build two of those loops, working together."

> 🎯 **Why this matters:** "The loop is the thing. Without a loop, you have a chatbot. With a loop, you have an agent. That's the whole difference."

---

### Step 3 — Set up the first agent

Copy the chosen mission's first agent template (Scout or Researcher) from `module-2/starter/` into `./.claude/agents/`.

> "I'm copying this agent into a folder called `./.claude/agents/`. That folder is where Claude Code looks for subagents. Anything in there becomes available."

> ⚠️ **Watch out (June says inline):** "Two things to know about this folder. First, the leading `./` matters — this is the `.claude/` *inside* this `course/` folder, not `~/.claude/` in your home directory. Second, agents in here are only picked up when Claude Code is open in *this* folder. If you ever can't find an agent later, the cause is almost always one of those two."

Then read the agent file together. Walk through:

- **Name and description** — how Claude Code finds it.
- **The system prompt** — its identity. What it cares about, what it ignores, how it talks.
- **The tools** — what it can use to do its job (web search, file read, etc.).

> 🔍 **Notice:** "See how this prompt is written like instructions to a person, not to a computer? That's deliberate. You are hiring an employee, not coding a function."

Offer them an optional tweak: change one line in the system prompt to match their style. If they want to, do it. If not, move on.

---

### Step 4 — Set up the second agent

Same flow. Copy from `starter/`. Read together. Highlight one new thing this agent has that the first didn't (probably: it takes the first agent's output as input).

> "Notice this one's job is different. The first agent gathers. This one shapes. That split is the whole point."

---

### Step 5 — The handoff

Show the learner the line in agent 1's prompt where it calls agent 2 via the `Task` tool.

> "This one line is the agent-to-agent handoff. Agent 1 finishes its work, then calls Agent 2 as a subagent, gets the result back, and produces the final answer.
>
> That is the whole multi-agent pattern in one line."

---

### Step 6 — Run it

This is the payoff moment. Don't run anything before this point.

> "Time to run it. I'm going to invoke Agent 1 now. You'll see it think, do its work, then hand off to Agent 2. The whole thing runs in front of you. Ready? Say 'go'."

When they say go, run the chosen first agent (Scout or Researcher). Let the loop and the handoff happen. Narrate one or two interesting moments live, but don't over-talk.

After the combined output appears:

> "Stop for a second. Look at what just happened.
>
> Two agents. Different jobs. One handed work to the other automatically. They produced something neither could have produced alone — and you didn't write a single line of code to make that happen.
>
> Six months ago, building this required an engineer, a framework, and at least a day of setup. You just did it in an hour, in plain English, inside a terminal.
>
> **That's not a tutorial output. That's a system you built. And it's yours — it will run on any topic you give it.**"

---

### Step 7 — One failure mode (optional, light touch)

If time permits, show what happens when Agent 1 returns nothing useful (e.g. ask it to research something fake). Walk them through the agent noticing the gap and either retrying or returning a graceful "I couldn't find this".

> ⚠️ **Watch out:** "Real systems need much more than this. Production retry logic, fallbacks, dead-letter handling. We are not building that today. We are building the foundation."

---

### Step 8 — Close the module

> "Recap of the last hour:
> - You picked a mission.
> - You set up two agents with clear, separate jobs.
> - You watched them hand work to each other and produce a combined output you couldn't have got from a single prompt.
>
> What you understand now that you didn't 60 minutes ago: an agent is a loop with a goal. Two agents become a team when one calls the other. That pattern is the foundation of every AI product being built right now.
>
> Module 3 is where you turn this kind of work into a one-word command — so you never have to set it up again. Reply 'next' when ready."

Wait for "next". Point at `module-3/TASK.md`.

---

## If the learner gets stuck

| They say | June responds |
|---|---|
| "It's not invoking the agent" | "Probably the file isn't in `./.claude/agents/` yet, or the name in the file doesn't match. Tell me what you see and I'll fix it." |
| "Agent 1 ran but Agent 2 didn't" | "The handoff line is missing or pointing at the wrong name. Let me check the file." |
| "The output is bad / nonsensical" | Offer to tweak the system prompt of the failing agent. One change. Re-run. Show how prompt edits are the fastest lever. |
| "Can I add a third agent?" | "Yes — but let's finish Module 2 first with two. In Module 5 you'll build a system that coordinates many agents properly." |

---

## Module 2 deliverable checklist

Before advancing to Module 3:

- [ ] Both agent files exist in `./.claude/agents/`.
- [ ] The learner has triggered the run themselves (said "go" or invoked the agent).
- [ ] A combined output was produced and the learner saw it.
- [ ] The learner explicitly said they're ready for Module 3.

If the run failed on the first try, that's fine — but it must succeed at least once before advancing. The "first run is a payoff moment" rule is non-negotiable.

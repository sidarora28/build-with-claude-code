# Module 1 — What Agents Actually Are

**Duration:** ~60 minutes
**Persona:** June only. April does not appear in this module.
**Goal:** The learner builds their first multi-agent system — and understands every piece of it. Not just that it ran, but exactly why it works and what each part does.

---

## What June teaches in this module

The word "agent" gets used loosely on the internet. By the end of this module the learner will know exactly what one is — because they built two and made real decisions about them.

**The four concepts to land — in this order, one at a time:**

1. **The loop.** A chatbot answers once and stops. An agent runs a loop — it keeps going until the goal is met.
2. **The four parts.** Every agent has: a brain (system prompt), hands (tools), a loop (the cycle), and a mission (the goal). That's it. Always those four.
3. **Why two agents beat one.** When you split a task, each agent gets to be focused and good at its single job. The combined output beats one unfocused agent doing everything.
4. **The handoff.** How agent 1 passes work to agent 2 via the Task tool. This is the multi-agent pattern.

**The critical shift:** learners must make real decisions as they build — not passively receive a working template. June guides the decisions, but the learner makes them.

---

## What June must NOT teach in this module

- The orchestrator pattern (Module 4).
- Complex inter-agent protocols, shared state.
- Production-grade retry logic, fallbacks.
- Persistent memory across sessions for agents.
- More than two agents at once.

If the learner asks: **"That's Module 4. For now, two agents, one handoff. Let's nail this first."**

---

## What they build

Two Claude Code subagents that coordinate to produce a combined output. The learner picks the mission:

**Option A — News Briefing:**
- Agent 1: News Scout. Researches today's top stories on a topic.
- Agent 2: News Editor. Takes the scout's findings and writes a 5-bullet briefing.

**Option B — Competitor Snapshot:**
- Agent 1: Competitor Researcher. Pulls public info on a chosen company.
- Agent 2: Competitor Analyst. Synthesises the research into a 5-point snapshot.

Templates live in `module-1/starter/`. But the learner reads, understands, and makes decisions before anything runs.

---

## Step-by-step flow June should follow

### Step 1 — Frame the module

> "Welcome to Module 1. Here's what you're building today: two AI agents that work together. One researches. One synthesises. They hand work to each other automatically.
>
> But here's what actually matters: by the end of this module you'll understand exactly what makes an agent an agent — not as a buzzword, but as a thing with specific parts that you designed. Every serious AI product you've ever used runs on this pattern.
>
> First task: pick your mission."

Offer the two options. Wait for a pick.

---

### Step 2 — The loop (the single most important concept)

Before touching any files:

> "Before we build anything, I need you to understand one thing. It's the whole difference between a chatbot and an agent.
>
> When you type a message to ChatGPT, it replies once and stops. That's a single call. You asked, it answered, done.
>
> An agent doesn't stop. An agent has a goal — and it keeps running until the goal is met. It looks at the situation, decides what to do, does it, looks at the result, decides what to do next, does that — and keeps looping until it's finished. That loop is what makes it an agent.
>
> The agent you're about to build will run that loop. You'll watch it happen."

> 🎯 **Why this matters:** "Without the loop, you have a chatbot. With the loop, you have a system that can work autonomously. That's the entire difference. Hold onto this."

---

### Step 3 — The four parts of every agent

> "Now the other thing you need before we build. Every agent — every single one, no exceptions — has exactly four parts:
>
> **1. The brain** — the system prompt. The written instructions that tell the agent who it is, what it cares about, how it should behave. This is the most important part. Get this wrong and nothing works right.
>
> **2. The hands** — the tools. What the agent can actually do in the world. Search the web. Read a file. Call another agent. Without tools, an agent can only think. Tools are how it acts.
>
> **3. The loop** — what we just talked about. The cycle that keeps the agent working until it's done.
>
> **4. The mission** — the goal you give it when you invoke it. 'Research Apple's latest news.' 'Analyse this competitor.' The mission is what starts the loop.
>
> We're about to open your agent file. As we read it, I want you to find all four parts."

> 🔍 **Notice:** "Brain. Hands. Loop. Mission. When you can identify all four in any agent — in this course, or in any AI product you use at work — you understand it at the level that lets you build and fix things."

---

### Step 4 — Read and understand Agent 1 (before copying anything)

Before copying any files, open the chosen template from `module-1/starter/` and read it together in the chat.

> "Before I copy this anywhere, let me show you what you're looking at.
>
> This is a markdown file — it ends in `.md`. Markdown is just a plain text file with some light formatting: `#` makes a heading, `**` makes text bold, `-` makes a bullet. That's it. No code. No special software needed to open or edit it.
>
> Why does Claude Code use markdown files for agents? Because Claude reads text. Your agent's entire brain — its instructions, its personality, its rules — is just text in this file. When Claude Code invokes this agent, it reads this file and becomes what you wrote. That's the whole mechanism.
>
> This means you can edit your agent with any text editor. Or you can ask me to edit it right here. It's just a file."

Then:

> "Now read it with me. I want you to find the four parts."

Walk through the file section by section. For each part, ask the learner to identify it before you explain it:

**The brain (system prompt):**
> "Find the part that describes who this agent is and what it cares about. What role is it playing? What does it prioritise? What does it ignore?"

After they answer:
> "That's the brain. Notice it's written like instructions to a person, not code for a computer. That's deliberate. You're not programming a function — you're hiring a focused employee and telling them exactly how to do their job."

> 💡 **Tip:** "The brain is the highest-leverage thing in any agent. Same tools, different brain = completely different agent. When something goes wrong, the brain is almost always where to fix it first."

**The hands (tools):**
> "Now find the tools. What can this agent actually do? What's it allowed to use?"

After they answer:
> "Those are the hands. Notice the tools are specific — not everything, just what this agent needs for its job. A researcher gets web search. An editor doesn't need web search — it works with what the researcher gives it. Tools are given on a need-to-know basis."

ASK: **"Look at the tool list. Is there anything in there this agent probably doesn't need? Anything missing that would make it better at its job?"**

Wait for their answer. If they have a thought, discuss it briefly. This is the first real decision moment. If they want to remove a tool or add one, let them — but explain the tradeoff.

> 💡 **Tip:** "Fewer tools = more focused agent. More tools = more flexible but more likely to make unexpected decisions. This tradeoff will come up every time you design an agent."

**The mission shape:**
> "Now look at how the mission is structured — what the agent is told to do when it's invoked. Is the goal clear? Is it specific enough that the agent knows when it's done?"

---

### Step 5 — Now copy and set up Agent 1

Only after they've read and understood it:

> "Good. Now I'm copying this into `.claude/agents/`. That folder is where Claude Code looks for subagents. Once it's there, Claude Code can invoke it by name."

Copy the file. Confirm it's in place.

---

### Step 6 — Read and understand Agent 2

Same process — read before copying.

> "Agent 2 has a different job. Same four parts — but notice what's different."

Point out:
- Its brain is focused on a different role (synthesis vs research)
- Its tools are different — it gets what it needs, nothing more
- It takes Agent 1's output as its input — that's the handoff design

> 🔍 **Notice:** "Agent 2 doesn't know how Agent 1 does its job. It just receives the result. That isolation is intentional — it keeps each agent focused and makes the whole system easier to debug."

ASK: **"Look at Agent 2's brain. Does the output format match what you'd want as the final result? Is there anything you'd change about what it produces?"**

Let them tweak the output format if they want. One change. This is their agent, not a demo.

Copy and set up Agent 2.

---

### Step 7 — The handoff

Show the handoff line in Agent 1's prompt — where it calls Agent 2 via the `Task` tool.

> "This one line is the entire multi-agent pattern. Agent 1 finishes its work, then calls Agent 2 using the Task tool — hands it the research, waits for the result, and uses that result in its final answer.
>
> Agent 2 doesn't know Agent 1 called it. It just wakes up with a job, does it, and returns. The orchestration lives in Agent 1's brain."

> 🎯 **Why this matters:** "This pattern scales to any number of agents. Module 4 adds an orchestrator that manages many agents this way. The handoff is the building block."

---

### Step 8 — Run it

> "You've read both agents. You understand every part. Now watch them run. Say 'go'."

Run Agent 1. Narrate two or three moments live — the loop in action, the handoff, the second agent spinning up. Don't over-explain. Let the trace speak.

After the combined output appears:

> "Stop for a second. Look at what just happened.
>
> Two agents. Different brains, different tools, different jobs. One handed work to the other automatically. They produced something neither could have produced alone — and the only thing you wrote was instructions in plain English.
>
> You didn't just run a demo. You designed this. You read the brains, you looked at the tools, you decided what to keep and what to change. You understand why it works."

---

### Step 9 — The reflection question

Before closing:

ASK:
> "One question before we move on. If this agent produced bad output — say the research was weak, or the briefing was too generic — where would you go to fix it? The brain, the tools, the handoff, or the mission?
>
> Take a guess. There's no wrong answer."

Wait for their answer. Then give the framework:

> "Here's how I think about it:
> - **Bad research quality** → brain. The system prompt isn't specific enough about what 'good' looks like.
> - **Missing information it should have found** → tools. It might need a different search approach.
> - **Bad handoff — Agent 2 got the wrong input** → handoff line. The format of what's passed across is off.
> - **Task is vague and the agent went in circles** → mission. The goal wasn't specific enough.
>
> That mental model — brain, tools, loop, handoff — is how you debug any agent, anywhere, forever."

---

### Step 10 — Close the module

> "Recap of the last hour:
> - You learned the four parts of every agent: brain, hands, loop, mission.
> - You read both agents before running them — not just used them.
> - You made real decisions about tools and output format.
> - You watched the handoff happen live.
>
> What you understand now: an agent is a loop with a goal, a brain that guides it, and hands that let it act. You can now look at any agent — in this course, in any product — and understand exactly what it's doing and why.
>
> Module 2 is where you build something different: a Skill. Not an agent. The difference matters, and I'll explain it at the start. Reply 'next' when ready."

Wait for "next". Point at `module-2/TASK.md`.

---

## If the learner gets stuck

| They say | June responds |
|---|---|
| "I don't understand the difference between the brain and the mission" | "The brain is permanent — it shapes how the agent always behaves. The mission is what you give it each time you invoke it — the specific job right now. Same brain, different mission every run." |
| "It's not invoking the agent" | "Probably the file isn't in `.claude/agents/` yet, or the name in the file doesn't match. Tell me what you see and I'll fix it." |
| "Agent 1 ran but Agent 2 didn't" | "The handoff line is missing or pointing at the wrong name. Let me check the file — find the line where Agent 1 calls the Task tool." |
| "The output is bad / too generic" | "Good — that means you can see the gap. Which part do you think caused it — brain, tools, or mission? Let's diagnose before we fix." |
| "Can I add a third agent?" | "Yes — but Module 4 is built for that. For now, two agents, one handoff. Nail the pattern first." |

---

## Module 1 deliverable checklist

Before advancing to Module 2:

- [ ] Learner can name the four parts of an agent (brain, hands, loop, mission).
- [ ] Learner read both agent files and made at least one decision (tool or output format).
- [ ] Both agent files exist in `.claude/agents/`.
- [ ] A combined output was produced and the learner saw it.
- [ ] Learner answered the reflection question (Step 9).
- [ ] Learner explicitly said they're ready for Module 2.

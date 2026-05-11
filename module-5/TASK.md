# Module 5 — Performance: Latency, Cost, Quality

**Duration:** ~60 minutes
**Persona:** June teaches all three experiments. April delivers the main course close at the end.
**Goal:** The learner runs three live experiments. Records real numbers. Leaves able to articulate which lever to pull for which situation.

---

## What June teaches

Every AI system trades off three things: how fast it responds (latency), how much it costs to run (cost), and how good the output is (quality). You can't max all three at once.

**Concepts to land:**

1. **The triangle.** Latency, cost, quality. Pick two — usually. Sometimes one.
2. **The three levers.** Model choice, context size, prompt design.
3. **Experiment 1 — model swap.** Same task, different models. Measure how latency changes.
4. **Experiment 2 — context size.** Same model, different amounts of context. Measure how cost changes.
5. **Experiment 3 — prompt change.** Same model, same context, different prompt. Measure how quality changes.
6. **The decision framework.** When does each lever matter? Which lever for a chatbot? Which for a batch report? Which for a real-time agent?

---

## What June must NOT teach

- Automated evaluation pipelines (out of scope today).
- A/B testing infrastructure for AI outputs (out of scope today).
- Production monitoring, alerting, dashboards (out of scope today).
- Cost optimisation across multiple models in production (out of scope today).

If asked: **"All deeper than today. Right now we feel the tradeoffs with our hands. That intuition is what you need first."**

---

## What they build

Three experiments. Each lives in `module-5/experiments/` as a markdown file with:

- The setup
- The exact prompt / config to test
- A small table to record results

Each experiment takes ~15 minutes including discussion. The learner runs them. June narrates.

---

## Step-by-step flow June should follow

### Step 1 — Frame the module

> "Welcome to Module 5. The last one.
>
> Here is what you are about to do: run three live experiments. You will swap models, change context, and tweak prompts — and you will see, in real numbers, what changes when.
>
> Here is why this matters beyond today: anyone can build an AI system that works once in a demo. The people who build AI products that survive contact with real users are the ones who understand these tradeoffs. Latency, cost, quality — and when to optimise for which. That intuition is what you're building right now.
>
> After this module you won't just be someone who built AI systems. You'll think about them the way engineers who actually ship them do.
>
> No more theory. Open `module-5/experiments/experiment-1.md`. Reply 'go' when you're ready."

---

### Step 2 — The triangle (3 sentences)

> "Latency. Cost. Quality. Every AI system trades these against each other.
>
> A bigger model is usually higher quality and higher latency and higher cost. A smaller model is the opposite.
>
> The trick is knowing which to optimise for which use case. That's what these experiments build."

> 🎯 **Why this matters:** "Most AI products fail not because the AI isn't smart enough. They fail because the team optimised for the wrong corner of the triangle. The intuition you're about to build is what stops that."

---

### Step 3 — EXPERIMENT 1: Model swap

Open `module-5/experiments/experiment-1.md`. The experiment is structured: same task, run twice — once with a fast/cheap model, once with a heavy model.

The task can be small (e.g. summarise a 200-word paragraph) so the difference is felt without the wait being painful.

Run it. Record the time and the output for each.

> 🔍 **Notice:** "The fast model came back in [X] seconds. The heavy one took [Y]. The output quality difference — that's what you're judging now. Sometimes it matters. Sometimes it doesn't. Knowing the difference is the skill."

Have the learner fill in the table in the experiment file.

---

### Step 4 — EXPERIMENT 2: Context size

Open `module-5/experiments/experiment-2.md`. The experiment: same model, same task, but feed the model two different amounts of context (a small relevant snippet vs. a much larger document where only part is relevant).

Run both. Look at the response and the implied cost.

> 💡 **Tip:** "Bigger context isn't free. Each extra token costs money and adds latency. The temptation to dump everything into the prompt is real, and almost always wrong."

Record results.

---

### Step 5 — EXPERIMENT 3: Prompt change

Open `module-5/experiments/experiment-3.md`. The experiment: same model, same context, two different prompts — one vague, one tight.

Run both. Compare the quality of the outputs.

> "Same model. Same context. Same task. Different prompt. The output is meaningfully different. That delta is the cheapest performance lever you have. It costs nothing and ships in seconds."

Record results.

---

### Step 6 — The decision framework

After all three experiments, do a quick synthesis. Don't lecture — guide.

> "Quick synthesis. For each of these scenarios, tell me which lever you'd pull first:
>
> 1. A chatbot where users wait for replies
> 2. A nightly report that runs while you sleep
> 3. An agent making decisions inside another product in real time
>
> No wrong answers. I'll tell you what most senior teams do."

Hear their answers. Then give a quick framework:

- **Real-time / user-facing:** latency wins. Smaller models, tight prompts, minimal context.
- **Batch / asynchronous:** quality wins. Bigger models, more context, fewer constraints.
- **Inside a product:** cost wins (because it scales). Model selection and context discipline.

> 💡 **Tip:** "Notice none of these say 'always use the biggest model'. The biggest model is rarely the right answer."

---

### Step 7 — Course-wide recap (June)

This is the wind-down before April closes.

> "Before I hand over — I want you to see the full picture of what you built.
>
> - **Module 0:** You opened a tool most people are scared of, built a memory file that means you never explain yourself to Claude again, and ran your first command.
> - **Module 1:** You built a real multi-agent system — two agents, different jobs, running in parallel, handing work to each other automatically. Without writing a line of code.
> - **Module 2:** You took a workflow you repeat all the time and made it a one-word command. It runs perfectly every time now without you lifting a finger.
> - **Module 3:** You connected Claude to your real calendar. Claude reached outside this folder and took a real action in a tool you use every day. That was the moment AI stopped being a chatbot and became a system.
> - **Module 4:** You built an orchestrator. The pattern that runs inside Cursor, Claude, Perplexity, every serious AI product. You didn't just learn what it is — you built one, from scratch, and watched it make live routing decisions.
> - **Module 5:** You ran real experiments. You have numbers. You can now reason about latency, cost, and quality the way engineers who ship AI products do.
>
> You did not watch this. You did not read about it. You built every one of these systems with your own hands, in a weekend, for free.
>
> That is not a normal place to be. Most people who talk about AI have never done any of this.
>
> Take a second. That was real work."

Let the moment land. Do not rush to April. Give the learner space to react — if they say something, respond warmly. Then hand over.

---

### Step 8 — APRIL TRIGGER POINT (the main close)

**Trigger:** All three experiments are recorded and June has delivered the recap above.

April delivers the main close per `_internal/april-playbook.md` § Module 5. After she finishes — regardless of the response — she hands back: **"Back to June."**

---

### Step 9 — June closes the course warmly

After April speaks (whether the learner engaged or not), June takes the mic for the final warm close.

> "That's the end of the course. You finished what 60% of starters never finish.
>
> Two small asks, only if it feels right:
> 1. **Star the repo.** It's how other PMs find this.
> 2. **Send it to one person** you think would benefit. Just point them at the repo.
>
> Thank you for trusting me with the last few hours of your time. Go build something."

End. Do not push for more. Do not try to extend the conversation.

---

## If the learner gets stuck

| They say | June responds |
|---|---|
| "I don't have access to multiple models" | "Use whatever your Claude Pro plan gives you. If you only have one tier available, swap context size as the variable instead. The point is feeling the lever, not the specific model names." |
| "How do I measure latency?" | "Eyeball it. Count seconds. We're not building production telemetry today. The relative difference is what matters." |
| "Cost numbers aren't visible to me" | "That's fine. We can reason about cost from token count alone. Bigger context = more tokens = more cost. The directional truth is enough." |
| "Can I keep going?" | "Yes — but the performance optimisation rabbit hole is deep. April will tell you what comes next." |

---

## Module 5 deliverable checklist

Before the course ends:

- [ ] All three experiments have been run.
- [ ] Numbers are recorded in each experiment file.
- [ ] The decision framework has been discussed (Step 6).
- [ ] June has delivered the course-wide recap (Step 7).
- [ ] April has delivered the main close (Step 8) — at least Angle 1.
- [ ] June has delivered the warm close (Step 9).

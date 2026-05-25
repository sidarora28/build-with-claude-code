# Experiment 1 — Model swap

**Lever:** model choice
**What we're measuring:** latency and quality
**Time:** ~15 minutes including discussion

---

## Setup

Same task. Two models. Run both. Compare.

## The task

Summarise the paragraph below in **3 bullet points**. Each bullet ≤ 15 words.

> "A new EU regulation, set to take effect in Q3 2026, will require any company training a foundation model with more than $100 million in compute costs to register that model with the European AI Office before deployment. The rule extends to firms outside the EU if their models are made available to European users. Industry groups have argued the threshold is too low; civil society groups have argued it is too high. The European Commission has signalled it is unlikely to adjust the threshold before the rule's effective date."

## Run 1 — Fast / cheap model

Pick the smaller / faster model available to you in Claude Code (e.g. Haiku-tier or equivalent).

| Field | Value |
|---|---|
| Model used | _______ |
| Time to first token (eyeball) | _______ seconds |
| Time to full response | _______ seconds |
| Output quality (1–5, your judgement) | _______ |
| Output: | (paste below) |

```
[paste output]
```

## Run 2 — Heavy / capable model

Pick the most capable model available (e.g. Opus-tier or equivalent).

| Field | Value |
|---|---|
| Model used | _______ |
| Time to first token | _______ seconds |
| Time to full response | _______ seconds |
| Output quality (1–5) | _______ |
| Output: | (paste below) |

```
[paste output]
```

## Reflect

- Was the quality difference worth the latency difference?
- For a real-time chatbot, which would you choose? Why?
- For a nightly batch job, which would you choose? Why?

> 💡 The intuition you're building: bigger model is not always better. The right answer depends on the use case.

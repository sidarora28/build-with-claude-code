# Experiment 3 — Prompt change

**Lever:** prompt design
**What we're measuring:** output quality
**Time:** ~15 minutes

---

## Setup

Same model. Same context. Same task. Two prompts — one vague, one tight.

## The task

You are reviewing the following customer feedback:

> "I've been using your product for three months. The reporting is way better than what we had before. But every time I try to share a dashboard with my team it breaks. I've raised three tickets and never got a real response. We're evaluating moving to a competitor."

## Run 1 — Vague prompt

> "Tell me what's important about this feedback."

| Field | Value |
|---|---|
| Output quality (1–5) | _______ |
| Output: | (paste below) |

```
[paste output]
```

## Run 2 — Tight prompt

> "Read the customer feedback below. Extract: (1) the strongest signal that the product is working, (2) the most urgent issue threatening retention, (3) the specific operational failure (separate from the product issue), and (4) the recommended next action with an owner. Output as a 4-bullet list, one bullet per item, ≤20 words each."

| Field | Value |
|---|---|
| Output quality (1–5) | _______ |
| Output: | (paste below) |

```
[paste output]
```

## Reflect

- Same model. Same context. Same input. The output is dramatically different.
- Which version is actually useful to a PM trying to act on this?
- How long did each prompt take to write? How much did each save downstream?

> 💡 The intuition you're building: prompt design is the cheapest performance lever you have. It costs nothing. It ships in seconds. And it produces bigger quality gains than upgrading the model in most cases.

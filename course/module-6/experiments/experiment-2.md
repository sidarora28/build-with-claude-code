# Experiment 2 — Context size

**Lever:** how much context you feed the model
**What we're measuring:** cost (in tokens) and answer quality
**Time:** ~15 minutes

---

## Setup

Same model. Same question. Two different amounts of context.

## The question

> "What is the most important risk a small SaaS team should track in 2026?"

## Run 1 — Minimal context

Just the question. Nothing else. Send it to the model and capture the response.

| Field | Value |
|---|---|
| Tokens sent (approx) | _______ |
| Time to full response | _______ seconds |
| Output quality (1–5) | _______ |
| Output: | (paste below) |

```
[paste output]
```

## Run 2 — Heavy context

Send the same question, but **prepend** this 800-word block of mostly-irrelevant context (a generic intro paragraph from a SaaS report, a news article, whatever you can paste). The point: most of the context is not directly relevant to the question.

| Field | Value |
|---|---|
| Tokens sent (approx) | _______ |
| Time to full response | _______ seconds |
| Output quality (1–5) | _______ |
| Output: | (paste below) |

```
[paste output]
```

## Reflect

- Did the bigger context produce a meaningfully better answer?
- How many extra tokens did Run 2 cost?
- If this ran 1,000 times a day in production, what's the daily cost difference?

> 💡 The intuition you're building: more context is not free. Each token has a price and a latency cost. "Just dump everything in the prompt" is the most common and most expensive mistake teams make.

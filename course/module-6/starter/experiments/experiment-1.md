# Experiment 1 — Model swap (latency lever)

## Hypothesis
Swapping one specialist to a smaller, faster model drops latency and cost noticeably. Quality on that specialist may degrade — usually slightly.

## What to change
Edit `course/.claude/agents/notes-specialist.md`. Add (or change) the `model:` field in the YAML frontmatter:

```yaml
---
name: notes-specialist
model: claude-haiku-4-5
description: ...
---
```

If a `model:` line already exists, change it. If not, add it under `name:`.

## How to run
1. Save the file.
2. Re-run the orchestrator: ask in chat *"morning brief"*.
3. Wait for the run to complete.
4. Read off the perf counter on the dashboard.

## What to compare
| Metric | Expected direction | Why |
|---|---|---|
| Latency | ↓ noticeably | Haiku is faster per token |
| Tokens in | ≈ same | Same prompt, same context |
| Tokens out | ≈ same or slightly different | Output length is brain-driven |
| Cost | ↓ noticeably | Haiku's per-token price is lower |
| Brief quality | maybe slightly worse on notes section | Less reasoning depth |

## Lever name
**Model is the latency lever.** Reach for it first when latency is the bottleneck (chatbots, voice, real-time copilots).

## Revert before next experiment
Remove the `model:` line from the frontmatter (or set back to original). Single-variable discipline matters.

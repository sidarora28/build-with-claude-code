# Experiment 2 — Prompt tighten (cost + quality lever)

## Hypothesis
Aggressively shortening a specialist's prompt drops tokens-in noticeably (and cost with it). Quality may suffer if you cut too aggressively, but usually a tighter prompt is *almost* as good — sometimes better, because there's less for the model to chew through.

## What to change
Edit `course/.claude/agents/followups-specialist.md`. Replace the `## Process` section with a much terser version. For example:

**Before** (7-bullet process):
```markdown
## Process (you decide the order, but cover all of these)
1. Get today's date via Bash.
2. Read every `.md` file in `course/data/meetings/`.
3. Scan for follow-up patterns:
   - "follow up with <person>" / "follow-up with <person>"
   - "<person> waiting on" / "waiting on us" / "owes <person>"
   - "respond to <person>" / "reply to <person>"
   - "revisit with <person>" / "circle back with <person>"
   - "still owe <person>"
   - "<person> wants <something>" from the user
4. For each, capture: person, the thing owed, the source note, age in days.
5. Rank: oldest first; if same age, more-specific-ask first.
```

**After** (3-bullet process):
```markdown
## Process
1. Read every file in `course/data/meetings/`.
2. Find any line mentioning the user owes someone a reply/follow-up.
3. Return them oldest first.
```

## How to run
1. Save the file.
2. Re-run the orchestrator: ask in chat *"morning brief"*.
3. Wait for the run to complete.
4. Read off the perf counter on the dashboard.
5. **Also read the brief itself** — the "Follow-ups owed" section. Did quality hold?

## What to compare
| Metric | Expected direction | Why |
|---|---|---|
| Latency | ↓ slightly | Smaller prompt = less to process |
| Tokens in | ↓ big % | The prompt is shorter |
| Tokens out | ≈ same or shorter | Output is brain-driven, but may be terser |
| Cost | ↓ big % | Tokens-in drove the savings |
| Brief follow-ups section | maybe equal, maybe more compact | Watch for missed follow-ups |

## Lever name
**Prompt is the cost lever (with quality as the wager).** Reach for it when cost matters more than nuance — nightly batches, high-volume workloads, anything where you're hitting the system at scale.

## Revert before next experiment
Put the original `## Process` block back. Save.

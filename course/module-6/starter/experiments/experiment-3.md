# Experiment 3 — Context trim (scope-vs-cost lever)

## Hypothesis
Narrowing what one specialist reads from drops tokens-in substantially. Cost falls. Latency falls. **Trade-off:** you've narrowed scope. Whatever's outside the new window is now invisible to the system.

## What to change
Edit `course/.claude/agents/notes-specialist.md`. In the Process section, change `last 7 days` to `last 3 days`:

```diff
- 3. Filter to notes dated in the last 7 days (filename pattern: `YYYY-MM-DD-*.md`).
+ 3. Filter to notes dated in the last 3 days (filename pattern: `YYYY-MM-DD-*.md`).
```

## How to run
1. Save the file.
2. Re-run the orchestrator: ask in chat *"morning brief"*.
3. Wait for the run to complete.
4. Read off the perf counter on the dashboard.
5. **Compare the brief's "Top focus" items to the baseline** — anything that was originally from days 4–7 should now be missing.

## What to compare
| Metric | Expected direction | Why |
|---|---|---|
| Latency | ↓ noticeable | Fewer notes to read and process |
| Tokens in | ↓ big % | Less data fed into the prompt |
| Tokens out | ≈ same or shorter | Synthesis output is brain-driven |
| Cost | ↓ big % | Tokens-in drove the savings |
| Brief coverage | narrower | Items from 4–7 days ago are missing |

## Lever name
**Context is the scope-vs-cost lever.** Reach for it when your scope is genuinely narrower than your default (today only, this week only, this customer only). Most aggressive cost cut available — but you have to be okay with the narrower view.

## Revert before next experiment (or for the end of the course)
Change `last 3 days` back to `last 7 days`. Save.

## Note
Context trimming is the lever that looks like a "free lunch" but isn't. The system is *cheaper and faster* AND *blinder*. Pretending you trimmed scope when you really still need the broader view is a common bug. If your scope genuinely is narrower, take the savings. If not, don't.

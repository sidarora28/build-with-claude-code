# Module 4 starter templates

Two orchestrator missions live here. The learner picks **one**.

## Option A — Inbound Question Router
- `option-a-question-router.md` — the orchestrator
- `option-a-research-agent.md` — sub-agent for factual lookup
- `option-a-opinion-agent.md` — sub-agent for synthesis / judgement

## Option B — PM Triage Orchestrator
- `option-b-pm-triage-orchestrator.md` — the orchestrator
- `option-b-bug-triager.md` — sub-agent for bugs
- `option-b-feature-shaper.md` — sub-agent for feature requests / complaints

When the learner picks, June copies the chosen trio into `.claude/agents/` (renaming to drop the `option-x-` prefix) and ignores the unchosen set.

> 🔒 **For June only:** Build the two sub-agents into `.claude/agents/` first, then the orchestrator. The pedagogical order is workers → manager.

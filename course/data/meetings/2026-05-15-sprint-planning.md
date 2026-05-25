# Sprint planning — Thu 15 May

**Sprint 23, two weeks (May 19 → May 30)**
**Attendees:** Marco, Reza, Lin, Priya, Dana

## What we're committing to
- Ship search filters v3 (Reza driving, Dana supporting on visual QA)
- Bulk import fix (Lin — based on Reza's profiling Tuesday)
- Mobile perf investigation (TBD — Marco still picking the owner)
- API rate limiting follow-ups: docs, error responses (Reza, light)

## What we're explicitly NOT doing this sprint
- Permissions overhaul (the Northwind ask). Too big, scoping needed first.
- Pricing page changes. Still blocked on legal.
- Test suite cleanup. Acknowledged as debt, not in scope.

## Notes
Lin pointed out that the bulk import fix might require a schema change. If yes, that bleeds beyond sprint. We agreed: if it's a schema change, ship the smaller validation-pass fix first this sprint and queue the bigger change for sprint 24.

Dana asked whether mobile perf could include a small UX win (skeleton screens, etc.) alongside the technical work. Marco said: phase 1 is data-gathering, phase 2 can include UX work, but let's separate.

## Action items
- Marco: name mobile perf owner by Friday (already on previous list, still open)
- Lin: pair with Reza Tuesday on bulk import handoff
- Priya: rewrite the permissions ask as a scoped Q3 RFC, by end of sprint
- Dana: send mobile perf v0 UX ideas for the team to react to (low priority, async)

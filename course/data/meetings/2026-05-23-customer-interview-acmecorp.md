# Customer interview — AcmeCorp

**Fri 23 May, 45 min**
**Them:** Mike (their PM)
**Us:** Priya

This was a research call — Mike is on our Free tier, just using it himself, thinking about rolling to his team. Wanted to understand his thinking.

## His use case
He runs product at a mid-stage fintech, ~150 people. Currently using a competitor (he wouldn't name them but I can guess). He's been frustrated with their export options and customer support response times. Found us through a podcast.

## What he likes about us
- "The UI feels respectful." Specifically: doesn't bombard him with notifications, doesn't suggest features when he's trying to focus.
- The bulk export works (he tested with a 5k row export — succeeded).
- Pricing is clearer than competitor's.

## What's stopping him from rolling to his team
1. **SSO.** They're on Okta. We don't support SSO yet. This is a hard requirement for their security team. He's not going to lobby for it — he wants us to "just have it."
2. **Audit log.** Same security team. They want to know who did what.
3. **Sandbox / staging environment.** His team is engineering-heavy and wants to test changes in a non-prod environment.

## My take
This isn't a "we love it but" — it's a "we like it but can't bring it in." SSO and audit log are table stakes for enterprise rollout. Sandbox is nice-to-have for his org.

He said he'd revisit in 3 months. Worth following up in August.

## Action items
- Priya: log this in the SSO interest list (now at ~12 prospects waiting on it)
- Priya: socialise enterprise readiness gaps (SSO, audit log) at the strategy offsite next week
- Priya: calendar a follow-up with Mike for early August

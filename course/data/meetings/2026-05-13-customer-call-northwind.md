# Customer call — Northwind Logistics

**Tue 13 May, 30 min**
**Them:** Sarah (Head of Ops), Tom (their IT lead)
**Us:** Priya, Jess

## Context
Northwind is on the Pro plan, ~80 seats. Renewal in August.

## What they said

Sarah opened with "we love the product but we're hitting walls." Three things:

1. **Bulk import keeps timing out.** They're trying to load ~50k rows of inventory data and it dies around the 12-minute mark. They've worked around it by splitting into chunks but it's painful.
2. **Permissions are too coarse.** They want different teams to see different views. Right now everyone sees everything.
3. **The mobile app is "really slow."** Tom said opening it takes 6-8 seconds. Pulled up his phone and showed us — yeah, that's bad.

## Tone
Genuinely positive about the core product. The asks are real but not deal-breakers right now. Sarah said directly: "we're not looking elsewhere, we just need these to keep growing."

## What we said
- Bulk import: this is on the eng roadmap for Q3, would push for an earlier slot.
- Permissions: bigger lift, can't promise this year.
- Mobile: we'll dig into the perf data.

## Action items
- Priya: get an eng estimate on bulk import improvements by next Tuesday.
- Jess: pull mobile perf data for Northwind's accounts specifically.
- Followup email to Sarah summarising what we heard + what we'll do — by EOD today.

# Bug triage — Wed 21 May

20 min, Reza + Jess + Lin.

Going through last week's bug reports.

**P0 (none this week — good.)**

**P1:**
- Calendar sync sometimes shows events at the wrong time after DST shift. Two reports. Reza will look this week.
- Export-to-CSV produces an extra empty column at the end. Cosmetic but several complaints. Lin will fix as a 30-min job.

**P2:**
- The avatar fallback shows the wrong initial when the user has a single-word name. Edge case. Backlog.
- Search results occasionally include archived items. Spec says they shouldn't. Reza needs to repro first.
- "Mark all as read" sometimes doesn't mark everything. Tricky. Will investigate when bulk import is done.

**Closed (won't fix):**
- Two reports about the empty state — both pointing at things Dana is already redesigning. Marked as duplicates of the design work.

Jess flagged that the export-to-CSV one has been hanging around for 2 sprints. We agreed: 30-min jobs that are stale for 2+ sprints get an automatic "do this week" tag.

## Action items
- Reza: DST calendar bug this week
- Lin: CSV export fix (target Wednesday)
- Reza: repro the archived-in-search issue
- Jess: tag the >2-sprint 30-min jobs as "do this week"

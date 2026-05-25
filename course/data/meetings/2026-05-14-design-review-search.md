# Design review — Search filters v3

**Wed 14 May, 45 min**
**Attendees:** Dana (designer), Priya (PM), Marco (eng), Reza (eng)

Dana walked through three iterations.

**v1** had filters as a left rail. Felt heavy on mobile. Killed.

**v2** put them in a slide-over panel. Better on mobile but added an extra tap on desktop. Mixed.

**v3** — the one we landed on — uses a horizontal filter bar that collapses into a single "Filter" button on narrow screens. Saved/recent filters surface as chips.

Reza pushed back on the chips: "another thing on the page, eyes get pulled to it." Dana made the case that recent filters are the #1 thing users ask for in support tickets (Jess can confirm). Compromise: chips show only after the user has saved at least one filter. Empty state by default.

## Decisions
- Going with v3.
- Save/recent only when user has saved filters (not on first use).
- Mobile: single Filter button, opens as bottom sheet.

## Action items
- Dana: finalise v3 specs and post in #design Friday.
- Reza: estimate engineering work, splitting saved-filters into a follow-up if it's >3 days.
- Priya: confirm with Jess that recent filters are the top support ask.

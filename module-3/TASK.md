# Module 3 — Connecting MCP

**Duration:** ~45 minutes
**Persona:** June teaches. April appears at one specific trigger point — see Step 6.
**Goal:** The learner connects Google Calendar via MCP and watches Claude take a real action in their real calendar.

---

## What June teaches

This is the module where Claude stops being a thinker and starts being a doer.

**Concepts to land (one at a time):**

1. **What MCP is in plain English.** A standard way for Claude to plug into outside tools — calendars, email, databases, APIs. One protocol. Many tools.
2. **Why it changes everything.** Up to now Claude has only worked with files and its own reasoning. With MCP it works with the actual tools you use. Reading. Writing. Acting.
3. **One MCP server, end-to-end.** Install. Configure. Authenticate. Test. Use.
4. **Real action in a real tool.** The learner watches Claude read or write something in their actual Google Calendar.

---

## What June must NOT teach

- Multiple MCP servers wired together (out of scope today).
- Building a custom MCP server (out of scope today).
- MCP authentication at scale, OAuth flows for production (out of scope today).
- Any non-Calendar MCP integration in this module.

If asked: **"Multiple MCPs and custom servers are deeper than today. Today, one server. Done well."**

---

## What they build

A working Google Calendar MCP connection. The learner picks one of two demo actions to verify it:

- **Read action:** "What's on my calendar this week?"
- **Write action:** "Block 30 minutes tomorrow for deep work."

The learner picks one. June walks them through it. The point is to see Claude take a real action in a real tool.

---

## Step-by-step flow June should follow

### Step 1 — Frame the module

> "Welcome to Module 3. Here is what you are about to build: a live connection between Claude and your real Google Calendar.
>
> Here is why this is different from every other module: until now, Claude has been working in this folder. Reasoning. Writing files. Talking to you. Today it reaches outside this folder for the first time and acts on a tool you actually use every day.
>
> Here's what changes after this module: Claude can see your schedule, create events, and work with your calendar as part of any task. And the pattern you learn today — install, configure, authenticate, use — works for any tool. Slack. GitHub. Email. Your own internal systems. You do it once with Calendar and you know how to do it with everything.
>
> First task: a quick check. Do you have a personal Google Calendar you're okay with Claude reading? It will not write anything until you say so."

Wait for confirmation. If they say no, offer a workaround: a throwaway Google account or a test calendar. Don't let lack of a calendar block the module.

---

### Step 2 — Explain MCP in 4 sentences max

> "MCP stands for Model Context Protocol. Skip the jargon. Here's what matters:
>
> It's a standard way for Claude to plug into outside tools. One protocol. Many tools — calendars, email, GitHub, your own internal APIs.
>
> Today we plug in one. Once you've done one, the rest are the same shape."

> 🎯 **Why this matters:** "Until MCP, every integration was custom work. MCP is the equivalent of USB for AI tools. That's what makes this a moment, not a feature."

---

### Step 3 — Install and configure the Calendar MCP

Walk the learner through:

1. Adding the Google Calendar MCP server to their Claude Code config.
2. Authenticating with their Google account.
3. Confirming Claude Code sees the new tool.

> ⚠️ **Watch out:** "You'll see Google's standard 'allow access' screen. This is Google asking, not Claude. Approve only the scopes that match what you want — read-only is fine for today if you're nervous."

If the learner is on a setup where MCP install is non-trivial, June handles it. June does not push them to use the terminal directly.

---

### Step 4 — Test the connection

Have Claude run a tiny read against the calendar — "show me my next event" or "list this week's meetings".

> 🔍 **Notice:** "Look at what just came back. Those are real events from your real calendar. Claude just reached outside this folder for the first time."

This is a small pride moment. Mark it.

---

### Step 5 — Take a real action

Offer the two action options. Whichever the learner picks, walk them through it:

- **Read:** Claude summarises their week. June reads it back.
- **Write:** Claude blocks time. The learner watches the event appear in their Calendar app.

If they pick Write, get explicit consent before the write happens. Show the proposed event. Get a "yes". Then write.

> 💡 **Tip:** "Notice how I asked permission before the write. Real systems do this for any action that changes state. You'll be glad later that you set this expectation now."

When the action lands:

> "Pause for a second and look at what just happened. Claude read your calendar — your real calendar — and took an action in it. Not a simulated demo. Not a mock. Your actual tool.
>
> That's the line between AI that assists and AI that acts. You just crossed it."

---

### Step 6 — APRIL TRIGGER POINT

**Trigger condition:**

1. The Calendar MCP is connected.
2. Claude has taken a real action (read or write) and the learner has seen the result.
3. The learner has reacted positively — "whoa", "that's wild", "cool", visible enthusiasm.

**If all three are true:** April appears per `_internal/april-playbook.md` § Module 3 — two short paragraphs, plant the seed, hand back. Then "Back to June."

**If condition 3 is not met:** April does **not** appear. June continues directly to Step 7.

After April speaks (or doesn't), June takes the mic back warmly:

> "Right — back to building. One last thing in this module."

---

### Step 7 — One subtle teaching beat

After April (or directly if April didn't trigger), show the learner that an agent can use the Calendar MCP as a tool mid-task.

> "Watch this. I'm asking an agent to plan tomorrow for me. Notice how it pulls from your calendar inside its reasoning."

Run a small agent that uses the Calendar tool as part of a multi-step task. Don't make this a whole new build — keep it under 5 minutes. The point is to show MCP isn't a one-off; it's a tool agents can pick up.

---

### Step 8 — Close the module

> "Recap:
> - You connected Claude to a real tool — not a demo, your actual calendar.
> - You watched it take a real action.
> - You saw an agent pick that tool up mid-task without being told to.
>
> What you understand now: MCP is the bridge from AI that thinks to AI that does. And you know the pattern — which means you can connect Claude to any tool that has an MCP server. The list is growing every week.
>
> Module 4 is where you build the architecture that sits underneath every serious AI product — the orchestrator. Reply 'next' when ready."

**If April did NOT fire in Step 6**, June adds one short line *before* the "Reply 'next'" close:

> ⭐ "Quick aside before Module 4 — if you haven't already, star the repo. That's the whole tip jar."

If April fired, skip the star nudge here. We don't double-stack asks.

Wait for "next". Point at `module-4/TASK.md`.

---

## If the learner gets stuck

| They say | June responds |
|---|---|
| "MCP install is failing" | "Tell me the exact error. MCP setup can be finicky on first install — most issues are config-path or auth-scope. I'll walk you through." |
| "Google won't authenticate" | "Two common causes: scopes blocked by your workspace admin, or the redirect URL is off. Tell me what error Google shows." |
| "I don't want Claude touching my real calendar" | "Totally fine. Use a throwaway Google account, or stay read-only for today. The point is you watched it work — not which calendar it worked on." |
| "Can we connect Slack / Email / GitHub?" | "Yes — same pattern, different MCP server. We're keeping it to one today." |

---

## Module 3 deliverable checklist

Before advancing to Module 4:

- [ ] Google Calendar MCP is connected and authenticated.
- [ ] Claude has taken at least one real action (read or write).
- [ ] Learner has seen the action's result in their actual calendar.
- [ ] April has spoken (if trigger fired) or stayed silent (if it didn't).
- [ ] Learner explicitly says they're ready for Module 4.

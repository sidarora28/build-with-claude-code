# Getting Started

You're about to build real AI systems — agents, skills, MCP integrations, an orchestrator — in six modules, taught entirely inside Claude Code. This page walks you through everything you need to do before the course starts.

If you get stuck, reply to the welcome email or join the Slack: https://join.slack.com/t/justanotherpmhq/shared_invite/zt-3xp0b5cn9-3EMYOiedl9lgc38LyTmqhQ

---

## What you need

- A **Claude Pro subscription** ($20/mo) — sign up at claude.ai if you don't have one
- **Claude Code** — the free tool the course runs inside (setup below)
- A computer (Mac or Windows)
- A Google account you're happy to connect to Claude for Module 3 (any personal account is fine)

No coding experience. No prior AI experience. If you can describe what you want in plain English, you can do this course.

---

## Pick your setup path

| Path | Pick this if... | Terminal needed? |
|---|---|---|
| **🟦 Path A — Claude Desktop** (recommended) | You want the simplest setup | No |
| **⬛ Path B — Claude Code CLI** | You're comfortable in a terminal | Yes |

Both paths end at the same place: Claude Code open in the course folder, ready for you to type *"let's start"*.

---

# 🟦 Path A — Claude Desktop (recommended)

### Step 1 — Install Claude Desktop

Download and install the Claude Desktop app from: **https://claude.ai/download**

Sign in with your Claude subscription.

### Step 2 — Enable Claude Code in the Desktop app

Once inside Claude Desktop, look for the **Claude Code** option. If you don't see it, update to the latest version of the app.

### Step 3 — Download the course files

1. Go to: **https://github.com/sidarora28/build-with-claude-code**
2. Click the green **`< > Code`** button → **Download ZIP**
3. Double-click the downloaded file to unzip it
4. You'll have a folder called `build-with-claude-code` — move it somewhere you'll remember (Desktop or Documents)

Or use this direct link to skip the click: [Download ZIP](https://github.com/sidarora28/build-with-claude-code/archive/refs/heads/main.zip)

### Step 4 — Open the folder in Claude Desktop

In Claude Desktop, use **File → Open Folder** (or equivalent) and point it at the `build-with-claude-code` folder you just downloaded.

### Step 5 — Start the course

In the chat input, type:

```
let's start
```

**June** — your AI tutor — takes over from here. She walks every step.

---

# ⬛ Path B — Claude Code CLI

### Step 1 — Install Claude Code

Open your terminal:
- **Mac:** Press ⌘ + Space, type "Terminal", press Enter
- **Windows:** Press the Windows key, type "PowerShell", press Enter

Check if Claude Code is already installed:
```
claude --version
```

If you see a version number, skip to Step 2. If you see "command not found":

**Mac:**
```
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows (PowerShell):**
```
irm https://claude.ai/install.ps1 | iex
```

### Step 2 — Sign in

```
claude
```

Follow the browser prompts to sign in with your Claude subscription. You don't need an API key. Type `/exit` once signed in.

### Step 3 — Get the course files

**Option 1 — git clone (if you have git):**
```
git clone https://github.com/sidarora28/build-with-claude-code.git
cd build-with-claude-code
```

**Option 2 — Download ZIP:**
Go to https://github.com/sidarora28/build-with-claude-code, click **Code → Download ZIP**, unzip it, then navigate into the folder:
```
cd ~/Downloads/build-with-claude-code
```

### Step 4 — Start the course

Inside the folder, run:
```
claude
```

Then type:
```
let's start
```

**June** takes over from here.

---

## If something breaks

| Problem | Fix |
|---|---|
| Can't find Claude Code in Desktop app | Update Desktop to the latest version, or use Path B |
| `claude: command not found` | Re-run the install command from Path B Step 1 |
| Stuck during sign-in | Reply to the welcome email with the error |
| `git: command not found` | Use the ZIP download instead |
| June isn't appearing | Type `hi June` or `start the course` explicitly |
| Claude Code doesn't see the course | Make sure you opened the `build-with-claude-code` folder — not a subfolder inside it |
| Something else broke | Paste the error in chat — June is built to debug with you |

---

## FAQ

**Do I need to know how to code?**
No. June handles everything technical. Your job is to make decisions and ask questions.

**Do I need an API key?**
No. The course uses your Claude subscription. No extra accounts, no extra cost beyond Claude Pro.

**Can I do this without ever opening a terminal?**
Yes — Path A above is exactly that.

**How long does it take?**
About 5 hours across 6 modules. Most people do one module at a time across a week, or all six on a Saturday.

**Can I pause and come back?**
Yes. When you return, open Claude Code in the same folder and say *"let's resume"* — June picks up where you left off.

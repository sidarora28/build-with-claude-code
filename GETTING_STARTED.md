# Getting Started (Zero to "hi")

This guide takes you from **nothing installed** to **typing `hi` and meeting June**, your AI tutor for the course. No prior terminal experience needed. Reading time: ~5 minutes. Total setup time: ~30 minutes, most of it waiting for installers.

> **Read this first:** This course only works in **Claude Code (the CLI)** — the version that runs in your terminal. It does **not** work in Claude Desktop or the web app at claude.ai. The course uses project-scoped agent, Skill, and MCP files that only the CLI loads. If you try to do this in Desktop, nothing will work and you'll be confused. Use the CLI.

---

## What you need before starting

- A **Claude Pro subscription** (or Max, or API credits). Free tier won't get you through the course.
- A **Mac or Windows computer.** (Linux works too — see the note at the bottom.)
- About **30 minutes** of mostly-waiting time.

That's it. You do not need to know how to code.

---

## Step 1: Open your terminal

The terminal is a text window where you type commands instead of clicking things. It feels weird the first time. That's normal. You're just going to type (or paste) a few lines.

### On Mac

Press `Cmd + Space` to open Spotlight, type `Terminal`, and hit Enter.

You should see a window with a blinking cursor and text that looks something like `yourname@MacBook ~ %`. That's it. You're in.

### On Windows

Click the Start menu, type `PowerShell`, and click **Windows PowerShell** (the blue icon, not the admin one — regular is fine).

You should see a dark blue window with a blinking cursor and text like `PS C:\Users\yourname>`. That's it. You're in.

> **If this didn't work:** On Mac, make sure you typed "Terminal" exactly (not "terminal app"). On Windows, if PowerShell doesn't show up, try searching for "Windows PowerShell" with the full name.

---

## Step 2: Install git

Git is the tool that downloads the course files from the internet. One sentence: it's how developers share code.

### On Mac

Paste this into your terminal and press Enter:

```bash
git --version
```

If you see a version number (like `git version 2.39.0`), git is already installed — skip ahead to Step 3. If a popup appears asking to install "Command Line Developer Tools," click **Install** and wait ~10 minutes. When it finishes, run `git --version` again to confirm.

If neither works, download the installer from [git-scm.com/downloads](https://git-scm.com/downloads) and run it with default settings.

### On Windows

Go to [git-scm.com/downloads](https://git-scm.com/downloads), click **Windows**, and download the installer ("Git for Windows"). Run it and click **Next** on every screen — the defaults are fine.

Once it finishes, **close PowerShell and open it again** (this matters — it won't see git until you reopen). Then verify:

```bash
git --version
```

You should see something like `git version 2.43.0.windows.1`.

> **If this didn't work:** The most common issue on Windows is forgetting to reopen PowerShell after install. Close every PowerShell window and open a fresh one. On Mac, if the popup never appeared, install the Xcode Command Line Tools manually: `xcode-select --install`.

---

## Step 3: Install Claude Code

Claude Code is the CLI version of Claude that we'll be using for the whole course.

### On Mac

Paste this into Terminal and press Enter:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

### On Windows

Paste this into PowerShell and press Enter:

```powershell
irm https://claude.ai/install.ps1 | iex
```

Either command will download and install Claude Code. It takes a minute or two.

When it finishes, **close your terminal and open it again** (same reason as git — your terminal needs to notice the new command). Then verify:

```bash
claude --version
```

You should see a version number. If you do, you're set.

> **If this didn't work:** Reopen the terminal — this is the #1 fix. If `claude --version` still doesn't work, check the official install docs at [code.claude.com/docs/en/overview](https://code.claude.com/docs/en/overview) for your OS.

---

## Step 4: Sign in to Claude Code

The first time you launch Claude Code, it'll ask you to sign in. Run:

```bash
claude
```

You'll see a welcome screen and a prompt to authenticate. Choose to sign in with your Claude account — your browser will open automatically. Log in with the same account that has your Pro subscription, click **Authorize**, and come back to the terminal.

You should see Claude Code's chat prompt (a box at the bottom waiting for input). Type `/exit` and press Enter to quit for now — we want to launch it from the course folder, not your home folder.

> **If this didn't work:** If the browser didn't open, copy the URL the terminal printed and paste it into your browser manually. If sign-in fails, double-check you're using the email tied to your Pro subscription.

---

## Step 5: Download the course

In your terminal, paste this and press Enter:

```bash
git clone https://github.com/sidarora28/build-with-claude-code.git
```

This downloads the course to a folder called `build-with-claude-code` in your current directory (usually your home folder). It takes a few seconds.

Now move into the course folder:

```bash
cd build-with-claude-code/course
```

The `cd` command means "change directory" — basically "open this folder." Your terminal prompt should now show you're inside the `course` folder.

> **If this didn't work:** If git says "command not found," go back to Step 2. If the clone fails with a network error, check your internet connection and try again.

---

## Step 6: Install the dashboard's dependencies

The course includes a small web dashboard you'll grow into a real tool over the six modules. Before launching anything, install what it needs:

```bash
npm install
```

This takes 30-90 seconds. It downloads everything the dashboard needs to run on your laptop. You'll see a lot of progress text and some warnings — warnings are fine, errors are not.

When it finishes you should see a `node_modules/` folder appear in your `course/` folder (don't worry about it — it's just the dependencies).

> **If this didn't work:** If `npm` is "command not found," you need Node.js. Install it from [nodejs.org](https://nodejs.org/) (pick the LTS version), close and reopen your terminal, then try `npm install` again. If `node --version` shows something below 18, upgrade.

---

## Step 7: Launch Claude Code from the course folder

This part matters: you have to launch Claude Code from **inside** the course folder, because that's where the special `.claude/` files (the ones that make June work) live.

Make sure your terminal prompt shows you're in `build-with-claude-code/course`, then run:

```bash
claude
```

You'll see Claude Code start up with a chat prompt waiting for input.

> **If this didn't work:** If you don't see the prompt, make sure you ran `cd build-with-claude-code/course` first. You can confirm where you are by running `pwd` (Mac) or `pwd` / `Get-Location` (Windows).

---

## Step 8: Say hi

In the Claude Code prompt, type:

```
hi
```

And press Enter.

June will introduce herself and walk you into Module 1. From here, the course takes over — just follow along.

> **If this didn't work:** If Claude responds like a generic assistant instead of as "June," you probably launched `claude` from the wrong folder. Type `/exit`, run `cd build-with-claude-code/course`, then `claude` again.

---

## You're in

That's the whole setup. Everything else happens inside Claude Code. Have fun.

---

### Linux note

On most Linux distros: install git with your package manager (`sudo apt install git` on Ubuntu/Debian), then run the Mac install command for Claude Code (`curl -fsSL https://claude.ai/install.sh | bash`). The rest of the steps are identical.

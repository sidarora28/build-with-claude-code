# Markdown cheatsheet

Every file you write or edit in this course is markdown: `CLAUDE.md`, agent definitions in `./.claude/agents/`, Skills in `./.claude/skills/`, your own notes. Markdown is just plain text with a few special characters. You can ignore most of it — these are the only bits the course actually uses.

If you ever wonder *"how do I make this look like that?"* — this is the file to skim.

---

## Headings

```
# Big heading (one #)
## Medium heading (two ##)
### Smaller heading (three ###)
```

One `#` is the title of the file. Use `##` and `###` for sections inside.

---

## Bold and italic

```
**bold**          → bold
*italic*          → italic
***both***        → both
```

Use bold for emphasis on a phrase. Don't bold whole paragraphs — defeats the point.

---

## Bullets and numbered lists

```
- first thing
- second thing
- third thing

1. step one
2. step two
3. step three
```

Both work. Use bullets when order doesn't matter; numbered when it does.

Indent with two spaces to nest:

```
- top-level
  - nested under the top
  - another nested
- back to top-level
```

---

## Inline code (single backticks)

For short snippets *inside a sentence* — file names, commands, variable names, slash commands.

```
The Skill lives in `./.claude/skills/`.
Run `/help` to see the menu.
```

Renders as: The Skill lives in `./.claude/skills/`. Run `/help` to see the menu.

**Use it for:** anything you'd type literally into a terminal or that names a file/command/path. It makes the thing visually distinct from prose so the reader knows it's not just a regular word.

---

## Fenced code blocks (triple backticks)

For longer code, examples, or anything multi-line. Open and close with three backticks on their own lines:

````
```
This is a code block.
It can have multiple lines.
Whitespace is preserved.
```
````

You can also tell the renderer what language it is, which helps with colour-coding:

````
```bash
mkdir -p ./.claude/skills/my-skill
```

```python
print("hello")
```

```markdown
# This is markdown
```
````

**You almost never need the language hint** for course work. Plain triple backticks are fine.

---

## Links

```
[link text](https://example.com)
```

That's it. The text in brackets is what shows; the URL in parens is where it goes.

---

## Block quotes

A `>` at the start of a line makes a quote. The course uses these for June's spoken lines and for callouts:

```
> "Hi. I'm June. I'm going to teach you this course."

> 💡 **Tip:** This is the kind of callout you'll see in Module TASK files.
```

---

## Frontmatter (the `---` block at the top of a file)

Some files — especially Skills and agent definitions — start with a block fenced by `---`:

```
---
name: competitor-snapshot
description: Generate a fast snapshot of a competitor — product, positioning, and risks to our roadmap.
tools: WebSearch, WebFetch
---

(file content starts here)
```

This is **frontmatter**. Claude Code reads it to know what the file is, when to use it, and what tools it needs. The keys (`name`, `description`, `tools`) are specific to whatever's reading the file. You don't write frontmatter by hand in this course — June handles it for you.

If a Skill or agent isn't being discovered, a missing or malformed frontmatter block is the most likely cause.

---

## What you do NOT need

- Tables (you'll see them in TASK files, but you won't write any).
- Images, footnotes, definition lists, HTML — none of it shows up in the course.

If you're ever unsure, write plain prose. Markdown is forgiving — text without formatting still renders as text.

---

## How the course itself uses these

Open any `module-N/TASK.md` and you'll see all of this in action: `#` for the title, `##` for sections, `>` for what June says, fenced code blocks for what to type, inline backticks for file names. The course is just a bunch of markdown files. Now you can read them — and edit them — without guessing.

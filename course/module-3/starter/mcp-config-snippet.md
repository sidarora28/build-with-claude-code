# Google Calendar MCP — config reference

This is a reference snippet June can show the learner. The exact path and shape may vary by Claude Code version — June reads the user's actual config and adapts.

## How to add it

The canonical way is `claude mcp add` — June runs this with the learner rather than hand-editing files. It writes to the right place for the chosen scope (project vs user) without the learner needing to know the path.

```
claude mcp add google-calendar -- npx -y @your-mcp-org/google-calendar-mcp
```

If a learner prefers (or needs) to edit by hand, the entry lives in `.mcp.json` at the project root for project scope, or `~/.claude.json` for user scope — **not** in any `settings.json`. The block shape is:

```json
{
  "mcpServers": {
    "google-calendar": {
      "command": "npx",
      "args": ["-y", "@your-mcp-org/google-calendar-mcp"],
      "env": {
        "GOOGLE_OAUTH_CLIENT_ID": "<from Google Cloud Console>",
        "GOOGLE_OAUTH_CLIENT_SECRET": "<from Google Cloud Console>"
      }
    }
  }
}
```

> ⚠️ The exact package name and env vars depend on which Calendar MCP server the learner installs. June verifies the latest install instructions for the chosen server before configuring.

## What June must walk the learner through

1. Running `claude mcp add` (or, fallback, opening the right config file).
2. Restarting Claude Code so the new server is picked up.
3. Authenticating via the OAuth flow Google opens in the browser.
4. Testing with a small read ("show my next event").

## What to skip

- Service-account auth flows.
- Production token refresh handling.
- Multi-account / multi-tenant setups.

All out of scope today. Today is one user, one calendar, one MCP.

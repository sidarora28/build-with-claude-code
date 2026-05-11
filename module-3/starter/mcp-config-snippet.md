# Google Calendar MCP — config reference

This is a reference snippet June can show the learner. The exact path and shape may vary by Claude Code version — June reads the user's actual config and adapts.

## What gets added

A Google Calendar MCP entry in the Claude Code MCP config (typically `~/.claude/settings.json` or the project-local `.claude/settings.json`).

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

1. Where the config file lives on their machine.
2. Adding (or merging) the `mcpServers.google-calendar` block.
3. Restarting Claude Code so the new server is picked up.
4. Authenticating via the OAuth flow Google opens in the browser.
5. Testing with a small read ("show my next event").

## What to skip

- Service-account auth flows.
- Production token refresh handling.
- Multi-account / multi-tenant setups.

All out of scope today. Today is one user, one calendar, one MCP.

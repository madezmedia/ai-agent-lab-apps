# Blueprint: your agent memory, online in 15 minutes

**AI Agent Lab blueprint · Vercel + Upstash**

In Drop #1 your agent's memory ran through a local server on one computer. This blueprint puts
the same memory **online**: one private URL that Claude Code, Claude Desktop, Cursor and your
other MCP tools can all connect to, from any machine.

- **Your accounts, your data.** It runs on your own Vercel and your own Upstash (free tiers work).
- **Same memory as Drop #1.** It reads and writes the same keys, so anything your agents already saved shows up here.
- **Private by default.** Every request needs your secret token.
- **Memory Viewer included.** A read-only page to see what your agents know.

---

## What you get

| Piece | What it does |
|---|---|
| `/api/mcp` | Remote MCP endpoint with 13 tools: `acmi_get`, `acmi_profile`, `acmi_signal`, `acmi_event`, `acmi_list`, `acmi_bootstrap`, `acmi_rollup_set`, `acmi_work_create`, `acmi_work_event`, `acmi_work_signal`, `acmi_work_get`, `acmi_work_list`, `acmi_whoami` |
| `/` | Memory Viewer: browse agents and work items (profile, signals, timeline) |
| `/api/entity` | The read-only JSON API the viewer uses |

---

## Deploy (about 15 minutes)

**You need:** a free [Vercel](https://vercel.com) account, a free [Upstash](https://console.upstash.com) account, and Node.js 20+.

### 1. Get the files

Download `acmi-vercel-upstash.zip` from **Agent Lab Files**, unzip it, and open a terminal in the folder.

### 2. Make a secret token

```bash
node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"
```

Save the output somewhere safe. It's the password to your agents' memory.

### 3. Deploy to Vercel

```bash
npx vercel deploy --prod
```

Log in when asked and accept the defaults. You'll get a URL like `https://acmi-vercel-upstash-yourname.vercel.app`.

### 4. Add your memory database and token

In the Vercel dashboard, open the project and go to **Settings → Environment Variables**. Add:

| Name | Value |
|---|---|
| `UPSTASH_REDIS_REST_URL` | From Upstash → your database → **REST API** tab |
| `UPSTASH_REDIS_REST_TOKEN` | Same tab |
| `ACMI_MCP_TOKEN` | The token from step 2 |

**Shortcut:** Vercel → **Storage → Upstash for Redis** creates a database and adds its keys for you
(as `KV_REST_API_URL` / `KV_REST_API_TOKEN`, which the blueprint also accepts). Then only add `ACMI_MCP_TOKEN`.

**Using the same database as Drop #1?** Use the same two Upstash values and your agents' existing memory appears here.

Then redeploy so the settings take effect:

```bash
npx vercel deploy --prod
```

### 5. Check it

Open your URL, paste your token into the Memory Viewer, choose `agent` and click **Load**.
If you did Drop #1 with the same database, `my-first-agent` is listed.

---

## Connect your AI tools

Replace `YOUR-URL` and `YOUR-TOKEN` below.

**Claude Code:**
```bash
claude mcp add --transport http acmi https://YOUR-URL/api/mcp \
  --header "Authorization: Bearer YOUR-TOKEN"
```

**Cursor** (`~/.cursor/mcp.json`):
```json
{
  "mcpServers": {
    "acmi": {
      "url": "https://YOUR-URL/api/mcp",
      "headers": { "Authorization": "Bearer YOUR-TOKEN" }
    }
  }
}
```

**Claude Desktop** (via the `mcp-remote` bridge, in `claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "acmi": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://YOUR-URL/api/mcp", "--header", "Authorization: Bearer YOUR-TOKEN"]
    }
  }
}
```

**Test it:** in a new chat, say *"Bootstrap agent:my-first-agent from ACMI."*

> **Claude.ai (web) custom connectors** sign in with OAuth, not a bearer token, so they can't use this
> blueprint as-is. Use Claude Code, Claude Desktop or Cursor.

---

## Settings

| Variable | Required | Default | Notes |
|---|---|---|---|
| `ACMI_MCP_TOKEN` | yes | none | Without it the endpoint refuses every request. |
| `UPSTASH_REDIS_REST_URL` / `_TOKEN` | yes* | none | *Or `KV_REST_API_URL` / `KV_REST_API_TOKEN` from the Vercel integration. |
| `ACMI_TENANT` | no | `madez` | Key namespace: `acmi:<tenant>:…`. Keep the default to share memory with the Drop #1 local server. |
| `ACMI_ADAPTER` | no | none | `memory` = throwaway in-memory store, for testing only (resets constantly on Vercel). |

## Safety

- **Treat the token like a password.** Anyone with it can read and write your agents' memory. If it leaks, change `ACMI_MCP_TOKEN` in Vercel and redeploy.
- **Don't put API keys, passwords or customer data in agent memory.** Agents read it back into chats.
- **The Memory Viewer keeps your token only in the current browser tab** (sessionStorage).

## Develop locally

```bash
npm install
npm test          # end-to-end: runs the endpoint and drives it with a real MCP client
```

## Notes

- Rollups saved here (`acmi_rollup_set`) live in the agent's `rollup` signal. The Drop #1 local server keeps them in a separate key, so a rollup saved with one isn't read by the other. Everything else is shared.
- `acmi_list` / `acmi_work_list` list entities that have a profile.

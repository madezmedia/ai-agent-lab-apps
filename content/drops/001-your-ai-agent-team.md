---
drop: 1
series: The Mad EZ Guide to Grok Bot, Hermes, OpenClaw & the Agent Fleet
title: "Your AI Agent Team: The Map"
status: draft — Mikey to review before publishing
product: AI Agent Lab (prod_abuw9zSNHSlCl)
---

# Drop #1 — Your AI Agent Team: The Map

> **This week:** You'll see the whole agent team we run at Mad EZ Media on one page,
> learn why agents need a memory they can share, and get your first agent writing to it.
> **Time:** about 30 minutes.

---

## Why this series exists

Most "AI agent" content shows you one bot doing one trick. Real work doesn't look like that.
At Mad EZ Media we run a *team* of agents: one plans, some build, some run on servers
around the clock, and one writes content in a brand voice. The hard part isn't any single
agent. The hard part is getting them to **know what the others did yesterday**.

This series is the guide I wish I'd had. It covers the real setup, the real mistakes, and the
files you can copy. One agent per week.

---

## The map: who does what

| Role | Agent | What it does in our fleet |
|---|---|---|
| **Chief of Staff** | Grok Bot | Takes my direction, breaks it into work items, and hands tasks to the right agent. It doesn't build. It routes. |
| **Personal agents** | Hermes instances | Always-on agents with their own personality file, tools, and chat channel. One runs a creator brand's content and another runs real-estate research. |
| **Server agent** | OpenClaw | Lives on a server, not a laptop. It runs long jobs, watches services, and keeps working when my computer is closed. |
| **Builders** | Claude Code, Codex, opencode | Write and ship code. They pick up work items, open pull requests, and report back. |
| **Me** | Mikey | Sets direction, approves anything that spends money or touches customers. |

**The rule that makes it work:** no agent keeps important context only in its own head.
Everything that matters gets written to shared memory.

---

## The glue: ACMI (shared memory for agents)

ACMI is an open-source protocol (MIT) we built for exactly this. Every *thing* in the
fleet has the same three slots:

```
Profile   →  who it is        (role, config, owner)       stable
Signals   →  what's true now  (status, blockers, links)   changes often
Timeline  →  what happened    (every event, in order)     append-only
```

"Things" can be agents (`agent:chief-of-staff`), work items
(`work:agent-lab-launch`), or conversation threads (`thread:agent-coordination`).

**What this looks like in real life:** Grok Bot creates a work item and posts a
handoff to its timeline. Next morning a fresh Claude session starts, reads that work
item, sees the handoff, and picks up the task with full context. Nobody pastes anything
between tools. When Claude finishes, it writes the result back, and Grok Bot sees it on its next check.

### Three habits that make shared memory useful

1. **Read before you act.** Every agent session starts by loading its context
   (`acmi_bootstrap`). Skipping this step is how agents redo yesterday's work or
   contradict yesterday's decision.
2. **Every event gets a correlation ID.** Something like `agentLabLaunch-1790362000000`.
   Follow-up events point back to it, so you can trace any decision to where it started.
3. **Write summaries a human can scan.** Use the format `[kind @who] one-line description`, for example
   `[handoff @claude] fix the checkout link on the Lab page`.

---

## Do this today: get your first agent writing to shared memory

**You need:** a free Upstash Redis database and one MCP-capable AI tool (Claude Desktop,
Claude Code, Cursor, Cline, or Windsurf).

### Step 1: Create your memory database

1. Go to [console.upstash.com](https://console.upstash.com) and create a Redis database (the free tier is fine).
2. Open the **REST API** tab and copy the two values:
   `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
   Treat the token like a password.

### Step 2: Install the ACMI MCP server

```bash
npm install -g @madezmedia/acmi-mcp
```

### Step 3: Connect it to your AI tool

**Claude Code:**

```bash
claude mcp add acmi acmi-mcp \
  -e UPSTASH_REDIS_REST_URL=https://<your-id>.upstash.io \
  -e UPSTASH_REDIS_REST_TOKEN=<your-token>
```

**Claude Desktop / Cursor / Cline / Windsurf:** add this to your MCP config:

```json
{
  "mcpServers": {
    "acmi": {
      "command": "acmi-mcp",
      "env": {
        "UPSTASH_REDIS_REST_URL": "https://<your-id>.upstash.io",
        "UPSTASH_REDIS_REST_TOKEN": "<your-token>"
      }
    }
  }
}
```

Restart the app.

> **No terminal?** On Claude.ai (web), connect the hosted version from the Smithery listing
> `madezmediapartners/acmi-mcp` and paste your two Upstash values there.

### Step 4: Give your first agent an identity and a memory

Paste this prompt into your AI tool:

```text
Using the ACMI tools:
1. Write a profile for agent:my-first-agent with actor_type "agent",
   role "personal assistant", and owner "<your name>".
2. Log a timeline event on agent:my-first-agent with kind "spawn",
   correlationId "myFirstAgentSpawn-<current ms timestamp>",
   and summary "[spawn @me] first agent online".
3. Set a signal current_task = "learning the fleet map".
4. Read the whole entity back to me.
```

### Step 5: Prove memory survives a new session

Close the chat. Open a brand-new one and paste:

```text
Bootstrap agent:my-first-agent from ACMI and tell me what it was doing.
```

If it answers "learning the fleet map", your agent now has memory that lasts between
sessions. Every agent in this series builds on that.

**✅ Done? Post a screenshot of Step 5 in the Agent Lab Forum with one line on what you want your agent to do next.** That's the "Post in the Forum" step on your Starter Checklist.

---

## Mistakes we already made (so you don't have to)

- **Two copies of the same memory.** Two of our tools wrote the same thread under different
  key prefixes, so each agent saw half the story. **Fix:** pick one naming convention on day
  one and make every tool use it.
- **Agents that "remember" in their own chat history.** Agents that don't write to shared memory can't hand
  anything off. If it matters, it goes on the timeline.
- **No human gate on money or customers.** Agents can propose ad spend or edits to live pages.
  Only a human approves them. Log the approval as a `decision` event so there's a record.

---

## Live build — Tuesday, Sep 29, 2pm ET

Bring your Step 5 result. We'll build live inside the Lab and fix anyone who got stuck.

## Next week — Drop #2: Grok Bot as Chief of Staff

How one bot takes a messy voice note from me, turns it into a work item, splits it
across four agents, and tracks it to done. It includes the exact handoff format we use.

---

### Recording notes (for Mikey, remove before publishing)

- **Format:** 8–12 min screen recording. Open on the fleet map table, then do Steps 1–5 live.
- **Hook (first 15s):** "I run a team of AI agents that remember what each other did yesterday.
  Here's the map, and by the end of this video your first agent will remember too."
- **Show, don't tell:** Step 5 is the key moment, when a new session recalls the task. Linger there.
- **Scrub before recording:** no real IPs, ports, tokens, hostnames, or client names on screen.
  Use a fresh demo Upstash DB, not the fleet's.

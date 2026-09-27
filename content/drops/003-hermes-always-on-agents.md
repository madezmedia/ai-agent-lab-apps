---
drop: 3
series: The Mad EZ Guide to Grok Bot, Hermes, OpenClaw & the Agent Fleet
title: "Hermes: Always-On Personal Agents"
status: draft — approved by Mikey 2026-09-26 ("all of the above"); same pre-publish gates (review + fresh-account test of every command)
product: AI Agent Lab (prod_abuw9zSNHSlCl)
sources: Hermes Agent docs (hermes-agent.nousresearch.com/docs), MCP + Telegram gateway guides, checked 2026-09-26
---

# Drop #3 — Hermes: Always-On Personal Agents

> **This week:** Build an agent that lives in your phone's chat app, has its own personality,
> uses real tools, remembers everything in ACMI, and keeps working when your laptop is closed.
> **Time:** about 30–40 minutes.

---

## Where Hermes fits

- **Drop #1:** your team and its shared memory.
- **Drop #2:** the Chief of Staff that routes work.
- **This week:** the agents that **do the work around the clock.**

We run these on **Hermes Agent**, an open-source agent from Nous Research. Each one is a
**personal agent**: one job, one personality, its own tools, and a chat channel you already use.
You message it like a teammate, and it answers in that channel.

Two we run today (roles only):

| Agent | Job | Tools it uses |
|---|---|---|
| **Content agent** for a creator brand | Drafts posts and captions in the brand's voice, keeps a content journal | Brand files, image tools, shared memory |
| **Research agent** for real estate | Pulls property data, scores deals, logs results to a database | Property-data APIs, a database, shared memory |

---

## The anatomy of an always-on agent

```
  ┌─────────────────────────────────────────────┐
  │  PERSONALITY  SOUL.md: who it is, its rules │
  │  TOOLS        MCP servers it's allowed to use│
  │  CHANNEL      Telegram / Slack / Discord…    │
  │  MEMORY       ACMI: shared with every agent  │
  │  HOME         a machine that stays on        │
  └─────────────────────────────────────────────┘
```

Get all five right and you have a teammate. Miss one and you have a demo:

- **No personality:** generic answers.
- **No tools:** it talks but can't act.
- **No channel:** you have to go looking for it.
- **No memory:** it forgets yesterday, and the rest of your team can't see its work.
- **No home:** it dies when your laptop sleeps.

---

## Do this today: your first Hermes agent

We'll build a **research assistant** you can message from Telegram. It keeps its work in ACMI,
so your Chief of Staff from Drop #2 can see it.

**You need:** a Mac, Linux or Windows (WSL2) machine, a Telegram account, and your ACMI setup from
Drop #1. If you deployed the **Vercel + Upstash blueprint**, use your hosted URL in Step 3.

### Step 1: Install Hermes

```bash
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
hermes setup --portal
```

Setup walks you through choosing a model and signing in. Everything Hermes keeps
(settings, memory, skills and logs) lives in `~/.hermes/`.

### Step 2: Give it a personality

Open `~/.hermes/SOUL.md` and replace it with:

```markdown
# Research Assistant

You are my research assistant. You find, check and summarize information.

## How you work
- Start every task by reading your ACMI context: acmi_bootstrap for agent "research-assistant".
- Log every finished task as an ACMI event on agent "research-assistant"
  (kind "work-update", summary "[work-update @me] what you found").
- If a task came from a work item, also log it on that work item.
- Cite sources with links. Say "I don't know" rather than guessing.
- Never spend money, send messages to other people, or post publicly. Ask me first.

## Voice
Short, direct, plain English. Bullets over paragraphs.
```

### Step 3: Connect its memory (ACMI)

Add ACMI to `~/.hermes/config.yaml` under `mcp_servers`. Pick **one** of these.

**Option A: hosted blueprint** (recommended; works from any machine):

```yaml
mcp_servers:
  acmi:
    url: "https://YOUR-BLUEPRINT-URL/api/mcp"
    headers:
      Authorization: "Bearer YOUR-ACMI_MCP_TOKEN"
```

**Option B: local server from Drop #1:**

```yaml
mcp_servers:
  acmi:
    command: "acmi-mcp"
    env:
      UPSTASH_REDIS_REST_URL: "https://<your-id>.upstash.io"
      UPSTASH_REDIS_REST_TOKEN: "<your-token>"
```

Restart Hermes (or type `/reload-mcp` in a Hermes chat), then ask it:

```text
Write a profile for agent:research-assistant with actor_type "agent"
and role "research assistant", then read it back.
```

### Step 4: Give it a chat channel (Telegram)

1. In Telegram, message **@BotFather**, send `/newbot`, and copy the **bot token**.
2. Get your **numeric Telegram user ID** (for example, from a user-ID bot). It's a number, not your @username.
3. Add both to `~/.hermes/.env`:

```bash
TELEGRAM_BOT_TOKEN=<token from BotFather>
TELEGRAM_ALLOWED_USERS=<your numeric user id>
```

4. Start the gateway in the foreground to test it:

```bash
hermes gateway
```

Message your bot: *"Bootstrap yourself from ACMI and tell me who you are."*

### Step 5: Keep it on

When it answers in Telegram, install it as a background service:

```bash
hermes gateway install
hermes gateway status
```

It now runs whenever your machine is on. To keep it on 24/7 with your laptop closed, it needs a
machine that never sleeps. That's next week's drop.

### Step 6: Prove the team can see its work

In Telegram: *"Research the three most common ways small businesses use AI agents. Log what you find."*

Then, in your **Chief of Staff** chat from Drop #2:

```text
What did agent:research-assistant do today? Read its timeline.
```

If the Chief of Staff can answer, you have two agents sharing one memory, and one of them lives in your pocket.

**✅ Post a screenshot of your Telegram chat in the Agent Lab Forum** with the job you'd give your own always-on agent.

---

## Keep it safe

- **Allowlist only you.** `TELEGRAM_ALLOWED_USERS` stops strangers from using your bot, and your model credits with it.
- **Secrets go in `.env`, never in `SOUL.md`.** The personality file is read into every chat.
- **Ask before acting.** Keep the "ask me first" rule for money, messages and public posts.
- **If the agent faces the public, say it's AI.** A brand persona or an agent that DMs customers should say so plainly in its bio and first message. It's honest, platforms increasingly require it, and it protects your payment accounts from "I was misled" disputes.

---

## Mistakes we already made (so you don't have to)

- **The agent had the job but not the tool.** Our research agent ran a full job and saved *nothing* to the database, because the database's MCP server was missing from its config. **Fix:** after adding a tool, ask the agent to *use* it once and check the result.
- **A channel setting in the wrong file.** One agent kept nagging about a missing home channel because the setting was in the YAML config, but that value was only read from `.env`. **Fix:** channel and secret settings go in `.env`; check the logs after every change.
- **Too many agents on one small machine.** We stacked agents and services on one server until it ran out of memory and everything slowed to a crawl. **Fix:** one or two always-on agents per small machine, and watch memory use.

---

## Next week — Drop #4: OpenClaw, agents on your own server

Move your always-on agents off your laptop and onto a server that never sleeps. Plus: what breaks
at 3am, and how the fleet tells you about it.

---

### Recording notes (for Mikey, remove before publishing)

- **Format:** 12–15 min. Open on the five-part anatomy, then do Steps 1–6 live on a fresh machine or VM. Phone on screen for the Telegram moment.
- **Hook (first 15s):** "This agent lives in my Telegram, has its own personality, and remembers everything. By the end of this video you'll have one too."
- **Money moment:** Step 6, when the Chief of Staff reads what the Telegram agent did. Two agents, one memory.
- **Scrub before recording:** no bot tokens, Telegram user IDs, blueprint URLs/tokens, server names, IPs, or client/brand names on screen. Blur `.env`.
- **Fresh-account test before publishing:** re-run every command above on a clean machine. Hermes moves fast, so confirm `hermes setup --portal`, the `mcp_servers` YAML shape, and the gateway commands still match the docs.

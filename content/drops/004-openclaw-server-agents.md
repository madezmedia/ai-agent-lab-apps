---
drop: 4
series: The Mad EZ Guide to Grok Bot, Hermes, OpenClaw & the Agent Fleet
title: "OpenClaw: Agents on Your Own Server"
status: draft — approved by Mikey 2026-09-26 ("All Go"); same pre-publish gates (review + fresh-server test of every command)
product: AI Agent Lab (prod_abuw9zSNHSlCl)
sources: OpenClaw docs (docs.openclaw.ai: install, vps, cli/mcp, gateway/config-extensions, channels/pairing), checked 2026-09-26
---

# Drop #4 — OpenClaw: Agents on Your Own Server

> **This week:** Move an agent off your laptop and onto a server that never sleeps, lock that server
> down, plug it into your team's shared memory, and set up the one habit that tells you when
> something breaks at 3am.
> **Time:** about 45 minutes (most of it is the server setup, which you do once).

---

## Why a server

Last week's Hermes agent runs whenever your computer is on. That's fine until you close the lid.
An agent that should **message you first** (a morning summary, "the site is down", "3 new leads")
needs a machine that's always on.

We use **OpenClaw**, an open-source personal agent built to run as a background service. It
connects to chat apps like Telegram, Discord and WhatsApp, can run commands and manage files on its
server, and uses MCP tools, including your ACMI memory.

In our fleet, the server agent handles the jobs that need to keep running: long tasks, watching
services, and working while everyone's asleep.

---

## The shape of it

```
   You (phone)                       Your laptop (optional)
       │  Telegram                        │  SSH tunnel for the dashboard
       ▼                                  ▼
  ┌──────────────── small Linux server (VPS) ────────────────┐
  │  OpenClaw gateway (background service, starts at boot)   │
  │     ├── channel: Telegram (pairing-approved users only)  │
  │     ├── tools: MCP servers                               │
  │     └── memory: ACMI ──────────────► your hosted ACMI    │
  │  firewall: SSH only · gateway NOT open to the internet   │
  └──────────────────────────────────────────────────────────┘
```

---

## Do this today

**You need:** a small Linux VPS from any provider (Ubuntu is easiest), SSH access, a Telegram
account, and ideally your **hosted ACMI** from the Vercel + Upstash blueprint, so the server and
your laptop share one memory.

### Step 1: Lock the server down first

Log in and do these before installing anything:

1. **Make a normal user.** Never run the agent as root.
   ```bash
   adduser agent && usermod -aG sudo agent
   ```
2. **SSH keys only.** Copy your key to the new user, confirm you can log in with it, then turn off
   password logins in your SSH settings.
3. **Firewall: allow SSH, block everything else.**
   ```bash
   sudo ufw allow OpenSSH
   sudo ufw enable
   ```

Don't open the OpenClaw gateway or dashboard port to the internet. You'll reach the dashboard
through an SSH tunnel in Step 5.

### Step 2: Install OpenClaw (as your normal user)

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
openclaw onboard --install-daemon
```

The installer sets up the Node.js version it needs. Onboarding walks you through choosing a model and
connecting channels, and `--install-daemon` installs the gateway as a background service.

### Step 3: Keep it running after you log out

```bash
sudo loginctl enable-linger $USER
```

Without this, the service can stop when your SSH session ends. Check everything:

```bash
openclaw --version
openclaw doctor
openclaw gateway status
```

### Step 4: Connect Telegram

During onboarding, choose **Telegram** and paste a bot token from **@BotFather** (`/newbot`).
If you skipped it, the config keys are `channels.telegram.enabled` and `channels.telegram.botToken`
in your OpenClaw config. Run `openclaw doctor` after editing.

By default, new people who DM the bot must be **paired**. Message your bot, then approve yourself:

```bash
openclaw pairing list telegram
openclaw pairing approve telegram <CODE>
```

### Step 5: Plug in your team's memory (ACMI)

Point OpenClaw at your hosted ACMI from the blueprint. Keep the token out of the config file by
giving it to the service as an environment variable:

```bash
systemctl --user edit openclaw-gateway.service
```

Add:

```ini
[Service]
Environment=ACMI_MCP_TOKEN=your-token-here
```

Then register the server and restart:

```bash
openclaw mcp set acmi '{"url":"https://YOUR-BLUEPRINT-URL/api/mcp","transport":"streamable-http","headers":{"Authorization":"Bearer ${ACMI_MCP_TOKEN}"}}'
systemctl --user restart openclaw-gateway.service
openclaw mcp doctor acmi --probe
```

The probe should list the ACMI tools. In Telegram, tell your agent:

```text
Write a profile for agent:server-agent with actor_type "agent" and
role "always-on server agent", then log a spawn event.
```

**Dashboard, safely:** from your laptop, open an SSH tunnel to the gateway's port (shown by
`openclaw gateway status`) and browse to it on `localhost`:

```bash
ssh -L <port>:localhost:<port> agent@YOUR-SERVER
```

### Step 6: The 3am habit: heartbeats

Things break when nobody's watching. The cheapest alarm is a **heartbeat**: the agent writes
"I'm alive" to memory on a schedule, and something else notices when it stops.

Ask your server agent (in Telegram):

```text
Every 30 minutes, set the ACMI signal last_heartbeat on agent:server-agent
to the current time and a one-line status. If a check fails, send me a
Telegram message right away instead of waiting.
```

Then, in your **Chief of Staff** chat (Drop #2):

```text
Each morning, read agent:server-agent. If last_heartbeat is older than
an hour, tell me first thing.
```

Two agents watching each other through shared memory: that's your first on-call rotation.

**✅ Post in the Agent Lab Forum:** a screenshot of `openclaw gateway status` (blur the server
address) and the first job you gave your server agent.

---

## Mistakes we already made (so you don't have to)

- **Monitoring the front door only.** Our uptime checks watched the public URLs, which stayed green
  while the services behind them were down. **Fix:** check the thing that actually does the work
  (the agent's heartbeat, the database), not just the homepage.
- **Too much on one small server.** We kept adding services until it ran out of memory and everything
  crawled. **Fix:** watch memory from day one, and split heavy services onto their own machine before it hurts.
- **Ports open to the world.** An audit found databases and internal tools listening on public ports.
  **Fix:** firewall everything except SSH, and reach dashboards through a tunnel.
- **No backups.** For a while we had none at all. **Fix:** back up your agent's config and workspace
  folder on a schedule, and test restoring once.

---

## Next week — Drop #5: Coding agents that don't step on each other

Claude Code, Codex and opencode on the same codebase: how we split work between them with work
items, avoid two agents fixing the same bug, and review what they ship.

---

### Recording notes (for Mikey, remove before publishing)

- **Format:** 15 min. Spin up a fresh VPS on camera (or pre-create it and show the first login), then Steps 1–6. Phone on screen for the Telegram pairing.
- **Hook (first 15s):** "My laptop's closed and this agent is still working. Here's how to put yours on a server that never sleeps."
- **Money moment:** Step 6, when the Chief of Staff reports the server agent's heartbeat.
- **Scrub before recording:** server IP/hostname, SSH keys, bot token, pairing codes, the ACMI token and blueprint URL. Blur `openclaw gateway status` output where it shows addresses.
- **Fresh-server test before publishing:** OpenClaw moves fast. Re-run every command on a new VPS and confirm `onboard --install-daemon`, the `mcp set` JSON shape (url/transport/headers), `${ACMI_MCP_TOKEN}` expansion from the service environment, `pairing approve`, the Telegram config keys, and that a "every 30 minutes" request actually schedules (OpenClaw heartbeat/cron) still match the docs.

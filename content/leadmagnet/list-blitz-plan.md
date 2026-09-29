---
asset: List Builder Blitz: pop → email → free Whop → AI Agent Lab
status: BUILT, NOT LIVE. Traffic starts only after (1) the lead webhook passes a test and (2) Mikey GOs the spend
owner: Chief of Staff (execution) · Claude (assets, copy, analysis)
acmi: work:agent-lab-traffic-execution-20260926 · cid listBlitz-20260929
---

# List Builder Blitz

## Why this and not the last pop test
Day-1 pop (Sep 27) sent visitors straight at a paid decision: 5,710 page views → 158 checkout clicks →
**0 payment attempts**. This version asks pop visitors for one thing: an email, in exchange for a free
2-page cheat sheet. It's judged on **real emails and email engagement**, not sales.

## The funnel (all built)

```
pop click → acmi-5min.vercel.app/map/        one headline, 3 checks, 1 email field (~6 KB)
          → POST /api/subscribe              validates + drops bots (honeypot, <2s submit, disposable domains)
          → LEAD_WEBHOOK_URL (n8n)           stores lead + sends email E0 (the PDF)
          → /map/thanks/?ok=1                PDF download + "join the free Toolkit on Whop" + $1 Lab trial
          → E1–E3 over 6 days                nurture to the $1 trial (guarantee included)
```

- Lead magnet: `acmi-5min.vercel.app/downloads/agent-memory-map.pdf` (source `content/leadmagnet/memory-map.html`).
- Whop claim: the existing **free AI Automation Toolkit** (via `/free_join`). The $47 Starter Kit stays paid.
- Tracking: Whop Pixel `page` on both pages; `lead` on the thanks page only after a real submit (`?ok=1`).

## What the Chief of Staff wires (before any traffic)

1. **n8n workflow** "list-blitz-leads":
   - Webhook node (POST, JSON). Check header `x-lead-secret` = a secret you choose.
   - Dedupe on email → store (Postgres table `leads` or a Google Sheet): email, utm_*, country, ts, status.
   - Send **E0** immediately (below) from the Mad EZ sending domain. Schedule E1/E2/E3.
   - Every email: unsubscribe link + business mailing address (Mikey fills `[MAILING ADDRESS]`).
   - Log each lead to ACMI: `kind: "lead"`, cid `listBlitz-<YYYYMMDD>`, no email address in the summary.
2. Give Claude the webhook URL + secret. Claude sets `LEAD_WEBHOOK_URL` and `LEAD_WEBHOOK_SECRET` on the acmi-5min Vercel project, redeploys, and runs a live test (valid, bot and bad-email submits).
3. **Test PASS** (a lead lands in storage, E0 arrives with a working PDF link) → log `kind: "done"`.

## Campaign spec (needs Mikey's spend GO)

| Setting | Value |
|---|---|
| Network | Traffics.io (existing account; campaign 50938 cloned, not reused) |
| Destination | `https://acmi-5min.vercel.app/map/?utm_source=traffics&utm_campaign=list-blitz&utm_content=v1` |
| Budget | **$20 total cap** ($10/day × 2). Scale only on the GO rule below |
| Device / OS | Desktop only; Windows, macOS, Linux |
| Browser | Chrome, Edge, Brave, Firefox |
| Geo | US, CA, UK, AU |
| Frequency | 1 per 24h per user |
| Anti-fraud | network bot filter ON; block proxy/datacenter if offered |
| Status | created PAUSED; Mikey starts it |

UK traffic: the consent line on the form + unsubscribe in every email cover basic opt-in. Add a short privacy
page before scaling beyond the test.

## Read the results (after the $20)

| Metric | STOP | KEEP TESTING | SCALE to $50 |
|---|---|---|---|
| Real opt-ins ÷ landing views | < 0.5% | 0.5–1.5% | ≥ 1.5% |
| Share of submits filtered as bots | > 40% | 15–40% | < 15% |
| E0 open rate | < 15% | 15–30% | ≥ 30% |
| Whop free joins from /free_join | 0 | 1–4 | ≥ 5 |

Upgrades to the $39 tier are a **14-day** read, not a 48-hour one. Don't judge the test on sales.
The playbook's "300–700 emails from $50" is an outside benchmark, not ours. Our numbers decide.

---

## Nurture emails (plain, from Mikey)

### E0: immediately. Subject: Your Agent Memory Map
> Here's the map you asked for: **[Download the Agent Memory Map (PDF)]**(https://acmi-5min.vercel.app/downloads/agent-memory-map.pdf)
>
> Page 1 is the model: three memory slots (Profile, Signals, Timeline) that let Claude, Cursor and your
> other AI tools pick up where they left off. Page 2 is a free 5-minute setup.
>
> The test that matters is step 5: close the chat, open a new one, and ask your agent what it was doing.
>
> Want the next free guide? Join the free AI Automation Toolkit on Whop:
> https://acmi-5min.vercel.app/free_join
>
> — Mikey, Mad EZ Media

### E1: +1 day. Subject: Did your agent remember?
> Quick check: did step 5 work? If your agent answered "learning ACMI," you're set.
>
> Where people get stuck: a space at the end of the token, not restarting the AI app after the
> settings change, or running the command in a different folder.
>
> Reply with a screenshot if it didn't work. I read every reply.
>
> — Mikey

### E2: +3 days. Subject: The map, built for you
> The cheat sheet shows one agent with a memory. The real payoff is a **team**: a chief of staff that
> hands out work, agents that run all night, and coding agents, all sharing one memory.
>
> That's what **AI Agent Lab** is: one build a week, starting with Drop #1, "Your AI Agent Team: The Map."
> Plus a live build every Tuesday at 2pm ET.
>
> **$1 for 3 days**, then $39/month. Cancel anytime. 7-day money-back guarantee on your first $39.
> **[Try AI Agent Lab for $1 →]**(https://whop.com/ai-automation-tools/ai-agent-lab-c1/?utm_source=email&utm_campaign=list-blitz&utm_content=e2)
>
> — Mikey

### E3: +6 days. Subject: One question
> What do you want your AI agents to actually do for you? Reply with one line.
>
> If the answer is "work as a team without me re-explaining everything," the $1 trial of AI Agent Lab is
> the fastest way to see it: https://whop.com/ai-automation-tools/ai-agent-lab-c1/?utm_source=email&utm_campaign=list-blitz&utm_content=e3
> (7-day money-back guarantee on your first $39.)
>
> After this, you'll only hear from me when there's a new free guide.
>
> — Mikey

Every email footer: unsubscribe link · Mad EZ Media Partners LLC · [MAILING ADDRESS]

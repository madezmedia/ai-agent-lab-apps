---
asset: AI Agent Lab growth + fleet execution plan v1
status: DRAFT for Mikey. Every outbound send and public post is HITL (Mikey GO per batch)
as_of: 2026-09-29 (Tue)
acmi: work:agent-lab-traffic-execution-20260926 (sprint) · work:agent-lab-offer-consolidate-20260925 (offer SoT)
---

# AI Agent Lab: growth plan v1

## 0. Ground truth (corrects the brief)

| Brief said | Actual (ACMI / live pages, Sep 29) | Plan uses |
|---|---|---|
| $39/mo | $1 for 3 days, then $39/mo, cancel anytime (plan_a3r1JmyB7VZIO; full plan_7a7WB6eEedwR7) | the trial line |
| 14-day refund | Not on record anywhere. Claude recommended a 7-day money-back on the first $39 + a Drop #1 outcome promise; **Mikey hasn't decided** | `[GUARANTEE]` placeholder until decided |
| Friday skill drops | Not on record. Confirmed cadence = a Monday drop weekly + Tue 2pm ET live build | Mon drop + Tue live |
| Drop #1 launches Mon | **LIVE since Mon Sep 28** | "Drop #1 is live" |
| Ads NO-GO | Ran Sep 27 ($13.72, 10 clicks, 0 buys), now **paused**. Stay paused | no paid |
| Pop/push test | Ran: 5,710 page views → 158 checkout clicks → **0 payment attempts** | **Pop is dead.** Don't retest |
| ~35 free members | ~35 Agent Lab free + 19 Toolkit; 20 emails exported; 1 paid; 0 trials | as stated |
| Plan separation | Done: one visible full plan + the trial plan | keep |

Revenue today: $39 MRR (1 member). The whole plan targets **first 10 paying members** by Oct 13.

---

## A. Acquisition architecture

### A1. Free members → Lab (the highest-intent audience we own)

Segments (Polar/grok-local lists): **Tier 1** = top 15 Agent Lab free by last access · **Tier 2** = remaining ~20 Agent Lab free · **Tier 3** = 19 Toolkit members.

| Day | Tier 1 (1:1 DM from Mikey's Whop account) | Tier 2 + 3 (email) |
|---|---|---|
| D0 | DM-1: personal, names what they joined for, "Drop #1 is live, here's the 30-min version", asks ONE question ("what do you want your agents to do?"). No link unless they reply, **or** link only in a P.S. | Blast 1 "Drop #1 is live" |
| D1 | Reply to every answer within 12h with a specific recommendation + the trial link | — |
| D2 | — | Blast 2-style: invite to Tue live build (members-only = the trial is the ticket) |
| D4 | DM-2 (non-responders only): the `[GUARANTEE]` + "last nudge, won't ping again" | Blast 3 "The 5-minute fix" |
| D7 | Stop. Move non-converters to the weekly drop email only | same |

Tracking: `utm_source=whop-dm-presell` (DM) / `email` (blasts), `utm_campaign=agentlab-drop01`, `utm_content=<batch id>`.
Kill/iterate rule: Tier 1 gives 0 replies and 0 trials by D2 → Claude rewrites DM-1 before Tier 2 gets anything.

### A2. Developer communities (no spam flags)

The honest version of "comment hijacking / threadpoints / Reddit relevance": show up where people already describe the exact pain ACMI solves, give the full answer in the comment, disclose, and link the **free open-source repo**, never checkout.

**Targets (search daily, Claude-Cowork drafts, Mikey posts):**
- Reddit: r/ClaudeAI, r/cursor, r/LocalLLaMA, r/ChatGPTCoding. Search terms: "forgets context", "memory between sessions", "multi-agent", "CLAUDE.md", "MCP memory".
- X: replies under threads on Claude Code, MCP, agent memory, Cursor rules. Search the same terms.
- Quora: **skip** for now. Low developer density; not worth fleet time at this stage.

**Rules (these avoid removal and shadowbans):**
1. Read each sub's rules first; log the self-promo rule per sub in ACMI (`signal: sub_rules`). r/LocalLLaMA wants local/open-source focus: lead with "MIT-licensed, self-hostable, Redis".
2. Answer first, fully, in the comment (the 3-slot model + a 5-line config). The link is optional and goes last: `github.com/madezmedia/acmi`. **Never** a Whop link on Reddit.
3. Disclose every time: "Disclosure: I built this."
4. Max 1 original post per sub per 2 weeks; ~9 useful non-ACMI comments for every 1 that mentions ACMI.
5. One human account (Mikey's). **No fleet-run accounts, no sockpuppets, no vote coordination.** That's what gets domains banned.
6. Never paste identical text across subs.

**Threadpoints (X):** each Monday drop becomes one build-in-public thread (5–7 posts: problem → map diagram → the 3 slots → a result screenshot → "the full build is inside AI Agent Lab"). The Lab link goes only in the last post, plus a pinned profile link. Tue live build = a clip + thread recap on Wed.

### A3. Open source → funnel (GitHub / npm / Smithery)

This is the most scalable inbound we have: people searching for "agent memory MCP" land on our repo.

| Surface | Change | UTM |
|---|---|---|
| GitHub README (madezmedia/acmi) | After the quickstart: "Go further: the full agent-team build (chief of staff, always-on, coding agents) is inside **AI Agent Lab**: $1 for 3 days." + link to the free guide acmi-5min.vercel.app (which captures emails) | `utm_source=github` |
| GitHub | Turn on Discussions; pin "Show your agent team" + "Help" threads; release notes on each drop | — |
| npm README (@madezmedia/acmi-mcp) | Same block, short | `utm_source=npm` |
| Smithery listing | Description ends with the guide link | `utm_source=smithery` |
| **Blocker first** | Remove the internal hostname from the published smithery.yaml (flagged Sep 26) **before** pushing more traffic to it | — |

No npm postinstall messages. They annoy developers and hurt trust.

---

## B. Micro-offer + monetizing non-converters

### B1. What sits in front of the Lab
- **Lead magnet (already built):** the free "ACMI in 5 Minutes" guide on acmi-5min.vercel.app. Its email capture = join the free AI Automation Toolkit on Whop (live).
- **Add one asset to it:** a free **"Agent Team Starter Checklist + 2 agent profile templates"** (Chief of Staff + one worker, taken from Drop #1). It's small enough not to cannibalize the $47 Kit, and specific enough to earn the email.
- **Downsell for non-converters:** the existing **AI Agent Fleet Starter Kit ($47 one-time)**. No new product needed (and no new prices).
- **Pop/push:** don't. Day-1 data says zero buyer intent. If ever retested, it points only at the free guide, never checkout.

### B2. Recommendations inside the member area / thank-you page
Only tools the drops actually use, only with a real affiliate/referral program (verify each before linking), always disclosed ("affiliate link: we may earn a commission"):

| Tool | Why it's in the Lab | Program status |
|---|---|---|
| Upstash (Redis) | ACMI memory backend in Drop #1 | verify; many devs start on the free tier anyway |
| VPS provider for Drop #4 (e.g. DigitalOcean / Hetzner) | always-on server agents | DigitalOcean runs a referral-credit program; verify terms |
| n8n | workflow side of the stack | verify affiliate program |
| Our own ladder | Toolkit (free) → Lab trial → Starter Kit ($47) | internal cross-sell (live) |

Don't list tools we don't use. Don't put affiliate links in Reddit or GitHub.

---

## C. Fleet execution

### C1. ACMI event schema (log on `work:agent-lab-traffic-execution-20260926`)

Correlation ID format: `<lane><Action>-<YYYYMMDD>-<batch>`, e.g. `cosDm-20260930-t1a`. Every event carries `parentCorrelationId: execTrafficSprint-20260926`.

| kind | when | summary must include |
|---|---|---|
| `copy-ready` | draft staged | doc link, channel, claims-lint PASS by Claude |
| `hitl-go` | Mikey approves a batch | batch id, who/where, exact copy version |
| `send` | message(s) sent / post published | channel, count, batch id, UTM |
| `reply` | a prospect replies | batch id, channel, 1-line gist (no PII) |
| `lead` | free join / email captured | source UTM |
| `trial-start` | $1 trial begins | source UTM if Whop shows it |
| `convert` | trial renews to $39 | days from trial start |
| `refund` / `cancel` | either happens | reason if given |
| `rollup` | CoS, Fri | funnel table per channel |

Signals (overwrite, not append): `funnel = {sent, replies, leads, trials, converts, refunds, mrr}` updated by CoS daily.

### C2. HITL gates (no exceptions)
1. **G1 copy:** Claude-Cowork drafts → Claude runs a claims lint (price line exact; no refund/Friday/member-count/income claims; disclosure present) → `copy-ready`.
2. **G2 Mikey GO per batch** → `hitl-go`. Nothing ships without it.
3. **G3 send:** DMs and posts go out from **Mikey's own accounts**, typed or pasted by Mikey (or CoS via Whop for DMs only after G2). No agent posts publicly on Reddit or X.
4. **G4 log:** `send` event within 1h; replies triaged by CoS daily.

### C3. Lane owners
- **Chief of Staff:** batches, HITL queue, daily funnel signal, Fri rollup.
- **Grok-local / Ops:** lists (tiers), Whop checks, Blast sends via Whop, trial/convert/refund watch.
- **Claude-Cowork:** DM/post/reply drafts, daily Reddit/X thread shortlist (5 candidates/day).
- **Claude (this lane):** claims lint, README/npm/Smithery copy, email + asset updates, weekly analysis.

### C4. 7-day checklist (Wed Sep 30 → Tue Oct 6)

| Day | Must happen | Owner | Gate |
|---|---|---|---|
| **Wed 9/30** | Mikey decides `[GUARANTEE]`. Claude updates page/FAQ/emails/images. Message B to the paid member. Tier 1 DM-1 (15). Blast 1 to Tier 2+3 | Mikey · Claude · CoS | G2 |
| **Thu 10/1** | Reply triage within 12h. Cowork: 5 Reddit/X thread candidates → Mikey posts 2 answers. README/npm/Smithery blocks drafted; smithery.yaml hostname fix | CoS · Cowork · Claude | G2 |
| **Fri 10/2** | Blast 3 (5-minute fix) to non-converters. CoS rollup #1. Decide: keep DM-1 or rewrite (kill rule) | CoS · Claude | G2 |
| **Sat 10/3** | GitHub README + Discussions live; npm README publish; Smithery description | Mikey (repo owner) · Claude | G2 |
| **Sun 10/4** | Drop #2 fresh-account test (Grok Bot as CoS). Free "Starter Checklist + 2 profiles" lead magnet added to the guide | Grok-local · Claude | — |
| **Mon 10/5** | Drop #2 live. Weekly drop email. X thread from Drop #2. Tier 1 DM-2 to non-responders | CoS · Mikey | G2 |
| **Tue 10/6** | 2pm ET live build (members + trialists). Clip → Wed thread. Week-1 review: funnel per channel, next week's plan | Mikey · CoS · Claude | — |

**Week-1 target:** 5 trials, 2 paid conversions, 30 new emails. **Week-2 target:** 10 paying members (≈$390 MRR).

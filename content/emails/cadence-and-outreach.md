---
asset: Email + DM delivery cadence, and personal-contacts outreach
status: DRAFT. Nothing sends without Mikey GO per send. Claude can load Gmail drafts on GO; Claude never sends
companion: agent-lab-email-blasts-v1.md (copy) · html/*.html (branded HTML, built by build.mjs) · png/ (previews)
acmi: work:agent-lab-offer-consolidate-20260925
---

# Delivery cadence

## Week 1 calendar (all times ET)

| Day | Email / DM | To | Channel | Gate |
|---|---|---|---|---|
| **Sun Sep 27** (today) | **T0** welcome, or T0-alt while Drop #1 is hidden | new $1 trialists | Whop DM **or** email, not both | — |
| Sun Sep 27 | Personal outreach batch 1 (up to 25) | personal contacts, tier 1 | Mikey's Gmail + DMs, 1:1 | Mikey picks the names |
| **Mon Sep 28** 9:00 | Drop #1 published | — | Whop | smoke test PASS |
| Mon Sep 28 11:00 | **Blast 1** Drop #1 is live | free Agent Lab + Toolkit members | Whop email | Drop #1 live + Mikey GO |
| Mon Sep 28 | **T1** Did it remember? | trialists from Sep 27 | email | — |
| Mon Sep 28 | Personal outreach batch 2 (up to 25) | contacts | Gmail/DM | — |
| **Tue Sep 29** 10:00 | **Blast 2** Live at 2pm ET | all Agent Lab segments | Whop email | Mikey confirms [LIVE LINK] |
| Tue Sep 29 | **T2** Trial ends tomorrow | trialists from Sep 27 | **email (required)** | — |
| **Wed Sep 30** | Ads day-4 stop check: 0 signups → pause | — | — | — |
| **Thu Oct 1** 10:00 | **Blast 3** The 5-minute fix | free members who didn't upgrade | Whop email | Blast 1 sent |
| Thu Oct 1 | Outreach follow-up (only people who replied or clicked) | contacts | Gmail/DM | — |
| **Mon Oct 5** 11:00 | **Weekly drop** email (Drop #2) | trialists + paid; free members get the $1 line | Whop email | Drop #2 live + tested |

**Trial emails run on each person's own clock:** T0 at signup, T1 at +24h, T2 at +48h (the day before the $39 charge).

## Frequency rules

- **Max 1 marketing email per person per day**, and max 3 per week in launch week. From week 2 on it's 1 per week: the weekly drop email.
- **Trial emails beat blasts.** A trialist never gets an upgrade blast, because they're already in.
- **Suppress** anyone who unsubscribed, bounced, or replied "no thanks". Never re-add them.
- **Best send windows:** Tue–Thu, 10–11am ET. Mon 11am is fine for drop day.
- **Stop rule:** if a blast gets spam complaints above ~0.3% or unsubscribes above ~5%, hold the next one and review.

---

# Personal contacts outreach ("email and DM all my contacts")

**How to do it without burning your inbox or your name:**

1. **1:1, not a blast.** Each message goes to one person with their name. Don't BCC a list, and don't
   mail your whole address book from Gmail in one go. Gmail flags bulk sends from personal accounts, and
   a spam flag hurts the domain your client work also runs on.
2. **Batches of about 25 a day**, best contacts first. Follow up once, only if they replied or clicked.
3. **Match the product to the person:**

| Contact type | Offer | Status |
|---|---|---|
| Builders, devs, founders, ops people, anyone using ChatGPT/Claude for work | **AI Agent Lab** ($1 for 3 days, then $39/mo) | Ready once Drop #1 is live (Mon) |
| Creators, influencers, content people | **EZ Influencer Creator 360** ($100/mo) | **HOLD** until the readiness check passes (see `content/storefront/creator-360-readiness.md`) |
| Everyone else (friends, family, past clients) | Ask for a share or intro, not a purchase | Ready now |

4. **Every message ends with an easy out**, like "Not your thing? Just say so and I won't follow up."
   That keeps it personal and honest, and it covers the opt-out.
5. **Never use the EZ Influencer member list (66) for Agent Lab.** Different lane, different consent.

**What Claude can do on GO:** you give me the list (a CSV, or "search my Gmail for X"), and I load one
**Gmail draft per person**, personalized with their name. You read each draft and hit send. Claude does not send.

## Message 1: Builders → AI Agent Lab

**Email subject:** Something I built (thought of you)

> Hey [name],
>
> Quick one. I've been running my business with a team of AI agents, and the thing that made it
> actually work was giving them one shared memory, so they know what the others did yesterday.
>
> I turned the whole setup into **AI Agent Lab**: a new agent build every week, starting with
> "Your AI Agent Team: The Map." You get your first agent that remembers between chats in about 30 minutes.
>
> It's **$1 to try for 3 days** (then $39/month, cancel anytime):
> https://whop.com/ai-automation-tools/ai-agent-lab-c1/?utm_source=personal&utm_medium=email&utm_campaign=agentlab-launch
>
> Would genuinely love your take, even if it's "not for me."
>
> — Mikey
>
> Not your thing? Just say so and I won't follow up.

**DM version (IG / X / LinkedIn / text, ≤ 300 chars):**
> Hey [name]! I've been running my business with a team of AI agents that share one memory. Turned
> it into a weekly build club, AI Agent Lab. $1 to try for 3 days. Want the link? No pressure at all.

*(Send the link only after they say yes. Links in a first DM get filtered as spam on most platforms.)*

## Message 2: Everyone else → share / intro

> Hey [name], hope you're good! Small favor: I just launched **AI Agent Lab**, where I teach people to
> run a team of AI agents with one shared memory. If you know one person who's deep into AI tools
> (a dev, a founder, an ops person), would you forward this to them?
> https://whop.com/ai-automation-tools/ai-agent-lab-c1/?utm_source=personal&utm_medium=referral&utm_campaign=agentlab-launch
> Thanks either way. — Mikey

## Message 3: Creators → Creator 360 (HOLD)

Drafted only after the readiness check passes, so the message promises exactly what a member gets on day 1.

## Tracking

- UTMs: `utm_source=personal` with `utm_medium=email|dm|referral`, so personal sales are credited correctly.
- Keep a simple sheet with name, channel, date sent, replied (y/n), clicked, joined. After each batch, log a `work-update` on the work item with counts only, no names.

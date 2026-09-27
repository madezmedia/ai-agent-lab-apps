---
asset: AI Agent Lab email blasts v1 (launch week + trial onboarding + weekly drop template)
status: DRAFT. Nothing sends until Mikey GO per email; each blast also has its own gate below
product: AI Agent Lab (prod_abuw9zSNHSlCl) · offer "$1 for 3 days, then $39/mo. Cancel anytime." (Mikey "All Go" 2026-09-26)
acmi: work:agent-lab-offer-consolidate-20260925
rules: no new prices/products; no member counts, results or income claims; no Discord; no client/member names; EZ Influencer list never gets these
---

# AI Agent Lab: email blasts v1

## 0. Who gets these (read first)

| Segment | Size (on record) | Gets | Source |
|---|---|---|---|
| **A. Agent Lab free members** | ~35 | Blasts 1–4 | Whop members of prod_abuw9zSNHSlCl |
| **B. AI Automation Toolkit members (free)** | 19 | Blasts 1–4 | Whop members of the Toolkit |
| **C. $1 trialists** | new since 2026-09-27 (ads + pop) | Trial emails T0–T2, then weekly drops | plan_a3r1JmyB7VZIO |
| **D. Paid members** | 1+ | Weekly drop emails only (never an upgrade pitch) | plan_7a7WB6eEedwR7 + converted trials |
| ~~EZ Influencer list (66)~~ | — | **Nothing from this file.** Separate lane, standing rule. | — |

- **Dedupe:** remove anyone who is already a trialist or paid member (C/D) from A/B before each blast.
- **Consent:** only send to people who joined a Mad EZ Media product. No bought or scraped lists.
- **How to send:** use Whop's member messaging/email tool if it covers these segments. That skips the
  CSV export (still blocked on `member:email:read`) and keeps unsubscribes in one place. If it goes
  through another email tool instead, it needs an unsubscribe link and the business mailing address
  (`[MAILING ADDRESS]`, Mikey fills; never guess) in the footer.
- **From:** Mikey (personal name, not "Team"). Reply-to must be an inbox Mikey reads, because blasts
  ask people to reply.

### Links (use exactly these)

| Use | URL |
|---|---|
| Lab page (upgrade CTA), segments A/B | `https://whop.com/ai-automation-tools/ai-agent-lab-c1/?utm_source=email&utm_medium=blast&utm_campaign=agentlab-launch&utm_content=<blast id>` |
| Free ACMI repo | `https://github.com/madezmedia/acmi` |
| Drop link, members/trialists | `[DROP LINK]` (Polar copies the lesson URL after publish) |
| Live build | `[LIVE LINK]` (Mikey: where the Tue live build happens) |

Don't link the pop bridge (acmi-5min.vercel.app) in emails. Its checkout button is tagged
`utm_source=traffics`, so email sales would be credited to the pop test.

---

## Send calendar

| When (ET) | Email | Segments | Gate |
|---|---|---|---|
| On signup (auto) | **T0** Welcome | C | Drop #1 visible in the Lab (until then, use T0-alt) |
| Signup + 24h | **T1** Did it remember? | C | — |
| Signup + 48h | **T2** Renewal notice | C | Always send. It's an honest heads-up that also cuts chargebacks |
| Mon Sep 28, ~11:00 | **Blast 1** Drop #1 is live | A, B | Drop #1 live + fresh-account smoke PASS + Mikey GO |
| Tue Sep 29, ~10:00 | **Blast 2** Live build today | A, B, C, D | Mikey confirms `[LIVE LINK]` + who can join |
| Thu Oct 1, ~10:00 | **Blast 3** The 5-minute fix | A, B (not upgraded) | Blast 1 sent |
| Mon Oct 5 + weekly | **Weekly drop** template | C, D (+ A/B with the upgrade line) | That week's drop live + tested |

**Stop rule (list health):** if Blast 1 gets a spam-complaint rate above ~0.3% or an unsubscribe
rate above ~5%, hold Blasts 2–3 and review with Claude.

---

## Blast 1: Drop #1 is live (Mon Sep 28)

- **Subject:** Your AI agent team, mapped
- **Alt subject (A/B test if the tool supports it):** My AI agents remember yesterday. Yours can too.
- **Preview text:** Drop #1 of The Mad EZ Guide is up. First agent in about 30 minutes.
- **utm_content:** `b1`

> Hey [first name],
>
> Mikey here from Mad EZ Media.
>
> I run my business with a team of AI agents: a chief of staff that hands out the work, personal
> agents, one that runs on a server all night, and coding agents. The part that makes it work
> isn't the agents. It's that they **share one memory**, so each one knows what the others did
> yesterday.
>
> Today I published the map of that whole setup. It's **Drop #1 of The Mad EZ Guide: "Your AI
> Agent Team: The Map."** It's inside AI Agent Lab.
>
> **In about 30 minutes you'll:**
> - see how the team is laid out and who does what
> - give your first agent a memory (free, open-source tools)
> - close the chat, open a new one, and watch it pick up where it left off
>
> **Try the Lab for $1 for 3 days**, then it's $39/month. Cancel anytime.
> You get Drop #1 now, a new build every week, the Starter Kit files, and the member chat and forum.
>
> **[Start AI Agent Lab for $1 →]**(Lab page link)
>
> Tomorrow (Tue) at 2pm ET I'm building live. More on that in the morning.
>
> — Mikey
>
> P.S. Just want the memory piece on its own? It's free and open source:
> github.com/madezmedia/acmi

---

## Blast 2: Live build today (Tue Sep 29)

- **Subject:** Live at 2pm ET: building an agent team
- **Preview text:** Bring a question. I'll build it on screen.
- **utm_content:** `b2`
- **Mikey confirms first:** where it happens (`[LIVE LINK]`) and whether non-members can watch.
  Pick one version below and delete the other.

> [first name], quick one.
>
> Today at **2pm ET** I'm building live: an AI agent team that shares one memory, from a blank
> setup to agents that know what the others did.
>
> Bring the thing you want your agents to do. I'll take questions as I go.
>
> **VERSION 1 (members only):** It's inside AI Agent Lab. Not in yet? Start for $1 for 3 days
> (then $39/month, cancel anytime) and you're in for today's build and Drop #1.
> **[Join for $1 and watch live →]**(Lab page link)
>
> **VERSION 2 (open to all):** **[Watch live at 2pm ET →]**([LIVE LINK])
> The recording and the step-by-step files go inside AI Agent Lab.
>
> See you at 2.
>
> — Mikey

---

## Blast 3: The 5-minute fix (Thu Oct 1)

Value first, for people who didn't click Blast 1. Only send to A/B members who haven't upgraded.

- **Subject:** Your AI forgets everything. Here's the fix.
- **Preview text:** One shared memory for Claude, Cursor and the rest. Free.
- **utm_content:** `b3`

> [first name],
>
> Every time you open a new AI chat, you start over. You re-explain the project, the decisions,
> and what you tried yesterday.
>
> The fix I use is simple. Every agent gets three slots of memory:
>
> - **Profile:** who it is (role, settings)
> - **Signals:** what's true right now (status, blockers)
> - **Timeline:** what happened, in order
>
> Agents read these when a session starts and write to them as they work. That's all it takes
> to go from "new chat, who are you?" to "picking up where we left off."
>
> The tool is free and open source, and it works with Claude Code, Claude Desktop, Cursor, Cline and
> Windsurf: **github.com/madezmedia/acmi**
>
> If you'd rather have me walk you through it, and then add a chief of staff, always-on agents and
> coding agents on top, that's what **AI Agent Lab** is: one build a week.
> **$1 for 3 days**, then $39/month. Cancel anytime.
>
> **[Try AI Agent Lab for $1 →]**(Lab page link)
>
> — Mikey

---

## Trial onboarding (segment C, automatic)

The Chief of Staff already has **Whop DM** versions of these (welcome / day 2 / day 3, cid
`cosTrialFulfillGo-20260926`). Use **one channel per touch**. If the DMs are wired, send these emails
only when a DM can't be delivered, or keep T2 by email only, since it's the renewal notice.

### T0: Welcome (on signup)

- **Subject:** You're in. Start here.
- **Preview text:** Your first agent that remembers, in about 30 minutes.

> Hey [first name], welcome to AI Agent Lab. Mikey here.
>
> **Start with Drop #1, "Your AI Agent Team: The Map":** [DROP LINK]
> Watch the walkthrough, then do the 5 steps in "Do this today." The last step is the fun one:
> you open a brand-new chat and your agent still remembers what it was working on.
>
> **Also in the Lab:** the Starter Kit files, the member chat, and the forum. Post your first
> agent there when it's working.
>
> Stuck on a step? Reply to this email with a screenshot. I read every one.
>
> — Mikey

**T0-alt (only while Drop #1 is still hidden):** replace the Drop #1 paragraph with:
> Drop #1, "Your AI Agent Team: The Map," goes live **Monday, Sep 28**, and I'll email you the
> link the moment it's up. Until then, start with the Starter Kit files and the "ACMI in 5
> minutes" guide in Protocol Docs.

### T1: Did it remember? (signup + 24h)

- **Subject:** Did your agent remember?
- **Preview text:** The 30-second test, and where people get stuck.

> [first name], quick check-in.
>
> The test that matters: open a **new** chat and ask your agent,
> *"Bootstrap agent:my-first-agent from ACMI and tell me what it was doing."*
> If it answers "learning ACMI," it worked. 🎉
>
> **Where people usually get stuck:**
> 1. The database token was pasted with a space or quote at the end.
> 2. The AI app wasn't restarted after the settings change.
> 3. The command was run in a different folder than the project.
>
> Still stuck? Reply with a screenshot and I'll sort it out.
>
> — Mikey

### T2: Renewal notice (signup + 48h, required)

Honest heads-up the day before the trial converts. Don't cut this one. Surprise charges become chargebacks,
and chargebacks put the whole store at risk.

- **Subject:** Your trial ends tomorrow
- **Preview text:** Here's what happens next. Either way is fine.

> [first name], a heads-up so nothing surprises you.
>
> Your $1 trial of AI Agent Lab ends **tomorrow**. If you stay, your membership continues at
> **$39/month**. Nothing to do.
>
> If it's not for you, cancel before then in Whop: **whop.com → your memberships → AI Agent Lab →
> Cancel**. No hard feelings.
>
> If you stay, the next build is **Drop #2, "Grok Bot as Chief of Staff"**: one bot that takes a
> messy idea and splits it across a whole team of agents.
>
> Questions? Just reply.
>
> — Mikey

*(Polar/Mikey: check the exact cancel path in the Whop member UI once, then paste it in.)*

---

## Weekly drop template (from Mon Oct 5)

- **Subject:** Drop #[N]: [drop title]
- **Preview text:** [one-line outcome, e.g. "One bot that turns a messy idea into a plan."]
- **utm_content:** `d[N]`

> [first name], **Drop #[N] is live: "[drop title]."**
>
> **This week you'll:** [outcome in one sentence, copied from the drop's "This week" box]
> **Time:** about [X] minutes.
>
> **[Open Drop #[N] →]**([DROP LINK])
>
> [One line from the drop's "Mistakes we already made" section. It's the most shareable part.]
>
> Post what you build in the forum. I read every post.
>
> — Mikey
>
> *(Free members only, add:)* Not in the Lab yet? **$1 for 3 days**, then $39/month. Cancel anytime.
> **[Start for $1 →]**(Lab page link)

Upcoming (drafted, each gated on review + fresh-account test): #2 Grok Bot as Chief of Staff ·
#3 Hermes: Always-On Personal Agents · #4 OpenClaw: Agents on Your Own Server.

---

## Checks before any send

- [ ] Mikey GO for this specific email (log a `decision` event with the cid).
- [ ] Segment deduped (no trialist or paid member gets an upgrade pitch). EZ Influencer list excluded.
- [ ] Every link opens: Lab page, `[DROP LINK]`, `[LIVE LINK]`, GitHub.
- [ ] Price text is exactly "$1 for 3 days, then $39/month. Cancel anytime."
- [ ] No member counts, results, income claims, Discord, client or member names.
- [ ] Footer: unsubscribe + `[MAILING ADDRESS]` (if not sent through Whop).
- [ ] After each send, log a `work-update` with segment, count sent, and (48h later) opens, clicks and upgrades.

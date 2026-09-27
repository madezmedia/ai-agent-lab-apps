---
drop: 2
series: The Mad EZ Guide to Grok Bot, Hermes, OpenClaw & the Agent Fleet
title: "Grok Bot as Chief of Staff"
status: draft — approved by Mikey 2026-09-26; same pre-publish gates as Drop #1 (review + fresh-account test of the steps)
product: AI Agent Lab (prod_abuw9zSNHSlCl)
---

# Drop #2 — Grok Bot as Chief of Staff

> **This week:** How one agent takes a messy voice note from me, turns it into a work item,
> hands pieces to the right agents, and tracks it to done, without me repeating myself.
> You'll build your own Chief of Staff loop in about 30 minutes.

---

## Why one agent should route, not build

Once you have more than two agents, the problem stops being "can an agent do this?"
It becomes **"who is doing what, and is it done?"** Without a router you end up as the router:
copying context between chats, re-explaining decisions, and finding out that two agents did the same job.

Our fix is a **Chief of Staff**: one agent whose only job is coordination. In our fleet that's a
Grok bot. It never writes code or copy itself. It:

1. turns what I say into a **work item** with a clear owner and a finish line,
2. **delegates** each piece to the agent built for it,
3. holds the **gates** (anything that spends money or touches customers waits for me),
4. **tracks** every piece until it's shipped, and
5. **rolls up** the day so the next session starts with context, not from zero.

The tool doesn't matter much. Grok, Claude or GPT can all play Chief of Staff. What matters is that
it works through **shared memory** (ACMI, from Drop #1), not its own chat history.

---

## The loop: capture, delegate, gate, track, close

```
  You (voice note, messy)
        │
        ▼
  CAPTURE   Chief of Staff creates a work item: title, owner, finish line
        │
        ▼
  DELEGATE  one task-delegation event per piece, addressed to one agent
        │
        ▼
  GATE      anything that spends money or touches customers waits for your GO
        │
        ▼
  TRACK     agents post progress + evidence; Chief of Staff updates signals
        │
        ▼
  CLOSE     finish line met → work-completed + a rollup for tomorrow
```

Every step is an ACMI write. Nothing lives only in a chat window.

---

## A real week, anonymized

This is how the Agent Lab launch actually ran (names and IDs removed).

**Monday, the voice note.** I dictated something like *"consolidate everything onto the Lab, it's
already got traction, hold the ads until the checkout link is locked."* The Chief of Staff:

- created a work item with a **finish line**: *one checkout link, all old links redirected, ads still held*,
- split it into lanes: one agent to inventory links, one to confirm the checkout URL, one to
  write the offer brief,
- posted one **task-delegation** per lane, each addressed to exactly one agent.

**Tuesday, a correction.** The brief agent noticed a mismatch: the store showed **1 member**, but
the voice note implied dozens of customers. It didn't guess. It logged a **discrepancy** and asked. My answer:
the dozens were *free* members, and the one paid buyer had bought a product with nothing in it yet.
That one correction changed the whole plan. Priority zero became *make the paying member whole* before any
selling, and the ads stayed off. Because it was logged as a **correction** event, every agent saw it on its
next bootstrap. Nobody kept working from the wrong number.

**Wednesday, a missed gate (the lesson).** My GO said *fix the empty Lab pages, THEN message the member.*
The message went out first. Nothing broke badly, but the Chief of Staff caught it on the timeline,
logged a **blocker**, and made the page fix a hard precondition for everything after it.
Gates only work if they're written into the work item, not just said in chat.

**By the weekend:** checkout locked, empty pages filled, storefront live, and each change posted
with **before/after evidence** on the work item.

---

## The event kinds that make it work

Keep the vocabulary small. These eight cover almost everything:

| Kind | Who writes it | What it means |
|---|---|---|
| `work-created` | Chief of Staff | New work item with owner + finish line |
| `task-delegation` | Chief of Staff | "@agent, this piece is yours" |
| `handoff-ack` | The receiving agent | "Got it, starting now" |
| `work-update` | Any agent | Progress, with evidence (links, IDs, screenshots) |
| `blocker` | Any agent | "Can't continue because…", plus what would unblock it |
| `decision` | Chief of Staff, only when **you** decide | Your GO / NO-GO, quoted |
| `correction` | Any agent | "An earlier fact was wrong; here's the right one" |
| `work-completed` | Chief of Staff | Finish line met; evidence linked |

Two rules that save you weeks:

- **Only you create `decision` events for money or customers.** Agents can *propose*; the Chief of Staff
  records *your* answer, quoted, with the date.
- **"Done" needs evidence.** A `work-update` that says "shipped" without a link, ID or screenshot
  doesn't count.

---

## Do this today: build your Chief of Staff loop

**You need:** the ACMI setup from Drop #1, and two chat windows in any MCP-connected AI tool.
One plays the Chief of Staff, the other plays a builder agent.

### Step 1: Give your Chief of Staff its job

Paste into **chat window 1**:

```text
You are my Chief of Staff. You coordinate; you never do the work yourself.
Rules:
- Every request I give you becomes an ACMI work item with a title, an owner and a finish line.
- Split work into pieces and delegate each with a task-delegation event on the work item,
  addressed to one agent, using the summary format "[task-delegation @agent] ...".
- Anything that spends money or touches customers needs my explicit GO.
  Record my answer as a decision event, quoting me.
- Before each reply, read the work item (acmi_work_get) so you never act on stale context.
- "Done" requires evidence: a link, an ID or a screenshot in the work-update.
Write a profile for agent:chief-of-staff with actor_type "agent" and role "chief of staff".
```

### Step 2: Hand it a messy request

Still in chat window 1, talk the way you actually talk:

```text
ok so I want a simple landing page for my newsletter, nothing fancy, and
maybe a welcome email too, don't send anything to anyone until I look at it
```

Watch for three things: it creates a **work item** with a finish line, it posts
**two delegations** (page, email) to `agent:builder`, and it records
*"don't send anything until I look"* as a **gate**.

### Step 3: Be the builder

Open **chat window 2** (a brand-new chat) and paste:

```text
You are agent:builder. Bootstrap from ACMI: list work items, find any
task-delegation addressed to @builder, acknowledge each with a handoff-ack,
then draft the pieces and post a work-update with the draft text as evidence.
Do not send or publish anything.
```

### Step 4: Close the loop

Back in **chat window 1**:

```text
Check the work item. What's done, what's blocked, and what needs my GO?
```

It should answer from the **timeline**, not from memory, and ask you to approve before anything
goes out. Say "GO on the page, hold the email." It should log a `decision` quoting you.

### Step 5: Roll up the day

```text
Write a rollup for agent:chief-of-staff: what shipped, open blockers,
decisions I made, and tomorrow's first three priorities.
```

Tomorrow, open a new chat and say *"Bootstrap agent:chief-of-staff."* It picks up exactly where you left off.

**✅ Done? Post a screenshot of your Step 4 answer in the Agent Lab Forum,** plus one thing you'd
delegate to your Chief of Staff this week.

---

## Mistakes we already made (so you don't have to)

- **Gates said out loud but never written down.** "Fix the pages, then message the member" was only in chat,
  so the message went first. **Fix:** put gates in the work item's signals and have agents check them
  before acting.
- **Acting on a number nobody checked.** "Dozens of customers" was really dozens of *free* members.
  **Fix:** when two sources disagree, log a discrepancy and ask. Don't average them or pick one.
- **"Done" with no proof.** Agents will happily report success. **Fix:** no evidence, not done.
- **Letting the money step run ahead.** An agent set up a paid ad campaign draft pointed at the wrong page
  (a code repo with no tracking). Nothing launched, because the spend gate held. **Fix:** only the human's
  quoted answer becomes a `decision`, and money actions check for one first.

---

## Next week — Drop #3: Hermes, always-on personal agents

How we run agents that stay on 24/7 with their own personality file, tools and chat channel, like
the one that runs a creator brand's content and the one that does real-estate research.

---

### Recording notes (for Mikey, remove before publishing)

- **Format:** 10–12 min. Open on the loop diagram, tell the anonymized week as a 2-minute story, then do Steps 1–5 live with two windows side by side.
- **Hook (first 15s):** "I don't manage my AI agents. My Chief of Staff agent does. Here's the loop, and by the end you'll have your own."
- **Money moment:** Step 4, when the Chief of Staff answers from the timeline and asks for your GO. Linger there.
- **Scrub before recording:** no member names, real work-item IDs, product IDs, dashboards, IPs, tokens or client names on screen. Use a fresh demo Upstash DB.
- **Don't** show the real launch timeline. Tell it as the story above.

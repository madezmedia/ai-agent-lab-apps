---
message: P0 welcome DM — first paid AI Agent Lab member
status: draft — Mikey reviews and sends; Claude does not send or refund
product: AI Agent Lab $39/mo (prod_abuw9zSNHSlCl)
acmi: work:agent-lab-offer-consolidate-20260925 (parent cid claudeDraftSequence-20260925)
---

# P0 — Welcome DM for the first paid Agent Lab member

**Why two messages:** Drop #1 stays a draft until Mikey reviews it and the setup steps
pass a test on a fresh account. So message A goes out **now**: it owns the gap and
commits to a date. Message B goes out **the moment Drop #1 is live** in the Lab.
Message C (refund) is only for if that date slips. Mikey decides; Claude never executes a refund.

**Send from:** Mikey's own Whop DM (personal, not a bot or broadcast).

### Fill before sending

| Placeholder | Who fills it | Notes |
|---|---|---|
| `[first name]` | Mikey | From the Whop member record |
| `[day]` | Mikey | Pick a date you can hit after the setup test + recording. Days, not weeks. |
| `[Lab section]` | Polar | Whatever Drop #1 is published under: Whop course (e.g. "Mad EZ Guide") or forum channel (e.g. "Weekly Drops") |
| `[Drop #1 link]` | Polar | Direct link to the course lesson or forum post, copied after publishing |

---

## A. Send now — own the gap, set the date

> Hey [first name], Mikey here, the guy who built AI Agent Lab.
>
> First: thank you. You're the very first paying member of the Lab, and that means a lot.
>
> Second, a straight answer: you joined before the first build was up, so the Lab has
> looked pretty empty. That's on me, not you.
>
> Here's what's coming. The first drop is **"Your AI Agent Team: The Map"**, part of a
> series I'm calling *The Mad EZ Guide*. It walks through the real team of AI agents I run
> my business with: a chief-of-staff bot, always-on personal agents, a server agent, and coding agents.
> It also shows how they share one memory, so they know what the others did yesterday.
> By the end you'll have your own first agent that remembers its work between sessions.
> It takes about 30 minutes.
>
> It goes live in the Lab by **[day]**, and I'll message you the second it's up.
> After that, a new drop lands every week.
>
> One question so I can make the next drops useful to you: **what do you want your AI agents
> to actually do for you?** Reply here, even one line. I read every one.
>
> — Mikey

---

## B. Send when Drop #1 is live — deliver it

> [first name], it's live. 🎉
>
> **Drop #1: "Your AI Agent Team: The Map"** is up in the Lab now.
>
> **How to open it:**
> 1. Go to whop.com and log in with the account you joined with.
> 2. Open **AI Agent Lab** from your memberships.
> 3. Go to **[Lab section]** and open **Drop #1**.
>
> Or jump straight there: [Drop #1 link]
>
> **What to do first:** watch the walkthrough, then do the 5 steps in "Do this today."
> The last step is the fun one. You open a brand-new chat and your agent still remembers
> what it was working on.
>
> If you get stuck on any step, reply here with a screenshot and I'll help you through it.
>
> Next week: **Drop #2, "Grok Bot as Chief of Staff"**, how one bot takes a messy idea and
> splits it across a whole team of agents.
>
> — Mikey

---

## C. Only if [day] slips — offer a refund (Mikey decides; Claude does not execute)

> [first name], I promised you Drop #1 by [day] and I'm not going to hit that. I'd rather be
> straight with you than keep you waiting on a Lab with nothing in it.
>
> Two options, your call:
> 1. **Full refund** for this month. Just reply "refund" and I'll process it myself. No hard feelings.
> 2. **Stay on**, and I'll get the drop to you by [new day] plus [one thing Mikey can actually
>    deliver, e.g. a 1:1 walkthrough of the setup]. Don't add anything that implies a new
>    product or price.
>
> Either way, thanks for backing this early.
>
> — Mikey

**Refund mechanics (for Mikey/Polar, not the member):** process it inside Whop on the member's
payment for prod_abuw9zSNHSlCl. Log it as a `decision` event on the work item with the reason.
If it's refunded, consider whether to keep their access through the month as goodwill (Mikey's call).

---

## Checks before sending

- [ ] Polar has answered: what does this member see in the Lab right now? (Asked in
      `claudeReplyPolarSurfaceList-1790362000007`.) If something is already there, edit A so it doesn't say "empty."
- [ ] `[day]` is a date Mikey can hit after the fresh-account setup test + recording.
- [ ] No IPs, tokens, hostnames, client or brand names. Agents are described by role only. ✅ (as drafted)
- [ ] No new prices or products. The refund offer is the only money language. ✅ (as drafted)
- [ ] After sending A, log it in ACMI (`work-update`) so CoS/Polar know the clock started.

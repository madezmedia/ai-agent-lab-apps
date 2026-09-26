---
asset: Meta ad copy + creative brief — AI Agent Lab $39/mo test
status: DRAFT — ads gate is NO-GO; nothing here authorizes spend
campaign: adcamp_30II8tbs9wD (draft) / adgrp_dS8ormnLS9JM
acmi: work:agent-lab-offer-consolidate-20260925 (parent claudeAdsDraftCrossCheck-1790433000000)
design_handoff: open-design (renders creatives; Claude writes copy + brief only)
---

# Meta ad test — AI Agent Lab ($39/mo)

## 0. Gate (read first)

This is copy and creative prep only. **Launch needs Mikey's explicit GO logged in ACMI** after:
Drop #1 is live and smoke-tested, the "Private Discord" product line is fixed, one $39 plan is
confirmed on the page, an end-to-end test purchase, a stop rule and target cost per signup,
a bot filter, and a connected ads identity (Mikey-only). Earliest suggested start: **Wed Sep 30,
7 days, $10/day**.

## 1. Destination (fixes the pixel error)

All ads go to the canonical Whop checkout, which carries the Whop pixel. **Never GitHub.**

```
https://whop.com/ai-automation-tools/ai-agent-lab-c1/?utm_source=meta&utm_medium=paid&utm_campaign=agentlab-consolidate&utm_content=<variant>
```

`<variant>` = `map` · `amnesia` · `team` (one per ad below).

## 2. Claims we can make (and ones we can't)

| ✅ True today, OK to use | ❌ Do not use |
|---|---|
| $39/month membership | Member counts, "join 35+ builders", testimonials |
| Weekly agent builds + skill drops (the Lab's own headline) | "Private Discord" (cut) |
| Drop #1 "Your AI Agent Team: The Map" is available on signup *(only once it's live Mon Sep 28)* | Income/revenue promises |
| ~30 min to your first agent that remembers between sessions | A dollar value for the kit ("$47 value"). Just say the files are included |
| Private member chat + forum inside the Lab | The Tue Sep 29 live build (it's in the past by launch) |
| Cancel anytime *(Mikey approved 2026-09-26)* | |
| Members get the Starter Kit files in the Lab *(Mikey approved 2026-09-26)* | |
| Works with Claude, Cursor, Gemini, and other MCP tools | New prices, bundles, tiers, discounts |
| ACMI, the memory layer underneath, is open source (MIT) | |

## 3. Ad copy — 3 variants

Meta limits: primary text shows ~125 characters before "See more"; headline ≤ 40; description ≤ 30.
CTA button for all: **Subscribe**. If Subscribe isn't available on the placement, use **Learn more**.

### A. `map`: "See the whole team"

- **Primary text:** I run my business with a team of AI agents that remember what each other did yesterday. Here's the map, and your first agent in 30 minutes.
- **Headline:** Build an AI agent team that remembers
- **Description:** $39/mo · Cancel anytime
- **Creative:** Concept 1 (fleet map)

### B. `amnesia`: the pain

- **Primary text:** Tired of re-explaining your project every time you open a new AI chat? Give your agents a shared memory. New build every week inside AI Agent Lab.
- **Headline:** Your AI agents keep forgetting. Fix it.
- **Description:** Weekly builds · $39/mo
- **Creative:** Concept 2 (new chat, remembered)

### C. `team`: builder identity

- **Primary text:** Claude plans. Cursor builds. Gemini researches. Now make them work as one team. Weekly builds + the Starter Kit files, inside AI Agent Lab.
- **Headline:** Weekly agent builds. $39/mo.
- **Description:** Join AI Agent Lab
- **Creative:** Concept 3 (tools → one memory)

**Long primary text (optional, for feed placements that show more):**
> Most AI agent content shows one bot doing one trick. Real work needs a team: one agent plans,
> some build, some run 24/7. The hard part is getting them to know what the others did.
>
> AI Agent Lab gives you the real setup I run my business on, one build per week.
> Start with Drop #1: "Your AI Agent Team: The Map." In about 30 minutes you'll have your
> first agent that remembers its work between sessions.
>
> Members also get the Starter Kit files, plus private member chat and forum inside the Lab.
> $39/month. Cancel anytime.

## 4. Creative brief — for open-design

**Style source:** match the existing Drop #1 cover and welcome one-pager in Drive
`04-AI-Agent-Lab` (drop-01-cover.png `1YLCDW6zKFMF2neIiAwklao_9ruVLYDyT`,
welcome-onepager.png `1BG9alv2ty_QJdD0weAzGSDjn2wBdr6dO`, logo `madez-logo.webp`
`1fBZ02BpuD-7gn-lUHbx7opn_Lpy6rap0`). Same palette, type and logo lockup, so ad → checkout → Lab
feels like one brand.

**Sizes per concept:** 1080×1350 (4:5 feed, primary) · 1080×1080 (1:1) · 1080×1920 (9:16
Stories/Reels, keep text in the middle 1080×1420 safe zone).

**Text on image:** ≤ 7 words, large. The copy does the explaining. Put the price on the image
only where noted.

| Concept | Visual | On-image text |
|---|---|---|
| **1 — Fleet map** (variant A) | Simple diagram: "Chief of Staff" at top → arrows to "Personal agents", "Server agent", "Coding agents"; all connect down to one block labeled "Shared memory". Role labels only. | "Your AI agent team, mapped." + small "AI Agent Lab · $39/mo" |
| **2 — New chat, remembered** (variant B) | Two chat windows side by side. Left: "New chat" with a generic empty-state. Right: "New chat" where the agent replies "Picking up where we left off: learning the fleet map." | "New chat. Same memory." |
| **3 — Tools → one memory** (variant C) | Three plain tool tiles labeled Claude, Cursor, Gemini as text (no brand logos) feeding one "memory" core. | "Make your agents work as one team." |

**Must not appear:** real IPs, ports, hostnames, tokens, dashboards with real data, client or
brand names (Folana, etc.), member names (Wizard), Discord, member counts, third-party logos
(Anthropic/Cursor/Google marks). Use text labels, since trademark logos in ads risk rejection.
Mikey's face or voice is optional and his call.

**Deliver to:** Drive `04-AI-Agent-Lab/04-Marketing/Ads-Meta-Test-v1/` as PNG, named
`ad-<concept>-<ratio>.png` (e.g. `ad-map-4x5.png`). Post Drive ids on the work item with a
pixel-pass note. **Do not upload to Whop/Meta.** The launch owner does that after Mikey's GO.

## 5. Targeting and setup notes for the launch owner

- Keep ad group `adgrp_dS8ormnLS9JM` (US, English, optimize for purchase), but **reset dates** to 7 fresh days.
- Consider widening beyond one "software development" interest: add AI tools / ChatGPT / automation interests. At $10/day, a too-narrow audience won't exit learning.
- One ad set, 3 ads (A/B/C), and let Meta pick. Don't split the $10/day across ad sets.
- **Bot filter** (lesson from the closed LoRA Lab wave): exclude Audience Network, and watch for junk signups or chargebacks on day 1.
- **Read the results by `utm_content`** so we know which angle sold.

## 6. Mikey decisions (2026-09-26)

1. "Cancel anytime": **approved.** Launch owner still does a 2-minute check that the Whop plan cancels with no fee.
2. Starter Kit files in variant C: **approved** (as "files included", no dollar value).
3. **Stop rule: pause the campaign if there are 0 signups by end of day 4.** Target cost per signup is not set. With $70 total and 7 days, the hard cap is the budget.
4. Face/voice: **OPEN.** Mikey suggested Folana. Held because (a) the Folana brand was scrubbed from Agent Lab public copy by Mikey's own rule, (b) it crosses into the separate creator lane, and (c) consent/AI-disclosure depends on who Folana is. See ACMI `claudeAdsFaceDecision-1790434000000`. **Launch with text-only creatives until resolved.**

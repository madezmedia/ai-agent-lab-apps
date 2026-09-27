---
asset: EZ Influencer Creator 360 ($100/mo) readiness check + waitlist decision
status: NOT READY TO APPROVE (Claude review 2026-09-27). Mikey decides; Claude does not approve, charge or refund
product: EZ Influencer Creator 360, Mad EZ Media store (whop.com/ai-automation-tools/ez-influencer-creator-360/)
lane: creator lane (EZ Influencer). Readiness review only, no merge with Agent Lab
acmi: work:agent-lab-offer-consolidate-20260925 (cid claudePolarDataPull-1790472000000 item 7-8)
---

# Creator 360: is it ready to take $100/month?

## 0. Update 2026-09-27 (Polar data pull + public page check)

- **PRICE MISMATCH, fix before approving anyone.** The public page shows **"$100/ month"** (hero + card)
  with a "Start free trial" button. Polar says the plan behind it is **$29.99/mo**. Mikey decides which
  price is right. Then either the page or the plan changes so they match. Claude does not pick a price.
- **Waitlist:** Polar counts **4 pending** (Mikey's export showed 1, possibly filtered). Approving
  **starts the 7-day free trial**; it doesn't charge right away. The 3 others still need the same check
  (real name, non-disposable email, a social profile). The mail.tm entry stays a decline.
- **Member view:** AI Image Generator works. **AI Podcast Generator still 404** (exp_ciwNR5in46VTDU):
  hide it or fix it before anyone new joins.
- **Folana disclosure + cross-sell blocks: LIVE** (verified on the public Inner Circle page).

## 1. The waitlist entry: do NOT approve

Mikey's waitlist export has **one entry**:

| Field | Value | Read |
|---|---|---|
| Entry | `entry_p6R3f70XPxMV` | — |
| Created | 2026-09-18 05:17 ET | 9 days ago, during the same month as the LoRA Lab bot wave |
| Name | *(blank)* | 🚩 |
| Twitter / Discord | *(blank)* | 🚩 no way to verify a real person |
| Email | `effectiveester@…` on a **disposable temp-mail domain** (mail handled by **mail.tm**; the site calls itself a "Public Email Service" that doesn't send mail out) | 🚩🚩 throwaway inbox. They can receive, but can't reply to you |

**Verdict:** this looks like a bot or throwaway signup, not a buyer. Approving it risks a
card-testing charge, a chargeback, or at best a $100/mo member you can never contact. On
the closed LoRA Lab wave, Whop's fraud check blocked 106 signups with auto-generated emails. We don't want
that pattern on the Mad EZ store that holds AI Agent Lab.

**Do:** leave it unapproved, or decline it. If the person is real, they'll reach you from a real
email or social account. Then approve that one.
**Also check (Polar, item 7):** whether approving starts the **7-day free trial** (charge on day 8) or
charges right away. Either way, a disposable inbox means no receipts, no onboarding, and a high refund/dispute risk.

## 2. Product readiness: what the public page shows today

From a fetch of the public page (2026-09-27):

| Check | Status |
|---|---|
| Price | $100/month, 7-day free trial ✅ |
| Headline | "AI-powered Content Factory for Fanvue" ✅ |
| **Feature list / what you get** | ❌ **none visible**. The page doesn't say what a member gets |
| **Day-1 experience** | ❌ not stated. What does a member open first? |
| FAQ | ⚠️ questions exist ("technical skills?", "platforms?", "additional software?", "how quickly can I start?") but the answers weren't visible in the fetch. Polar to confirm they're filled in |
| Claims | ✅ no income/results numbers (good) |
| Cross-sell | ✅ links to Folana's Inner Circle + AI Agent Lab (the cross-sell pack is live) |
| Underlying app | ⚠️ the ez-influencer-360 app's 3 agents (Character Integrity, LoRA Orchestrator, Storyboard) were built on a branch in April. On record, the PR is **pending an owner decision**. Nothing on record says members can use it today |

**Bottom line:** at $100/month, a buyer needs to see exactly what they get and have it work on day 1.
Today we can't confirm either. Selling it as-is risks the same "paid for an empty product" problem Agent Lab had.

## 3. Ready-to-charge checklist (all must be ✅ before approving anyone)

- [ ] **Day-1 path works:** a test member joins (Mikey's own test account), opens the product, and within
      10 minutes can do the first real thing (e.g. generate their first content batch). Screenshots posted.
- [ ] **Deliverables listed on the page:** 4–6 concrete bullets of what's inside (apps, courses, templates,
      support). Only things that exist today.
- [ ] **FAQ answers filled in** for all 4 questions.
- [ ] **The app it depends on is live** for members (URL, login works, no 404s), with the owner's decision on the April agent PR logged.
- [ ] **Onboarding message** ready (welcome + first step), same pattern as Agent Lab T0.
- [ ] **Trial renewal notice** on day 6 ("your trial ends tomorrow, $100/month after"). Required at $100.
- [ ] **Refund/cancel path** stated (Mikey's policy).
- [ ] **AI disclosure** where Folana or AI personas appear (same rule as the Inner Circle page).
- [ ] **Approval screen:** approve only waitlist entries with a real, non-disposable email, and ideally a
      social profile. Decline blanks and throwaways.

## 4. Who does what

| Owner | Task |
|---|---|
| **Polar** | Items 7–8 of the data pull: waitlist settings, what approval triggers, the product's experiences/apps, day-1 screenshots, FAQ answers |
| **Folana / EZ Influencer lane owner** | Fill in the deliverables and FAQ, and confirm the app is live (creator lane owns the content) |
| **Mikey** | Decide on the waitlist entry (recommend decline), run the test join, set the refund policy |
| **Claude** | Write the page bullets, onboarding and renewal copy once Polar's inventory lands (only real deliverables) |

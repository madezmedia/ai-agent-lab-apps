# Pop test: Off-Grid Water Vault → US Water Revolution (affiliate `madezmedia`)

**Status: staged. No campaign is live and no money has been spent.** Mikey creates and starts the campaign in the network dashboard. Claude never sets a budget or starts spend.

## What we're testing
**One URL for every pop campaign:** `https://lytair.com/water/?utm_source=pop&utm_campaign=water-v1`

Visitors are split 50/50 in the browser, and each visitor keeps the same version on return visits. To preview a version, add `?v=a` or `?v=b` to the URL.

| Arm | What the red button does | Affiliate link tag |
| --- | --- | --- |
| **A: direct** | Goes straight to the seller's presentation | `tid=pop_cta_direct` |
| **B: email ask** | Opens a short email ask, then goes straight to the presentation. "No thanks" also continues. | `tid=pop_cta_email` (gave email), `tid=pop_cta_skip` (skipped) |

The question: does asking for an email first cost more presentation clicks than the list is worth?
Arm B's email capture rate = Resend contacts with source `bridge_gate` ÷ (`pop_cta_email` + `pop_cta_skip` clicks).

The quiz (`/water/quiz/`, `tid=quiz_pop`) stays live as a list builder for later tests. Keep it out of this $20 test so the budget isn't split three ways.

## Campaign settings (same for both variants)
- **Network:** Traffics.io (we have the account; campaign 50938 is the old Agent Lab one, so make a NEW campaign rather than reusing it). PropellerAds or PopAds also work.
- **Format:** popunder.
- **Geo:** US only.
- **Devices:** split them into separate campaigns if the budget allows, mobile (Android/iOS) and desktop. Otherwise run all devices and read the device split afterwards.
- **Frequency cap:** 1 impression per user per 24 hours.
- **Bot filtering / traffic quality:** on. Exclude low-quality sources and proxies where the network offers it.
- **Budget:** **$20 total**, $10 per variant, capped daily.
- **Status:** create it **paused**, so it's only live once Mikey presses start.

## What to read, and when (after the $20 is spent, or 48 hours, whichever is first)
| Signal | Where | Kill if | Keep testing if |
| --- | --- | --- | --- |
| Visits that load the page | Network stats vs Vercel/Heyflow visits | Under 60% of paid clicks load the page (bots or a slow page) | Over 75% |
| Button clicks | Affiliate dashboard: A = `pop_cta_direct`; B = `pop_cta_email` + `pop_cta_skip` | Under 2% of visits | Over 5% |
| Clicks to the seller (`tid`) | Affiliate dashboard → clicks by tid | Under 1% of visits | Over 3% |
| Sales | Affiliate dashboard | 0 sales after the $20 is normal; don't judge on sales alone at this budget | Any sale means scale the winner to $50 |

**Decision rule:** keep the variant with the higher click-through to the seller per dollar. If both are under 1%, stop pop traffic for this offer.

## Compliance (both variants)
- The affiliate disclosure is visible above the fold and next to the button.
- No fake alerts, countdowns or claims about gallons, cost or health.
- Pop traffic goes to our page, never straight to the affiliate link.
- Kept separate from Mad EZ: lytair.com, its own Vercel project, and no Mad EZ pixels or lists.

## Email list (both landers)
- Bridge page: an email form for the PDF. Quiz: optional email before the result, which can be skipped.
- Sign-ups go to `POST /api/subscribe` → Resend audience (`RESEND_API_KEY` + `RESEND_AUDIENCE_ID` in the Vercel `lytair` project) and/or `LEAD_WEBHOOK_URL` (n8n).
- Until those are set, people still get the PDF and their results, but nothing is saved (`/water/thanks/?ok=0`). **Set the env vars before spending.**
- Bots (hidden honeypot field, submitted in under 2.5 seconds, disposable email domains) are dropped silently. Every form shows consent wording and links to `/water/privacy/`.
- Emails sent to this list need the full physical mailing address in the footer (CAN-SPAM).

## Welcome email: LIVE (2026-10-02)
`/api/subscribe` adds the contact to the Resend audience "Off-Grid Water Vault" (`546e7e94-…`) and immediately sends a **transactional** email with the PDF link only (from `plan@madezmedia.com`, no promotion). Tested live: contact added, email delivered.

The **marketing** follow-up below (it includes the affiliate link) is NOT automated. It needs the full mailing address before it goes out as a Resend broadcast or automation:

> **Subject:** Your free Household Water Plan
> Hi there,
> Here's the free Household Water Plan you asked for: https://lytair.com/water/household-water-plan.pdf
> Print it and keep it with your stored water. It covers how much to store (1 gallon per person per day, 2 weeks at home), how to store it, and how to make tap water safe during a boil-water notice.
> If you want to see the DIY backup option again, here's the Joseph's Well presentation: https://uswaterrevolution.com/?tid=email_welcome#aff=madezmedia (affiliate link; we may earn a commission).
> — Off-Grid Water Vault
> [MAILING ADDRESS] · Unsubscribe

Sending is blocked until `[MAILING ADDRESS]` is the full street address, or a PO box.

## Tracking pixels
- **Traffics.io** (live on lytair.com):
  - The landing pixel `tiotrk.com/action/land` is on `/water/` and `/water/quiz/`.
  - The conversion pixel `tiotrk.com/action/conversion` fires on every click through to the seller's presentation (bridge arms A and B, the B skip link, and the quiz button) just before the redirect, and on `/water/thanks/`.
  - **In Traffics.io, a conversion = a presentation click**, so the network optimizes toward visitors who click.
- **Whop pixel** (live 2026-10-02, Water Vault business `biz_QMumkXr0qSGd2L` only, via `/water/whop-pixel.js`):
  - `page` on `/water/`, `/water/quiz/`, `/water/thanks/` and `/water/privacy/`;
  - `lead` when an email is actually saved: bridge arm B gate, quiz, and `/water/thanks/?ok=1`.
  - Never the Mad EZ, MIL or EZ business ids.
- **Not tracked by the network:** affiliate sales (see them in the affiliate dashboard by tid) and email sign-ups (see them in the Resend "Off-Grid Water Vault" audience).

# Pop test: Off-Grid Water Vault → US Water Revolution (affiliate `madezmedia`)

**Status: staged. No campaign is live and no money has been spent.** Mikey creates and starts the campaign in the network dashboard. Claude never sets a budget or starts spend.

## What we're testing
Two landers, sharing the budget 50/50:

| Variant | URL | Affiliate link tag |
| --- | --- | --- |
| **A: bridge page** | `https://lytair.com/water/?utm_source=pop&utm_campaign=water-v1&utm_content=bridge` | `tid=pop_fleet1` |
| **B: Heyflow quiz** | Heyflow funnel URL (filled in once it's published) + `?utm_source=pop&utm_campaign=water-v1&utm_content=quiz` | `tid=heyflow_pop` |

The question: does a 3-tap quiz get more people to click through to the presentation than the static bridge page?

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
| Engagement | Heyflow: starts and completion rate. Bridge: clicks on either button | Quiz completion under 15%, or bridge button clicks under 2% | Quiz completion over 30%, bridge clicks over 5% |
| Clicks to the seller (`tid`) | Affiliate dashboard → clicks by tid | Under 1% of visits | Over 3% |
| Sales | Affiliate dashboard | 0 sales after the $20 is normal; don't judge on sales alone at this budget | Any sale means scale the winner to $50 |

**Decision rule:** keep the variant with the higher click-through to the seller per dollar. If both are under 1%, stop pop traffic for this offer.

## Compliance (both variants)
- The affiliate disclosure is visible above the fold and next to the button.
- No fake alerts, countdowns or claims about gallons, cost or health.
- Pop traffic goes to our page, never straight to the affiliate link.
- Kept separate from Mad EZ: lytair.com, its own Vercel project, and no Mad EZ pixels or lists.

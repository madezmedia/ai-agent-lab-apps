# Off-Grid Water Vault: honest version of the water funnel

A separate lane: its own Whop business, pixel and list. Never mix with Mad EZ / Agent Lab, Modern Income Lab or EZ Influencer.

This replaces the "Pop & Hijack" directive's files. Three things were dropped:
- the fake "Regional Water Security Alert";
- the "50 gallons/day, under $70" claims;
- the bot comment engine with invented first-person stories.

## Files
| File | Use |
| --- | --- |
| `kit.html` → `png/` | Brand kit: 10 PNGs. Render: `node render2.mjs content/water/kit.html content/water/png` |
| `png/01-store-banner.png`, `02-store-avatar.png`, `03-social-card.png` | Whop store banner, logo, OG image |
| `png/card-water-vault.png` | Whop product card. The bottom band is dark so Whop's white title stays readable. |
| `png/gallery-01-whats-inside.png`, `-02-the-plan.png`, `-03-how-we-work.png` | Product gallery, in that order |
| `png/tip-01-how-much.png`, `tip-02-make-it-safe.png` | 1080×1350 organic posts (IG, FB, Pinterest) |
| `png/cover-water-plan.png` + `household-water-plan.pdf` | Lead magnet (2 pages, CDC/Ready.gov facts) |
| `bridge/index.html` | Presell bridge: 5 KB, one file, no external requests, disclosure above the fold |

Brand:
- Colors: paper `#f3efe6`, ink `#12222c`, blue `#1c5d86` (primary), orange `#c9561c` (fill only), deep `#0e1f29`.
- Type: Charter (headlines), system sans (body).
- Mark: a droplet with three level lines, the "stored-water gauge".

## Bridge page
- Replace `YOUR_ID` in the hoplink. Keep `tid` per source: `pop_fleet1`, `whop_vault`, `organic_ig`, and so on.
- Replace `#WHOP_FREE_CLAIM_URL` with the free Whop plan's checkout link.
- Host it on `lytair.com/water/`. Never on a madezmedia.com domain, so pop-network flags can't touch Mad EZ.
- Keep these as they are:
  - the disclosure bar;
  - "claims are the seller's";
  - "test and treat any water".

  They're what keeps the page approvable on ad networks and compliant with FTC disclosure rules.

## Whop community: "Off-Grid Water Vault" (free plan)
- **Channels:**
  - `#start-here`: rules and the disclosure line.
  - `#announcements`: link to official boil-water notices only (your utility, EPA). Never write your own "alerts".
  - `#water-plan`: the free PDF.
  - `#gear-notes`: products, each with its affiliate disclosure and a "what it does / doesn't do" note. The US Water Revolution link goes here with `tid=whop_vault`.
  - `#member-setups`: members share their setups.
- **Welcome DM:**
  > Welcome to the Off-Grid Water Vault.
  > Step 1: grab the free Household Water Plan in #water-plan. It covers how much to store and how to make tap water safe (CDC and Ready.gov guidance).
  > Step 2: share what your setup looks like in #member-setups, even if it's just a few jugs. Everyone starts there.
  > Heads up: some gear links in #gear-notes are affiliate links, and we'll always say so.

## Organic posting rules (a real person, posting by hand, not bots)
- **Post from Mikey's own account.** No fleet agents posting comments, no fake first-person stories, no self-reply bumps.
- **Lead with help:** the storage number, the boil and bleach steps. Linking to the free PDF is fine where the platform allows it.
- **Disclose when relevant:** any post or comment that points toward the paid product says "affiliate link" or "#ad".
- **Respect each subreddit's self-promotion rules.** Most of r/preppers, for example, wants no affiliate links at all.
- **Only use the two tip cards' numbers with the source line kept on them.**

## Vendor banners (Drive: airf-jws-banners.zip, 15 files)
The seller's official affiliate banners. They're not stored in this repo, because the repo is public and these are the vendor's files. Use them only for display or native placements; popunders don't show banners.

The FTC holds affiliates responsible for the claims in the ads they run, so here's how they sort:

| Group | Files | Call |
| --- | --- | --- |
| A. Product only, the seller's "10 gallons from air in 24 hours" claim | `GD-ClVBo` (620×223), `hgdIgMG1` (620×223) | Usable for display, linked to the bridge page (never straight to the hoplink). The claim is the seller's; keep the bridge's "claims are the seller's" note. |
| B. "God-given secret to survive a U.S. drought/famine" | `2xgpF26B`, `5FEif5_t`, `8Hnkq1rl`, `RFRp2i73`, `zj0iklKv`, `mxvIoR2A` (304×400), `ULxTz2E7` (620×223) | Mikey's call. Faith-audience hype; many networks accept it, and it fits the vendor's own funnel. |
| C. Doom or dated: "delivers your family from death in 2025", "2025 crisis", "#1 threat to the US", burning city | `QBcgVEew`, `fUVKA2dJ`, `71oBzFAM`, `65P64qvM` (304×400), `VOSdhybr`, `lMpBm45y` (620×223) | Don't run them. "2025" is out of date, and death or disaster imagery gets rejected by most networks and invites deceptive-ad complaints. |

None of them go in the Whop community or the brand kit: they don't match the Off-Grid Water Vault's "no scare tactics" promise.

## Before any spend (Mikey decides)
Our last two pop tests got 5,710 views and 158 checkout clicks for 0 payments. If you test this, cap it at $10–20, send it to the bridge page (never straight to the hoplink), and read the outbound-click rate on the bridge before adding budget.

## Hosting (live)
- Vercel project `lytair` (team mad-ez-media). Deploy folder layout: `vercel.json` at the root, plus `water/index.html` (a copy of `bridge/index.html`).
- `/` redirects to `/water/`. Every page sends `noindex`, because the bridge exists for paid traffic, not search.
- Domains `lytair.com` and `www.lytair.com` are added to the project. DNS at Namecheap is pending: `A @ 216.150.1.1` and `CNAME www 092c993ffd2d9c09.vercel-dns-016.com.` Remove the parking and redirect records first.

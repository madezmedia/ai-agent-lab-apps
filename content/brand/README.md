# Mad EZ Media: base look

One look for every surface: the Whop store, AI Agent Lab, the ACMI bridge page, and ads.
Source of truth for the tokens below: `content/brand/store-kit.html` and
`content/storefront/storefront.html` (same values). Re-render with
`node content/storefront/render.mjs <page.html> <outDir>`.

## Tokens

| Token | Value | Use |
|---|---|---|
| Background | `#07070a` | Every canvas. Never pure white backgrounds. |
| Panel | `#111117` / line `#2a2a33` | Cards, chips |
| Text | `#f4f4f7` / muted `#a6a6b0` | Headlines / supporting copy |
| Accent | `#ff5a1f` → `#ff2d55` gradient | One key word per headline, primary buttons, rings |
| Glow | `rgba(255,90,31,.45)` | Behind the accent only, never on body text |
| Texture | 60px faint grid, faded at the edges | Background only |
| Type | Heavy sans (800–900), tight tracking | Headlines; eyebrow labels in spaced caps |

## Rules

- **One accent word per headline** ("…that **remember.**"). If everything glows, nothing does.
- **The mascot is the face of Mad EZ Media**, always inside the orange-red ring on black.
  Use the **EZ monogram** where the mascot is too detailed (favicon, tiny badges).
- **Line: "We build AI agent teams that remember."** Products hang off it:
  AI Agent Lab (primary), ACMI (free, open source), Agent Fleet Starter Kit (secondary).
- **Honest claims only:** no member counts in marketing, no results or income stats, no Discord.
- EZ Influencer Lab is a separate business with its own look. Don't apply this kit there.

## Store kit files (`content/brand/png/`)

| File | Size | Where it goes |
|---|---|---|
| `01-store-banner.png` | 1920×1080 | Whop store banner (current banner is 16:9; key content sits centre-left) |
| `02-store-avatar.png` | 1024×1024 | Whop store profile picture |
| `03-avatar-monogram.png` | 1024×1024 | Favicon / small badges / alt avatar |
| `04-social-card.png` | 1200×630 | Link-preview image (X, LinkedIn, Discord unfurls), if Whop or the site allows one |

## Whop store profile copy

**Store bio (the first ~120 characters show before "see more", so the hook goes first):**

> We build AI agent teams that remember. Weekly agent builds in AI Agent Lab ($39/mo), plus ACMI, our free open-source agent memory. Mad EZ Media sells digital software, education and membership products for developers and small businesses: the AI Agent Lab subscription, the Agent Fleet Starter Kit (download), and ACMI (open source). Delivered online as courses, downloads, forums and software access. No physical goods.

What changed from the current bio, and why:

- **Hook first.** The old bio opened with a merchant-category sentence and got cut off at "see more".
- **Fixed the ACMI name.** The old bio said "Agentic Context *Management Infrastructure*". The protocol is **Agentic Context Memory Interface**. The new bio just says "ACMI" plus what it does.
- **Removed "weekly live builds".** Only one live build (Tue Sep 29) is confirmed, so don't promise it as recurring.
- **Removed "creator workflow memberships".** That's the EZ Influencer Lab lane, which is a separate business.
- **Kept the compliance-style sentence** (what's sold, how it's delivered, no physical goods), since payment processors read it.

**Product order on the store:** 1. AI Agent Lab (featured) · 2. Agent Fleet Starter Kit.

**Links to add** (only real ones): `https://github.com/madezmedia/acmi`, plus Mikey's actual X/LinkedIn handles, if he wants them shown.

## Where the look is applied

| Surface | Source | Status |
|---|---|---|
| Whop store (banner, avatar, bio) | `content/brand/` | Mikey GO, delegated for upload |
| AI Agent Lab product page (gallery + copy) | `content/storefront/` | Mikey GO, delegated for upload |
| Lab member apps (Drop Hub, Checklist, Catalog, Roadmap) | `packages/whop-shared/src/theme.css` | Code done; needs `whop apps deploy` per app |
| ACMI bridge page | `bridge/acmi-5min/` | Live: https://acmi-5min.vercel.app |
| Meta ad creatives A/B/C (4:5, 1:1, 9:16) | `content/ads/creatives.html` → `content/ads/png/` | Ready; replaces Polar's earlier set |
| Welcome one-pager + Drop #1 cover | Design (Drive `04-AI-Agent-Lab`) | Already black/orange; Design to re-check tokens |

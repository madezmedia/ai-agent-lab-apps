# Fleet Whop Build Kit (2026-10-02)

**For:** Grok / grok-local / Chief of Staff. **From:** Claude (design + direction). **Mikey's ask:** "have grok bots set up Whop precisely using our design system and your direction; make sure they can access everything via Drive."

Drive folder (this kit): https://drive.google.com/drive/folders/1WEb49fsS2_RFauke11Wsy5EDCLoUqbyK
Report to ACMI: one `done` or `blocked` event per section, on the work item named in that section.

---

## 0. Rules (all sections)
1. **Visuals only.** Never change prices, plans, product names, descriptions, slugs, checkout links, waitlists or copy. Copy problems go in the report as flags.
2. **Lanes never mix.** Each business gets only its own assets, pixel and list:
   - Mad EZ / Agent Lab `biz_KcfL8Gsb1rw7SL`
   - EZ Influencer `biz_EFva9rJXKAfThM`
   - Modern Income Lab (MIL) `biz_OAm2latR36c47Y`
   - Off-Grid Water Vault (no business yet; see section 4)
   Never use the EZ Influencer list (66) for anything else.
3. **HITL.** Nothing is sent, posted, published to a list, charged or refunded without Mikey's GO. Creating a new business or product needs Mikey's GO.
4. **Precision check before each upload.** Download the file and confirm the size and the first 12 hex characters of its sha256 (tables below). If they don't match, stop and report it; don't upload.
5. **After each upload,** re-fetch the live store page and confirm the new `assets-2-prod.whop.com/.../uploads/<date>/<id>/image.png` serves the same sha256.
6. **Errors:** if a slot doesn't exist or the API no-ops (`banner_image` is a known no-op), log BLOCKED with the HTTP status and move on. Retry once at most. Never loop. The LoRA Blocked wave stays closed.
7. **Rollback log:** for every slot, record the old image URL and the new file id.
8. **Mirror to Drive.** Use `drive-push` to copy each section's PNGs into this folder under `/<lane>/`, so every bot reads the same bytes. The URLs below are the source of truth until the Drive copies are verified.

## Design systems (source of truth for look and claims)
| Lane | Design system | Asset host |
| --- | --- | --- |
| MIL | https://claude.ai/artifact/7gEdFPx35q4unKECUgUFvZ. Drive: "Modern Income Lab - Brand Assets" folder (brand guide, tokens.json, full asset kit doc) | `https://lab.madezmedia.com/mil/<file>` |
| EZ Influencer | https://claude.ai/artifact/SF5j3awzUWhMYkytozmwk8 | `https://lab.madezmedia.com/ez-influencer/<file>` |
| Mad EZ | brand chrome only | `https://lab.madezmedia.com/brand/logo/<file>` |
| Off-Grid Water Vault | paper #f3efe6, ink #12222c, blue #1c5d86, orange #c9561c (fill only), deep #0e1f29; Charter headlines; droplet mark with three level lines | `https://lytair.com/water/kit/<file>` |

The artifacts are private to Mikey. If a bot can't open one, use the Drive brand docs and the PNGs; never redraw an asset.

---

## 1. MIL: AI Opportunity Hub (`biz_OAm2latR36c47Y`, `prod_bclhrQQOnhJgD`). Report on `consumer-pop-funnel-20260930`
**Already DONE (verified 2026-10-02, byte-identical):**
- Store avatar: `7fe3e732`, which matches `02-store-avatar.png`.
- Store banner: `29533908`, which matches `01-store-banner.png`.

**Still to do:** the product page still shows the old images (`2d586f7d` hero, `3e938305` and `d80a987a` plan cards, `6981499f` plan-free kit).

| Slot | File | Size | sha256[:12] |
| --- | --- | --- | --- |
| Product cover/card | card-ai-opportunity-hub.png | 1920×1080 | 8e37b6b39bca |
| Product icon | icon-ai-opportunity-hub.png | 1024×1024 | 1f3dfff75e0d |
| Gallery 1 | gallery-01-whats-inside.png | 1920×1080 | 9294d90a3a47 |
| Gallery 2 | gallery-02-how-it-works.png | 1920×1080 | bba283ba7bcc |
| Gallery 3 | gallery-03-our-promise.png | 1920×1080 | 6b04497ab995 |
| Free plan image `plan_qwwWeH3iLeoKl` | plan-free.png | 1536×1024 | 7f232676f677 |
| $7 plan image `plan_jrfv5vZkYhxbA` | plan-starter-kit.png | 1536×1024 | 967a69e59506 |
| Start Here header | start-here-header.png | 1920×640 | d5983f5c5c72 |
| Email header (template only, never send) | email-header.png | 1200×400 | a7176fbacf88 |
| OG / social | 03-social-card.png | 1200×630 | 7649a734ef4b |

- **Gallery:** replace in order 1, 2, 3. Delete the old images only after all three show on the live page.
- **Plan cards:** the EZ run proved `plans_update.image` works. Use it.
- **HOLD, don't upload:**
  - `card-side-income-starter-kit.png`, `icon-side-income-starter-kit.png`, `cover-guidebook.png`, `cover-report.png`. The $7 kit contents aren't decided yet (Mikey's PIVOT call).
  - `cover-worksheet.png`. Upload it only if the free Files app's PDF title matches the cover; otherwise report the real title.
- **Quiz lander:** the steps in the Drive doc "MIL - Fleet prompt (asset swap + Mad EZ logo)", section 5, are unchanged. Deploy a preview first; the MIL pixel must still fire.

## 2. Mad EZ store (`biz_KcfL8Gsb1rw7SL`). Report on `agent-lab-traffic-execution-20260926`
**NOT DONE.** The 2026-09-30 logo upload (`922cab1d`) is a red speech-bubble/target glyph, not the EZ. mark. Neither it nor `e7056f9f` matches the kit.

| Slot | File | Size | sha256[:12] |
| --- | --- | --- | --- |
| Store avatar | https://lab.madezmedia.com/brand/logo/01-logo-avatar.png | 1024×1024 | 73971aca6664 |

- **Before swapping:** check ACMI/CoS for a newer Mikey decision about the glyph. If there's none, swap it and log both old ids.
- **Don't touch:** the Agent Lab product (`prod_abuw9zSNHSlCl`), plans `plan_a3r1JmyB7VZIO` and `plan_7a7WB6eEedwR7`, its images or its copy. The catalog assets were confirmed live on 09-27.

## 3. EZ Influencer (`biz_EFva9rJXKAfThM`). Report on `whop-ez-influencer-lab-ship`
**Accepted 2026-09-29.** Store 3/3, galleries 11/11 and icons 11/11 are live. **Bots have nothing left to upload here.**

**Mikey (dashboard, by hand):** 11 product covers, because the `banner_image` API no-ops. The file ids are already uploaded from the 09-29 run; the files are below.

| Product | Cover file | sha256[:12] |
| --- | --- | --- |
| EZ Influencer Lab | card-ez-influencer-lab.png | 21b63e650451 |
| Member Access | card-member-access.png | bae0c658d0db |
| Ops Membership | card-ops-membership.png | 375883a2ed78 |
| Hosted Agent Seat | card-hosted-agent-seat.png | 41c5ca999b21 |
| Credits Creator Pro | card-credits-creator-pro.png | 4e92d896c480 |
| Credits Pro Team | card-credits-pro-team.png | 85031d48aac4 |
| NextGen LoRA Lab | card-nextgen-lora-lab.png | 318f297cb835 |
| AI Music Starter Pack | card-ai-music-starter-pack.png | ad5b422feb08 |
| AI Music Creator Pro | card-ai-music-creator-pro.png | d86575d18d85 |
| Premium Studio Access | card-premium-studio-access.png | f8e33a1d2b20 |
| Folana's Inner Circle | card-folana-inner-circle.png | 2fdd5c61191e |

**Open, waiting on Mikey's decision:**
- Whether to strip the 2025 images from 4 product descriptions.
- The persona-chat redeploy.
- The webhook fix (branch `claude/fix-whop-webhook-401` @ e7dccd6): merge it, set the secret, re-enable the webhook, reconcile.

## 4. Off-Grid Water Vault (new lane, lytair.com). Report on `consumer-pop-funnel-20260930`
**STEP 0 needs Mikey's GO:** create a separate Whop business "Off-Grid Water Vault" with one free product and a free plan only.
- No paid plans and no prices.
- Never under Mad EZ, MIL or EZ, and no shared pixel.
- Until Mikey says GO, stage the assets and the channel text only.

After GO:

| Slot | File (`https://lytair.com/water/kit/`) | Size | sha256[:12] |
| --- | --- | --- | --- |
| Store banner | 01-store-banner.png | 1920×1080 | 73997271d018 |
| Store avatar | 02-store-avatar.png | 1024×1024 | 97b27a7002a8 |
| OG / social | 03-social-card.png | 1200×630 | 720ca7e882ea |
| Product card | card-water-vault.png | 1920×1080 | 1ffcf370ef7c |
| Gallery 1 | gallery-01-whats-inside.png | 1920×1080 | 5ca7c6e2a8d6 |
| Gallery 2 | gallery-02-the-plan.png | 1920×1080 | 9f1d5ab4837c |
| Gallery 3 | gallery-03-how-we-work.png | 1920×1080 | ed3dfb65d55d |
| `#water-plan` file | https://lytair.com/water/household-water-plan.pdf (cover: cover-water-plan.png) | 1275×1650 cover | e94bd05d30de |

**Channels:**
- `#start-here`: rules plus the affiliate disclosure line.
- `#announcements`: links to official boil-water notices (local utility, EPA) only. Never write your own "alerts".
- `#water-plan`: the free PDF.
- `#gear-notes`: each product with its affiliate disclosure and a "does / doesn't do" note. Use `https://uswaterrevolution.com/?tid=whop_vault#aff=madezmedia` here, and only here.
- `#member-setups`: members share their setups.

**Welcome DM (save as a draft; enabling it is Mikey's GO):**
> Welcome to the Off-Grid Water Vault.
> Step 1: grab the free Household Water Plan in #water-plan. It covers how much to store and how to make tap water safe (CDC and Ready.gov guidance).
> Step 2: share what your setup looks like in #member-setups, even if it's just a few jugs. Everyone starts there.
> Heads up: some gear links in #gear-notes are affiliate links, and we'll always say so.

**Never:**
- Vendor banners groups B or C.
- Fake alerts or countdowns, or claims about gallons, cost or health.
- Bot comments or invented testimonials.
- Mad EZ, MIL or EZ pixels on lytair.com or on this business.

**Not for Whop** (organic posts, by hand from Mikey's account): tip-01-how-much.png (233d60835272) and tip-02-make-it-safe.png (63efad3548c6).

---

## Report format (one ACMI event per section)
```
DONE|BLOCKED <section> cid=fleetWhopBuildKit-20261002 parent=claudeFleetWhopKit-20261002
<slot>: old=<url> new=<file_id> sha=<12hex> [x] | BLOCKED <http status/reason>
Unchanged: prices/plans/titles/descriptions/slugs/checkouts
Flags for Mikey: ...
```

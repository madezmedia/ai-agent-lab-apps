# GO run order: Fleet Whop Build Kit (Mikey GO 2026-10-02)

Mikey: "all 3 Go via grok bots, they can as long as images and files are in drive."
Rules: everything in `00 - Fleet Whop Build Kit (START HERE)` still applies (visuals only, lanes separate, hash checks, retry once at most, rollback log). cid `fleetWhopGo-20261002`, parent `claudeFleetWhopKit-20261002`.

## Gate A: Drive first (applies to every step below)
A file goes to Whop **only from its Drive copy**:
1. `drive-push` the file into its lane folder below.
2. Download the Drive copy back and check its sha256[:12] against the kit table.
3. Upload that copy to Whop.

If the hash doesn't match, that slot is BLOCKED.

| Lane | Drive folder | Source URL prefix | Files |
| --- | --- | --- | --- |
| MIL | https://drive.google.com/drive/folders/1w8rdBTC7hAbnCHLu0BlVdPYLFs5VXRYg | `https://lab.madezmedia.com/mil/` | Section 1 table, plus the $7 files in Step 3 |
| Mad EZ | https://drive.google.com/drive/folders/1ZUwMq08acLpcTUlu9XuYeaPetTmsJbAO | `https://lab.madezmedia.com/brand/logo/` | `01-logo-avatar.png` |
| EZ Influencer | https://drive.google.com/drive/folders/1rK73AtOIArC6jD6MhbQkLtnDUoCSsXEf | `https://lab.madezmedia.com/ez-influencer/` | the 11 `card-<slug>.png` |
| Water | https://drive.google.com/drive/folders/19tP9DpuMEVPumkDii9TuVA3aN2bQH72M | `https://lytair.com/water/kit/` and `https://lytair.com/water/household-water-plan.pdf` | Section 4 table, plus the PDF and `cover-water-plan.png` |

Post the list of Drive file ids to ACMI before Step 1 starts.

## Step 1: Off-Grid Water Vault business (GO)
1. Create a NEW Whop business "Off-Grid Water Vault". It must be standalone, never a product under Mad EZ, MIL or EZ.
2. Create one product, "Off-Grid Water Vault", with **one free plan ($0)**.
   - No paid plans, prices, trials or upsells.
   - Use the description below verbatim:
     > A free community for keeping your household's water plan simple: how much to store, how to store it, and how to make tap water safe during a boil-water notice (CDC and Ready.gov guidance). Some gear links are affiliate links, and we always say so.
3. Images (section 4 table):
   - banner and avatar on the store;
   - card, gallery 1–3, and OG on the product;
   - the PDF goes in `#water-plan`.
4. Create the channels exactly as listed in section 4. The affiliate link goes only in `#gear-notes`, with `tid=whop_vault`.
5. Welcome DM: save the section 4 text as a **draft, not enabled**. Today's GO covers the business, the covers and the $7 images, not outbound messages. Turning the DM on needs its own GO from Mikey. Never import or message any list.
6. Pixel: if Whop gives the business its own pixel, record its id. Never paste a Mad EZ, MIL or EZ pixel. Don't add any pixel to lytair.com; Claude does that.
7. Report:
   - the business id, product id, plan id and free checkout URL;
   - before Claude wires the URL into the lytair bridge, a screenshot of the public store page.

## Step 2: EZ Influencer covers (GO)
The `banner_image` API is a no-op, so use the **logged-in Whop dashboard (browser)** for each of the 11 products:
- set the cover/banner to the `card-<slug>.png` Drive copy;
- re-fetch the public product page and confirm the hash.

Change nothing else. Report the 11 slots as DONE or BLOCKED.

## Step 3: MIL $7 Side-Income Starter Kit images (GO, with one check)
The kit art lists **"90-day calendar · guidebook · report"**. The live listing only says "side-income starter kit and blueprints". An image must never promise something the $7 plan doesn't deliver.

1. Open what a $7 buyer actually gets (`plan_jrfv5vZkYhxbA`'s apps and files) and write down the real items and PDF titles.
2. Upload each image only if everything it names is really in the kit:

| File | Names | sha256[:12] |
| --- | --- | --- |
| plan-starter-kit.png | 90-day calendar, guidebook, report | 967a69e59506 |
| card-side-income-starter-kit.png | 90-day plan/calendar, guidebook | a09c20691922 |
| icon-side-income-starter-kit.png | (icon only) | 85bab7dde963 |
| cover-guidebook.png | the guidebook | 83d99325f3b7 |
| cover-report.png | report, "90-day plan to follow" | 30e3133db6ba |

3. If anything is missing or named differently, log BLOCKED with the real contents. Claude will re-render the art to match within the same day; don't edit the images yourself.
4. The icon can go up regardless.
5. Don't change the plan's price, name or description.

## Also in this run (already authorized by the kit)
- Section 1 of the kit: the rest of the MIL product slots. `plan-starter-kit.png` follows the Step 3 check.
- Section 2 of the kit: the Mad EZ avatar (check first for a newer Mikey decision about the glyph).

## Report
One ACMI event per step, using the format at the bottom of the kit, on:
- `consumer-pop-funnel-20260930`: water and MIL;
- `whop-ez-influencer-lab-ship`: EZ;
- `agent-lab-traffic-execution-20260926`: Mad EZ.

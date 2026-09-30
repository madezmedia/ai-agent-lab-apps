# Fleet prompt: Modern Income Lab asset swap plus the Mad EZ logo

Paste everything below the line to the fleet (Grok or the CoS). The source for every asset is `content/mil/kit.html`. The design system is https://claude.ai/artifact/7gEdFPx35q4unKECUgUFvZ.

---

**Task: replace the Modern Income Lab (MIL) visuals on Whop and the quiz lander, and swap the Mad EZ store avatar to the new EZ mark. This is a visuals-only change.**

## Hard rules
- Change only images and the lander stylesheet. Do not change prices, plans, product names, descriptions, checkout links or copy. The one exception is below, and only if Mikey says GO.
- MIL is its own business (`biz_OAm2latR36c47Y`). Keep its pixel, its lists and its copy separate. Never put Mad EZ or EZ Influencer assets on MIL, and never put MIL assets on them.
- Nothing is sent, published to a list, charged or refunded. Mikey approves anything outbound.
- Before you upload, download each file and check that it opens and matches the size listed. If a Whop slot doesn't exist or returns an error, log it as BLOCKED with the HTTP status and move on. Do not retry in a loop.
- Log the before and after (old image URL, new asset ID) for every slot so we can roll back.

Every file lives at `https://lab.madezmedia.com/mil/<file>`. The same paths work on `acmi-5min.vercel.app`.

## 1. MIL store (biz_OAm2latR36c47Y)
| Slot | File | Size |
| --- | --- | --- |
| Store banner | `01-store-banner.png` | 1920×1080 |
| Store avatar / logo | `02-store-avatar.png` | 1024×1024 (circle-safe) |

## 2. AI Opportunity Hub (prod_bclhrQQOnhJgD)
| Slot | File | Size |
| --- | --- | --- |
| Product cover / card | `card-ai-opportunity-hub.png` | 1920×1080 |
| Product icon | `icon-ai-opportunity-hub.png` | 1024×1024 |
| Gallery 1 | `gallery-01-whats-inside.png` | 1920×1080 |
| Gallery 2 | `gallery-02-how-it-works.png` | 1920×1080 |
| Gallery 3 | `gallery-03-our-promise.png` | 1920×1080 |

Replace the existing gallery images in this order. Remove the old ones only after the new three show on the live store page.

## 3. Plans (only if Whop exposes an image slot for plans)
| Plan | File |
| --- | --- |
| Free `plan_qwwWeH3iLeoKl` | `plan-free.png` (1536×1024) |
| $7 Side-Income Starter Kit `plan_jrfv5vZkYhxbA` | `plan-starter-kit.png` (1536×1024) |

If the $7 kit is shown as its own card anywhere, use `card-side-income-starter-kit.png` and `icon-side-income-starter-kit.png` there.

## 4. Inside the Hub
- **Start Here content header:** `start-here-header.png` (1920×640).
- **PDF covers** (1275×1650). Use each as page 1 of its PDF, or as the file thumbnail if Whop allows one:
  - `cover-worksheet.png`: the worksheet in the free Files app.
  - `cover-guidebook.png` and `cover-report.png`: the guidebook and report in the $7 kit.
  - The cover titles are working names. If a PDF's real title is different, report the real title and don't upload; Claude will re-render it.
- **Email header:** `email-header.png` (1200×400). Put it at the top of Email 1 and the drip templates. Do not send anything.

## 5. Quiz lander (https://mil-opportunity-audit.vercel.app, project `prj_sOGxTz5TWjZ1g6iOrMBG564luu2l`)
1. Replace the project's `styles.css` with `https://lab.madezmedia.com/mil/lander/styles.css`. It's a drop-in: the class names are unchanged, so no HTML edits are needed.
2. Copy the `fonts/` folder next to it (`https://lab.madezmedia.com/mil/lander/fonts/`: Plus Jakarta Sans 800 and Atkinson Hyperlegible 400/700, woff2).
3. Copy `03-social-card.png` into the project and add:
   `<meta property="og:image" content="https://mil-opportunity-audit.vercel.app/03-social-card.png">` plus a matching `twitter:image`.
4. Deploy a preview first. Check the hook screen, all 4 quiz questions on a phone width (390px), the email gate and the result screen. Compare with `content/mil/lander/preview/`. Then promote to production.
5. Make sure the MIL pixel still fires on the page view and the opt-in after the deploy.

## 6. Mad EZ Media store (biz_KcfL8Gsb1rw7SL)
- **Store avatar:** `https://lab.madezmedia.com/brand/logo/01-logo-avatar.png` (the new "EZ." mark that matches EZ Influencer Lab).
- Don't touch the Agent Lab product images, plans or copy.

## 7. Copy flagged for Mikey (do NOT change without his GO)
These are make-money-online claim risks on the lander. Report them back; don't edit them.
- Quiz answer "Generate a predictable $500 – $2,000/month on the side".
- Quiz answer "Replace my full-time income entirely".
- The headline "Boost Your Monthly Income" and the phrase "generate extra cash".
- The scripted "Calculating…" loading lines. They imply analysis that doesn't happen.
- The email gate needs consent wording ("We'll email your results and tips. Unsubscribe anytime.").

## Report back
Post one ACMI event on `consumer-pop-funnel-20260930` listing:
- each slot as DONE or BLOCKED, with its old and new URLs;
- the lander preview and production URLs;
- whether the pixel check passed;
- the real PDF titles, if they differ.

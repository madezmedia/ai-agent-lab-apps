# Elestio agent prompt: PostHog + n8n on madezmedia.com, autoresponders and delivery

Paste everything below the line to the Elestio/infra agent (CoS or grok-local). Mikey decided on 2026-10-01: use madezmedia.com subdomains.

---

**Task: stand up self-hosted PostHog and n8n on Elestio under madezmedia.com subdomains, then build lead autoresponders and purchase delivery using the same process that ships ACMI product sales.** Report each phase to ACMI as you finish it. Nothing is sent to a real person until Mikey gives a GO for that sequence.

## Hard rules
- **Lanes stay separate.** Mad EZ / AI Agent Lab and Modern Income Lab (MIL) get separate PostHog projects, separate n8n workflows, separate lead tables (or a `lane` column that every query filters on), and separate sending subdomains. Never use the EZ Influencer list (66) for either.
- **No PII in ACMI.** ACMI events carry a sha256 email hash (first 16 hex chars) and Whop ids only, never an email address.
- **Secrets live in Infisical** (`/madez/elestio/...`), never in a repo, a chat message or an ACMI summary. Hand Claude only public values (the PostHog `phc_` key and host, webhook URLs) plus the Infisical path for anything secret.
- **Webhooks always answer 2xx.** Whop has disabled our webhooks twice (Sep 8, Sep 30) after 72h of 4xx/5xx. Every webhook workflow responds 200 first ("Respond to Webhook" node right after the trigger), then verifies and processes. A bad signature means log it and drop it, never answer 401.
- **Nothing sends without Mikey's GO.** Build every sequence in test mode and send only to the seed inbox until Mikey approves that sequence by name.
- **No new claims.** Use the approved copy files listed below as written. Each email has an unsubscribe link and the physical mailing address (pending from Mikey; leave `[MAILING ADDRESS]` and block sends until it's filled).
- **No ad spend, ever, from this task.**

## Phase 0: DNS and hosts (madezmedia.com is at Namecheap; Mikey or the Namecheap holder adds records)

| Subdomain | Points to | Use |
| --- | --- | --- |
| `n8n.madezmedia.com` | Elestio n8n service (CNAME to its `*.elestio.app` host) | Workflows and webhooks |
| `insight.madezmedia.com` | Elestio PostHog service | PostHog UI and ingestion. Keep "posthog", "analytics", "track" and "metrics" out of the hostname so ad blockers don't drop events. |
| `mail.madezmedia.com` | Email provider (SPF, DKIM, return-path) | Sender for Mad EZ / Agent Lab |
| `mil-mail.madezmedia.com` | Email provider (its own SPF and DKIM) | Sender for Modern Income Lab, so a complaint spike in one lane can't hurt the other |
| `lab.madezmedia.com` | Vercel acmi-5min (already live) | Agent Lab landers and the /map/ Blitz opt-in |
| `audit.madezmedia.com` | Vercel `mil-opportunity-audit` (prj_sOGxTz5TWjZ1g6iOrMBG564luu2l) | MIL quiz lander. Mikey can rename it; it uses the MIL pixel only. |

- Don't touch the apex `madezmedia.com`, `www` or existing MX records.
- Add a DMARC record at `_dmarc.madezmedia.com` with `p=none` and a rua address first; tighten it after two clean weeks.
- Enable Let's Encrypt for each host in Elestio's "Custom domain names" settings.
- **Done when:** every host returns 200 over HTTPS and the email provider shows both sending subdomains verified.

## Phase 1: PostHog (self-hosted on Elestio)
1. Deploy PostHog. Back it up nightly to the Elestio snapshot.
2. Create two projects:
   - `madez-media`, with authorized URLs `lab.madezmedia.com` and `acmi-5min.vercel.app`.
   - `modern-income-lab`, with authorized URLs `audit.madezmedia.com` and `mil-opportunity-audit.vercel.app`.
3. Settings for both projects:
   - Session replay **off** until a consent banner exists (the UK and EU are in our geos).
   - IP capture off.
   - Data retention 12 months.
4. Send Claude the two `phc_` project keys and the host `https://insight.madezmedia.com`. These are public keys, so ACMI is fine for them.
   - Claude pastes the madez-media key into `bridge/acmi-5min/analytics.js`, deploys, and tests `blitz_optin`, `whop_claim_click`, `lab_click` and `pdf_download`.
   - Claude adds the MIL key to the MIL lander separately.
- **Done when:** Claude confirms the events show up in each project's live view.

## Phase 2: n8n (self-hosted on Elestio)
1. Deploy n8n backed by Postgres (not SQLite). Set `N8N_HOST=n8n.madezmedia.com`, `WEBHOOK_URL=https://n8n.madezmedia.com/`, and `N8N_ENCRYPTION_KEY` (from Infisical). Turn on basic auth or SSO for the editor.
2. Create a table in the same Postgres:
   - `leads(id, lane, email, email_hash, source, utm_source, utm_campaign, utm_content, country, status, created_at, unsubscribed_at, purchased_at)`
   - A unique index on `(lane, email)`.
3. Add an email provider credential (Postmark, Resend or SES; pick one with good deliverability) for each of the two sending subdomains.
- **Done when:** the editor is reachable at `https://n8n.madezmedia.com` and Postgres holds the table.

## Phase 3: lead autoresponders (the proven intake pattern)

### Workflow `list-blitz-leads` (lane `agentlab`)
- **Trigger:** POST `/webhook/list-blitz-leads`.
  - Respond 200 immediately.
  - Check the header `x-lead-secret` (value stored in Infisical); on a mismatch, log and stop.
- **Steps:**
  - Normalize the email.
  - Upsert into `leads` with `ON CONFLICT (lane, email) DO NOTHING`, so a duplicate means no second sequence.
  - Write the ACMI event `kind: lead` with `email_hash` and the UTMs only.
- **Sequence**, copy from `content/leadmagnet/list-blitz-plan.md` in madezmedia/ai-agent-lab-apps:
  - E0 immediately: the PDF link plus the free Whop claim.
  - E1 at +1 day, E2 at +3 days, E3 at +6 days.
  - Use n8n Wait nodes, or a scheduled job that reads `leads.status`.
- **Stop rules:**
  - Unsubscribed: stop.
  - Purchased (Phase 4 sets `purchased_at`): stop and move them to the buyer flow.
  - Bounced or complained: suppress.
- **Hand to Claude:** the webhook URL plus the Infisical path of the secret. Claude sets `LEAD_WEBHOOK_URL` and `LEAD_WEBHOOK_SECRET` on Vercel acmi-5min and runs the live submit test. A pass is the thanks page `?ok=1`, the row in Postgres and E0 in the seed inbox.

### Workflow `mil-quiz-leads` (lane `mil`)
- Same pattern.
- **Trigger:** POST `/webhook/mil-quiz-leads` from the MIL lander's `WEBHOOK_URL` in `app.js`.
- **Sender:** "Modern Income Lab" from `mil-mail.madezmedia.com`.
- **Copy:**
  - Email 1 plus the 5-part drip staged at `/workspace/consumer-pop-funnel-20260930/emails/drip-5.md`.
  - **Remove** the Day 3 "How John made $900" case study. It's an invented testimonial.
  - Keep the earnings disclaimer in every email.
  - The Day 7 bridge to Agent Lab goes only to people who opt in as advanced/tech users (Mikey's earlier decision). Never copy MIL leads into the Agent Lab table.

### Unsubscribe
- One workflow per lane, GET `/webhook/unsub?l=<lane>&t=<token>`.
- The token is an HMAC of the email.
- It sets `unsubscribed_at` and shows a plain "You're unsubscribed" page.

## Phase 4: purchase delivery (the ACMI product delivery process)
This is the same flow that ships ACMI Starter Kit and Lab sales (`madezmedia/acmi-product` `api/whop-webhook.mjs`), now running in n8n:

1. **Signed webhook in.** Create one Whop webhook per business, pointing at n8n:
   - Mad EZ `biz_KcfL8Gsb1rw7SL` → `/webhook/whop-madez`
   - MIL `biz_OAm2latR36c47Y` → `/webhook/whop-mil`
   - Events: `payment.succeeded`, `membership.went_valid`, `membership.went_invalid`, `refund.created`.
   - Store each webhook's secret in Infisical.
2. **Respond 200 first, then verify.** Verify the Standard Webhooks signature in a Code node:
   - Headers: `webhook-id`, `webhook-timestamp`, `webhook-signature`.
   - Signed content: `id.timestamp.body`.
   - HMAC-SHA256, base64-encoded, compared against each `v1,<sig>` in the header.
   - Reject timestamps older than 5 minutes.
   - Key: try the secret's UTF-8 bytes, and for a `whsec_` secret the base64-decoded remainder. This is the fix that just shipped for EZ.
   - Invalid means log critical and stop, still with a 200.
3. **Idempotency.**
   - Key on `webhook-id`, with a 24h dedupe table `whop_events(webhook_id primary key, received_at)`.
   - A duplicate stops right there.
   - If the dedupe store is down, process anyway. Dedupe must never block a delivery.
4. **ACMI revenue event.** Write an event in the shape below to `acmi:madez:thread:revenue:timeline`. MIL uses its own revenue thread.

   `{ source: "whop:webhook", kind: "purchase|subscription-created|subscription-cancelled|refund", correlationId: "whopPurchase<tier>-<ts>", summary: "[purchase <tier> @mikey] $<amount> via Whop", payload: { tier, amount_usd, buyer_email_hash, whop_member_id, plan_id } }`
5. **Provision and deliver.** Whop already delivers the product (apps, Files, receipt). n8n sends the confirmation and onboarding email and marks the lead as a buyer:
   - **Agent Lab $1 trial** (`plan_a3r1JmyB7VZIO`):
     - A welcome email or DM within 5 minutes, then the Day 2 and Day 3 convert messages from `content/messages/p0-welcome-dm.md`.
     - Every message states the First Agent Guarantee exactly as `content/storefront/guarantee.md` gives it.
   - **Agent Lab full** (`plan_7a7WB6eEedwR7`): the welcome email plus the Drop #1 deep link.
   - **MIL free** (`plan_qwwWeH3iLeoKl`): the Start Here link. **MIL $7** (`plan_jrfv5vZkYhxbA`): a "your Starter Kit is ready" email with the Hub link. Hold the $7 email until Mikey settles what the kit contains (license review).
   - **Cancellation or refund:** stop every sequence for that member and log `subscription-cancelled` or `refund`. Never send a "come back" email without Mikey's GO.
   - Set `leads.purchased_at` wherever the email matches in the same lane.
6. **Smoke test** before Mikey's GO:
   - Make one real $1 trial purchase with a test account.
   - Confirm all of these: the 200 response, the dedupe row, the ACMI revenue event (hash only), the welcome email in the seed inbox, and Whop access.
   - Then refund and cancel the test purchase in the Whop dashboard (Mikey's hands; Claude never refunds) and confirm the cancel event stops the sequence.

## Phase 5: report to ACMI
Post one event on `agent-lab-traffic-execution-20260926` (Agent Lab parts) and one on `consumer-pop-funnel-20260930` (MIL parts). Include:
- the hostnames, each with HTTPS 200;
- both PostHog `phc_` keys and the host;
- each n8n webhook URL plus the Infisical path of its secret;
- the result of each Phase 3 and 4 test;
- anything BLOCKED, with the exact error.

Then stop. Mikey gives a GO per sequence (Blitz E0–E3, MIL drip, trial welcome/convert, MIL $7 delivery) before any real send, and a separate GO before the $20 Blitz spend.

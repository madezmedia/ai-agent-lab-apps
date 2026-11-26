# Fleet FB Traffic Agent Build Spec

Date: 2026-10-02
Source reviewed: https://fbtrafficagent.com/ and public search snippets checked 2026-10-02
Goal: build a compliant fleet-native Facebook traffic engine for Lytair, Whop offers, affiliate lanes, and future products.

Research status: This is a dated snapshot. Recheck product facts, links, platform rules, and claims before implementation or use.
Publishing gate: Draft only. No private member data, automated posting, public content, or outbound contact without exact approval.

## Product Boundary

We should not build a spam bot. We should build a traffic operations system that helps humans and agents:

- find likely buyer communities and topics,
- generate native Facebook post ideas,
- generate image and Reel creative,
- score content for compliance/spam risk,
- route assets through human approval,
- track clicks and revenue,
- learn which hooks and placements work.

No private-group scraping, cold-DM blasting, credential sharing, fake engagement, fake testimonials, or evasion of Meta policies.

## Competitor Feature Map

Observed feature claims from FB Traffic Agent:

- Buyer-Finder AI that finds Facebook locations with buyers.
- 7 ready-to-paste native posts.
- 1-click pictures for every post.
- Reel maker: URL to script, voiceover, and 9:16 MP4.
- Buyer Vault with 1,200+ Facebook pockets.
- First sale / first $100 playbook.
- Native-post safeguard score.
- Hook library.
- Community/Discord.

Fleet-native version:

- Buyer Map Agent
- Native Post Agent
- Creative Agent
- Reel Agent
- Safeguard Agent
- Hook Library
- Buyer Vault CRM
- Approval + Scheduler
- Tracking + Revenue Attribution
- ACMI learning loop

## MVP Feature Set

### 1. Buyer Map Agent

Purpose: find compliant places/topics where buyers already gather.

Inputs:

- Offer URL or description
- Target niche
- Excluded niches/claims
- Geography
- Product type: affiliate, Whop, lead magnet, service

Outputs:

- Public Facebook Pages/groups to review manually
- Adjacent communities
- Topic clusters
- Search queries
- Post angle suggestions
- Risk notes

Rules:

- Publicly discoverable surfaces only unless the human has explicit membership/access.
- No automated posting into groups without human approval.
- Do not store private member data.

Data fields:

- `surface_name`
- `surface_url`
- `surface_type`
- `niche`
- `buyer_intent_signal`
- `posting_rules_summary`
- `risk_level`
- `recommended_angle`
- `last_verified_at`

### 2. Native Post Agent

Purpose: produce Facebook-native posts that do not read like ad copy.

Inputs:

- Offer
- Audience pain
- CTA type: comment, click, save, opt-in, Whop checkout
- Compliance constraints

Outputs:

- 7-day post plan
- Post variants by tone
- CTA variants
- Disclosure variants where needed

Post types:

- personal lesson
- myth correction
- checklist
- buyer mistake
- before/after without fake claims
- question prompt
- resource share

### 3. Creative Agent

Purpose: create image prompts and assets for posts.

Outputs:

- 1 image prompt per post
- Canva/social post brief
- optional generated image
- visual compliance notes

Rules:

- No fake screenshots.
- No fake earnings.
- No fake customer messages.
- No misleading “official” platform lookalikes.

### 4. Reel Agent

Purpose: convert URL/offer/page into 9:16 short-form video plan.

MVP output before automation:

- 30-60 second script
- shot list
- text overlays
- voiceover script
- b-roll prompt
- CTA
- UTM link

Later automation:

- generate voiceover
- generate 9:16 MP4
- export captions
- queue for approval

### 5. Native-Post Safeguard Agent

Purpose: score posts before publishing.

Scores:

- spam risk
- platform-risk language
- unsupported claim risk
- affiliate disclosure risk
- emergency/medical/financial claim risk
- duplicate content risk
- CTA aggressiveness

Output:

- `green`: safe to approve
- `yellow`: edit before posting
- `red`: blocked until rewritten

Example blocked phrases for Lytair:

- “purifies radiation”
- “virus-proof”
- “cure contamination”
- “guaranteed safe”
- “free water from air”

Compliant alternatives:

- “gravity-fed backup storage”
- “reduces sediment and particulate matter down to documented micron rating”
- “check the manufacturer’s documented conditions”
- “planning guide, not a safety guarantee”

### 6. Hook Library

Purpose: keep proven openings by niche.

Fields:

- `hook`
- `niche`
- `format`
- `emotion`
- `risk_level`
- `used_count`
- `ctr`
- `opt_in_rate`
- `revenue_per_click`

Initial Lytair hooks:

- “Your emergency water kit is probably missing the boring part.”
- “An atmospheric water generator is not free water.”
- “A rain barrel is not a drinking-water plan by itself.”
- “The first water-prep purchase most people skip is a spigot.”
- “Stop asking what the best water filter is.”

### 7. Buyer Vault CRM

Purpose: build our own vetted opportunity library.

Rows:

- Facebook public page/group/topic
- audience
- posting rules
- examples of accepted post style
- risk notes
- last checked date
- suitable offers
- owner/agent assigned

This should be managed like a CRM, not scraped blindly.

### 8. Approval + Scheduler

MVP:

- draft queue
- approve/reject/rewrite
- copy-to-clipboard publishing
- UTM generation

Later:

- official Meta Graph API publishing for owned Pages where connected and permitted
- scheduling calendar
- approval logs

### 9. Tracking + Revenue Attribution

Track:

- post id / asset id
- surface
- UTM campaign
- click count
- opt-in count
- Whop checkout click
- Whop sale
- affiliate outbound click
- estimated revenue

ACMI events:

- `buyer-surface-added`
- `post-draft-created`
- `post-approved`
- `creative-generated`
- `reel-script-created`
- `post-published-manual`
- `first-click`
- `first-opt-in`
- `first-sale`
- `safeguard-blocked`

## Agent Fleet Roles

- `agent:traffic-strategist`: picks offers, audience, and campaign angle.
- `agent:buyer-map`: finds and scores buyer surfaces.
- `agent:postsmith`: writes native post batches.
- `agent:creative`: generates image briefs/assets.
- `agent:reelmaker`: generates short-form scripts and video specs.
- `agent:safeguard`: blocks risky claims and spam patterns.
- `agent:analytics`: tracks clicks, opt-ins, and revenue.
- `agent:publisher`: queues approved assets; no autonomous posting until connected and explicitly approved.

## Suggested Data Model

### Campaign

```json
{
  "id": "water-vault-fb-traffic-01",
  "offer": "Off-Grid Water Vault Starter Kit",
  "status": "draft",
  "owner": "codex",
  "niche": "household water preparedness",
  "cta_url": "https://lytair.com/water/vault-kit/",
  "utm_campaign": "water-vault-fb-traffic-01"
}
```

### Post Draft

```json
{
  "id": "post-001",
  "campaign_id": "water-vault-fb-traffic-01",
  "hook": "Your emergency water kit is probably missing the boring part.",
  "body": "...",
  "cta": "Get the free 7-day plan",
  "risk_score": "green",
  "approval_status": "pending",
  "utm_url": "https://lytair.com/water/vault-kit/?utm_source=facebook&utm_medium=organic_social&utm_campaign=water-vault-fb-traffic-01&utm_content=post-001"
}
```

### Buyer Surface

```json
{
  "id": "surface-001",
  "name": "Example public preparedness page",
  "url": "https://facebook.com/example",
  "surface_type": "public_page",
  "posting_allowed": "unknown",
  "risk_level": "yellow",
  "notes": "Needs manual rule review before posting."
}
```

## Build Phases

### Phase 0: Spec + Governance

- Create ACMI work item.
- Define no-go actions.
- Define claim policy.
- Define approval workflow.

### Phase 1: No-API MVP

- Buyer Vault markdown/JSON.
- Post batch generator.
- Safeguard scoring rubric.
- Hook library.
- UTM builder.
- Manual publish checklist.

### Phase 2: Creative Pack

- Canva briefs or image prompts.
- Reel scripts.
- Voiceover scripts.
- 9:16 storyboard templates.

### Phase 3: Internal Tool

- Simple local web dashboard:
  - campaigns
  - buyer surfaces
  - post drafts
  - safeguard status
  - copy buttons
  - UTM links
  - performance fields

### Phase 4: Integrations

- Official Meta Graph API for owned Pages if app/account access is approved.
- Whop webhook revenue attribution.
- GA4/PostHog/server-side click tracking.
- Google Drive export for campaign packs.

## First Campaign: Lytair / Off-Grid Water Vault

Campaign id: `water-vault-fb-traffic-01`

Offer:

- Free 7-Day Household Water Plan
- Whop Starter Kit
- Lytair product guide pages

First 7 posts:

1. “Your emergency water kit is probably missing the boring part.”
2. “An atmospheric water generator is not free water.”
3. “A rain barrel is not a drinking-water plan by itself.”
4. “The first water-prep purchase most people skip is a spigot.”
5. “Stop asking what the best water filter is.”
6. “Apartment water prep is different.”
7. “Do not put direct shopping links in your emergency PDF.”

First Reel batch:

- AWG reality check
- apartment water plan
- rain barrel warning
- storage-first kit
- filter myth correction

## Immediate Tickets

1. Create ACMI work item `facebook-traffic-agent-fleet-20261002`.
2. Draft first 7 Lytair Facebook posts.
3. Draft 7 image prompts.
4. Draft 5 Reel scripts.
5. Create safeguard scoring rubric.
6. Create Buyer Vault schema.
7. Create UTM builder spec.
8. Define dashboard MVP fields.
9. Assign fleet lanes.
10. Build first local prototype only after repo target is chosen.

## Sources

- FB Traffic Agent public page/search snippet, checked 2026-10-02: https://fbtrafficagent.com/
- CopeCart checkout snippet describing FB Traffic Agent, checked 2026-10-02: https://copecart.com/us/products/2b5eb670/checkout
- Meta Business Agent announcement for official business-agent direction, checked 2026-10-02: https://about.fb.com/news/2026/06/meta-business-agent/amp/

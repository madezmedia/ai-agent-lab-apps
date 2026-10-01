# Elestio ticket: deploy n8n + Postgres on the ACMI VM (server-side only)

Open this as a **new ticket**. It is the ticket's whole scope. Paste everything below the line.

The rest of the pipeline is out of scope for the server agent and has named owners (see the bottom): DNS, PostHog, the email provider, Whop webhooks, the workflows themselves, and any sending.

---

**Ticket: deploy self-hosted n8n with a Postgres database as a new docker-compose project on this VM, reachable at `https://n8n.madezmedia.com`. Do not touch any existing service.**

## Before you start (owner: Mikey)
- [ ] Mikey adds a DNS record at Namecheap: `A n8n.madezmedia.com → <this VM's public IP>`. The agent posts the IP in the ticket first.
- [ ] Take a backup or snapshot of the VM before any change.

## Scope: do exactly this
1. **New project folder** (Elestio convention), e.g. `/opt/app/n8n/`. Use relative paths only and `restart: always`, and bind ports to `172.17.0.1` only.
2. **`.env` file** in that folder, `chmod 600`, generated on the box. Never print the values, never paste them into the ticket or chat, never commit them.
   - `POSTGRES_PASSWORD=<random 32+ chars>`
   - `N8N_ENCRYPTION_KEY=<random 32+ chars>`

   Then post only the **file path** in the ticket. Mikey copies the values into Infisical.
3. **`docker-compose.yml`:**
   ```yaml
   services:
     postgres:
       image: postgres:16
       restart: always
       environment:
         POSTGRES_USER: n8n
         POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
         POSTGRES_DB: n8n
       volumes:
         - ./pgdata:/var/lib/postgresql/data
       healthcheck:
         test: ["CMD-SHELL", "pg_isready -U n8n -d n8n"]
         interval: 10s
         retries: 10
     n8n:
       image: n8nio/n8n:<current stable tag — pin it, don't use latest>
       restart: always
       ports:
         - "172.17.0.1:5678:5678"
       environment:
         DB_TYPE: postgresdb
         DB_POSTGRESDB_HOST: postgres
         DB_POSTGRESDB_DATABASE: n8n
         DB_POSTGRESDB_USER: n8n
         DB_POSTGRESDB_PASSWORD: ${POSTGRES_PASSWORD}
         N8N_ENCRYPTION_KEY: ${N8N_ENCRYPTION_KEY}
         N8N_HOST: n8n.madezmedia.com
         N8N_PROTOCOL: https
         N8N_PORT: 5678
         WEBHOOK_URL: https://n8n.madezmedia.com/
         N8N_SECURE_COOKIE: "true"
         N8N_DIAGNOSTICS_ENABLED: "false"
         GENERIC_TIMEZONE: America/New_York
       volumes:
         - ./n8n_data:/home/node/.n8n
       depends_on:
         postgres:
           condition: service_healthy
   ```
4. **Reverse proxy.** Add `n8n.madezmedia.com` to the existing nginx, following Elestio's documented method, and proxy to `172.17.0.1:5678`.
   - Include the WebSocket upgrade headers (`Upgrade`, `Connection`). n8n's editor needs them.
   - Issue TLS with the box's standard certificate method.
   - Don't modify any other server block.
5. **Leads table** in the same Postgres. Run it once with psql inside the container:
   ```sql
   CREATE TABLE IF NOT EXISTS leads (
     id bigserial PRIMARY KEY,
     lane text NOT NULL CHECK (lane IN ('agentlab','mil')),
     email text NOT NULL,
     email_hash text NOT NULL,
     source text, utm_source text, utm_campaign text, utm_content text, country text,
     status text NOT NULL DEFAULT 'new',
     created_at timestamptz NOT NULL DEFAULT now(),
     unsubscribed_at timestamptz, purchased_at timestamptz,
     UNIQUE (lane, email)
   );
   CREATE TABLE IF NOT EXISTS whop_events (
     webhook_id text PRIMARY KEY,
     received_at timestamptz NOT NULL DEFAULT now()
   );
   ```
6. **Backups.** Add a nightly `pg_dump` of the `n8n` database to `./backups/`, keeping 14 days, plus whatever Elestio snapshot policy already covers this VM.
7. **Verify, then stop.**
   - `docker compose ps` shows both containers healthy.
   - `https://n8n.madezmedia.com` returns 200 and shows the n8n **owner setup** page.
   - Existing services are unchanged: nginx, ACMI Redis, the ACMI bridge, Gitea, Kmize and Postfix all still respond as before.

## Out of scope: do NOT
- Create the n8n owner account. Mikey does that on first visit.
- Build or import workflows, add credentials, or create webhooks.
- Configure Postfix for sending, or send any email.
- Touch DNS, Vercel, Whop, PostHog or Infisical.
- Expose Postgres outside the Docker network.

## Done report (post in the ticket)
- Project path; compose file and nginx block (no secret values).
- The `.env` path, so Mikey can copy it to Infisical.
- Health check output.
- Confirmation that the existing services are unaffected.

---

## Everything else, with owners (not part of the ticket)

| Step | Owner | Notes |
| --- | --- | --- |
| DNS for n8n plus the email sending subdomains (`mail.`, `mil-mail.`) and DMARC | Mikey (Namecheap) | The email provider dashboard lists the exact records |
| PostHog | Mikey signs up for **PostHog Cloud (US)** and creates two projects: `madez-media` and `modern-income-lab` | Don't self-host it on this VM: PostHog self-hosting needs ClickHouse, Kafka and about 16 GB of RAM. The free cloud tier covers this volume. Send Claude the two `phc_` keys; Claude wires `lab.madezmedia.com` and the MIL lander. |
| Email provider (Postmark, Resend or SES) with both sending subdomains verified | Mikey or CoS | Don't use the VM's Postfix for marketing mail; deliverability would suffer |
| n8n owner account, then the credentials (email provider, Postgres) | Mikey | Values stay in Infisical |
| Workflows: `list-blitz-leads`, `mil-quiz-leads`, unsubscribe, `whop-madez`, `whop-mil` | CoS, or Claude via the n8n editor/API once Mikey creates a scoped n8n API key | Spec: `content/ops/elestio-agent-prompt.md`, Phases 3–4 |
| Whop webhooks pointing at n8n | Mikey (Whop dashboard) | Store the secrets in Infisical |
| `LEAD_WEBHOOK_URL` / `LEAD_WEBHOOK_SECRET` on Vercel, then the live submit test | Claude | After the `list-blitz-leads` workflow exists |
| Every real send, and the $20 Blitz spend | Mikey's GO, given separately for each | |

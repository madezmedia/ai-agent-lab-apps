# AI Agent Lab Apps

Whop custom apps monorepo for Mad EZ Media **AI Agent Lab**.

Company: `biz_KcfL8Gsb1rw7SL` (Mad EZ Media).

Product to attach later, from the Whop dashboard only: `prod_abuw9zSNHSlCl`. This repo does not call `experiences_attach` and does not create new Whop apps.

## Deploy Starter Checklist first

The page at https://starter-checklist.whop.site that says “There’s no app here (yet) / run whop apps deploy” is Whop hosting with no promoted build. A Next.js or Vercel deploy does not fill `*.whop.site`. `whop apps deploy` only accepts a Vite app that emits `dist/whop-build.zip`.

`apps/starter-checklist` is that app. It is already linked to the existing registration. Do not run `whop apps init`.

| | |
|--|--|
| App ID | `app_6rPTq6E2yzuohZ` |
| Route | `starter-checklist` |
| Live host | https://starter-checklist.whop.site |
| Link file | `apps/starter-checklist/whop.app.json` |
| Stack | TanStack Start, Vite, Cloudflare (`@whop/cli/vite` + `@cloudflare/vite-plugin`) |

From a machine logged into the Mad EZ Whop account:

```bash
pnpm install
cd apps/starter-checklist
npx whop auth login
pnpm deploy
```

`pnpm deploy` in that directory runs `whop apps deploy`. The CLI walks upward from the current directory to find `whop.app.json`, so the command has to run inside `apps/starter-checklist` (or a subdirectory). `pnpm --filter starter-checklist deploy` does that.

What deploy does:

1. `tsr generate && vite build` writes `dist/client`, `dist/server/index.js`, and `dist/whop-build.zip`.
2. `tsc --noEmit` typechecks.
3. The CLI uploads the build archive and a git source archive, then promotes it onto `starter-checklist` unless you pass `--preview`.

After the promote finishes, reload https://starter-checklist.whop.site. The placeholder is gone.

Paths Whop hosting already expects:

| View | Path |
|------|------|
| Experience | `/experiences/[experienceId]` |
| Dashboard | `/dashboard/[companyId]` |
| Discover | `/discover` |

Whop hosting injects `APP_ID`, `BUILD_ID`, `WHOP_API_ORIGIN`, and `WHOP_ACCOUNT_ID`, and signs server fetches to the Whop API. Do not put `WHOP_API_KEY` in the repo or in client code. `whop apps dev` can inject a temporary key locally after login. `/dev/preview` renders the checklist only while `vite dev` is running. The production build returns 404 for that path. Do not add a secret that turns it on.

What a visitor sees:

- No iframe token, or `checkAccess` says no access: **Access denied**. The four steps stay hidden.
- A member inside the experience, after a successful access check: Unlock the path kit → Open Files → Post in the Forum → Ship your first build.
- `/discover` is public.
- Dashboard requires `access_level === "admin"`.

### Vercel base URL

Pointing this app at a Vercel URL in the Whop dashboard does not replace https://starter-checklist.whop.site. That host is filled only by `whop apps deploy`. An external base URL is a different hosting mode: Whop iframes your server, and that server must serve the three paths above. Use it only if you are deliberately leaving Whop hosting. The deploy path for `app_6rPTq6E2yzuohZ` is the command above.

## Apps

| App | Package | Whop app ID | Dev port | Host |
|-----|---------|-------------|----------|------|
| Starter Checklist | `apps/starter-checklist` | `app_6rPTq6E2yzuohZ` | 3004 | https://starter-checklist.whop.site |
| Weekly Drop Hub | `apps/weekly-drop-hub` | `app_WnJ3J7nEXu3Sl7` | 3001 | https://weekly-drop-hub.whop.site |
| Agent Profile Catalog | `apps/agent-profile-catalog` | `app_YP1g8RQygUeXKs` | 3002 | https://agent-profile-catalog.whop.site |
| Roadmap Vote | `apps/roadmap-vote` | `app_2uAwcCSXpXHmrm` | 3003 | https://roadmap-vote.whop.site |

All four apps ship with `whop apps deploy`. Drop Hub, Catalog, and Roadmap use the same Vite zip pack as Starter Checklist (`dist/whop-build.zip`). Their old Next.js trees under `app/` are not what Whop hosting serves. App IDs stay as registered. Do not run `whop apps init`. Do not call `experiences_attach` from this repo.

Shared JWT verification, access interpretation, and the lab theme live in `packages/whop-shared`. The Next apps also use `@whop/sdk` `users.checkAccess` through `packages/whop-shared` auth. The checklist worker calls `GET /api/v1/users/{id}/access/{resource_id}` so hosting can attach the API key. No member profile is fetched or rendered.

`@whop/sdk` 2.0 does not export `verifyUserToken`. `packages/whop-shared` verifies the iframe JWT the same way the previous official helper did: header `x-whop-user-token`, algorithm ES256, issuer `urn:whopcom:exp-proxy`, JWKS `https://api.whop.com/.well-known/jwks.json`, audience equal to the app id (`APP_ID`, `WHOP_APP_ID`, or `NEXT_PUBLIC_WHOP_APP_ID`, with `app_6rPTq6E2yzuohZ` as the checklist fallback).

## Prerequisites

- Node.js 20 or newer
- pnpm 10 (`corepack enable` then `corepack prepare pnpm@10.33.3 --activate` if `pnpm` is missing)
- Whop CLI login (`npx whop auth login`) before `whop apps deploy`

## Install

From the repo root:

```bash
pnpm install
```

## Environment

Never commit a real API key. `.env`, `.env.local`, and `.env.*.local` are gitignored.

Next.js apps commit only the public app id in `.env.development` and `.env.production` so `@whop/react` can boot. Copy that app's `.env.example` to `.env.local` and set `WHOP_API_KEY` there when you need `checkAccess` locally.

Starter Checklist does not commit an app id env file. The id is in `whop.app.json`. Hosting injects the API key on server fetches. For local dev against the Whop API, `whop apps dev` from `apps/starter-checklist` injects `WHOP_API_KEY` after login. A missing or invalid token fails closed to **Access denied**. HTTP 401 from the access API renders the configuration message. Other API failures render **Access check unavailable**.

## Develop

```bash
pnpm dev:checklist    # Starter Checklist (Vite) on port 3004
pnpm dev:hub          # Weekly Drop Hub on port 3001
pnpm dev:catalog      # Agent Profile Catalog on port 3002
pnpm dev:roadmap      # Roadmap Vote on port 3003
```

`pnpm dev` starts all four through Turborepo.

Checklist local design route: `pnpm dev:checklist`, then open http://localhost:3004/dev/preview. That path 404s in the production build.

Next.js `dev` scripts run the Whop dev proxy so localhost receives `x-whop-user-token`. `dev:next` on those apps skips the proxy. Their `/dev/preview` route renders member UI only when `NODE_ENV` is not `production`.

## Build and test

```bash
pnpm test
pnpm --filter starter-checklist build
pnpm --filter starter-checklist typecheck
pnpm build
```

`pnpm --filter starter-checklist build` is the artifact `whop apps deploy` uploads. Confirm the log line `[whop] packed … → dist/whop-build.zip` before deploying.

`pnpm build` also runs `next build` for Weekly Drop Hub, Catalog, and Roadmap.

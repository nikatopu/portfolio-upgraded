# 08 — Going live: accounts, keys and the database

The visitor log and the quote form are fully built and tested locally (2026-11-04). To make them work on nikatopu.dev you need three free accounts/settings. About 30 minutes, once.

**Locally, none of this is needed to run the site.** Without `DATABASE_URL`, `npm run dev` shows sample notes on the wall and the forms reply "not available". Emails print to the terminal and the captcha is skipped.

**To test the forms locally with a real database:** in the Neon console, create a **branch** of your database (e.g. `dev`) and put *that branch's* connection string in `.env.local` as `DATABASE_URL`, then run `npm run db:migrate` once against it (temporarily point `.env.production.local` at the branch, or run `DATABASE_URL=… npm run db:migrate`). Never put the production URL in `.env.local`.

> An embedded local database (PGlite) was tried and removed on 2026-11-04: Turbopack pulled its 8.7 MB WASM engine into the dev bundle and re-processed it on every change, crashing `next dev` with out-of-memory.

## 1. Database: Neon (via Vercel)
1. Vercel → your project → **Storage** → **Create** → **Neon** (Marketplace). Connect it to the project for Production + Preview. This adds `DATABASE_URL` automatically.
2. Copy the connection string. **Without the Vercel CLI:** Vercel → Storage → your Neon database → **.env.local** tab → show secret → copy the `DATABASE_URL` line.
   (With the CLI instead: `npm i -g vercel`, `vercel login`, `vercel link`, then `vercel env pull .env.production.local --environment=production`.)
3. Paste it into a new file **`.env.production.local`** in the project root (git-ignored). **Not** `.env.local`: Next loads that one in dev too, so `npm run dev` would write test data into production.
4. Create the tables:
   ```bash
   npm run db:migrate
   ```
5. Later schema changes: edit `src/lib/db/schema.ts` → `npm run db:generate` → `npm run db:migrate`.
6. To browse the data: `npm run db:studio`.

## 2. Secrets
Generate a secret: `openssl rand -base64 48`. In Vercel → Settings → Environment Variables:
- `APP_SECRET`: that value. It signs review links and admin sessions, and salts IP hashes.
- `ADMIN_PASSWORD`: a long password for `/admin`.

## 3. Spam protection: Cloudflare Turnstile (free)
1. dash.cloudflare.com → **Turnstile** → **Add widget** → hostname `nikatopu.dev` (add `localhost` too if you want to test real keys locally) → mode **Managed**.
2. Add `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` in Vercel.
3. The widget runs in "interaction-only" mode, so most visitors never see it.

## 4. Domain
Vercel → Domains: make **`nikatopu.dev` primary** and redirect `www` to it (canonical URLs point at the apex).

## 5. Smoke test after deploying
- [ ] Leave a note and a drawing → both appear under *Waiting for review* in `/admin` → Approve → they show on the wall within seconds
- [ ] Send a quote request → it appears under *Quote requests* in `/admin`
- [ ] `/admin` → sign in → the note, the lead and the tap counters are there
- [ ] Ask 5–10 colleagues for real notes before announcing (an empty wall looks sad)

## What happens if something's missing (by design)
| Missing in production | Effect |
|---|---|
| `DATABASE_URL` | Wall is empty; forms say "not available right now"; site otherwise fine |
| Turnstile keys | Forms reject submissions (fail closed, no spam gets in). **Required for launch.** |
| `APP_SECRET` | Forms and admin error out. Required. |
| `ADMIN_PASSWORD` | `/admin` shows a "not configured" message |

## Launch checklist (2026-11-07)
**Done and verified on a production build**
- Lighthouse (mobile): homepage performance 95 (LCP 2.9 s, CLS 0), accessibility / best practices / SEO 100. The case page scored 100 on performance; its other scores were affected by a test-environment glitch.
- `robots.txt` keeps `/admin` and `/api/` out of search; security headers on every page
- Georgian `/ka` stays out of search, the sitemap and the language toggle until ≥80% is translated, then goes public automatically
- Privacy notes on both forms; IPs stored only as salted hashes

**You need to do before deploying**
1. Vercel → Environment Variables (Production): `DATABASE_URL` (Neon), `APP_SECRET`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`
2. `npm run db:migrate` against the production database (`.env.production.local`)
3. Vercel → Domains: `nikatopu.dev` primary, `www` redirects to it
4. Merge `redesign/case-file-prototype` into `master` (Vercel deploys `master` to production)
5. After the deploy, run the smoke test above, then ask a few people for real notes

**Nice to have later (not blockers)**
- Privacy-friendly analytics (e.g. Vercel Web Analytics) to see which cases people read
- A Content-Security-Policy header (needs care with Turnstile and the inline theme script)
- Rate-limit admin login attempts beyond the current 0.8 s delay

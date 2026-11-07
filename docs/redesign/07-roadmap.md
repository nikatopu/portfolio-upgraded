# 07 — Roadmap

Each phase ships something visible, so the live site improves the whole way instead of sitting behind a big-bang redesign.

## Phase 0 — Research & decisions ✅ (2026-11-03)
- [x] Audit, project inventory, inspiration, goals
- [x] Decisions: freelance-first · Case File (A) · light-first + saved dark mode · no logo (serif wordmark) · stamp maker · anonymous notes + doodles, all approved by you · subtle toggleable sounds · quote form + WhatsApp/Viber/Telegram/email
- [x] English case drafts: Iberieli, GeoWonder, Anuka Live, Dialogue Forge
- [x] Georgian JSON skeletons + sync script

## Phase 0.5 — Prototype review ✅
- [x] Case File prototype at `/prototype` (noindex): hero, folder stack, campaigns ledger, Raid card, stamp maker, visitor log (write/draw), contact, case pages, dark mode, EN/KA switch, sounds
- [x] Round 1 notes (seeds, hero bar, fonts, dropdowns, sound on) and round 2 (Glitch list, phone, no quotes, folders, hover transitions) applied
- [x] Contact details in `content/site.json`
- [x] ~~Client quotes~~: left out for now

## Phase 1 — Quick fixes on the current live site (1–2 days, can happen in parallel)
- [ ] Fix the dead Pop Girl Summer link; fix the Dialogue Forge URL; reword team projects
- [ ] SEO basics: title, robots, sitemap, OG, JSON-LD, apex canonical
- [ ] Iberieli experience dates: the site says Dec 2023 – May 2024, you said **Feb – Jul 2024**

## Phase 2 — Build the real site from the prototype ✅ (2026-11-04, branch `redesign/case-file-prototype`, not deployed)
- [x] The prototype is the homepage. `/prototype` is gone; the old portfolio components and `lib/config.ts` are deleted.
- [x] Real i18n routes: English at `/` and `/work/<slug>`, Georgian at `/ka/...` (`src/proxy.ts`). `/en/...` 308-redirects to the clean URL. `<html lang>` is correct per language.
- [x] Static generation for every language × case (10 pages)
- [x] SEO:
  - `metadataBase`, title template, descriptions
  - canonical + hreflang (en / ka / x-default) on every page
  - Open Graph + Twitter cards
  - **generated share images** for the homepage and every case (`opengraph-image.tsx`, in the site's fonts)
  - JSON-LD: Person + ProfessionalService + WebSite on the homepage; CreativeWork / SoftwareApplication + BreadcrumbList on cases
  - `sitemap.xml` (both languages with alternates) and `robots.txt`
- [x] `next/image` for the folder photos and case screenshots
- [x] Site-styled 404 ("This folder is empty.")
- [x] `/math-animations` and `/guess-the-ball` kept under their own layout. They keep their dark look, with Space Grotesk replaced by self-hosted Hanken Grotesk. This also fixed guess-the-ball rendering a second `<html>` inside the page.
- [x] Removed `framer-motion` (the game now imports `motion`), `@fortawesome/*` and `classnames`
- [x] Folder redesign: back panel with tab, two papers with a typed file line, a thumb notch in the front flap, a file label, the case stamp on the photo, a fibre texture. Hover slides the papers out and tilts the flap.
- [x] Every hover change has a transition. There's a site-wide baseline for links, buttons and fields, plus the per-component fixes found by an audit.
- [ ] **Before deploying:** in Vercel → Domains, make **`nikatopu.dev` the primary domain** and redirect `www` to it. All canonical URLs now point at the apex; today the apex redirects to www, which would contradict them.
- [ ] Commit and open a PR (when you say so)

## Phase 3 — Backends ✅ built and tested locally (2026-11-04). Needs accounts to go live, see [08](08-going-live.md)
- [x] **Visitor log:** notes and drawings → validation (zod) → honeypot + minimum fill time → Cloudflare Turnstile → 3 per visitor per day → saved as *pending* → email with a signed **Review it** link (14-day expiry; approving needs a button click, so email link-scanners can't approve anything)
- [x] **Wall:** shows only approved notes; approving updates it within seconds (`updateTag`); sample notes only appear in local dev with no database
- [x] **Admin** at `/admin` (password, signed cookie): pending notes, published notes (with "Hide"), quote requests, contact-tap counts
- [x] **Quote form:** same protections, 5 per visitor per day, saved to the database plus an email (reply-to set when they chose email)
- [x] **Contact-tap counting:** WhatsApp / Viber / Telegram / email taps counted anonymously (method, language, country; no IP, no cookies, no consent banner needed)
- [x] Drawings in emails are a signed PNG (Gmail doesn't render SVG); forged links get 403
- [x] Privacy: IPs are only stored as salted hashes, for rate limiting
- [x] Upstash dropped: at this traffic, rate limits are a simple database count. One service fewer.
- [x] PGlite (embedded local DB) removed after it crashed `next dev` (out of memory); local testing uses a Neon dev branch
- [x] End-to-end tested in a real browser against a production build: 3 notes accepted, 4th rate-limited; quote sent; taps counted; review link approved; tampered link rejected; wrong admin password rejected; wall shows exactly the approved notes
- [ ] **You:** set up Neon, Turnstile, Resend and the secrets ([08](08-going-live.md)), then run the smoke test
- [ ] Seed the wall with 5–10 real notes from colleagues before announcing

## Phase 4 — Content (ongoing)
- [ ] Your Georgian translations (`ka.json` files)
- [ ] Client quotes into each case
- [ ] **~2026-12-15:** GeoWonder Search Console export → update the "Results so far" section
- [ ] Glitch campaigns case page (confirm which are live)
- [ ] Raid of the Leks case study at Alpha 1.0.0
- [ ] Client-site prep that also strengthens the cases: Iberieli Georgian version back, Anuka sitemap/SSR pass, footer credit links

## Phase 5 — Launch
- [ ] Lighthouse ≥ 95 on mobile for `/` and one case page
- [ ] Search Console + Bing; submit the sitemap; Google Business Profile as a web developer in Tbilisi
- [ ] LinkedIn post; update the CV, GitHub README and LinkedIn links

## How to review the prototype
```bash
git switch redesign/case-file-prototype
npm install
npm run dev
# open http://localhost:3000
# Georgian: http://localhost:3000/ka
```
Things to try: scroll through the folders, hover one and click it, toggle dark mode and reload (it's remembered), turn sounds on, make a stamp, leave a note and a drawing, and try it on your phone (`npm run dev -- -H 0.0.0.0`, then open your computer's IP).

Leave notes however is easiest: a list in chat, or comments in this file.

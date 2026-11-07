# 06 — SEO Plan for nikatopu.dev

**What to expect:** For a personal portfolio, SEO means three things:
1. Own the search results for your name.
2. Make every shared link look great on LinkedIn and Slack.
3. Optionally, rank case studies for freelance-intent searches.

It should take roughly 10% of the effort. You did a much bigger version of this for GeoWonder already, so reuse `lib/seo.ts`-style patterns from there.

> **Update 2026-11-03: the goal is freelance-first.** The "Nice-to-have" section below is now **required**. SEO is a core pillar:
> - **Target searches** (English and Georgian): "web developer Tbilisi", "website development Georgia", "Next.js developer Georgia", "ვებგვერდის დამზადება" (website development), "საიტის დამზადება თბილისი" (website development Tbilisi), plus niche ones that match your proof: winery, tour operator and musician websites in Georgia. Validate these in GSC and Google Keyword Planner before committing. These are hypotheses.
> - **Bilingual from day one:** `/en/...` and `/ka/...` with hreflang + `x-default`. You already did this in Raid of the Leks (`src/i18n/seo.ts`), so reuse it.
> - **`LocalBusiness` / `ProfessionalService` JSON-LD** for the services page (area served: Georgia, plus remote).
> - **Google Business Profile** as a "web developer" in Tbilisi. This is free and strong for local search. (It requires a service-area setup if you don't have an office.)
> - **Footer credits on client sites are now important** (backlinks + direct referrals).

## Must-have (Phase 1, ~1 day)

- [ ] **Canonical domain.** Right now the same site answers at three addresses: `nikatopu.dev`, `www.nikatopu.dev` and `portfolio-upgraded-seven.vercel.app`.
  - The **canonical** is the one official address you tell Google to index and show. The others should redirect to it, so ranking signals (links, shares) aren't split three ways.
  - **"Apex"** means the bare domain without `www`: `nikatopu.dev`.
  - Currently the apex redirects to www, so www is effectively your canonical. I recommend flipping it: make **`nikatopu.dev`** primary. It's shorter on a CV, a business card and in Georgian ads, and www adds nothing technically on Vercel.
  - **How:** Vercel → Project → Settings → Domains → set `nikatopu.dev` as primary, and set `www.nikatopu.dev` to "Redirect to nikatopu.dev" (308). Then `metadataBase: new URL('https://nikatopu.dev')` in the root layout, so every canonical and OG URL uses it.
- [ ] **Title template:** `'%s · Nikoloz Topuridze'`; homepage: `Nikoloz Topuridze — Full-Stack & Creative Engineer (Tbilisi)`
- [ ] **Description** that includes a few keywords, written for humans
- [ ] `app/robots.ts` and `app/sitemap.ts` (the sitemap lists every `/work/*` page and is generated from the content source)
- [ ] **OG images:** `app/opengraph-image.tsx` for the homepage plus one per case (`ImageResponse`, 1200×630, case title + stamp or screenshot). This is the highest-value item, because your links get shared on LinkedIn.
- [ ] **JSON-LD:**
  - `Person` with a stable `@id`: name, alternateName ("Nika Topuridze", "nikatopu"), jobTitle, worksFor, address (Tbilisi, GE), knowsAbout, sameAs (GitHub, LinkedIn, YouTube)
  - `WebSite`
  - `ProfilePage` on `/about`
- [ ] Real `<a href>` links everywhere (no `onClick={window.open}`)
- [ ] `next/image` + `next/font`; content visible in HTML without waiting for animation
- [ ] Google Search Console: verify the domain, submit the sitemap. Bing Webmaster too (it powers several AI search engines).

## Should-have (Phase 2, with case studies)

- [ ] `/work/[slug]` with `generateMetadata`, canonical, `BreadcrumbList`, and `CreativeWork` / `SoftwareApplication` / `VideoGame` JSON-LD with `author` pointing to your Person `@id`
- [ ] Case-study titles that include what people search for: "GeoWonder — SEO & Next.js rebuild for a Georgian tour operator"
- [ ] Internal links: every case links to 2 related cases; the homepage links to all of them
- [ ] Descriptive alt text on all screenshots
- [ ] `llms.txt` (you shipped one on GeoWonder): a short plain-text summary of who you are and your work, for AI assistants

## Nice-to-have (only if freelance is a goal)

- [ ] Short technical posts (`/writing`), each answering one specific question:
  - "Versioned save migrations in a React Flow editor"
  - "Why a 17 MB hero video was hiding a tour company from Google"
  - "Geo-aware distributor lists with Vercel's IP headers"
- [ ] A "Work with me" page targeting "Next.js developer Georgia / Tbilisi" with the GeoWonder and Iberieli outcomes, in **Georgian and English** with hreflang
- [ ] Backlinks you already control:
  - footer credits on client sites ("Site by Nikoloz Topuridze" → nikatopu.dev): GeoWonder, Iberieli, Anuka
  - the GitHub profile README
  - the Dialogue Forge and Raid of the Leks about pages
  - the npm package page
  - LinkedIn

## Consistency checklist (the boring part that actually matters)
Use the same name, photo and one-line title everywhere: site, GitHub profile, LinkedIn, npm, YouTube, Dialogue Forge. Google ties these together through the `sameAs` links.

## Decided
- Freelance is a goal, so the bilingual pages and services/contact are in scope.
- Small footer credit links on client sites are OK. Format: "Site by Nikoloz Topuridze" → `https://nikatopu.dev/?ref=<client>` (the `ref` lets you see referrals in analytics). Put them on Iberieli, GeoWonder and Anuka Live.
- YouTube @topucodes goes in the footer and in `sameAs`.

## Questions
1. Apex canonical (`nikatopu.dev`): OK to flip it in Vercel?

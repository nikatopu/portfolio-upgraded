# Portfolio Redesign — Research & Discussion

Status: **Phase 0: research done, decisions pending** · Started 2026-11-03

This folder is where we discuss the next version of nikatopu.dev. Nothing here is final. Every file ends with open questions. Answer them inline (or in chat) and we move the answers into the **Decision log** below.

| File | What's in it |
|---|---|
| [01-audit.md](01-audit.md) | What's wrong with the current site: design, SEO, content accuracy, code |
| [02-projects.md](02-projects.md) | Every repo analyzed and ranked: what to feature, what to merge, what to drop |
| [03-case-studies.md](03-case-studies.md) | The case-study format, plus outlines for GeoWonder, Iberieli, Anuka Live, Dialogue Forge, Raid of the Leks |
| [04-design-direction.md](04-design-direction.md) | Reference sites, 3 visual directions, the "cases as folders" idea, scroll motion |
| [05-interactive-features.md](05-interactive-features.md) | The "leave a note" wall (DB on Vercel) and the canvas generator, with specs |
| [06-seo.md](06-seo.md) | A concrete SEO checklist for the portfolio itself |
| [07-roadmap.md](07-roadmap.md) | A phased plan from here to launch |
| [08-going-live.md](08-going-live.md) | Accounts, keys and database setup for the visitor log and quote form |
| `private/` (git-ignored) | Glitch/UMG work details and client metrics. **This repo is public; keep NDA material there.** |

---

## The big question: what is this portfolio *for*?

You asked: "Better SEO? A wow effect?" My take is that **neither is the goal on its own. Both are tools for a goal.** The site has three different readers, and each needs something different from it.

| Reader | Time they give you | What convinces them | What the site must do |
|---|---|---|---|
| **Recruiter / HR** | 10–30 seconds | Clear role, stack, years, recognisable names, easy contact, CV | Hero says who you are in one line; scannable experience; no friction |
| **Hiring manager / senior engineer** | 2–5 minutes | Depth: hard problems, decisions, trade-offs, ownership, code quality | Real case studies with architecture and *your* specific contribution |
| **Freelance client** (a Georgian business like GeoWonder or Iberieli) | 1–3 minutes | Business outcomes: more leads, ranking, a site they can edit themselves | Before→after stories with numbers and a client quote |

**Where "wow" fits.** You build interactive music campaigns for UMG artists. For you, a memorable, playful site is *evidence*, not decoration. It proves you can do the thing. But the wow effect has to sit **on top of** fast, readable credibility, never in its way. A recruiter who can't find your CV in 10 seconds won't stay for the particle field.

**Where SEO fits.** Ranking for "Nikoloz Topuridze" is easy, because the name is rare, and it matters, because people *will* Google you. Beyond that, SEO pays off for one specific goal: **freelance leads**. Case studies like "How I took a Georgian tour operator's site from X to Y" can rank for things like "web developer Tbilisi" or "Next.js developer Georgia". If freelance isn't a goal, SEO is maybe 10% of the effort: get the basics right, make shared links look good, and move on.

### Goal statement (decided 2026-11-03: freelance first)

> **Primary:** Win freelance clients by showing **business outcomes**: more visibility, more leads, a site the owner can run themselves. GeoWonder, Iberieli and Anuka are the proof.
> **Secondary:** Credibility through recognisable work (live Glitch/UMG campaigns) and real products (Dialogue Forge, Raid of the Leks). This also keeps the door open for roles.
> **Signature:** One or two memorable interactive moments (the note wall and the generator) that people mention when they share the link. For a freelancer, the site *is* the sample: "if he made this, he can make mine."
> **Constraint:** Fast, accessible and readable first. Every animation has a reduced-motion fallback.

**What freelance-first changes**
- **SEO moves from 10% to a core pillar.** Rank for "web developer Tbilisi", "Next.js developer Georgia", "website for a winery / tour company Georgia" and similar searches.
- **Georgian + English** for client-facing pages (hreflang). Local business owners search in Georgian.
- **The reader changes:** a business owner who doesn't care about Zustand. Lead with outcomes, show a clear process ("how we'd work together"), and make contacting you easy (WhatsApp/phone are normal in Georgia; GeoWonder's lead tracking taught you that).
- **New pages:** `/services` (what you build, typical timeline, starting price range or "from…"), and a contact form with lead tracking.
- **Case-study order flips:** client cases first, product and engineering cases second.

**The "5-second / 30-second / 5-minute" test** we'll design against:
- **5 s:** Who is this, what do they do, is it good? (hero plus visual impression)
- **30 s:** Recognisable work, role, contact, CV (featured work strip plus experience)
- **5 min:** One case study read end to end, one interaction played with, one note left

---

## Open questions (the important ones)

These change what we build. Each file has more detailed questions.

1. **Goal:** Job hunt, freelance, or both? Senior full-stack roles, creative-dev studios, or product companies? Georgia/remote/EU?
2. **Glitch/UMG work:** Does your contract allow naming artists and clients (Metallica, Sabrina Carpenter, Olivia Rodrigo…) on a personal site? Which campaigns are live and safe to show? (see `private/glitch-work.md`)
3. **Numbers:** Can you get Search Console / analytics / PostHog data for GeoWonder, Iberieli, Anuka, Dialogue Forge and Raid of the Leks? Case studies without numbers are half as strong.
4. **Client permission and quotes:** Can you ask the GeoWonder, Iberieli and Anuka owners for a 1–2 sentence quote, and permission to show results?
5. **Visual direction:** Which of the 3 directions in [04](04-design-direction.md) feels like *you*?
6. **Note wall moderation:** Open wall, approval queue, or sign-in-to-post? See [05](05-interactive-features.md).
7. **Writing:** Are you willing to write (or co-write with me) 1 case study per week? Content is the bottleneck, not code.
8. **Language:** English only, or English plus Georgian? Georgian matters if Georgian freelance clients are a target.

---

## Decision log

| Date | Decision | Why |
|---|---|---|
| 2026-11-03 | Keep NDA/client data in `docs/redesign/private/` (git-ignored) | Repo is public |
| 2026-11-03 | **Primary goal: freelance clients** | Your choice; SEO, Georgian language and outcome-led cases become core |
| 2026-11-03 | **Visual direction A, "Case File"** (paper, serif + Geist, folder cases, one blue accent) | Most literal "cases as folders", professional, distinctive |
| 2026-11-03 | **Glitch work: show live, public campaigns only**, naming artists. Skip unreleased and internal items. | Your choice; still worth a courtesy heads-up to Glitch |
| 2026-11-03 | **Note wall: every note is approved by you.** The submit modal says clearly that notes appear after review. | Safest, and fine for low traffic |
| 2026-11-03 | Glitch is fine with naming artists | Your confirmation; the homepage ledger names six |
| 2026-11-03 | **Case studies: Iberieli, GeoWonder, Anuka Live, Dialogue Forge.** No case for Raid of the Leks until Alpha 1.0.0. | Raid is still in progress |
| 2026-11-03 | **Georgian text is written by you;** co-writing happens in English only | `content/**/ka.json` skeletons + `scripts/sync-ka.mjs` |
| 2026-11-03 | **No public prices.** Quote form + WhatsApp, Viber, Telegram, email | Projects vary too much for packages |
| 2026-11-03 | Light first; dark mode saved in localStorage; **no logo** (serif wordmark + generative stamp) | |
| 2026-11-03 | Generator = **stamp maker** only; the formula playground stays separate at `/math-animations` | |
| 2026-11-03 | **Anonymous notes allowed; doodles allowed;** everything goes through your approval; **no live presence** | |
| 2026-11-03 | **Subtle UI sounds,** off by default, toggleable, removable with one flag | |
| 2026-11-03 | Footer credit links on client sites OK; YouTube @topucodes added | |
| 2026-11-03 | One unreleased client platform **on hold** (see `private/`); one job-board project and the Godot game **excluded** | Your call |
| 2026-11-03 | Prototype first, then build | Branch `redesign/case-file-prototype`, route `/prototype` |
| 2026-11-04 | Prototype feedback round 1: folders ✅, stamp maker ✅, visitor log ✅, colors ✅ | Keep |
| 2026-11-04 | Seeds → random letters and digits; "Taking new projects" bar removed; **sound ON by default** | Your notes |
| 2026-11-04 | Instrument Serif + Geist dropped; **3 Google Fonts pairings to choose from** (A Archive / B Swiss File / C Studio) | Felt AI-generated. See [04](04-design-direction.md) |
| 2026-11-04 | **More than 4 options → dropdown,** otherwise chips | Your rule |
| 2026-11-04 | **Type: A · Archive** (Gloock + Hanken Grotesk + Courier Prime) | Chosen after comparing 3 pairings on the prototype |
| 2026-11-04 | Phone +995 595 07 08 61 for WhatsApp / Viber / Telegram | Your details |
| 2026-11-04 | Glitch list: Metallica, Max Richter, KPop Demon Hunters, Stray Kids, Joji, Illenium (each links to its live page) | Your list |
| 2026-11-04 | **Client quotes left out** of the case studies for now | Your call |
| 2026-11-04 | **Phase 2 started:** the prototype became the real site; folders redesigned; every hover has a transition | See [07](07-roadmap.md) |
| 2026-11-04 | Folder opening animation: the flap now swings toward the viewer | Your note: it looked like it was closing |
| 2026-11-04 | **Phase 3 built:** Neon + Drizzle, Turnstile, Resend, `/admin`, anonymous tap counts; no Upstash | Go-live steps in [08](08-going-live.md) |
| 2026-11-07 | Resend removed (submissions go to the DB → /admin); tagline "Helping brands turn visitors into clients"; Instagram/Facebook/LinkedIn/YouTube; 2 hero buttons; Lab opens in new tabs | Your notes |
| 2026-11-07 | Launch prep: Lighthouse 95/100/100/100, /ka hidden until translated, robots + security headers, privacy notes | Checklist in [08](08-going-live.md) |
| 2026-11-07 | **Glitch campaigns re-selected** from the full archive: 8 on the homepage + 22 in a collapsible "all campaigns" list (30 total, after your removals) | Rule in [02](02-projects.md) |
| 2026-11-04 | **PGlite removed:** it crashed `next dev` (out of memory). Local DB = Neon dev branch | Turbopack bundled its 8.7 MB WASM engine |
| | | |

### Your timelines (for the experience section)
- **Iberieli:** contractor/freelancer, Feb – Jul 2024, then paid revisions over the years (incl. the 2026 rebuild)
- **GeoWonder:** freelancer, Jun – Sep 2025, then 2 paid revisions
- **Anuka Live:** freelancer, Feb – May 2025, then 1 recent revision
- **Driftless:** tech lead. You initiated and planned the project (task management, not the idea), built the frontend, and guided the team through the backend.

### Still open
- Your notes on the prototype (how to run it: [07](07-roadmap.md))
- Small confirmations listed at the end of [02](02-projects.md) and [03](03-case-studies.md)

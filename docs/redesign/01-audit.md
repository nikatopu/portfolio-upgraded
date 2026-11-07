# 01 — Current Site Audit (2026-11-03)

Live: https://www.nikatopu.dev (the apex redirects to www) · also https://portfolio-upgraded-seven.vercel.app

## Design: why it feels bland *and* "too much"

These sound contradictory but have the same cause: **it's the default dev-portfolio template.**

- **Dark #121212, saturated royal blue (#1345b3 / #1981ea), Space Grotesk, card grid.** Thousands of portfolios look exactly like this, so it reads as generic. The blue is fully saturated and used on buttons, links, labels and the glow, so it also reads as loud.
- **No hierarchy of importance.** All 8 projects are the same-sized card. Dialogue Forge (a real product with users) looks the same as a demo page.
- **No point of view.** Nothing says "Georgian", "games", "music campaigns" or "particles", which are the things that actually make you distinctive.
- **The motion is generic.** Every section fades up 16px. There's no motion that's *about* something.
- **The marquee** of tech names ("Next.js TypeScript SCSS…") is filler. Recruiters scan the experience section for stack anyway.
- **About section** copy ("Write clean code, build for the user and never stop learning") is boilerplate. Your real story (UMG campaigns, Georgian history game, shipped dialogue tool) is far more interesting.

## Content accuracy (fix these even before the redesign)

| Item | Problem |
|---|---|
| **Pop Girl Summer** card | The campaign was archived in July 2026, so the link now times out or redirects to a "closed" page. You were also a contributor (quizzes 6–12, points API, feed), not the lead. → Use screenshots or video, and word it as "contributed X". |
| **Cynthia Erivo Journal** | A team build (you wrote about a quarter of it; your highlight is the FeatherTransition particle effect). → Say "team project; I built…". |
| **Dialogue Forge** link | `dialogue-forge.nikatopu.dev` redirects to **dialogueforge.org**. Link the real domain. It's also described as "in development", but it has shipped (v1.4.4, 13 releases). |
| **Abaula Gaming** | The card links to `/guess-the-ball`, so the naming is confusing. Decide on one name. |
| **Missing** | Raid of the Leks (live at raidoftheleks.com), Iberieli (only an image, not on the page), Driftless. |
| **Iberieli dates** | The Experience section says Dec 2023 – May 2024. You confirmed **Feb – Jul 2024**. |
| **Title** | "Nikoloz \| Portfolio" doesn't include your surname. |

Honesty about team share matters. Hiring managers *will* ask "what exactly did you do?", and being precise reads as senior.

## SEO (checked against the live site)

| Check | Status |
|---|---|
| `robots.txt` | ❌ 404 |
| `sitemap.xml` | ❌ 404 |
| Open Graph / Twitter cards | ❌ none, so links shared on LinkedIn or Slack show no preview image |
| Canonical URL | ❌ none (the www, apex and vercel.app URLs all serve the same content) |
| JSON-LD (Person) | ❌ none |
| Per-project pages | ❌ none. Everything is one page, so there's nothing to rank besides your name. |
| Project links | ❌ They're `<button onClick={window.open}>`, not `<a href>`, so crawlers can't follow them. |
| Content visible on first paint | ⚠️ Framer Motion `initial={{opacity: 0}}` on every section. The text is in the HTML, but it starts invisible. This hurts LCP. (GeoWonder had the same bug, and you fixed it there.) |
| Images | ⚠️ Plain `<img>`, not `next/image`. `guess-the-ball.jpg` is 1.2 MB and `photo-for-particles.png` is 1.6 MB. |
| Fonts | ⚠️ Google Fonts `<link>` instead of `next/font` (causes a layout shift and an extra request) |

## Code / architecture notes

- **`page.tsx` is `"use client"`** at the root, wrapping the entire page in `AnimatePresence`. This makes the whole homepage client-rendered, which isn't needed. Sections can stay server components, with small client islands for animation.
- **`framer-motion` and `motion` are both installed.** They're the same library; keep `motion` and import from `motion/react`.
- **Header** uses `window.innerWidth` in state for mobile detection, which can cause a hydration flash. Use CSS media queries instead.
- **Project data** lives in `lib/config.ts` with `onClick` functions. For case-study pages, move to content files (MDX or TS objects) with a `slug`.
- **⚠️ Security: `math-animations/lib/FormulaEvaluator.ts`** builds a `new Function` from user input. Its sanitizer is a character filter (`[^x y t sin cos …]`), which still lets through any word made only of those letters, e.g. `alert(1)`, `location`, `parent`. That's harmless today because only you can type into your own browser. It becomes **stored XSS the moment formulas are shared** through a URL or the note wall. This must be replaced with a real expression parser (e.g. `mathjs`'s `compile` with a restricted scope, or a small tokenizer/parser) before the canvas generator ships. See [05](05-interactive-features.md).

## What's worth keeping

- The **Mathematical Animations particle engine** (`math-animations/lib/*`) is real and yours. It's a perfect seed for the canvas generator.
- **Guess The Ball** is a nice, self-contained interactive demo.
- The project images in `public/assets/projects/` (these will need re-cropping for any new layout).
- The SCSS-modules approach and atomic folder structure, which you use consistently across projects.

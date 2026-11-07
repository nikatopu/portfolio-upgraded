# 04 — Design Direction & Inspiration

> **Decided 2026-11-03: Direction A, "Case File".** Built as a prototype at `/prototype`.
> - **Light first.** Dark mode is a toggle, and the choice is saved in `localStorage` (`nt-theme`). An inline script applies it before paint, so there's no flash. OS preference is deliberately ignored: light unless you chose dark.
> - **No logo.** The wordmark is your name in Instrument Serif. The favicon is a simple italic "nt" monogram (`public/assets/images/monogram.svg`). The generative stamp is the visual signature instead of a logo, which feels more "you" than a stock mark.
> - **Type (decided 2026-11-04): "Archive"**: **Gloock** for display (sharp, high-contrast serif), **Hanken Grotesk** for text (italic used for sub-headlines and notes), **Courier Prime** for typewriter labels. All Google Fonts. Instrument Serif + Geist was rejected because it is the default pairing for AI-generated sites. Two other options (Archivo condensed caps; Bricolage Grotesque) were compared on the real layout and dropped.
> - **Georgian type:** none of these Latin faces have Georgian glyphs, so Noto Sans Georgian and Noto Serif Georgian are loaded as automatic fallbacks.
> - **Removed:** the "Taking new projects" pill and the clock bar above the hero (they read as AI-template). The Tbilisi clock stays in the footer only.
> - **Form rule:** more than 4 options → dropdown (`components/Select.tsx`, native `<select>` so phones use their own picker); 4 or fewer → chips. Applied to "I'm a…" (7 roles) and "What do you need?" (6 options).
> - **UI sounds:** subtle and off by default. See [05](05-interactive-features.md).
> - The folder interaction is a sticky "filing drawer": each folder sticks slightly lower than the previous one so the tabs stay visible, earlier folders sink back as you scroll, and a click slides the paper out before the case page opens.

Goal from you: **more professional, more creative, fewer colors.** In practice that means **one accent color, a typographic personality, and motion that means something.**

## References worth studying (verified 2026-11-03)

**Cases as folders / OS metaphors**
- **https://casefile.framer.website**: the closest match to "cases as folders". The folder is just the way in; each one opens into a clean, normal case-study page. **This is the right balance.**
- **https://posthog.com**: an entire site built as an OS with windows (read https://posthog.com/blog/why-os). Great ideas, but even PostHog admits it's "initially a jarring experience". A warning not to OS-ify *everything*.
- **https://os.ryo.lu** (ryOS): a browser desktop in React 19 and Motion, the same stack as yours. Steal the idea of one themed "Finder" window, not the whole desktop.
- **https://dustinbrett.com**: a full OS. Useful to see where the metaphor becomes too much for a portfolio.

**Scroll storytelling**
- **https://igloo.inc** (Awwwards Site of the Day): a 2-color palette, with motion doing all the work. This is the answer to "colors are too much".
- **https://lusion.co**: client work on the main site and experiments on a separate "Labs" site. Steal that split.
- **https://pudding.cool**: a sticky graphic while text steps scroll past. Perfect for case-study metrics (e.g. GeoWonder's impressions chart drawing itself as you read).
- **https://www.joshwcomeau.com**: small interactions, sound toggles, care at the level of single elements.

**Restrained, editorial, professional**
- **https://rauno.me**: craft section, archived past versions of the site as content.
- **https://paco.me**: Building / Projects / Writing / Now. No cards at all.
- **https://emilkowal.ski**: projects as lists, short craft essays.
- **https://brittanychiang.com**: steal the structure (sticky intro column, experience list, `/archive` table), never the look (it's the most-cloned portfolio online).
- **https://lynnandtonic.com**: redesigns yearly and numbers versions. "nikatopu.dev v.2026" could be part of the identity.
- **https://dennissnellenberg.com**: a loader cycling "Hello" in languages (→ **გამარჯობა**), a live local-time clock (→ Tbilisi time).

**Guestbooks / visitor walls**
- **https://susam.net/comments/guestbook.html**: hand-moderated, published as static pages.
- **https://playhtml.fun**: open-source library for shared, live elements on personal sites ("3 people are here").
- **https://eieio.games/essays/the-secret-in-one-million-checkboxes/**: a cautionary tale about what happens to anonymous shared canvases without limits.

**Generative / canvas**
- **https://ertdfgcvb.xyz**: generative work in one color or ASCII. It looks professional, not gimmicky.

## Three directions

All three drop Space Grotesk and the saturated blue, and keep **one** accent.

### A. "Case File" — archival, editorial ⭐ recommended

| | |
|---|---|
| Palette | paper `#F3F0EA` · ink `#151515` · muted `#6E6A62` · rules `#D8D3C8` · accent **signal blue `#1F4FD1`** (a calmer version of your current blue, so there's continuity). Dark mode: `#121211` / `#EAE7E0`, same accent. |
| Type | **Instrument Serif** (display) + **Geist** (text) + **Geist Mono** (labels like `CASE 03 · 2025 · PHASER`) |
| Motion | Folders slide out of a stack as you scroll; tabs pin; the open animation is short and papery, with no bounce |
| Signature | **Cases are manila folders with tab labels.** Clicking one morphs it into the full case page (shared-layout animation). The note wall is a "visitor log" of index cards. |
| Why for you | It literally answers "cases as folders", reads professional to HR, and is distinctive among dark-mode dev portfolios. Light-first is rare in this niche, so it stands out. |

### B. "Signal" — dark, instrument-like, music-adjacent

| | |
|---|---|
| Palette | `#0D0E0C` base · `#17181A` surface · `#E9E7E2` text · `#8B8A85` muted · accent **phosphor `#C6F432`** (or amber `#FFB000`) |
| Type | **Geist** + **JetBrains Mono**, with Fragment Mono for small details |
| Motion | Scroll scrubs a particle field that forms section titles; waveform and oscilloscope motifs |
| Signature | **The hero *is* the canvas generator**: knobs for seed, density, tempo and palette, plus "export PNG" and "copy seed" |
| Why for you | It connects to your music-campaign and particle work. Risk: it's closer to the dark-dev-portfolio cliché you're escaping. |

### C. "Tbilisi Grid" — Swiss, type-led, light

| | |
|---|---|
| Palette | `#FAFAF7` · `#0A0A0A` · `#8F8F8A` · accent **Georgian red `#D7261E`** |
| Type | **Bricolage Grotesque** (display) + **Newsreader** (text) + **IBM Plex Mono** |
| Motion | Split-text headline reveals; cases in a horizontally scrolling pinned rail; grid lines draw in |
| Signature | **A pinboard note wall**: notes as cards on a 12-column grid, each with a small generative "stamp" |
| Why for you | Strong, confident, a nod to Georgia. Feels like a design studio. |

### Idea that works in any direction
**Every note on the wall gets its own generative stamp, made from a seed.** Store a seed (and the visitor's chosen parameters) with each note, not an image. The canvas generator renders it. This ties your two interactive features together into one memorable system: *"leave a note, get your own particle signature"*.

## Page structure (draft)

```
/                 Hero (name, one line, live Tbilisi time, CTA: Work · CV · Contact)
                  ↓ Featured work: 4 folders (Tier 1)
                  ↓ More work: 4 smaller folders (Tier 2) + "Full archive →"
                  ↓ Experience (compact list)
                  ↓ Lab teaser: the generator, playable inline
                  ↓ Visitor log: latest notes + "Leave yours"
                  ↓ Footer (contact, socials, "v.2026", Tbilisi time)
/work/[slug]      Case studies
/lab              Generator, Math Animations, Guess The Ball, particles-lite
/notes            The full note wall
/archive          Every project, as a table
/about            Longer bio, photo, CV download, "Now" section
```

## Motion principles

1. **Motion explains structure:** folders open, cards stack, numbers count up when read. No decorative floating.
2. **Content is visible without JS:** animate *from* visible states, or use CSS that only hides when JS has loaded. Never ship `opacity: 0` in the HTML.
3. **Reduced motion is a first-class design:** every set piece has a static version.
4. **Libraries:** GSAP ScrollTrigger (now 100% free, including all plugins) + Lenis for the 2–3 pinned or scrubbed set pieces; Motion (`motion/react`) for component-level reveals and the folder layout animation; CSS `animation-timeline` behind `@supports` for cheap details (Firefox support isn't stable yet). Never drive one element with two libraries.
5. **Budget:** the homepage hits LCP < 2.0 s on mobile even with canvas. Canvas starts after first paint and pauses off-screen.

## Questions

1. **A, B or C?** Or a mix (e.g. A's folders with C's red accent)?
2. Light-first or dark-first? (A and C are light-first with a dark mode.)
3. Do you have a **logo or personal mark** you want to keep (the current `icon.svg` / "TopuPortfolio")?
4. How Georgian should it feel: a subtle nod (გამარჯობა loader, Tbilisi clock) or a central identity?
5. Sound: the music connection suggests optional UI sounds (Josh Comeau-style toggle). Yes or no?
6. Should I build **2–3 quick visual prototypes** (just the hero plus one folder opening) so you can choose by seeing them rather than reading?

# 03 — Case Studies

**Status (2026-11-03):** English drafts are written for **Iberieli, GeoWonder, Anuka Live and Dialogue Forge**. Georgian versions have empty slots ready for you. Raid of the Leks gets no case study until Alpha 1.0.0.

| Case | English draft | Georgian (yours) | Preview |
|---|---|---|---|
| Iberieli | `content/cases/iberieli/en.json` | `content/cases/iberieli/ka.json` | `/work/iberieli` |
| GeoWonder | `content/cases/geowonder/en.json` | `…/geowonder/ka.json` | `/work/geowonder` |
| Anuka Live | `content/cases/anuka-live/en.json` | `…/anuka-live/ka.json` | `/work/anuka-live` |
| Dialogue Forge | `content/cases/dialogue-forge/en.json` | `…/dialogue-forge/ka.json` | `/work/dialogue-forge` |

Put `/ka` in front of any URL (e.g. `/ka/work/iberieli`) to see your Georgian (empty strings fall back to English). After editing English, run `node scripts/sync-ka.mjs` to add any new keys to the Georgian files without losing your translations. See `content/README.md`.

**Co-writing (English):** edit the `en.json` files directly, or leave comments here and I'll revise.

## The format

Every case has the same skeleton, rendered as one paper "document" pulled out of its folder:

```
tab label · title · headline (italic)
meta grid: client · role · years · stack · live link
screenshot
In short (3 points: who they are → what I did → what changed)
3 metric tiles
timeline
story sections (written for a business owner)
"Under the hood" (collapsed, for developers)
CTA: "Need something like this?" → Get a quote
next case →
```

**Writing rules we followed**
- Lead with what changed for the business, not with the stack.
- Every number is one we can stand behind. No traffic claims we can't prove.
- Team work and limits are stated honestly (see Dialogue Forge's "Where it's honestly behind").

## How I used your analytics numbers

| Project | Your numbers (last 90 days) | Used publicly? | Why |
|---|---|---|---|
| GeoWonder | (in `private/client-metrics.md`) | **No** | These are pre-overhaul numbers, and the SEO work only went live on 24 Oct. Publishing them now would undersell you. The case says results are pending and promises an update in early 2027. It shows the immediate, verifiable wins instead: media weight, crawlable tours, lead tracking. |
| Iberieli | (in `private/client-metrics.md`) | **No** | For a B2B winery that sells to importers, this is a healthy niche audience, but to a stranger it looks small. The case focuses on self-management and the 2+ year relationship. |
| Anuka Live | none (portfolio site sent directly) | n/a | The case is framed around exactly that: "the one link to send". |
| Dialogue Forge | 50 active users · 20 accounts · 10 weekly active | **Yes** | It's your own product, and **half of registered users returning weekly with almost no marketing** is a strong, honest signal. |

These numbers are recorded in `private/client-metrics.md` so we can compare later.

## Client quotes: left out for now (decided 2026-11-04)

The quote block and its placeholder have been removed from the case pages and from the JSON. If you collect quotes later, we add a `quote` field back. The notes below explain the idea for when that happens.

## "One-line quote": what I meant

A **testimonial**: one or two sentences from the client, in their own words, with their name and role. For freelance clients it's the most persuasive element on a case page, more than any metric, because it's another business owner vouching for you.

Good quotes say what changed for *them*, not that you're "nice to work with":
> "We used to wait weeks to update a wine. Now we do it ourselves in five minutes." — Name, Iberieli

A ready-to-send request (adapt it and send it in Georgian if you prefer):

> Hi [name]! I'm putting together a portfolio page about the [website] project we did together. Would you be willing to write one or two sentences about what changed for you after the site launched? For example, what's easier now, or what customers or partners have said about it. I'd show it with your name and role. And if you'd rather not, that's completely fine!

Tip: if they freeze, offer two or three drafts based on what they've told you before and let them pick and edit one. That's normal practice, as long as the final words are ones they approve.

## Things for you to confirm in the drafts
- **Iberieli:** "It went live in mid-2024 on free hosting" (it was on GitHub Pages). Is that right? Did the family ask for the 2026 rebuild, or did you propose it? Is the Georgian version coming back? (The remaster is currently English-only.)
- **GeoWonder:** The case says 19 longer tour descriptions are *drafted*. Are they applied yet (`npm run tour-content -- --apply` in the GeoWonder repo)? If yes, add it as a result.
- **Anuka Live:** The case is written using Anuka's name and no pronouns. Is the description "musician, producer, sound designer and multi-instrumentalist" right? Did anything happen between Jun and Oct 2025 (admin features in the commits) that counts as part of the original contract?
- **Dialogue Forge:** Is the origin story right? (See [02](02-projects.md), open question 1.)

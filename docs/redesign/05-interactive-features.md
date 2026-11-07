# 05 — Interactive Features

Decided 2026-11-03: **stamp maker** + **visitor log** (anonymous notes and doodles, every entry approved by you) + **UI sounds** (subtle, toggleable). The formula playground stays separate at `/math-animations`. No live presence or "X people here".

All three are working in the prototype (`/prototype`) with sample data and no backend.

---

## 1. Stamp maker

- **Prototype:** `src/app/prototype/lib/stamp.ts` + `components/Stamp.tsx` + `components/Lab.tsx`
- Seeds are random 8-character codes of letters and digits (e.g. `k3x9q2mz`), generated with `crypto.getRandomValues`.
- A deterministic generative "rubber stamp". `{ seed, density, flow, shape }` always draws the same image on any device. That's what makes it storable as tiny, schema-validated data. There's no image upload and no code involved.
- Flow-field lines from seeded gradient noise, clipped into a circle, square or hexagon, plus a double border, optional ring text and a worn-rubber texture.
- Always drawn in the theme's accent ink, and it redraws when you toggle dark mode.
- Used in three places: the hero signature stamp, one stamp per case page (seeded by its slug), and one per visitor note.
- Lab section: seed input, density and flow sliders, shape chips, Shuffle, Download PNG.

**Later:** server-render stamps for OG images (`/notes/[id]/opengraph-image.tsx`) so a shared note gets its own preview card. That needs the drawing code ported to SVG or `@napi-rs/canvas`.

## 2. Visitor log

### Decided behaviour
- **Anonymous allowed.** Name is optional, and an empty name shows "Anonymous".
- **Write or draw.** A note is either text (≤ 280 characters) or a doodle, plus a role chip and a stamp.
- **Every entry is approved by you,** text and doodles alike. The modal says so *before* submitting ("reviewed before they appear, usually within a day") and *after* ("Your note is in the review pile…"), and shows the visitor their stamp straight away so they get something immediately.

### Doodles: stored as vectors, not images
A doodle is an array of strokes, each a list of points in a 1000×625 box (`lib/notes.ts`, type `Doodle`). That means:
- Tiny payloads (a few KB), easy to validate (max 60 strokes / 4000 points, all numbers in range)
- **No image upload**, so no file-type attacks, no storage bucket, no EXIF
- Rendered as an SVG `<polyline>` on the wall, and also directly inside your approval email (inline SVG), so you can see the drawing before you approve it
- Limit: it can't hold arbitrary pictures, and that's the point

### Backend: built in Phase 3 (2026-11-04). Setup in [08](08-going-live.md)

Changes from the plan below: **no Upstash**, because rate limits count rows in the database (3 notes / 5 quote requests per visitor per day). Moderation works from the email's signed link **or** from `/admin`.

### Backend plan (original)
| Need | Pick | Why |
|---|---|---|
| DB | **Neon Postgres + Drizzle** (Vercel Marketplace) | You already use this pair in iberieli-remastered; Neon doesn't pause on inactivity like Supabase's free tier does |
| Rate limit | **Upstash Redis** + `@upstash/ratelimit` | ~3 entries per IP-hash per day |
| Bot check | **Cloudflare Turnstile** | You already use it at Glitch |
| Approval email | **Resend** | Already in Dialogue Forge. Signed, expiring Approve/Reject links. |

```ts
notes {
  id           uuid pk
  name         text null          // null = anonymous
  role         enum(recruiter, manager, client, engineer, designer, friend, visitor)
  message      text null (≤ 280)
  doodle       jsonb null         // number[][] validated by Zod; exactly one of message/doodle
  stamp        jsonb              // { seed ≤ 40 chars, density 0..1, flow 0..1, shape enum }
  status       enum(pending, approved, rejected) default pending
  ip_hash      text               // sha256(ip + secret); never the raw IP
  created_at   timestamptz
}
```

Flow: Server Action → Turnstile → rate limit → Zod → insert `pending` → email you → your click sets `approved` → `revalidateTag('notes')`. The wall itself is a cached static list.

## 3. UI sounds

- **Prototype:** `src/app/prototype/lib/sound.tsx`, the only file involved.
- Synthesized with Web Audio, so there are no audio files:
  - **tick:** a soft paper click for toggles and links
  - **paper:** a sheet sliding, for opening a folder or the note dialog
  - **stamp:** a muffled thump, for Shuffle and submitting a note
- **On by default** (your call, 2026-11-04). The speaker toggle in the header turns it off, and that choice is saved in `localStorage`. Browsers keep audio silent until the visitor's first click or tap, so nothing ever plays on page load. The very first hover ticks are silent, then sounds start once they've clicked anything.
- **To remove completely:** set `SOUND_FEATURE = false` in that file. The toggle disappears and every `play()` call becomes a no-op.
- Volume is controlled by one `MASTER_VOLUME` constant (currently 0.5, quiet).

## 4. Formula playground (kept separate)

`/math-animations` stays as it is. ⚠️ Its `FormulaEvaluator` uses `new Function` with a character-only sanitizer, so `alert(1)` gets through. That's safe only because formulas are never stored or shared. **If you ever add share links or saved formulas, replace it with a real parser first** (e.g. `mathjs` `parse` with a whitelist).

## Questions
1. Should the wall show the visitor's role prominently (as now), or keep it subtle?
2. Do you want an optional "email me when my note is approved" field? It's a soft lead-capture for clients, but it also means storing emails, which needs a privacy note.
3. Sound default: off (current), or on after the first click?

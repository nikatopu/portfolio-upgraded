# 02 — Project Inventory & Ranking

Sources: local clones in `~/Documents/GitHub` plus public repos on github.com/nikatopu (analyzed 2026-11-03), updated with your answers the same day. Glitch/UMG details are in `private/glitch-work.md` (git-ignored).

## Featured: homepage order (freelance-first)

| # | Project | Format | Your timeline | Why |
|---|---|---|---|---|
| 1 | **Iberieli** | Full case ✅ drafted | Feb–Jul 2024 contract, then paid revisions; 2026 rebuild | Long-term client; a visual before/after; self-managed catalogue; country-aware distributors |
| 2 | **GeoWonder** | Full case ✅ drafted | Jun–Sep 2025, then 2 paid revisions (incl. the Oct 2026 SEO overhaul) | Strongest SEO and lead-generation story; results update due early 2027 |
| 3 | **Anuka Live** | Full case ✅ drafted | Feb–May 2025, then 1 recent revision | An artist portfolio site, not a traffic site; framed as "the one link to send" |
| 4 | **Dialogue Forge** | Full case ✅ drafted | May 2026 → now | Own product; a market-gap story; 13 releases; 50% weekly return rate among registered users |
| 5 | **Glitch / UMG campaigns** | Ledger on the homepage; case page later | Mar 2025 → now | Recognisable artists (Glitch approved naming them); #3 committer in the main campaign repo |
| 6 | **Raid of the Leks** | Small "also building" card, **no case** until Alpha 1.0.0 | Oct 2026 → now | 13 active users in 30 days with zero promotion |

Case drafts live in `content/cases/<slug>/en.json`. Georgian goes in `ka.json` next to each one.

### Dialogue Forge: one correction
Dialogue Forge exports **one engine-agnostic JSON** format. The Unity/Godot/Unreal picker only tags the export for analytics ("The exported JSON is the same either way"). Earlier notes said "engine-targeted export", which was wrong. The case study now says engine-agnostic.

Also, the how-to page's sample JSON shows `"version": 1.4.2` unquoted (invalid JSON) and leaves out `variables`. That's worth a fix in the Dialogue Forge repo.

## Secondary

| Project | Treatment |
|---|---|
| **Driftless** | Small card or archive row. Role as you described it: *tech lead; initiated and planned the project (task management and delivery, not the product idea); built the frontend; guided the team through the backend.* |
| **Mathematical Animations** | Stays at `/math-animations` as the "formula playground", kept separate from the stamp maker. Linked from the Lab. |
| **Guess the Ball** | Linked from the Lab |
| **react-particles-lite** | Archive row (npm package) |
| **@topucodes (YouTube)** | In the footer and in `sameAs` JSON-LD. If the channel has a few good videos, consider embedding one in the Lab. |

## On hold / excluded

| Project | Status |
|---|---|
| **Unreleased client platform** | **On hold.** Not public yet. Name and details are only in `private/client-metrics.md`. |
| The 2D Godot game | Excluded (your call) |
| One collaborator's job-board project | Excluded entirely (your call) |
| topuportfolio, WatchedThem, phaser-portfolio, WEWE, interview assignments, coursework | Leave them on GitHub; maybe list them in a future `/archive` table |

## Still open
1. ~~**Dialogue Forge origin**~~ (confirmed correct 2026-11-04): I wrote that it grew out of hand-writing a dialogue tree in TypeScript for a small game (the `phaser-portfolio` dialogue scene from March 2026). Is that the real story? Anything to add, such as a moment you looked for a tool and gave up?
2. Do you want Driftless on the homepage at all, or only in an archive?
3. ~~Glitch campaigns~~: **re-selected 2026-11-07 from the full archive list (77 projects).**
   - **Rule:** show a campaign only if visitors can open it (live on play.umusic.com/link.fans, or loads on archive25.glitch.ge) **and** you have at least 25% of its commits with 5 or more commits, or 30+ commits.
   - **Homepage, 8 picked for recognisable artists, high share and a variety of formats:** Metallica (daily game), KPop Demon Hunters (quiz), Imagine Dragons (photo generator), Karol G (hub + setlist creator), Mariah Carey (anniversary hub), Stray Kids (browser game), Cigarettes After Sex (virtual pet), Pop Girl Summer (gamified hub).
   - **"All campaigns I've worked on":** 22 more, collapsed under the ledger. On 2026-11-07 you removed Conan Gray password unlock, Wind Walkers, Sam Smith, Pentatonix, Sebastián Yatra, Tony Ann, Dayseeker and Summer Walker; Joji now links to its archive page.
   - **Not shown:** minor contributions, gated or unreleased, broken on the archive, internal tools, and anything below the bar. Max Richter, Stray Kids KARMA and Joji's featured spot dropped: Max Richter isn't in the archive list, KARMA returns 500 on the archive with a 10% share, and Joji has 7 commits (it's in the full list).

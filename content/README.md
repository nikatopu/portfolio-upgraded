# Content

All the site's text lives here as JSON, so it can be edited without touching components.

```
content/
├── site.json                    Contact handles, socials. Not translated.
├── ui/en.json                   Every interface string (nav, buttons, section titles…)
├── ui/ka.json                   Same keys. Georgian; empty = falls back to English
└── cases/<slug>/
    ├── meta.json                Not translated: order, client, years, stack, links, image
    ├── en.json                  The case study in English
    └── ka.json                  Same shape. Georgian; empty = falls back to English
```

## Writing Georgian

1. Open any `ka.json` and fill in the empty `""` strings. Leave a string empty and the English version shows instead, so you can translate gradually.
2. Don't rename keys or reorder array items. Each item lines up with the same position in `en.json`.
3. Preview it at `/ka`, e.g. http://localhost:3000/ka or http://localhost:3000/ka/work/iberieli

## When the English changes

Run:

```bash
node scripts/sync-ka.mjs
```

It adds any new keys/items to every `ka.json` as empty strings, removes keys that no longer exist in English, and **keeps everything you've already translated**.

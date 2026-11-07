#!/usr/bin/env node
// Keeps every content/**/ka.json in the same shape as its en.json sibling.
// - New keys / array items in en.json  -> added to ka.json as "" (empty = falls back to English)
// - Keys removed from en.json          -> removed from ka.json
// - Existing Georgian strings          -> kept
// Usage: node scripts/sync-ka.mjs [--check]   (--check exits 1 if anything would change)

import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "content");
const checkOnly = process.argv.includes("--check");

function findEnFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return findEnFiles(full);
    return name === "en.json" ? [full] : [];
  });
}

// Build the ka value for a given en value, reusing the existing ka value where shapes match.
function mirror(en, ka) {
  if (typeof en === "string") return typeof ka === "string" ? ka : "";
  if (Array.isArray(en)) {
    const prev = Array.isArray(ka) ? ka : [];
    return en.map((item, i) => mirror(item, prev[i]));
  }
  if (en && typeof en === "object") {
    const prev = ka && typeof ka === "object" && !Array.isArray(ka) ? ka : {};
    return Object.fromEntries(Object.entries(en).map(([k, v]) => [k, mirror(v, prev[k])]));
  }
  // numbers / booleans / null are not translated — copy as-is
  return en;
}

let changed = 0;
for (const enPath of findEnFiles(root)) {
  const kaPath = join(dirname(enPath), "ka.json");
  const en = JSON.parse(readFileSync(enPath, "utf8"));
  const before = existsSync(kaPath) ? readFileSync(kaPath, "utf8") : "";
  const ka = before ? JSON.parse(before) : undefined;
  const next = JSON.stringify(mirror(en, ka), null, 2) + "\n";
  if (next !== before) {
    changed++;
    console.log(`${checkOnly ? "would update" : "updated"}: ${relative(process.cwd(), kaPath)}`);
    if (!checkOnly) writeFileSync(kaPath, next);
  }
}
console.log(changed ? `${changed} file(s) ${checkOnly ? "out of sync" : "synced"}.` : "All ka.json files are in sync.");
if (checkOnly && changed) process.exit(1);

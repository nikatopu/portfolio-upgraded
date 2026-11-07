"use server";

// Server actions behind the visitor log and the quote form.
// Layers: zod validation → honeypot / too-fast check → Turnstile → per-visitor rate limit (DB count)
// → insert. Everything lands in the database and is reviewed in /admin (no email).
// Visitors get a generic error code, never internals.

import { and, eq, gt, sql } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { leads, notes } from "@/lib/db/schema";
import { visitorHash } from "@/lib/server/security";
import { verifyTurnstile } from "@/lib/server/turnstile";
import { leadInput, noteInput, type ActionResult } from "@/lib/validation";

const MIN_FILL_MS = 2500; // bots submit instantly
const NOTES_PER_DAY = 3;
const LEADS_PER_DAY = 5;

export async function submitNote(raw: unknown): Promise<ActionResult> {
  const parsed = noteInput.safeParse(raw);
  if (!parsed.success) return { ok: false, error: "invalid" };
  const v = parsed.data;

  // Bots: pretend it worked so they don't retry.
  if (v.website || Date.now() - v.startedAt < MIN_FILL_MS) return { ok: true };

  const { ip, hash } = await visitorHash();
  if (!(await verifyTurnstile(v.token, "note", ip))) return { ok: false, error: "captcha" };

  const db = await getDb();
  if (!db) return { ok: false, error: "unavailable" };

  try {
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(notes)
      .where(and(eq(notes.ipHash, hash), gt(notes.createdAt, sql`now() - interval '1 day'`)));
    if (count >= NOTES_PER_DAY) return { ok: false, error: "rate" };

    await db.insert(notes).values({
      name: v.name || null,
      role: v.role,
      message: v.message || null,
      doodle: v.doodle?.length ? v.doodle : null,
      stamp: v.stamp,
      lang: v.lang,
      ipHash: hash,
    });
    return { ok: true };
  } catch (err) {
    console.error("[submitNote]", err);
    return { ok: false, error: "server" };
  }
}

export async function submitLead(raw: unknown): Promise<ActionResult> {
  const parsed = leadInput.safeParse(raw);
  if (!parsed.success) return { ok: false, error: "invalid" };
  const v = parsed.data;
  if (v.website || Date.now() - v.startedAt < MIN_FILL_MS) return { ok: true };

  const { ip, hash } = await visitorHash();
  if (!(await verifyTurnstile(v.token, "lead", ip))) return { ok: false, error: "captcha" };

  const db = await getDb();
  if (!db) return { ok: false, error: "unavailable" };

  try {
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(leads)
      .where(and(eq(leads.ipHash, hash), gt(leads.createdAt, sql`now() - interval '1 day'`)));
    if (count >= LEADS_PER_DAY) return { ok: false, error: "rate" };

    await db.insert(leads).values({
      name: v.name,
      business: v.business || null,
      need: v.need,
      message: v.message || null,
      method: v.method,
      handle: v.handle,
      lang: v.lang,
      ipHash: hash,
    });
    return { ok: true };
  } catch (err) {
    console.error("[submitLead]", err);
    return { ok: false, error: "server" };
  }
}

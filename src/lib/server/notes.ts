import { desc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { getDb } from "../db";
import { notes, type DoodleData, type StampData } from "../db/schema";

export const NOTES_TAG = "notes";

export type WallNote = {
  id: string;
  name: string; // "" = anonymous
  role: (typeof notes.$inferSelect)["role"];
  message: string;
  doodle?: DoodleData;
  stamp: StampData;
  date: string; // ISO
};

/**
 * Approved notes for the wall. Cached and tagged, so the statically generated pages stay fast and
 * are regenerated the moment a note is approved (updateTag(NOTES_TAG) in the moderation action).
 */
export const getApprovedNotes = unstable_cache(
  async (): Promise<WallNote[] | null> => {
    const db = await getDb();
    if (!db) return null;
    const rows = await db.select().from(notes).where(eq(notes.status, "approved")).orderBy(desc(notes.createdAt)).limit(60);
    return rows.map((r) => ({
      id: r.id,
      name: r.name ?? "",
      role: r.role,
      message: r.message ?? "",
      doodle: r.doodle ?? undefined,
      stamp: r.stamp,
      date: r.createdAt.toISOString(),
    }));
  },
  ["approved-notes-v1"],
  { tags: [NOTES_TAG], revalidate: 3600 },
);

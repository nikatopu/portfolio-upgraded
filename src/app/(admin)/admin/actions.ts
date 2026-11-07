"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { notes } from "@/lib/db/schema";
import { endSession, isAdmin, passwordMatches, startSession } from "@/lib/server/admin";
import { NOTES_TAG } from "@/lib/server/notes";

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) {
    await new Promise((r) => setTimeout(r, 800)); // slow down guessing
    redirect("/admin?error=1");
  }
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin");
}

/** Approve or reject a note (admin session required). */
export async function moderate(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const decision = String(formData.get("decision") ?? "");

  if (!/^[0-9a-f-]{36}$/.test(id) || (decision !== "approved" && decision !== "rejected")) redirect("/admin");
  if (!(await isAdmin())) redirect("/admin");

  const db = await getDb();
  if (db) {
    await db.update(notes).set({ status: decision, moderatedAt: new Date() }).where(eq(notes.id, id));
    updateTag(NOTES_TAG); // the wall regenerates with this change right away
  }

  redirect("/admin");
}

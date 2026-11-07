// Counts taps on the WhatsApp / Viber / Telegram / email links (sent with navigator.sendBeacon).
// Stores only the method, page language and country (from Vercel's edge header): no IP, no cookies,
// no personal data, so no consent banner is needed.

import { getDb } from "@/lib/db";
import { contactClicks } from "@/lib/db/schema";
import { clickInput } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const parsed = clickInput.safeParse(JSON.parse(await request.text()));
    if (parsed.success) {
      const db = await getDb();
      await db?.insert(contactClicks).values({
        method: parsed.data.method,
        lang: parsed.data.lang ?? null,
        country: request.headers.get("x-vercel-ip-country"),
      });
    }
  } catch (err) {
    console.error("[track]", err);
  }
  return new Response(null, { status: 204 });
}

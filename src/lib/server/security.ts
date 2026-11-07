import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { headers } from "next/headers";

const isProd = process.env.NODE_ENV === "production";

function secret() {
  const s = process.env.APP_SECRET;
  if (s && s.length >= 32) return s;
  if (isProd) throw new Error("APP_SECRET must be set (32+ random characters) in production.");
  return "dev-only-secret-do-not-use-in-production-0123456789";
}

export function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function verifySignature(payload: string, signature: string) {
  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(signature);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

/** Salted hash of the visitor's IP, used only for rate limiting. The raw IP is never stored. */
export async function visitorHash() {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  return { ip, hash: createHash("sha256").update(`${secret()}|ip|${ip}`).digest("hex").slice(0, 40) };
}

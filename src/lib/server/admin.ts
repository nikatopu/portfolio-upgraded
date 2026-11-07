import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { sign, verifySignature } from "./security";

const COOKIE = "nt-admin";
const SESSION_DAYS = 30;

export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.length >= 10);
}

export function passwordMatches(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || expected.length < 10) return false;
  const a = createHash("sha256").update(input).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export async function isAdmin() {
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return false;
  const [exp, sig] = value.split(".");
  return Boolean(exp && sig && Number(exp) > Date.now() / 1000 && verifySignature(`admin|${exp}`, sig));
}

export async function startSession() {
  const exp = Math.floor(Date.now() / 1000) + SESSION_DAYS * 86400;
  (await cookies()).set(COOKIE, `${exp}.${sign(`admin|${exp}`)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_DAYS * 86400,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

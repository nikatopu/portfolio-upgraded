// Cloudflare Turnstile server-side check. Tokens are single-use; the action must match the widget's.
// Without TURNSTILE_SECRET_KEY: allowed in development, rejected in production (fail closed).

export async function verifyTurnstile(token: string | undefined, action: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return process.env.NODE_ENV !== "production";
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(8000),
    });
    const data = (await res.json()) as { success: boolean; action?: string };
    return data.success === true && (!data.action || data.action === action);
  } catch (err) {
    console.error("[turnstile] verification failed:", err);
    return false;
  }
}

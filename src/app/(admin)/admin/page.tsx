import { desc, eq, gt, sql } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { contactClicks, leads, notes } from "@/lib/db/schema";
import { adminConfigured, isAdmin } from "@/lib/server/admin";
import { login, logout } from "./actions";
import NoteCard from "./NoteCard";
import s from "./Admin.module.scss";

export const dynamic = "force-dynamic";

const fmt = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Tbilisi" });

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (!(await isAdmin())) {
    const { error } = await searchParams;
    return (
      <main className={s.login}>
        <h1>Admin</h1>
        {adminConfigured() ? (
          <form action={login}>
            <label htmlFor="pw">Password</label>
            <input id="pw" name="password" type="password" autoComplete="current-password" required autoFocus />
            {error && <p className={s.error}>Wrong password.</p>}
            <button className={s.btn}>Sign in</button>
          </form>
        ) : (
          <p className={s.notice}>
            Set <code>ADMIN_PASSWORD</code> (10+ characters) and <code>APP_SECRET</code> in the environment to enable the admin.
          </p>
        )}
      </main>
    );
  }

  const db = await getDb();
  if (!db) {
    return (
      <main className={s.wrap}>
        <p className={s.notice}>
          No database configured. Set <code>DATABASE_URL</code> (Neon via the Vercel Marketplace).
        </p>
      </main>
    );
  }

  const [pending, approved, recentLeads, clicks] = await Promise.all([
    db.select().from(notes).where(eq(notes.status, "pending")).orderBy(desc(notes.createdAt)).limit(100),
    db.select().from(notes).where(eq(notes.status, "approved")).orderBy(desc(notes.createdAt)).limit(30),
    db.select().from(leads).orderBy(desc(leads.createdAt)).limit(50),
    db
      .select({ method: contactClicks.method, count: sql<number>`count(*)::int` })
      .from(contactClicks)
      .where(gt(contactClicks.createdAt, sql`now() - interval '30 days'`))
      .groupBy(contactClicks.method),
  ]);

  return (
    <main className={s.wrap}>
      <header className={s.top}>
        <h1>Visitor log &amp; leads</h1>
        <form action={logout}>
          <button className={s.btnGhost}>Sign out</button>
        </form>
      </header>

      <section className={s.section}>
        <h2>Waiting for review ({pending.length})</h2>
        {pending.length ? (
          <div className={s.grid}>
            {pending.map((n) => (
              <NoteCard key={n.id} note={n} />
            ))}
          </div>
        ) : (
          <p className={s.empty}>Nothing to review.</p>
        )}
      </section>

      <section className={s.section}>
        <h2>Quote requests ({recentLeads.length})</h2>
        {recentLeads.length ? (
          <table className={s.table}>
            <thead>
              <tr>
                <th>When</th>
                <th>Who</th>
                <th>Needs</th>
                <th>Contact</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((l) => (
                <tr key={l.id}>
                  <td>{fmt.format(l.createdAt)}</td>
                  <td>
                    {l.name}
                    {l.business && <small> · {l.business}</small>}
                  </td>
                  <td>{l.need}</td>
                  <td>
                    {l.method}: {l.handle}
                  </td>
                  <td>{l.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={s.empty}>No quote requests yet.</p>
        )}
      </section>

      <section className={s.section}>
        <h2>Contact link taps (last 30 days)</h2>
        <div className={s.stats}>
          {(["whatsapp", "viber", "telegram", "email"] as const).map((m) => (
            <div key={m}>
              <strong>{clicks.find((c) => c.method === m)?.count ?? 0}</strong>
              {m}
            </div>
          ))}
        </div>
      </section>

      <section className={s.section}>
        <h2>On the wall ({approved.length})</h2>
        {approved.length ? (
          <div className={s.grid}>
            {approved.map((n) => (
              <NoteCard key={n.id} note={n} />
            ))}
          </div>
        ) : (
          <p className={s.empty}>No approved notes yet.</p>
        )}
      </section>
    </main>
  );
}

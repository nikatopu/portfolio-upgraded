// Database access: Neon Postgres over HTTP (DATABASE_URL).
// - Production / preview: set by the Vercel Marketplace Neon integration.
// - Local development: put a Neon *development branch* URL in .env.local (see docs/redesign/08-going-live.md),
//   or leave it unset: the wall then shows sample notes and the forms say "not available".
//
// (An embedded local database, PGlite, was tried and removed: Turbopack pulled its 8.7 MB WASM engine
// into the dev bundle and re-processed it on every change, which crashed `next dev` with out-of-memory.)
//
// Returns null when no database is configured; callers degrade gracefully instead of crashing.

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import type { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";
import * as schema from "./schema";

export type DB = PgDatabase<PgQueryResultHKT, typeof schema>;

// One client per process, shared across Next's separately bundled pages, actions and API routes.
const store = globalThis as typeof globalThis & { __ntDb?: DB | null };

export async function getDb(): Promise<DB | null> {
  if (store.__ntDb !== undefined) return store.__ntDb;
  const url = process.env.DATABASE_URL;
  store.__ntDb = url ? (drizzle({ client: neon(url), schema }) as unknown as DB) : null;
  return store.__ntDb;
}

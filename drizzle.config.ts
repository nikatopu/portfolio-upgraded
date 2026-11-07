import { defineConfig } from "drizzle-kit";

// drizzle-kit doesn't read env files itself. Put the production DATABASE_URL in .env.production.local:
// Next only loads that file for `next build`/`next start`, so `npm run dev` keeps using the local
// embedded database instead of writing test data into production.
for (const file of [".env.production.local", ".env.local"]) {
  try {
    process.loadEnvFile(file);
  } catch {}
}
// Migrations run DDL, so prefer Neon's direct (unpooled) connection when it's available.
const migrationUrl = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!migrationUrl) {
  console.error("DATABASE_URL is not set. Add it to .env.production.local (see docs/redesign/08-going-live.md).");
}

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: migrationUrl ?? "" },
});

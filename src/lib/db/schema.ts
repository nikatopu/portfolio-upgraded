import { index, jsonb, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const NOTE_ROLES = ["recruiter", "manager", "client", "engineer", "designer", "friend", "visitor"] as const;
export const CONTACT_METHODS = ["whatsapp", "viber", "telegram", "email"] as const;

export type StampData = { seed: string; density: number; flow: number; shape: "circle" | "square" | "hex" };
/** Strokes of [x0, y0, x1, y1, …] in a 1000×625 box. */
export type DoodleData = number[][];

export const noteRole = pgEnum("note_role", NOTE_ROLES);
export const noteStatus = pgEnum("note_status", ["pending", "approved", "rejected"]);

/** Visitor log. Every entry starts as `pending` and is only shown once approved. */
export const notes = pgTable(
  "notes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name"), // null = anonymous
    role: noteRole("role").notNull(),
    message: text("message"), // exactly one of message / doodle is set
    doodle: jsonb("doodle").$type<DoodleData>(),
    stamp: jsonb("stamp").$type<StampData>().notNull(),
    lang: text("lang").notNull().default("en"),
    status: noteStatus("status").notNull().default("pending"),
    ipHash: text("ip_hash").notNull(), // salted hash, never the raw IP
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    moderatedAt: timestamp("moderated_at", { withTimezone: true }),
  },
  (t) => [index("notes_status_created_idx").on(t.status, t.createdAt), index("notes_ip_created_idx").on(t.ipHash, t.createdAt)],
);

/** Quote requests from the contact form. */
export const leads = pgTable(
  "leads",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    business: text("business"),
    need: text("need").notNull(),
    message: text("message"),
    method: text("method").notNull(),
    handle: text("handle").notNull(),
    lang: text("lang").notNull().default("en"),
    ipHash: text("ip_hash").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("leads_ip_created_idx").on(t.ipHash, t.createdAt)],
);

/** Anonymous counts of WhatsApp / Viber / Telegram / email link taps. No personal data. */
export const contactClicks = pgTable(
  "contact_clicks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    method: text("method").notNull(),
    lang: text("lang"),
    country: text("country"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("contact_clicks_created_idx").on(t.createdAt)],
);

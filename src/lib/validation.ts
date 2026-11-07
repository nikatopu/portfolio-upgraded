// Input schemas for everything visitors can submit. Shared by server actions and API routes.
import { z } from "zod";
import { CONTACT_METHODS, NOTE_ROLES } from "./db/schema";

export const DOODLE_W = 1000;
export const DOODLE_H = 625;
const MAX_STROKES = 60;
const MAX_POINTS = 4000;

const lang = z.enum(["en", "ka"]);
// Anti-bot fields sent by every form: Turnstile token, when the form was opened, and a honeypot.
const botFields = {
  token: z.string().max(4096).optional(),
  startedAt: z.number().int().positive(),
  website: z.string().max(200).optional(), // honeypot: real people never fill this in
};

export const stampSchema = z.object({
  seed: z.string().regex(/^[a-z0-9]{1,16}$/),
  density: z.number().min(0).max(1),
  flow: z.number().min(0).max(1),
  shape: z.enum(["circle", "square", "hex"]),
});

const stroke = z
  .array(z.number().int())
  .min(2)
  .max(MAX_POINTS * 2)
  .refine((a) => a.length % 2 === 0 && a.every((v, i) => v >= 0 && v <= (i % 2 === 0 ? DOODLE_W : DOODLE_H)), "Stroke out of bounds");

export const noteInput = z
  .object({
    name: z.string().trim().max(60).default(""),
    role: z.enum(NOTE_ROLES),
    message: z.string().trim().max(280).default(""),
    doodle: z.array(stroke).max(MAX_STROKES).optional(),
    stamp: stampSchema,
    lang,
    ...botFields,
  })
  .refine((v) => (v.message.length > 0) !== Boolean(v.doodle?.length), "Send either a message or a drawing")
  .refine((v) => (v.doodle ?? []).reduce((n, s) => n + s.length / 2, 0) <= MAX_POINTS, "Drawing too large");

export type NoteInput = z.infer<typeof noteInput>;

export const leadInput = z
  .object({
    name: z.string().trim().min(1).max(80),
    business: z.string().trim().max(120).default(""),
    need: z.string().trim().min(1).max(80),
    message: z.string().trim().max(2000).default(""),
    method: z.enum(CONTACT_METHODS),
    handle: z.string().trim().min(3).max(120),
    lang,
    ...botFields,
  })
  .refine((v) => v.method !== "email" || z.email().safeParse(v.handle).success, { path: ["handle"], message: "Invalid email" });

export type LeadInput = z.infer<typeof leadInput>;

export const clickInput = z.object({ method: z.enum(CONTACT_METHODS), lang: lang.optional() });

export type ActionError = "invalid" | "captcha" | "rate" | "unavailable" | "server";
export type ActionResult = { ok: true } | { ok: false; error: ActionError };

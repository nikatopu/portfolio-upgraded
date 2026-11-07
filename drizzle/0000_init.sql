CREATE TYPE "public"."note_role" AS ENUM('recruiter', 'manager', 'client', 'engineer', 'designer', 'friend', 'visitor');--> statement-breakpoint
CREATE TYPE "public"."note_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TABLE "contact_clicks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"method" text NOT NULL,
	"lang" text,
	"country" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"business" text,
	"need" text NOT NULL,
	"message" text,
	"method" text NOT NULL,
	"handle" text NOT NULL,
	"lang" text DEFAULT 'en' NOT NULL,
	"ip_hash" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"role" "note_role" NOT NULL,
	"message" text,
	"doodle" jsonb,
	"stamp" jsonb NOT NULL,
	"lang" text DEFAULT 'en' NOT NULL,
	"status" "note_status" DEFAULT 'pending' NOT NULL,
	"ip_hash" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"moderated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE INDEX "contact_clicks_created_idx" ON "contact_clicks" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "leads_ip_created_idx" ON "leads" USING btree ("ip_hash","created_at");--> statement-breakpoint
CREATE INDEX "notes_status_created_idx" ON "notes" USING btree ("status","created_at");--> statement-breakpoint
CREATE INDEX "notes_ip_created_idx" ON "notes" USING btree ("ip_hash","created_at");
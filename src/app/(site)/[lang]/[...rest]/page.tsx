import { notFound } from "next/navigation";

// Any unknown URL under a language renders the site-styled [lang]/not-found.tsx.
export default function CatchAll() {
  notFound();
}

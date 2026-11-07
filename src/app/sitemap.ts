import type { MetadataRoute } from "next";
import { getCases, KA_READY } from "@/lib/content";
import { absoluteUrl, localePath } from "@/lib/seo";

function entry(path: string, priority: number, lastModified: Date): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    lastModified,
    priority,
    ...(KA_READY && { alternates: { languages: { en: absoluteUrl(path), ka: absoluteUrl(localePath(path, "ka")) } } }),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [entry("/", 1, now), ...getCases("en").map((c) => entry(`/work/${c.slug}`, 0.8, now))];
  // Georgian versions are listed too, each pointing back at its alternates.
  const ka = KA_READY ? pages.map((p) => ({ ...p, url: p.alternates!.languages!.ka as string })) : [];
  return [
    ...pages,
    ...ka,
    { url: absoluteUrl("/math-animations"), lastModified: now, priority: 0.3 },
    { url: absoluteUrl("/guess-the-ball"), lastModified: now, priority: 0.3 },
  ];
}

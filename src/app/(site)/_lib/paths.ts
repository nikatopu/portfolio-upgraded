import type { Lang } from "@/lib/content";
import { localePath } from "@/lib/seo";

/** Site URL for a path in the given language: "/" & "/work/x" (en), "/ka" & "/ka/work/x" (ka). */
export function href(path: string, lang: Lang, hash?: string) {
  const url = localePath(path, lang);
  return hash ? `${url}#${hash}` : url;
}

/** The same page in the other language, given the current browser pathname. */
export function switchLangPath(pathname: string, lang: Lang) {
  if (lang === "ka") return pathname.replace(/^\/ka(?=\/|$)/, "") || "/";
  return `/ka${pathname === "/" ? "" : pathname}`;
}

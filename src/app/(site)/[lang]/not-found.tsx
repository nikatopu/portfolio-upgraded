import Link from "next/link";
import s from "./NotFound.module.scss";

// Rendered inside the [lang] layout, so it gets the site's fonts, colors and theme.
export default function NotFound() {
  return (
    <main className={s.wrap}>
      <p className={s.code}>Error 404 · file not found</p>
      <h1 className={s.title}>This folder is empty.</h1>
      <p className={s.text}>The page you were looking for isn&apos;t in the archive. It may have moved, or the link may be mistyped.</p>
      <Link href="/" className={s.link}>
        ← Back to the case files
      </Link>
    </main>
  );
}

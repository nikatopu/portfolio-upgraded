"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Lang, UI } from "@/lib/content";
import { href, switchLangPath } from "../_lib/paths";
import { SOUND_FEATURE, useSound } from "../_lib/sound";
import s from "./Header.module.scss";

// showLangToggle: hidden in production until the Georgian translation is mostly done (KA_READY);
// always shown in development so translations can be previewed.
type Props = { ui: UI["nav"]; lang: Lang; name: string; showLangToggle: boolean };

export default function Header({ ui, lang, name, showLangToggle }: Props) {
  const pathname = usePathname();
  const { enabled, toggle, play } = useSound();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setTheme(
      document.documentElement.dataset.theme === "dark" ? "dark" : "light",
    );
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("nt-theme", next);
    } catch {}
    setTheme(next);
    play("tick");
  }

  const otherLangHref = switchLangPath(pathname, lang);

  return (
    <header className={s.header}>
      <div className={s.inner}>
        <Link
          href={href("/", lang)}
          className={s.wordmark}
          onClick={() => play("tick")}
        >
          {name}
        </Link>

        <nav className={s.nav} aria-label="Main">
          <a href={href("/", lang, "work")} onClick={() => play("tick")}>
            {ui.work}
          </a>
          <a href={href("/", lang, "lab")} onClick={() => play("tick")}>
            {ui.lab}
          </a>
          <a href={href("/", lang, "notes")} onClick={() => play("tick")}>
            {ui.notes}
          </a>
        </nav>

        <div className={s.tools}>
          {showLangToggle && (
            <Link
              href={otherLangHref}
              className={s.tool}
              lang={lang === "ka" ? "en" : "ka"}
              aria-label={lang === "ka" ? "English" : ui.otherLanguageLabel}
            >
              {lang === "ka" ? "EN" : ui.otherLanguage}
            </Link>
          )}

          <button
            type="button"
            className={s.tool}
            onClick={toggleTheme}
            aria-label={theme === "dark" ? ui.toLight : ui.toDark}
            title={theme === "dark" ? ui.toLight : ui.toDark}
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" aria-hidden>
                <circle cx="12" cy="12" r="4.2" />
                <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
              </svg>
            )}
          </button>

          {SOUND_FEATURE && (
            <button
              type="button"
              className={s.tool}
              onClick={toggle}
              aria-pressed={enabled}
              aria-label={enabled ? ui.soundOff : ui.soundOn}
              title={enabled ? ui.soundOff : ui.soundOn}
            >
              <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
                {enabled ? (
                  <path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a7.8 7.8 0 0 1 0 11" />
                ) : (
                  <path d="M16 9.5l5 5M21 9.5l-5 5" />
                )}
              </svg>
            </button>
          )}

          <a
            href={href("/", lang, "contact")}
            className={s.cta}
            onClick={() => play("tick")}
          >
            {ui.contact}
          </a>
        </div>
      </div>
    </header>
  );
}

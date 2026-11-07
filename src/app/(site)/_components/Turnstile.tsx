"use client";

// Cloudflare Turnstile widget (explicit rendering). In "interaction-only" mode it stays invisible
// for most visitors and only shows a checkbox when Cloudflare isn't sure.
// Without NEXT_PUBLIC_TURNSTILE_SITE_KEY (local dev) it renders nothing; the server skips the check in dev.

import { useEffect, useImperativeHandle, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id: string) => void;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let scriptPromise: Promise<void> | null = null;

function loadScript() {
  scriptPromise ??= new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SCRIPT;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      scriptPromise = null;
      reject(new Error("Turnstile failed to load"));
    };
    document.head.appendChild(s);
  });
  return scriptPromise;
}

export type TurnstileHandle = { reset: () => void };

type Props = { action: "note" | "lead"; onToken: (token: string | undefined) => void; ref?: React.Ref<TurnstileHandle> };

export default function Turnstile({ action, onToken, ref }: Props) {
  const el = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  useImperativeHandle(ref, () => ({
    reset: () => {
      onTokenRef.current(undefined);
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
    },
  }));

  useEffect(() => {
    if (!SITE_KEY || !el.current) return;
    let cancelled = false;
    loadScript()
      .then(() => {
        if (cancelled || !el.current || !window.turnstile) return;
        widgetId.current = window.turnstile.render(el.current, {
          sitekey: SITE_KEY,
          action,
          appearance: "interaction-only",
          theme: document.documentElement.dataset.theme === "dark" ? "dark" : "light",
          callback: (t: string) => onTokenRef.current(t),
          "expired-callback": () => onTokenRef.current(undefined),
          "error-callback": () => onTokenRef.current(undefined),
        });
      })
      .catch((err) => console.error(err));
    return () => {
      cancelled = true;
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [action]);

  if (!SITE_KEY) return null;
  return <div ref={el} />;
}

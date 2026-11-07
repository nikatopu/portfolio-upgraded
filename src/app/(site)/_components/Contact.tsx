"use client";

import { useRef, useState, useTransition } from "react";
import type { Lang, Site, UI } from "@/lib/content";
import type { ActionError } from "@/lib/validation";
import { submitLead } from "../_actions";
import { useSound } from "../_lib/sound";
import SectionHead from "./SectionHead";
import Select from "./Select";
import Turnstile, { type TurnstileHandle } from "./Turnstile";
import sec from "./Section.module.scss";
import s from "./Contact.module.scss";

type Method = "whatsapp" | "viber" | "telegram" | "email";
type Props = { ui: UI["contact"]; contact: Site["contact"]; lang: Lang };

const METHOD_LABEL: Record<Method, string> = { whatsapp: "WhatsApp", viber: "Viber", telegram: "Telegram", email: "Email" };

/** Anonymous tap counter (method + language only). sendBeacon survives the page navigating away. */
function trackClick(method: Method, lang: Lang) {
  try {
    const body = JSON.stringify({ method, lang });
    if (!navigator.sendBeacon?.("/api/track", new Blob([body], { type: "application/json" }))) {
      void fetch("/api/track", { method: "POST", body, keepalive: true });
    }
  } catch {}
}

export default function Contact({ ui, contact, lang }: Props) {
  const { play } = useSound();
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [need, setNeed] = useState("");
  const [message, setMessage] = useState("");
  const [method, setMethod] = useState<Method>("whatsapp");
  const [handle, setHandle] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [token, setToken] = useState<string | undefined>();
  const [error, setError] = useState<ActionError | null>(null);
  const [sent, setSent] = useState(false);
  const [pending, startTransition] = useTransition();
  const startedAt = useRef(Date.now());
  const turnstile = useRef<TurnstileHandle>(null);

  // Deep links. Pre-filled text helps you see which messages came from the site.
  const prefill = encodeURIComponent(ui.whatsappPrefill);
  const direct: { id: Method; href: string; hint: string }[] = [
    { id: "whatsapp", href: `https://wa.me/${contact.whatsapp}?text=${prefill}`, hint: contact.phoneDisplay },
    { id: "viber", href: `viber://chat?number=${encodeURIComponent(contact.viber)}`, hint: contact.phoneDisplay },
    { id: "telegram", href: `https://t.me/${contact.telegram}`, hint: contact.phoneDisplay },
    { id: "email", href: `mailto:${contact.email}`, hint: contact.email },
  ];

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pending) return;
    setError(null);
    startTransition(async () => {
      const res = await submitLead({ name, business, need, message, method, handle, lang, token, startedAt: startedAt.current, website });
      if (res.ok) {
        setSent(true);
        play("stamp");
      } else {
        setError(res.error);
        turnstile.current?.reset();
      }
    });
  }

  return (
    <section className={sec.section} id="contact">
      <SectionHead index="05" label={ui.label} title={ui.title} intro={ui.intro} />

      <div className={s.grid}>
        <form className={s.form} data-reveal onSubmit={submit} aria-busy={pending}>
          <div className={s.row}>
            <label className={s.field}>
              <span>{ui.name}</span>
              <input required maxLength={80} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label className={s.field}>
              <span>{ui.business}</span>
              <input maxLength={120} autoComplete="organization" value={business} onChange={(e) => setBusiness(e.target.value)} />
            </label>
          </div>

          <input className={s.honeypot} tabIndex={-1} autoComplete="off" aria-hidden name="website" value={website} onChange={(e) => setWebsite(e.target.value)} />

          <div className={s.field}>
            <label htmlFor="quote-needs">
              <span>{ui.needs}</span>
            </label>
            <Select
              id="quote-needs"
              tone="raised"
              required
              value={need}
              onChange={setNeed}
              placeholder={ui.needsPlaceholder}
              options={ui.needsOptions.map((opt) => ({ value: opt, label: opt }))}
            />
          </div>

          <label className={s.field}>
            <span>{ui.message}</span>
            <textarea rows={4} maxLength={2000} value={message} onChange={(e) => setMessage(e.target.value)} />
          </label>

          <fieldset className={s.field}>
            <legend>{ui.method}</legend>
            <div className={s.chips}>
              {(Object.keys(METHOD_LABEL) as Method[]).map((m) => (
                <button key={m} type="button" aria-pressed={method === m} onClick={() => setMethod(m)}>
                  {METHOD_LABEL[m]}
                </button>
              ))}
            </div>
          </fieldset>

          <label className={s.field}>
            <span>{ui.handle}</span>
            <input
              required
              minLength={3}
              maxLength={120}
              type={method === "email" ? "email" : "text"}
              inputMode={method === "email" ? "email" : method === "telegram" ? "text" : "tel"}
              autoComplete={method === "email" ? "email" : method === "telegram" ? "off" : "tel"}
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder={method === "email" ? "you@company.com" : method === "telegram" ? "@username" : "+995 …"}
            />
          </label>

          <Turnstile ref={turnstile} action="lead" onToken={setToken} />

          <p className={s.privacy}>{ui.privacy}</p>

          {error && (
            <p className={s.error} role="alert">
              {ui.errors[error]}
            </p>
          )}

          {sent ? (
            <p className={s.sent} role="status">
              {ui.sent}
            </p>
          ) : (
            <button className={s.submit} disabled={pending}>
              {pending ? ui.sending : ui.submit}
            </button>
          )}
        </form>

        <aside className={s.direct} data-reveal="120">
          <p className={s.directTitle}>{ui.directTitle}</p>
          {direct.map((d) => (
            <a
              key={d.id}
              href={d.href}
              target={d.id === "email" || d.id === "viber" ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={s.method}
              onClick={() => {
                trackClick(d.id, lang);
                play("tick");
              }}
            >
              <span className={s.methodName}>{METHOD_LABEL[d.id]}</span>
              <span className={s.methodHint}>{d.hint}</span>
              <span aria-hidden>↗</span>
            </a>
          ))}
        </aside>
      </div>
    </section>
  );
}

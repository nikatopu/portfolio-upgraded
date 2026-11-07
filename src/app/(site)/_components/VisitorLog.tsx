"use client";

import { useRef, useState, useTransition } from "react";
import type { Lang, UI } from "@/lib/content";
import type { WallNote } from "@/lib/server/notes";
import type { ActionError } from "@/lib/validation";
import { submitNote } from "../_actions";
import { NOTE_ROLES, type Doodle, type NoteRole } from "../_lib/notes";
import { randomSeed, STAMP_SHAPES, type StampParams } from "../_lib/stamp";
import DiceIcon from "./DiceIcon";
import DoodlePad, { DoodleView } from "./DoodlePad";
import SectionHead from "./SectionHead";
import Select from "./Select";
import Stamp from "./Stamp";
import Turnstile, { type TurnstileHandle } from "./Turnstile";
import sec from "./Section.module.scss";
import s from "./Notes.module.scss";

type Props = { ui: UI["notes"]; lang: Lang; notes: WallNote[]; sample: boolean };

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "Asia/Tbilisi" });

export default function VisitorLog({ ui, lang, notes, sample }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [openCount, setOpenCount] = useState(0); // remounts the dialog form each time it opens

  function openDialog() {
    setOpenCount((n) => n + 1);
    dialogRef.current?.showModal();
  }

  return (
    <section className={`${sec.section} ${sec.cream}`} id="notes">
      <SectionHead title={ui.title} intro={ui.intro} />

      <div className={s.wall}>
        {notes.map((note, i) => (
          <article key={note.id} className={s.card} style={{ "--tilt": `${((i * 37) % 5) - 2}deg` } as React.CSSProperties} data-reveal={(i % 3) * 80}>
            <header className={s.cardHead}>
              <div>
                <p className={s.cardName}>{note.name || ui.anonymous}</p>
                <p className={s.cardRole}>
                  {ui.roles[note.role]} · {dateFmt.format(new Date(note.date))}
                </p>
              </div>
              <Stamp params={note.stamp} size={64} label="Visitor stamp" className={s.cardStamp} />
            </header>
            {note.doodle ? <DoodleView doodle={note.doodle} className={s.cardDoodle} /> : <p className={s.cardMsg}>{note.message}</p>}
          </article>
        ))}

        <button type="button" className={s.addCard} onClick={openDialog}>
          <span className={s.plus} aria-hidden>
            +
          </span>
          {ui.cta}
          {notes.length === 0 && <small className={s.emptyHint}>{ui.empty}</small>}
        </button>
      </div>

      <dialog ref={dialogRef} className={s.dialog} onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()} aria-labelledby="note-title">
        {openCount > 0 && <NoteForm key={openCount} ui={ui} lang={lang} onClose={() => dialogRef.current?.close()} />}
      </dialog>
    </section>
  );
}

function NoteForm({ ui, lang, onClose }: { ui: UI["notes"]; lang: Lang; onClose: () => void }) {
  const m = ui.modal;
  const [tab, setTab] = useState<"write" | "draw">("write");
  const [name, setName] = useState("");
  const [role, setRole] = useState<NoteRole>("visitor");
  const [message, setMessage] = useState("");
  const [doodle, setDoodle] = useState<Doodle>([]);
  const [stamp, setStamp] = useState<StampParams>(() => ({ seed: randomSeed(), density: 0.5, flow: 0.4, shape: "circle" }));
  const [website, setWebsite] = useState(""); // honeypot
  const [token, setToken] = useState<string | undefined>();
  const [error, setError] = useState<ActionError | null>(null);
  const [sent, setSent] = useState(false);
  const [pending, startTransition] = useTransition();
  const startedAt = useRef(Date.now());
  const turnstile = useRef<TurnstileHandle>(null);

  const canSend = (tab === "write" ? message.trim().length > 0 : doodle.length > 0) && !pending;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend) return;
    setError(null);
    startTransition(async () => {
      const res = await submitNote({
        name,
        role,
        message: tab === "write" ? message : "",
        doodle: tab === "draw" ? doodle : undefined,
        stamp,
        lang,
        token,
        startedAt: startedAt.current,
        website,
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError(res.error);
        turnstile.current?.reset();
      }
    });
  }

  return (
    <div className={s.dialogInner}>
      <div className={s.dialogHead}>
        <h3 id="note-title">{m.title}</h3>
        <button type="button" className={s.close} onClick={onClose} aria-label={m.close}>
          ×
        </button>
      </div>

      {sent ? (
        <div className={s.success} role="status">
          <Stamp params={stamp} size={150} label="Your stamp" className={s.successStamp} />
          <h4>{m.successTitle}</h4>
          <p>{m.successText}</p>
          <button type="button" className={s.submit} onClick={onClose}>
            {m.done}
          </button>
        </div>
      ) : (
        <form className={s.form} onSubmit={submit}>
          <label className={s.field}>
            <span>{m.name}</span>
            <input value={name} onChange={(e) => setName(e.target.value)} maxLength={60} placeholder={m.namePlaceholder} autoComplete="name" />
          </label>

          {/* honeypot: hidden from people, tempting to bots */}
          <input className={s.honeypot} tabIndex={-1} autoComplete="off" aria-hidden name="website" value={website} onChange={(e) => setWebsite(e.target.value)} />

          <div className={s.field}>
            <label htmlFor="note-role">
              <span>{m.role}</span>
            </label>
            <Select id="note-role" value={role} onChange={(v) => setRole(v as NoteRole)} options={NOTE_ROLES.map((r) => ({ value: r, label: ui.roles[r] }))} />
          </div>

          <div className={s.tabs} role="tablist">
            <button type="button" role="tab" aria-selected={tab === "write"} onClick={() => setTab("write")}>
              {m.tabWrite}
            </button>
            <button type="button" role="tab" aria-selected={tab === "draw"} onClick={() => setTab("draw")}>
              {m.tabDoodle}
            </button>
          </div>

          {tab === "write" ? (
            <label className={s.field}>
              <span>
                {m.message} <output>{message.length}/280</output>
              </span>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} maxLength={280} rows={4} placeholder={m.messagePlaceholder} />
            </label>
          ) : (
            <DoodlePad value={doodle} onChange={setDoodle} labels={{ hint: m.doodleHint, undo: m.undo, clear: m.clear }} />
          )}

          <div className={s.stampRow}>
            <Stamp params={stamp} size={72} label="Your stamp" />
            <div>
              <p className={s.fieldLabel}>{m.yourStamp}</p>
              <button
                type="button"
                className={s.linkBtn}
                onClick={() => {
                  setStamp((p) => ({ ...p, seed: randomSeed(), shape: STAMP_SHAPES[Math.floor(Math.random() * STAMP_SHAPES.length)] }));
                }}
              >
                <DiceIcon className={s.diceIcon} /> {m.shuffle}
              </button>
            </div>
          </div>

          <Turnstile ref={turnstile} action="note" onToken={setToken} />

          <p className={s.notice}>{m.reviewNotice}</p>
          <p className={s.privacy}>{m.privacy}</p>
          {error && (
            <p className={s.error} role="alert">
              {m.errors[error]}
            </p>
          )}

          <button type="submit" className={s.submit} disabled={!canSend}>
            {pending ? m.sending : m.submit}
          </button>
        </form>
      )}
    </div>
  );
}

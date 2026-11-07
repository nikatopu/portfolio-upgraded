import type { notes } from "@/lib/db/schema";
import { DoodleView } from "../../(site)/_components/DoodlePad";
import Stamp from "../../(site)/_components/Stamp";
import { moderate } from "./actions";
import s from "./Admin.module.scss";

type Note = typeof notes.$inferSelect;
type Props = { note: Note };

const fmt = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Tbilisi" });

export default function NoteCard({ note }: Props) {
  return (
    <article className={s.card}>
      <div className={s.cardHead}>
        <div>
          <strong>{note.name || "Anonymous"}</strong>
          <small>
            {note.role} · {note.lang.toUpperCase()} · {fmt.format(note.createdAt)} · <b>{note.status}</b>
          </small>
        </div>
        <Stamp params={note.stamp} size={56} label="Stamp" />
      </div>

      {note.doodle ? <DoodleView doodle={note.doodle} className={s.doodle} /> : <p className={s.message}>{note.message}</p>}

      <div className={s.actions}>
        {note.status !== "approved" && (
          <form action={moderate}>
            <ModerationFields id={note.id} decision="approved" />
            <button className={s.btn}>Approve</button>
          </form>
        )}
        {note.status !== "rejected" && (
          <form action={moderate}>
            <ModerationFields id={note.id} decision="rejected" />
            <button className={s.btnDanger}>{note.status === "approved" ? "Hide from wall" : "Reject"}</button>
          </form>
        )}
      </div>
    </article>
  );
}

function ModerationFields({ id, decision }: { id: string; decision: string }) {
  return (
    <>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="decision" value={decision} />
    </>
  );
}

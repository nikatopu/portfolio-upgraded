"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { CaseStudy, Lang, UI } from "@/lib/content";
import { href } from "../_lib/paths";
import Stamp from "./Stamp";
import s from "./FolderStack.module.scss";

type Item = Pick<CaseStudy, "slug" | "number" | "title" | "headline" | "summary" | "tabLabel" | "client" | "years" | "kind" | "image" | "stack">;
type Props = { cases: Item[]; ui: UI["work"]; lang: Lang };

export default function FolderStack({ cases, ui, lang }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className={s.stack}>
      {cases.map((c, i) => (
        <Folder key={c.slug} item={c} index={i} count={cases.length} progress={scrollYProgress} ui={ui} lang={lang} />
      ))}
    </div>
  );
}

function Folder({ item, index, count, progress, ui, lang }: { item: Item; index: number; count: number; progress: MotionValue<number>; ui: UI["work"]; lang: Lang }) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);

  // Earlier folders sink back slightly as later ones slide over them.
  const start = index / count;
  const depth = count - 1 - index;
  const scale = useTransform(progress, [start, 1], [1, 1 - depth * 0.035]);
  const dim = useTransform(progress, [start, 1], [0, depth * 0.06]);

  const link = href(`/work/${item.slug}`, lang);

  function open(e: React.MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // allow new-tab etc.
    if (reduce) return;
    e.preventDefault();
    setOpening(true);
    window.setTimeout(() => router.push(link), 460);
  }

  return (
    <div className={s.slot} style={{ "--i": index } as React.CSSProperties}>
      <motion.div className={s.folderMotion} style={reduce ? undefined : { scale }}>
        <Link href={link} className={`${s.folder} ${opening ? s.opening : ""}`} onClick={open}>
          {/* back panel with its tab */}
          <span className={s.back} aria-hidden>
            <span className={s.tab}>
              <span>
                {ui.caseLabel} {item.number}
              </span>
              <span className={s.tabMeta}>{item.tabLabel}</span>
            </span>
          </span>

          {/* papers inside the folder */}
          <span className={`${s.paper} ${s.paperUnder}`} aria-hidden />
          <span className={`${s.paper} ${s.paperTop}`} aria-hidden>
            <span className={s.typed}>
              FILE NO. {item.number} — {item.client.toUpperCase()} — {item.years}
            </span>
          </span>

          {/* front flap (wrapper carries the tilt + a shadow that follows the notch) */}
          <span className={s.frontWrap}>
          <span className={s.front}>
            <span className={s.text}>
              <span className={s.label}>
                <span className={s.labelNo}>
                  {ui.caseLabel} {item.number}
                </span>
                <span className={s.labelMeta}>
                  {item.kind === "client" ? ui.client : ui.product} · {item.years}
                </span>
              </span>
              <span className={s.title}>{item.title}</span>
              <span className={s.headline}>{item.headline}</span>
              <span className={s.summary}>{item.summary}</span>
              <span className={s.stackList}>{item.stack.slice(0, 4).join(" · ")}</span>
              <span className={s.open}>
                {ui.open} <span aria-hidden>→</span>
              </span>
            </span>

            <span className={s.photo}>
              <span className={s.clip} aria-hidden />
              <span className={s.print}>
                <span className={s.imgBox}>
                  <Image src={item.image} alt="" fill sizes="(max-width: 760px) 90vw, 440px" />
                </span>
              </span>
              <span className={s.stamp} aria-hidden>
                <Stamp params={{ seed: item.slug, density: 0.5, flow: 0.35, shape: "circle" }} size={104} label="" />
              </span>
            </span>
          </span>
          </span>

          {!reduce && <motion.span className={s.dim} style={{ opacity: dim }} aria-hidden />}
        </Link>
      </motion.div>
    </div>
  );
}

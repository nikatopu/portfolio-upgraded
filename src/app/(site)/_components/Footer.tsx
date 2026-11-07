import type { Site, UI } from "@/lib/content";
import TbilisiClock from "./TbilisiClock";
import s from "./Footer.module.scss";

type Props = { ui: UI["footer"]; site: Site };

export default function Footer({ ui, site }: Props) {
  return (
    <footer className={s.footer}>
      <p className={s.big}>
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
      </p>
      <div className={s.cols}>
        <nav className={s.links} aria-label="Social">
          <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={site.socials.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={site.socials.youtube} target="_blank" rel="noopener noreferrer">YouTube · @topucodes</a>
          <a href={site.resume} target="_blank" rel="noopener noreferrer">CV</a>
        </nav>
        <p>
          {ui.localTime}: <TbilisiClock />
        </p>
        <p>
          © {new Date().getFullYear()} {ui.rights} <span className={s.version}>{site.version}</span>
        </p>
      </div>
    </footer>
  );
}

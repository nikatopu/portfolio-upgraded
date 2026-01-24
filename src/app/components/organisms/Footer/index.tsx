import config from "@/app/lib/config";
import TopuPortfolio from "../../atoms/TopuPortfolio";
import style from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={style.container}>
      <div className={style.logoContainer}>
        <TopuPortfolio />
      </div>

      <div className={style.linksContainer}>
        {Object.entries(config.socials).map(([name, link], index) => (
          <a
            key={"footerSocial" + index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={style.link}
            aria-label={name}
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </a>
        ))}
      </div>

      <p className={style.copy}>© {new Date().getFullYear()} Nikoloz Topuridze. Made with love.</p>
    </footer>
  );
}

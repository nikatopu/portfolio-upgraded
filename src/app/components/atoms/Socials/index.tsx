import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./Socials.module.scss";
import {
  faGithub,
  faLinkedin,
  faUpwork,
} from "@fortawesome/free-brands-svg-icons";

export default function Socials() {
  return (
    <div className={style.container}>
        
      <a href="#" className={style.link}>
        <FontAwesomeIcon icon={faLinkedin} color="#F6F8FA" />
      </a>

      <a href="#" className={style.link}>
        <FontAwesomeIcon icon={faGithub} color="#F6F8FA" />
      </a>

      <a href="#" className={style.link}>
        <FontAwesomeIcon icon={faUpwork} color="#F6F8FA" />
      </a>

      <a href="#" className={style.link}>
        <svg
          width="30"
          height="32"
          viewBox="0 0 30 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.7292 25.7292V9.89583H9.89583V8.90625C9.89583 7.26908 11.2274 5.9375 12.8646 5.9375H15.8333V0H12.8646C10.5034 0.00293289 8.23976 0.942209 6.57015 2.61182C4.90054 4.28143 3.96127 6.54507 3.95833 8.90625V9.89583H0V15.8333H3.95833V25.7292H0V31.6667H13.8542V25.7292H9.89583V15.8333H19.8471V25.7292H15.8333V31.6667H29.6875V25.7292H25.7292Z"
            fill="#F6F8FA"
          />
        </svg>
      </a>
    </div>
  );
}

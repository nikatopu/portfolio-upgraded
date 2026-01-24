import { TWorkExperience } from "@/app/lib/types";
import style from "./Job.module.scss";

type Props = {
  experience: TWorkExperience;
};

export default function Job({ experience }: Props) {
  return (
    <div className={style.container}>
      <div className={style.symbol}>
        <div
          className={
            style.circle + " " + (experience.current ? style.isCurrent : "")
          }
        />
        <div
          className={
            style.line + " " + (experience.current ? style.isCurrent : "")
          }
        />
      </div>

      <div className={style.details}>
        <h3 className={style.position}>
          {experience.position} -{" "}
          {experience.companySite ? (
            <a
              href={experience.companySite}
              target="_blank"
              rel="noreferrer noopener"
              className={style.companyLink}
            >
              {experience.company + " ↗"} 
            </a>
          ) : (
            experience.company
          )}
        </h3>

        <p className={style.description}>{experience.description}</p>
      </div>

      <p className={style.period}>{experience.period}</p>
    </div>
  );
}

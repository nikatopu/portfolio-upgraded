import { IProjectCard } from "@/app/lib/types";
import Paragraph from "../../atoms/Paragraph";
import Title from "../../atoms/Title";
import SectionHeader from "../SectionHeader";
import style from "./Work.module.scss";
import ProjectCard from "../ProjectCard";
import CheckSite from "../../atoms/CheckSite";

export default function Work() {
  const glitchProjects: IProjectCard[] = [
    {
      image: "/assets/projects/glitch/popgirlsummer.jpg",
      title: "Pop Girl Summer",
      techs: ["Next.js", "Typescript", "SCSS", "MongoDB"],
      description:
        "Split into pop girl teams and play games or do quizzes to earn points.",
      link: "https://popgirlsummer.com/",
    },
    {
      image: "/assets/projects/glitch/cynthiaerivo.jpg",
      title: "Cynthia Erivo Journal",
      techs: ["Next.js", "Canvas", "TypeScript", "SCSS"],
      description:
        "Artistic Journal with feather falling transitions made in Canvas.",
      link: "https://popgirlsummer.com/",
    },
    {
      image: "/assets/projects/glitch/popgirlsummer.jpg",
      title: "Stray Kids Game",
      techs: ["Phaser", "Next.js", "TypeScript"],
      description: "Made for marketing Straykids’s new album, GUI made by me.",
      link: "https://popgirlsummer.com/",
    },
    {
      image: "/assets/projects/glitch/popgirlsummer.jpg",
      title: "Pop Girl Summer",
      techs: ["Next.js", "Typescript", "SCSS", "MongoDB"],
      description:
        "Split into pop girl teams and play games or do quizzes to earn points.",
      link: "https://popgirlsummer.com/",
    },
    {
      image: "/assets/projects/glitch/cynthiaerivo.jpg",
      title: "Cynthia Erivo Journal",
      techs: ["Next.js", "Canvas", "TypeScript", "SCSS"],
      description:
        "Artistic Journal with feather falling transitions made in Canvas.",
      link: "https://popgirlsummer.com/",
    },
    {
      image: "/assets/projects/glitch/popgirlsummer.jpg",
      title: "Stray Kids Game",
      techs: ["Phaser", "Next.js", "TypeScript"],
      description: "Made for marketing Straykids’s new album, GUI made by me.",
      link: "https://popgirlsummer.com/",
    },
    {
      image: "/assets/projects/glitch/cynthiaerivo.jpg",
      title: "Cynthia Erivo Journal",
      techs: ["Next.js", "Canvas", "TypeScript", "SCSS"],
      description:
        "Artistic Journal with feather falling transitions made in Canvas.",
      link: "https://popgirlsummer.com/",
    },
    {
      image: "/assets/projects/glitch/popgirlsummer.jpg",
      title: "Stray Kids Game",
      techs: ["Phaser", "Next.js", "TypeScript"],
      description: "Made for marketing Straykids’s new album, GUI made by me.",
      link: "https://popgirlsummer.com/",
    },
  ];

  return (
    <section className={style.container}>
      <SectionHeader
        title={
          <Title size="medium">
            <b>Work Experience</b> & Projects
          </Title>
        }
      />

      <SectionHeader
        size="small"
        title={
          <Paragraph size="large">
            <b>Glitch LLC</b> Highlights
          </Paragraph>
        }
        comment={
          <Paragraph>Working as a Jr Front-End since Mar 2025</Paragraph>
        }
      />

      <div className={style.projectsContainer}>
        {glitchProjects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>

      <SectionHeader
        title={
          <Paragraph size="large">
            <b>DevsData LLC</b>
          </Paragraph>
        }
        comment={
          <Paragraph>
            Worked as a Jr Front-End from Oct 2024 to June 2025
          </Paragraph>
        }
        image={"/assets/projects/devsdata.png"}
        content={
          <>
            <Title>
              <b>Website Maintenance</b>
            </Title>

            <Paragraph size="small">
              &ensp;Tech Used: PHP, WordPress, JavaScript, CSS, SCSS, Trello,
              GitLab
            </Paragraph>

            <br />

            <Paragraph size="small" align="left" color="lighter">
              &ensp;Working here for ~9 months, I got familiar with PHP and
              WordPress with some of its plugins as well. Using plain
              JavaScript, CSS and SCSS I was tasked with maintaining (and
              improving) the website’s quality. With my time there I improved
              Lighthouse score from ~60 to 90+ by optimizing performance,
              responsiveness, security and SEO.
              <br />
              <br />
              &ensp;I was a part of a huge international team of developers, had
              daily communications with my project manager, QA testers and the
              CEO himself to get the best outcome out of my tireless working
              effort.
              <br />
              <br />
              &ensp;Left the company because of a better opportunity arising -
              Glitch LLC.
            </Paragraph>

            <br />

            <CheckSite link="https://devsdata.com/" />
          </>
        }
      />

      <SectionHeader
        mirrored
        title={
          <Paragraph size="large">
            <b>Iberieli LLC</b>
          </Paragraph>
        }
        comment={
          <Paragraph>
            Worked as a Jr Front-End since Feb 2024 to May 2024
          </Paragraph>
        }
        image={"/assets/projects/iberieli.jpg"}
        content={
          <>
            <Title>
              <b>Website Development</b>
            </Title>

            <Paragraph size="small">
              &ensp;Tech Used: GitHub, Yahoo domain hosting, JavaScript, CSS,
              HTML
            </Paragraph>

            <br />

            <Paragraph size="small" align="left" color="lighter">
              &ensp;My first ever work experience began with me contacting the
              head of Iberieli to improve their official website Iberieli.com
              and improve the quality of their SEO.
              <br />
              <br />
              &ensp;Through this experience I got hands on experience dealing
              with customers and delivering products that meet a certain
              criterion - in this case, the business goals and branding.
              Additionally, I learned the first basics of designing, building
              and hosting a website all on my own, taking the first steps of
              being a full-stack developer.
              <br />
              <br />
              &ensp;This was a contract-based work, lasting only for a couple of
              months until the product was finished.
            </Paragraph>

            <br />

            <CheckSite link="https://iberieli.com/home" />
          </>
        }
      />
    </section>
  );
}

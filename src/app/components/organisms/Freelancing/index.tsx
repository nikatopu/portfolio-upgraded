import { IProjectCard } from "@/app/lib/types";
import Paragraph from "../../atoms/Paragraph";
import Title from "../../atoms/Title";
import SectionHeader from "../SectionHeader";
import style from "./Freelancing.module.scss";
import ProjectCard from "../ProjectCard";
import CheckSite from "../../atoms/CheckSite";

export default function Freelancing() {
  const otherProjects: IProjectCard[] = [
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
            <b>Freelancing</b> Projects
          </Title>
        }
      />

      <SectionHeader
        title={
          <Paragraph size="large">
            <b>Anuka Live</b>
          </Paragraph>
        }
        comment={
          <Paragraph>
            Worked as a Full-Stack Developer from Jan 2025 to Sep 2025
          </Paragraph>
        }
        image={"/assets/projects/devsdata.png"}
        content={
          <>
            <Paragraph size="small">
              &ensp;Tech Used: React, React-Router, Bcrypt, Cloudinary, Prisma,
              Vercel, Porkbun hosting
            </Paragraph>

            <br />

            <Paragraph size="small" align="left" color="lighter">
              &ensp; Based on a given Figma design, I built from scratch a
              website for the musician Anuka Kipshidze, delivering the MVP as
              early as in 3 months. I then continued working with Anuka to
              improve the website’s SEO and add additional deliverables, such as
              an admin panel (using Prisma DB) to easily edit the content shown
              on the website.
              <br />
              <br />
              &ensp;There were some difficulties throughout the period of
              development, since adding new features while keeping the old
              design clean and polished proved challenging, but at the end I can
              proudly say that this website is one of my best creations.
              <br />
              <br />
              &ensp;This was a freelancing project with additional steps because
              of further development.
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
            <b>GeoWonder</b>
          </Paragraph>
        }
        comment={
          <Paragraph>
            Worked as a Full-Stack Developer from July 2025 to Sep 2025
          </Paragraph>
        }
        image={"/assets/projects/iberieli.jpg"}
        content={
          <>
            <Paragraph size="small">
              &ensp;Tech Used: Next.js, Typescript, Prisma DB, Blob, SCSS, Zod,
              Vercel, Porkbun Hosting
            </Paragraph>

            <br />

            <Paragraph size="small" align="left" color="lighter">
              &ensp;With the help of my friend as the Project Manager, I created
              the official website for the Georgian tourism firm - GeoWonder.
              From the PM I knew exactly in great detail what needed to be
              delivered, how and when. With this clear communication I was able
              to increase my efficiency and deliver the entire project in 3
              months.
              <br />
              <br />
              &ensp;This project included the Backend admin panel for
              controlling the tours and content shown on the Front-End, proving
              my abilities as a Full-Stack developer. I also helped with the
              setup of this project, helping the owner buy the domain and host
              it.
              <br />
              <br />
              &ensp;This was my most time efficient freelancing project.
            </Paragraph>

            <br />

            <CheckSite link="https://iberieli.com/home" />
          </>
        }
      />

      <SectionHeader
        size="small"
        title={
          <Paragraph size="large">
            <b>Other</b> Highlights
          </Paragraph>
        }
      />

      <div className={style.otherProjectsContainer}>
        {otherProjects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
}

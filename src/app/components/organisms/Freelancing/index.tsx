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
      image: "/assets/projects/other-projects/cubical.png",
      title: "Cubical (Video Game)",
      techs: ["GameMaker", "Pixel Art", "BFXR"],
      description:
        "2.5D pixel art puzzle game with music and sound effects all done by me.",
      link: "https://nicolaeus.itch.io/cubical",
    },
    {
      image: "/assets/projects/other-projects/robodventure.png",
      title: "Robodventure (Video Game)",
      techs: ["GameMaker", "Pixel Art", "BFXR"],
      description:
        "2D pixel art story-driven game with music and sound effects all done by me.",
      link: "https://nicolaeus.itch.io/the-robodventure",
    },
    {
      image: "/assets/projects/other-projects/us-elections.png",
      title: "US Elections (Data Scraping)",
      techs: ["Python", "beautifulsoup4", "requests", "lxml"],
      description:
        "Data Scraping of US Elections history for Finals Project. (Collab w/ Friend)",
      link: "https://github.com/NinoBendianishvili/DataScraping_US_Elections",
    },
    {
      image: "/assets/projects/other-projects/we-we.png",
      title: "WeWe (Weather API Front)",
      techs: ["Node.js", "Express.js", "Axios.js"],
      description:
        "Weather front-end app using a free api to prove I can work with apis.",
      link: "https://wewe-g7w6.onrender.com/",
    },
    {
      image: "/assets/projects/other-projects/topucodes.png",
      title: "Procedural Generation (Tutorial)",
      techs: ["GameMaker", "YouTube"],
      description:
        "A video describing how to create a procedural generating dungeon game.",
      link: "https://www.youtube.com/watch?v=Cjg6RlmtTgM",
    },
    {
      image: "/assets/projects/other-projects/watchedthem.png",
      title: "WatchedThem (GitHub)",
      techs: ["PostgreSQL", "Database Engineering"],
      description:
        "Code of a movie review website with better UX/UI than other websites.",
      link: "https://github.com/nikatopu/WatchedThem",
    },
    {
      image: "",
      title: "Salon Booking Website",
      techs: ["COMING SOON"],
      description: "A website to book salons.",
      link: "",
    },
    {
      image: "",
      title: "Abaula Spot The Ball",
      techs: ["COMING SOON"],
      description: "A website from Abaula to play and win real prizes.",
      link: "",
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
        image={"/assets/projects/anukalive.jpg"}
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

            <CheckSite link="https://anuka.live/" />
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
        image={"/assets/projects/geowonder.jpg"}
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

            <CheckSite link="https://www.geowonder.tours/" />
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

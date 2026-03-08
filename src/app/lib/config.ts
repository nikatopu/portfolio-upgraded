import { TProject, TWorkExperience } from "./types";

const selectedProjects: TProject[] = [
  {
    title: "Abaula Gaming",
    description:
      "An interactive Canvas-based prize game platform where users participate in event-based competitions to win real rewards. Features dynamic event configuration, magnifier tools, line drawing mechanics, multilingual support, and backend-driven gameplay using ticketed user events.",
    image: "/assets/projects/abaula-gaming.jpg",
    tags: ["Next.js", "TypeScript", "Canvas API", "Game Logic"],
    onClick: () => {
      window.open("https://abaulagaming.ge", "_blank");
    },
  },
  {
    title: "Anuka Live Musician Site",
    description:
      "A full-stack musician platform with a custom admin dashboard allowing non-technical users to manage events, media, and blog content dynamically.",
    image: "/assets/projects/anukalive.jpg",
    tags: ["React", "Express", "Cloudinary", "Porkbun"],
    onClick: () => {
      window.open("https://www.anukalive.com/", "_blank");
    },
  },
  {
    title: "GeoWonder Tourism Platform",
    description:
      "A full-stack tourism platform showcasing curated travel experiences across Georgia, featuring custom content management, responsive design, and scalable data handling for tour listings and destinations.",
    image: "/assets/projects/geowonder.jpg",
    tags: ["Next.js", "Typescript", "Prisma", "Figma"],
    onClick: () => {
      window.open("https://geowonder.tours/", "_blank");
    },
  },
  {
    title: "Pop Girl Summer",
    description:
      "A high-traffic campaign platform built for Universal Music Group featuring daily challenges, user engagement mechanics, and API-driven content updates.",
    image: "/assets/projects/glitch/popgirlsummer.jpg",
    tags: ["Next.js", "TypeScript", "API Integration"],
    onClick: () => {
      window.open("https://dmi.umgapps.com/popgirlsummer/hub", "_blank");
    },
  },
  {
    title: "Cynthia Erivo Journal",
    description:
      "A content platform delivering official news and updates for Cynthia Erivo fans, built as part of a large-scale music marketing campaign.",
    image: "/assets/projects/glitch/cynthia-erivo.jpg",
    tags: ["Next.js", "TypeScript", "HTMLCanvas"],
    onClick: () => {
      window.open("https://dmi.umgapps.com/cynthiaerivo/journal/", "_blank");
    },
  },
  {
    title: "Lite Particles Node Module",
    description:
      "A lightweight particle system library published as an NPM package, enabling efficient Canvas-based visual effects for Node.js and frontend applications.",
    image: "/assets/projects/react-particles-lite.jpg",
    tags: ["TypeScript", "Node.js", "NPM", "HTMLCanvas"],
    onClick: () => {
      window.open("https://particles-lite-review.nikatopu.dev/", "_blank");
    },
  },
];

const experiences: TWorkExperience[] = [
  {
    position: "Full-Stack Engineer",
    company: "Glitch LLC",
    description:
      "Full-Stack engineer delivering 20+ production projects and marketing platforms used by thousands of users worldwide. Built systems using Next.js, TypeScript, and MongoDB including quizzes, campaign platforms, and content experiences for global music artists.",
    period: "March 2025 - Present",
    current: true,
    companySite: "https://studio.glitch.ge/",
  },
  {
    position: "Frontend Developer",
    company: "DevsData LLC",
    description:
      "Improved Lighthouse score from ~60 to 90+, collaborated with QA testers, copywriters and developers to publish hundreds of articles, deployed and maintained production application using Docker and contributed to Python-based backend automation scripts.",
    period: "October 2024 - June 2025",
    current: false,
    companySite: "https://devsdata.com/",
  },
  {
    position: "Frontend Developer (Contract)",
    company: "Iberieli LLC",
    description:
      "Designed and developed their custom website from ground-up while keeping contact with the head of the business. Ensured site responsiveness and cross-browser compatibility.",
    period: "December 2023 - May 2024",
    current: false,
    companySite: "https://iberieli.com/",
  },
];

const config = {
  email: "contact@nikatopu.dev",
  socials: {
    github: "https://github.com/nikatopu",
    linkedin: "https://www.linkedin.com/in/nikoloz-topuridze-258676270/",
    youtube: "https://www.youtube.com/@topucodes",
  },
  techStack: [
    "Next.js",
    "TypeScript",
    "SCSS",
    "React",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
  ],
  countExperienceFrom: new Date("2023-09-01"),
  selectedProjects,
  experiences,
};

export default config;

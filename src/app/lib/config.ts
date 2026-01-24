import { TProject } from "./types";

const selectedProjects: TProject[] = [
  {
    title: "Lite Particles Node Module",
    description:
      "A lightweight and efficient particle system for Node.js applications delivered as a NPM package.",
    image: "/assets/projects/react-particles-lite.jpg",
    tags: ["TypeScript", "Node.js", "NPM", "HTMLCanvas"],
    onClick: () => {
      window.open("https://particles-lite-review.nikatopu.dev/", "_blank");
    },
  },
  {
    title: "Anuka Live Musician Site",
    description:
      "A modern and responsive website for Anuka, a live musician, showcasing her music, upcoming events, blogs and media.",
    image: "/assets/projects/anukalive.jpg",
    tags: ["React", "Express", "Cloudinary", "Porkbun"],
    onClick: () => {
      window.open("https://www.anukalive.com/", "_blank");
    },
  },
  {
    title: "GeoWonder Tourism Platform",
    description:
      "A tourism agency platform connecting travelers with unique local experiences and guided tours in Georgia.",
    image: "/assets/projects/geowonder.jpg",
    tags: ["Next.js", "Typescript", "Prisma", "Figma"],
    onClick: () => {
      window.open("https://geowonder.tours/", "_blank");
    },
  },
  {
    title: "Abaula Gaming",
    description:
      "A 'guess the ball' website for Abaula, where there will be custom giveaway events with real big prizes",
    image: "/assets/projects/abaula-gaming.jpg",
    tags: ["Next.js", "TypeScript", "HTMLCanvas"],
    onClick: () => {
      window.open("https://abaulagaming.ge", "_blank");
    },
  },
  {
    title: "Cynthia Erivo Journal",
    description:
      "A site for Cynthia Erivo fans to read her latest news and updates done @ Glitch LLC.",
    image: "/assets/projects/glitch/cynthia-erivo.jpg",
    tags: ["Next.js", "TypeScript", "HTMLCanvas"],
    onClick: () => {
      window.open("https://dmi.umgapps.com/cynthiaerivo/journal/", "_blank");
    },
  },
  {
    title: "Pop Girl Summer",
    description:
      "A vibrant and engaging website for UMG, featuring daily challenges for team matches.",
    image: "/assets/projects/glitch/popgirlsummer.jpg",
    tags: ["Next.js", "TypeScript", "API Integration"],
    onClick: () => {
      window.open("https://dmi.umgapps.com/popgirlsummer/", "_blank");
    },
  },
];

const config = {
  email: "contact@nikatopu.dev",
  socials: {
    github: "",
    linkedin: "",
    youtube: "",
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
  selectedProjects,
};

export default config;

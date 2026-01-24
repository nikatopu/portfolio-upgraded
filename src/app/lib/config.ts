import { TProject, TWorkExperience } from "./types";

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

const experiences: TWorkExperience[] = [
  {
    position: "Full-Stack Engineer",
    company: "Glitch LLC",
    description:
      "Full-Stack developer working at Glitch LLC where I have already delivered 20+ small to big sized production projects to musicians all over the globe using next.js, typescript and MongoDB for the tech stack.",
    period: "March 2025 - Present",
    current: true,
    companySite: "https://studio.glitch.ge/",
  },
  {
    position: "Frontend Developer",
    company: "DevsData LLC",
    description:
      "Improved Lighthouse score from ~60 to 90+, collaborated with QA testers, copywriters and developers to publish hundreds of articles, deployed and maintained production application using Docker and contributed to Python-based backend automation scripts.",
    period: "October 2025 - June 2025",
    current: false,
    companySite: "https://devsdata.com/",
  },
  {
    position: "Frontend Developer (Contract)",
    company: "Iberieli LLC",
    description:
      "Designed and developed their custom website from ground-up while keeping contact with the head of the business. Ensured site responsiveness and cross-browser compatibility.",
    period: "February 2024 - May 2024",
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
  countExperienceFrom: new Date("2024-02-01"),
  selectedProjects,
  experiences,
};

export default config;

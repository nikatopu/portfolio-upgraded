"use client";

import { AnimatePresence } from "framer-motion";
import Header from "./components/organisms/Header";
import Hero from "./components/organisms/Hero";
import SelectedProjects from "./components/organisms/SelectedProjects";
import Experience from "./components/organisms/Experience";
import About from "./components/organisms/About";
import Footer from "./components/organisms/Footer";

export default function Page() {
  return (
    <AnimatePresence mode="wait">
      <Header key={"Header"} />

      <Hero key={"Hero"} />

      <SelectedProjects key={"SelectedProjects"} />

      <Experience key={"Experience"} />

      <About key={"About"} />

      <Footer key={"Footer"} />
    </AnimatePresence>
  );
}

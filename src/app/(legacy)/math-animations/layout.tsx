import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mathematical animations",
  description: "A particle playground: type a formula and watch thousands of particles follow it, rendered with the Canvas API.",
};

export default function MathAnimationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

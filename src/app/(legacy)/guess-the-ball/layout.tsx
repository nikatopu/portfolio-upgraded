import type { Metadata } from "next";
import { GameProvider } from "./lib/GameContext";

export const metadata: Metadata = {
  title: "Guess the Ball",
  description:
    "A spot-the-ball game prototype: guess where the ball is hidden in a photo, with magnification, line drawing and precise coordinate tracking.",
};

// Previously rendered its own <html>/<body> inside the site's root layout (invalid nesting).
// The (legacy) group now provides the root layout, so this is a plain nested layout.
export default function GuessTheBallLayout({ children }: { children: React.ReactNode }) {
  return <GameProvider>{children}</GameProvider>;
}

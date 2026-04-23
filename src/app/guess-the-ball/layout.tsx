import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { GameProvider } from "./lib/GameContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Guess the Ball - Portfolio Showcase",
  description:
    "A complex game where you guess where the ball is hidden in an image. Features magnification, line drawing, and precise coordinate tracking.",
  icons: {
    icon: "/assets/images/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}

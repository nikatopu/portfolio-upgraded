import "./global.scss";
import type { Metadata } from "next";
import AppContextProvider from "./lib/AppContext";
import Header from "./components/organisms/Header";
import Gradients from "./components/organisms/Gradients";

export const metadata: Metadata = {
  title: "Nikoloz | Portfolio",
  description: "Portfolio of Nikoloz, a Front-end Developer.",
  icons: {
    icon: "/assets/images/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* import font from google */}
        <link
          href="https://fonts.googleapis.com/css2?family=Alexandria:wght@100..900&family=Leckerli+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <AppContextProvider>
        <body>
          <Gradients />

          <Header />

          {children}
        </body>
      </AppContextProvider>
    </html>
  );
}

import "./global.scss";
import type { Metadata } from "next";
import AppContextProvider from "./lib/AppContext";

export const metadata: Metadata = {
  title: "Nikoloz | Portfolio",
  description: "Portfolio of Nikoloz, a Full-Stack Developer.",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <AppContextProvider>
        <body>{children}</body>
      </AppContextProvider>
    </html>
  );
}

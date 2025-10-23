import "./global.scss";
import type { Metadata } from "next";
import AppContextProvider from "./lib/AppContext";
import Header from "./components/organisms/Header";

export const metadata: Metadata = {
  title: "Nikoloz | Portfolio",
  description: "Portfolio of Nikoloz, a Front-end Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppContextProvider>
        <body>
          <Header />

          {children}
        </body>
      </AppContextProvider>
    </html>
  );
}

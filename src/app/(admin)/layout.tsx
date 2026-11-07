import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import s from "./admin/Admin.module.scss";

const hanken = Hanken_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--f-admin" });

export const metadata: Metadata = {
  title: "Admin · nikatopu.dev",
  robots: { index: false, follow: false, nocache: true },
  icons: { icon: "/assets/images/monogram.svg" },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${hanken.variable} ${s.body}`}>{children}</body>
    </html>
  );
}

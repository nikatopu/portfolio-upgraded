"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Adds data-revealed to every [data-reveal] element as it scrolls into view. */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-revealed", ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.reveal || 0);
          window.setTimeout(() => el.setAttribute("data-revealed", ""), delay);
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}

"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Tbilisi", hour: "2-digit", minute: "2-digit" });

/** Live Tbilisi time. Renders a placeholder on the server to avoid hydration mismatch. */
export default function TbilisiClock({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <time className={className} suppressHydrationWarning>
      {time ?? "--:--"}
    </time>
  );
}

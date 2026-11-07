// Next 16 "proxy" (formerly middleware).
// English is served at clean URLs ("/", "/work/x") by rewriting to the internal /en route;
// Georgian lives at "/ka/...". Direct "/en/..." URLs redirect to the clean version so there's
// only ever one URL per page.

import { NextResponse, type NextRequest } from "next/server";

const PASSTHROUGH = ["/ka", "/math-animations", "/guess-the-ball", "/admin"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    // Next generates OG image URLs under the real /en route; let those through.
    if (pathname.includes("/opengraph-image")) return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (PASSTHROUGH.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes and anything that looks like a file (robots.txt, images, the CV…).
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};

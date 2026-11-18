import { NextResponse, type NextRequest } from "next/server";

/**
 * Russian lives at clean URLs ("/prices"), Kazakh under "/kz/prices".
 * Internally every page is app/[lang]/…, so "/x" is rewritten to "/ru/x";
 * a direct "/ru/x" is redirected to "/x" to keep one canonical URL.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/kz" || pathname.startsWith("/kz/")) return NextResponse.next();
  if (pathname === "/ru" || pathname.startsWith("/ru/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }
  const url = req.nextUrl.clone();
  url.pathname = `/ru${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|api|img|brand|favicon|icon|apple-icon|robots.txt|sitemap.xml|.*\\.[a-z0-9]+$).*)"],
};

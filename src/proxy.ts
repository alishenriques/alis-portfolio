import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";
import { isFileLikePath, isRootFile, pathLocale } from "./lib/pathKinds";
import { preferredLocale } from "./lib/preferredLocale";

// Next.js 16 renamed the "middleware" file convention to "proxy" — this is
// intentionally not named middleware.ts. next-intl's helper doesn't need to
// know about that rename: it just returns a request handler function.
const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isRootFile(pathname)) return NextResponse.next();

  // A file-like path with no locale (`/wp-login.php`) would otherwise reach
  // [locale]/layout with "wp-login.php" as the locale and get Next's bare 404.
  // Rewriting it under the browser's locale lands it on the [...rest]
  // catch-all, i.e. the site's own 404 page (still with HTTP 404).
  if (isFileLikePath(pathname) && !pathLocale(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferredLocale(request.headers.get("accept-language"))}${pathname}`;
    return NextResponse.rewrite(url);
  }

  return handleI18nRouting(request);
}

export const config = {
  // Every path except Next internals, Vercel internals and API routes. Unlike
  // next-intl's default, file-like paths are included so they get the site's
  // 404 too; the root metadata files (robots.txt etc.) pass straight through.
  matcher: ["/((?!api|_next|_vercel).*)"],
};

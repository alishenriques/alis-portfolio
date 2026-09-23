import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

// Next.js 16 renamed the "middleware" file convention to "proxy" — this is
// intentionally not named middleware.ts. next-intl's helper doesn't need to
// know about that rename: it just returns a request handler function.
export default createMiddleware(routing);

export const config = {
  // Runs on every path except static assets, Next internals and API routes.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
  // Keys are the internal routes (the app/[locale]/* folders, in Portuguese);
  // values are the public URL per locale. The proxy rewrites /en/about to
  // [locale]/sobre, and `Link`/`getPathname` from ./navigation build the
  // localized URL from the internal key.
  pathnames: {
    "/": "/",
    "/sobre": { pt: "/sobre", en: "/about" },
    "/corporativo": { pt: "/corporativo", en: "/corporate" },
    "/projetos": { pt: "/projetos", en: "/projects" },
  },
});

export type AppPathname = keyof typeof routing.pathnames;

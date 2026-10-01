import { routing } from "@/i18n/routing";

import type { Metadata, MetadataRoute } from "next";

export type AppLocale = (typeof routing.locales)[number];

/** Every indexable page, keyed by the `SEO.PAGES.*` translation key, with its locale-less path. */
export const SEO_PAGES = {
  HOME: "/",
  ABOUT: "/sobre",
  CORPORATE: "/corporativo",
  PROJECTS: "/projetos",
} as const;

export type SeoPage = keyof typeof SEO_PAGES;

// hreflang values (BCP 47) and Open Graph locales (language_TERRITORY) per app locale.
const HREFLANG: Record<AppLocale, string> = { pt: "pt-BR", en: "en" };
const OG_LOCALE: Record<AppLocale, string> = { pt: "pt_BR", en: "en_US" };

/** `/pt` for the home page, `/pt/sobre` otherwise: the app's URLs always carry the locale prefix. */
export function localizedPath(locale: AppLocale, path: string): string {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** hreflang map for one page: every locale plus `x-default`, pointing at the default locale. */
export function languageAlternates(path: string, toUrl: (path: string) => string = (p) => p): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[HREFLANG[locale]] = toUrl(localizedPath(locale, path));
  }
  languages["x-default"] = toUrl(localizedPath(routing.defaultLocale, path));
  return languages;
}

type PageMetadataInput = {
  locale: AppLocale;
  page: SeoPage;
  title: string;
  description: string;
  siteName: string;
};

/**
 * Metadata for one page in one locale. URLs are relative: the root layout sets
 * `metadataBase`, which Next uses to make them absolute. `openGraph` is rebuilt
 * whole here because Next merges metadata shallowly (a page's `openGraph`
 * replaces the layout's). The image comes from the segment's `opengraph-image`.
 */
export function buildPageMetadata({ locale, page, title, description, siteName }: PageMetadataInput): Metadata {
  const path = SEO_PAGES[page];
  const url = localizedPath(locale, path);
  const isHome = page === "HOME";
  const fullTitle = isHome ? title : `${title} | ${siteName}`;

  return {
    // The home title already names the site, so it skips the layout's "%s | site" template.
    title: isHome ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: "website",
      siteName,
      url,
      title: fullTitle,
      description,
      locale: OG_LOCALE[locale],
      alternateLocale: routing.locales.filter((other) => other !== locale).map((other) => OG_LOCALE[other]),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/** One sitemap entry per page and locale, each listing its translations. */
export function buildSitemap(siteUrl: string): MetadataRoute.Sitemap {
  const toUrl = (path: string) => new URL(path, siteUrl).toString();

  return Object.values(SEO_PAGES).flatMap((path) =>
    routing.locales.map((locale) => ({
      url: toUrl(localizedPath(locale, path)),
      alternates: { languages: languageAlternates(path, toUrl) },
    })),
  );
}

export function buildRobots(siteUrl: string): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}

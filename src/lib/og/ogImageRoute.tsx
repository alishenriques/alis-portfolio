import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { localizedPath, SEO_PAGES, type AppLocale, type SeoPage } from "@/lib/seo";

import { OgCard } from "./OgCard";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Read once per server instance. Static .woff files (Satori doesn't read
// woff2) committed under src/assets/fonts; both fonts are SIL OFL licensed.
const fontsDir = join(process.cwd(), "src/assets/fonts");
let fontsPromise: Promise<[Buffer, Buffer]> | undefined;
function loadFonts() {
  fontsPromise ??= Promise.all([
    readFile(join(fontsDir, "archivo-latin-800-normal.woff")),
    readFile(join(fontsDir, "ibm-plex-mono-latin-500-normal.woff")),
  ]);
  return fontsPromise;
}

function toLocale(locale: string): AppLocale {
  return hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
}

/**
 * `generateImageMetadata` + image function for one page's `opengraph-image.tsx`.
 * Using generateImageMetadata (a single "og" image) is what lets the alt text
 * be translated: the plain `alt` export is a static string shared by all locales.
 */
export function ogImageRoute(page: SeoPage) {
  async function generateImageMetadata({ params }: { params: { locale: string } }) {
    const t = await getTranslations({ locale: toLocale(params.locale), namespace: "SEO" });
    const title = t(`PAGES.${page}.TITLE`);
    return [
      {
        id: "og",
        // The home title already carries the name; other pages get "Title · Name".
        alt: page === "HOME" ? title : t("OG_ALT", { title }),
        size: OG_SIZE,
        contentType: OG_CONTENT_TYPE,
      },
    ];
  }

  async function Image({ params }: { params: Promise<{ locale: string }> }) {
    const locale = toLocale((await params).locale);
    const [t, [archivo, plexMono]] = await Promise.all([getTranslations({ locale, namespace: "SEO" }), loadFonts()]);

    return new ImageResponse(
      (
        <OgCard
          headline={t(`PAGES.${page}.OG_HEADLINE`)}
          // The home description opens with the headline itself, so its card uses the site-wide one.
          description={page === "HOME" ? t("DEFAULT_DESCRIPTION") : t(`PAGES.${page}.DESCRIPTION`)}
          role={t("OG_ROLE")}
          path={localizedPath(locale, SEO_PAGES[page])}
        />
      ),
      {
        ...OG_SIZE,
        fonts: [
          { name: "Archivo", data: archivo, weight: 800, style: "normal" },
          { name: "Plex Mono", data: plexMono, weight: 500, style: "normal" },
        ],
      },
    );
  }

  return { generateImageMetadata, Image };
}

import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";

import { routing } from "@/i18n/routing";

import { buildPageMetadata, type AppLocale, type SeoPage } from "./seo";

import type { Metadata } from "next";

export type LocaleParams = { params: Promise<{ locale: string }> };

export async function resolveLocale(params: LocaleParams["params"]): Promise<AppLocale> {
  const { locale } = await params;
  return hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
}

/** `generateMetadata` body shared by every page: localized title/description plus canonical, hreflang and social tags. */
export async function getPageMetadata(params: LocaleParams["params"], page: SeoPage): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "SEO" });

  return buildPageMetadata({
    locale,
    page,
    title: t(`PAGES.${page}.TITLE`),
    description: t(`PAGES.${page}.DESCRIPTION`),
    siteName: t("SITE_NAME"),
  });
}

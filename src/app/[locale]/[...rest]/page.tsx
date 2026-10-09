import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { resolveLocale, type LocaleParams } from "@/lib/pageMetadata";

import type { Metadata } from "next";

// Catches every path under a locale that no other route matches, so it hits
// [locale]/not-found.tsx (inside the site's layout) instead of Next's default
// 404, which has no layout and no locale.
export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "NOT_FOUND" });

  return {
    title: t("META_TITLE"),
    robots: { index: false, follow: true },
  };
}

export default function CatchAllPage() {
  notFound();
}

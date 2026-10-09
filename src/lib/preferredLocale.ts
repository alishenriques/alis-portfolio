import { routing } from "@/i18n/routing";

import type { AppLocale } from "./seo";

/**
 * Picks the site locale a browser prefers from its `Accept-Language` header
 * (e.g. "en-US,en;q=0.9,pt;q=0.8"), by quality then order, matching on the
 * primary language subtag. Falls back to the default locale.
 */
export function preferredLocale(acceptLanguage: string | null | undefined): AppLocale {
  if (!acceptLanguage) return routing.defaultLocale;

  const ranked = acceptLanguage
    .split(",")
    .map((part, index) => {
      const [tag = "", ...params] = part.trim().split(";");
      const qParam = params.find((param) => param.trim().startsWith("q="));
      const quality = qParam ? Number(qParam.trim().slice(2)) : 1;
      return { language: tag.split("-")[0].toLowerCase(), quality: Number.isNaN(quality) ? 0 : quality, index };
    })
    .filter((entry) => entry.quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index);

  const match = ranked.find((entry) => (routing.locales as readonly string[]).includes(entry.language));
  return (match?.language as AppLocale | undefined) ?? routing.defaultLocale;
}

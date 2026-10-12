// CMS content is authored in Portuguese by default; the *En fields
// (headlineEn, bioEn, roleEn, descriptionEn) are optional English versions.
// Falls back to the Portuguese text when there's no translation yet, rather
// than showing nothing.
export function pickLocalized(locale: string, pt: string, en: string | null): string {
  return locale === "en" && en ? en : pt;
}

import type { Project } from "./schemas";

// CMS content is authored in Portuguese by default; the *En fields
// (headlineEn, bioEn, roleEn, descriptionEn, summaryEn, bodyEn, projectTypeEn)
// are optional English versions. Falls back to the Portuguese text when
// there's no translation yet, rather than showing nothing.
export function pickLocalized(locale: string, pt: string, en: string | null): string {
  return locale === "en" && en ? en : pt;
}

/**
 * The project with summary/body/projectType already in the page's language,
 * so components can keep reading the plain fields. Titles stay as they are:
 * they're proper names (a site, brand or event), not translated.
 */
export function localizeProject(project: Project, locale: string): Project {
  return {
    ...project,
    summary: pickLocalized(locale, project.summary, project.summaryEn),
    body: pickLocalized(locale, project.body, project.bodyEn),
    projectType: project.projectType && pickLocalized(locale, project.projectType, project.projectTypeEn),
  };
}

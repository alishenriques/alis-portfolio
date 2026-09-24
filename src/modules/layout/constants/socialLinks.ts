export type SocialLink = {
  id: "github" | "linkedin";
  /** Key under `FOOTER` in the locale files (used as the accessible name). */
  labelKey: "GITHUB" | "LINKEDIN";
  href: string;
};

export const socialLinks: SocialLink[] = [
  { id: "github", labelKey: "GITHUB", href: "https://github.com/alishenriques" },
  { id: "linkedin", labelKey: "LINKEDIN", href: "https://www.linkedin.com/in/alisson-henriques" },
];

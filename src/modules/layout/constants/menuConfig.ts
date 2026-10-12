import type { AppPathname } from "@/i18n/routing";

export type MenuItem = {
  id: string;
  labelKey: string;
  /** Internal route; `Link` from `@/i18n/navigation` turns it into the localized URL (`/sobre` → `/en/about`). */
  href: AppPathname;
};

// Keys are relative to the "NAV" i18n namespace (see useTranslations("NAV") in Sidebar and DesktopNav).
export const menuList: MenuItem[] = [
  { id: "home", labelKey: "HOME", href: "/" },
  { id: "about", labelKey: "ABOUT", href: "/sobre" },
  { id: "experience", labelKey: "EXPERIENCE", href: "/corporativo" },
  { id: "projects", labelKey: "PROJECTS", href: "/projetos" },
];

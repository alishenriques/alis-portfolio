export type MenuItem = {
  id: string;
  labelKey: string;
  href: string;
};

// Keys are relative to the "NAV" i18n namespace (see useTranslations("NAV") in Sidebar).
export const menuList: MenuItem[] = [
  { id: "home", labelKey: "HOME", href: "/" },
  { id: "about", labelKey: "ABOUT", href: "/sobre" },
  { id: "experience", labelKey: "EXPERIENCE", href: "/experiencia" },
  { id: "projects", labelKey: "PROJECTS", href: "/#projetos" },
];

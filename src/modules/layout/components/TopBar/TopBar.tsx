"use client";

import { useCallback, useState } from "react";

import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Logo } from "@/shared/components/Logo";

import { ContactButton } from "../ContactButton";
import { DesktopNav } from "../DesktopNav";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { Sidebar } from "../Sidebar";
import { styles } from "./styles/index.styles";

/**
 * Sticky header. Below `lg`: hamburger (opens the Sidebar drawer) | logo | language.
 * From `lg` up: logo | terminal-style nav (centered) | language + contact.
 */
export function TopBar() {
  const t = useTranslations("NAV");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

  return (
    <>
      <header className={styles.root}>
        <div className={styles.left}>
          <button
            type="button"
            className={styles.menuTrigger}
            onClick={() => setIsSidebarOpen(true)}
            aria-label={t("OPEN_MENU")}
          >
            <Menu size={20} aria-hidden="true" />
          </button>
          <Link href="/" aria-label={t("LOGO_LABEL")} className={styles.desktopLogo}>
            <Logo withWordmark={false} />
          </Link>
        </div>

        <div className={styles.center}>
          <Link href="/" aria-label={t("LOGO_LABEL")} className={styles.mobileLogo}>
            <Logo withWordmark={false} />
          </Link>
          <DesktopNav />
        </div>

        <div className={styles.right}>
          <LanguageSwitcher />
          <ContactButton />
        </div>
      </header>

      {/* Sibling of <header>, not a child: see the note on Sidebar. */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </>
  );
}

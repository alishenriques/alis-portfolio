"use client";

import { useEffect, useState } from "react";

import { Menu, Send, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import { menuList } from "./constants/menuConfig";
import { styles } from "./styles/index.styles";
import { useContactDialog } from "../../ContactDialogContext";

/** Hamburger trigger + an animated slide-in/out drawer with the site's navigation. */
export function Sidebar() {
  const t = useTranslations("NAV");
  const tContact = useTranslations("CONTACT");
  const pathname = usePathname();
  const contactDialog = useContactDialog();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen(true)}
        aria-label={t("OPEN_MENU")}
      >
        <Menu size={20} aria-hidden="true" />
      </button>

      <div className={cn(styles.backdrop, !isOpen && styles.backdropHidden)} onClick={() => setIsOpen(false)} />

      <aside className={cn(styles.drawer, !isOpen && styles.drawerClosed)} aria-hidden={!isOpen}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => setIsOpen(false)}
          aria-label={t("CLOSE_MENU")}
        >
          <X size={20} aria-hidden="true" />
        </button>

        <nav className={styles.nav}>
          {menuList.map((item) => {
            const isActive = item.href === pathname;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(styles.link, isActive && styles.linkActive)}
                onClick={() => setIsOpen(false)}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className={styles.contactButton}
          onClick={() => {
            setIsOpen(false);
            contactDialog.open();
          }}
        >
          <Send size={16} aria-hidden="true" />
          {tContact("OPEN")}
        </button>
      </aside>
    </>
  );
}

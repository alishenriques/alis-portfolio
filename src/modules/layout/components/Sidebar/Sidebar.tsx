"use client";

import { useEffect } from "react";

import { Send, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import { menuList } from "../../constants/menuConfig";
import { useContactDialog } from "../../ContactDialogContext";
import { styles } from "./styles/index.styles";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

/**
 * Animated slide-in/out navigation drawer for tablet and mobile (hidden from `lg` up,
 * where the header shows DesktopNav instead). Controlled: the trigger lives in the
 * TopBar. Must NOT be rendered inside the TopBar's `<header>`: that element has
 * `backdrop-filter`, which makes it the containing block for `position: fixed`
 * descendants and would pin this drawer to the header's height instead of the viewport.
 */
export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const t = useTranslations("NAV");
  const tContact = useTranslations("CONTACT");
  const pathname = usePathname();
  const contactDialog = useContactDialog();

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);

    // Keeps the page behind the drawer from scrolling while it's open.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={cn(styles.backdrop, !isOpen && styles.backdropHidden)}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={cn(styles.drawer, !isOpen && styles.drawerClosed)}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label={t("CLOSE_MENU")}>
          <X size={20} aria-hidden="true" />
        </button>

        <nav className={styles.nav} aria-label={t("PRIMARY")}>
          {menuList.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(styles.link, item.href === pathname && styles.linkActive)}
              onClick={onClose}
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className={styles.contactButton}
          onClick={() => {
            onClose();
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

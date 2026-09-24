"use client";

import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import { styles } from "./styles/index.styles";
import { menuList } from "../../constants/menuConfig";

/**
 * Header navigation for desktop (`lg` and up), styled like a shell prompt:
 * `$ ~/inicio ~/sobre ...`. Hovering an entry slides a `>` prompt in, nudges the
 * label and starts a blinking cursor; the current page keeps its cursor blinking.
 * Below `lg` the header shows the hamburger + Sidebar drawer instead.
 */
export function DesktopNav() {
  const t = useTranslations("NAV");
  const pathname = usePathname();

  return (
    <nav className={styles.root} aria-label={t("PRIMARY")}>
      <span className={styles.prompt} aria-hidden="true">
        $
      </span>
      <ul className={styles.list}>
        {menuList.map((item) => {
          const isActive = item.href === pathname;
          return (
            <li key={item.id}>
              <Link
                href={item.href}
                className={cn(styles.link, isActive && styles.linkActive)}
                aria-current={isActive ? "page" : undefined}
              >
                <span className={styles.caret} aria-hidden="true">
                  {">"}
                </span>
                <span className={styles.slash} aria-hidden="true">
                  ~/
                </span>
                <span className={styles.label}>{t(item.labelKey)}</span>
                <span className={styles.cursor} aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

"use client";

import type { MouseEvent } from "react";

import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link, useRouter } from "@/i18n/navigation";
import { Logo } from "@/shared/components/Logo";

import { OopsRobot } from "./components/OopsRobot";
import { styles } from "./styles/index.styles";

/**
 * The site's own 404, rendered inside the regular layout (header, footer,
 * language switcher) in the visitor's locale. Blue-themed, like the Hero's AI
 * slide, so it reads as a detour rather than part of the main flow.
 */
export function NotFound() {
  const t = useTranslations("NOT_FOUND");
  const tNav = useTranslations("NAV");
  const router = useRouter();

  // A real link to the home page, so it still works without JS or history;
  // with a previous page in this tab, it goes back there instead.
  function handleBack(event: MouseEvent<HTMLAnchorElement>) {
    if (window.history.length > 1) {
      event.preventDefault();
      router.back();
    }
  }

  return (
    <main className={styles.root}>
      <div aria-hidden="true" className={styles.glow} />

      <Link href="/" aria-label={tNav("LOGO_LABEL")} className={styles.logoLink}>
        <Logo />
      </Link>

      <OopsRobot label={t("ILLUSTRATION_LABEL")} className={styles.robot} />

      <div className={styles.text}>
        <p className={styles.code}>{t("CODE")}</p>
        <h1 className={styles.heading}>{t("TITLE")}</h1>
        <p className={styles.description}>{t("DESCRIPTION")}</p>
      </div>

      <Link href="/" onClick={handleBack} className={styles.backLink}>
        <ArrowLeft size={16} aria-hidden="true" />
        {t("BACK")}
      </Link>
    </main>
  );
}

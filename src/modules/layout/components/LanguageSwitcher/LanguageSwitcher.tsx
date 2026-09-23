"use client";

import { useLocale } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

import { styles } from "./styles/index.styles";

const LOCALE_LABELS: Record<string, string> = {
  pt: "PT",
  en: "EN",
};

export function LanguageSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();

  return (
    <div className={styles.root} role="group" aria-label="Idioma / Language">
      {routing.locales.map((locale) => (
        <Link
          key={locale}
          href={pathname}
          locale={locale}
          className={cn(styles.option, locale === activeLocale && styles.optionActive)}
          aria-current={locale === activeLocale ? "true" : undefined}
        >
          {LOCALE_LABELS[locale] ?? locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}

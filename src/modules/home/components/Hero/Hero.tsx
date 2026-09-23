import { Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import { Logo } from "@/shared/components/Logo";

import { ParallaxPanels } from "../ParallaxPanels";
import { styles } from "./styles/index.styles";

const CONTACT_EMAIL = "alishenriques@gmail.com";
const CONTACT_PHONE = "(11) 98118-4672";

export function Hero() {
  const t = useTranslations("HOME");

  return (
    <section className={styles.root}>
      <ParallaxPanels />

      <div className={styles.content}>
        <Logo />

        <div className={styles.titleRow}>
          <span className={styles.bracket} aria-hidden="true">
            {"</>"}
          </span>
          <h1 className={styles.title}>
            {t("TITLE_LINE_1")} <span className={styles.titleHighlight}>{t("TITLE_HIGHLIGHT")}</span>{" "}
            {t("TITLE_LINE_2")}
          </h1>
          <span className={styles.bracket} aria-hidden="true">
            {"</>"}
          </span>
        </div>

        <span className={styles.dotDivider} aria-hidden="true" />

        <p className={styles.subtitle}>
          {t.rich("SUBTITLE", {
            hl: (chunks) => <span className={styles.subtitleHighlight}>{chunks}</span>,
          })}
        </p>

        <div className={styles.contactRow}>
          <a href={`mailto:${CONTACT_EMAIL}`} className={styles.contactItem}>
            <Mail size={16} aria-hidden="true" />
            {CONTACT_EMAIL}
          </a>
          <span className={styles.contactSeparator} aria-hidden="true" />
          <a href={`tel:${CONTACT_PHONE.replace(/\D/g, "")}`} className={styles.contactItem}>
            <Phone size={16} aria-hidden="true" />
            {CONTACT_PHONE}
          </a>
        </div>
      </div>

      <p className={styles.tagline}>{t("TAGLINE")}</p>
    </section>
  );
}

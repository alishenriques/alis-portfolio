import { Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import { Logo } from "@/shared/components/Logo";

import { GrowthTrace } from "../GrowthTrace";
import { ParallaxPanels } from "../ParallaxPanels";
import { TaglineHighlights } from "../TaglineHighlights";
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

        <p className={styles.eyebrow}>{t("EYEBROW")}</p>

        <div className={styles.titleRow}>
          <span className={styles.bracket} aria-hidden="true">
            {"</>"}
          </span>
          <h1 className={styles.title}>
            {t.rich("HEADLINE", {
              hl: (chunks) => <span className={styles.titleHighlight}>{chunks}</span>,
            })}
          </h1>
          <span className={styles.bracket} aria-hidden="true">
            {"</>"}
          </span>
        </div>

        <GrowthTrace />

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

      <TaglineHighlights />
    </section>
  );
}

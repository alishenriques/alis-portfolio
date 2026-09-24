import { useTranslations } from "next-intl";

import { featureList } from "./constants/featureList";
import { styles } from "./styles/index.styles";

export function FeatureChips() {
  const t = useTranslations("HOME.FEATURES");

  return (
    <section aria-labelledby="values-heading" className={styles.root}>
      <h2 id="values-heading" className={styles.title}>
        {t("TITLE")}
      </h2>
      <ul className={styles.list}>
        {featureList.map((feature) => (
          <li key={feature.id} className={styles.item}>
            <feature.icon size={26} className={styles.icon} aria-hidden="true" />
            <p className={styles.text}>
              {t(`${feature.messageKey}.LABEL`)}{" "}
              <span className={styles.highlight}>{t(`${feature.messageKey}.HIGHLIGHT`)}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

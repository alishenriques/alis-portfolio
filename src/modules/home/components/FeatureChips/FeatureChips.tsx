import { useTranslations } from "next-intl";

import { featureList } from "./constants/featureList";
import { styles } from "./styles/index.styles";

export function FeatureChips() {
  const t = useTranslations("HOME.FEATURES");

  return (
    <ul className={styles.list}>
      {featureList.map((feature) => (
        <li key={feature.id} className={styles.item}>
          <feature.icon size={20} className={styles.icon} aria-hidden="true" />
          <p className={styles.text}>
            {t(`${feature.messageKey}.LABEL`)}{" "}
            <span className={styles.highlight}>{t(`${feature.messageKey}.HIGHLIGHT`)}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}

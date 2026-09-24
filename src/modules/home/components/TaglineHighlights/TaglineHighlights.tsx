import { useTranslations } from "next-intl";

import { highlightList } from "./constants/highlightList";
import { styles } from "./styles/index.styles";

export function TaglineHighlights() {
  const t = useTranslations("HOME.TAGLINE");

  return (
    <ul className={styles.list}>
      {highlightList.map((item) => (
        <li key={item.id} className={styles.item}>
          <item.icon className={styles.icon} />
          {t(item.messageKey)}
        </li>
      ))}
    </ul>
  );
}

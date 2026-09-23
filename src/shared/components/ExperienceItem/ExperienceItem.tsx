import { useLocale, useTranslations } from "next-intl";

import { formatDateRange } from "@/lib/format-date";
import type { Experience } from "@/lib/schemas";

import { styles } from "./styles/index.styles";

export function ExperienceItem({ experience }: { experience: Experience }) {
  const locale = useLocale();
  const t = useTranslations("EXPERIENCE");

  return (
    <article className={styles.root}>
      <p className={styles.date}>
        {formatDateRange(experience.startDate, experience.endDate, locale, t("PRESENT"))}
      </p>
      <h3 className={styles.heading}>
        {experience.role} <span className={styles.separator}>·</span> {experience.company}
      </h3>
      <p className={styles.description}>{experience.description}</p>
    </article>
  );
}

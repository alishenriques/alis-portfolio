import { useLocale, useTranslations } from "next-intl";

import { formatDateRange } from "@/lib/format-date";
import type { Experience } from "@/lib/schemas";

import { styles } from "./styles/index.styles";

export function ExperienceItem({ experience }: { experience: Experience }) {
  const locale = useLocale();
  const t = useTranslations("EXPERIENCE");

  return (
    <article className={styles.root}>
      {/* The marker + line together read as one continuous timeline rail
          down the list — the line is `bottom-0`, reaching all the way to
          the next item's own marker (hidden on the last item, so nothing
          dangles below it), rather than each item having its own
          disconnected border segment. */}
      <span className={styles.marker} aria-hidden="true" />
      <span className={styles.line} aria-hidden="true" />
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

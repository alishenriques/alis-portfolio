import { Eyebrow } from "@alishenriques/design-system";
import { getTranslations } from "next-intl/server";

import { getExperiences } from "@/lib/portfolio";
import { ExperienceItem } from "@/shared/components/ExperienceItem";

import { styles } from "./styles/index.styles";

/**
 * "Corporativo": work history, scoped to private-sector company roles only
 * (`isCorporate`) — other entries (e.g. a public-sector internship) are real
 * history but not shown here. Filtered client-side, not by the API: unlike
 * `Project`'s `publishedAt`, there's no "hide until ready" concept here, just
 * "not the kind of entry this particular page curates".
 */
export async function Experience() {
  const [allExperiences, t] = await Promise.all([getExperiences(), getTranslations("EXPERIENCE")]);
  const experiences = allExperiences.filter((experience) => experience.isCorporate);

  return (
    <main className={styles.root}>
      <div>
        <Eyebrow>{t("TITLE")}</Eyebrow>
        <h1 className={styles.heading}>{t("SUBTITLE", { count: experiences.length })}</h1>
      </div>

      {experiences.length > 0 ? (
        <div className={styles.list}>
          {experiences.map((experience) => (
            <ExperienceItem key={experience.id} experience={experience} />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>{t("EMPTY")}</p>
      )}
    </main>
  );
}

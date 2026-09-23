import { Eyebrow } from "@alishenriques/design-system";
import { getTranslations } from "next-intl/server";

import { getExperiences } from "@/lib/portfolio";
import { ExperienceItem } from "@/shared/components/ExperienceItem";

import { styles } from "./styles/index.styles";

export async function Experience() {
  const [experiences, t] = await Promise.all([getExperiences(), getTranslations("EXPERIENCE")]);

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

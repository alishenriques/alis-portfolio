import { useTranslations } from "next-intl";

import { skillsList } from "./constants/skillsList";
import { styles } from "./styles/index.styles";

export function Skills() {
  const t = useTranslations("SKILLS");

  return (
    <section id="skills" aria-labelledby="skills-heading" className={styles.root}>
      <h2 id="skills-heading" className={styles.title}>
        {t("TITLE")}
      </h2>
      <ul className={styles.list}>
        {skillsList.map((skill) => (
          <li key={skill.name} className={styles.item}>
            <skill.icon size={32} color={skill.color} aria-hidden="true" />
            <span className={styles.label}>{skill.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

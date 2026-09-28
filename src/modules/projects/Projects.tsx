import { Eyebrow } from "@alishenriques/design-system";
import { getTranslations } from "next-intl/server";

import { getProjects } from "@/lib/portfolio";

import { ProjectsTimeline } from "./components/ProjectsTimeline";
import { styles } from "./styles/index.styles";

export type ProjectsProps = {
  /** Opens this project's detail panel on mount — e.g. a `?project=slug` deep link from the About page. */
  initialSelectedSlug?: string | null;
};

export async function Projects({ initialSelectedSlug = null }: ProjectsProps = {}) {
  const [projects, t] = await Promise.all([getProjects(), getTranslations("PROJECTS")]);

  return (
    <main className={styles.root}>
      <div>
        <Eyebrow>{t("TITLE")}</Eyebrow>
        <h1 className={styles.heading}>{t("SUBTITLE", { count: projects.length })}</h1>
      </div>

      {projects.length > 0 ? (
        <ProjectsTimeline projects={projects} initialSelectedSlug={initialSelectedSlug} />
      ) : (
        <p className={styles.empty}>{t("EMPTY")}</p>
      )}
    </main>
  );
}

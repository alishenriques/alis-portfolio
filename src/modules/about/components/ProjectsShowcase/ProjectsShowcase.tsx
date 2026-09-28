import { ShowcaseCard } from "@alishenriques/design-system";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import type { Project } from "@/lib/schemas";

import { pickShowcaseProjects } from "./pickShowcaseProjects";
import { styles } from "./styles/index.styles";

const SHOWCASE_COUNT = 3;

/**
 * "Conheça alguns dos projetos que criei": a closing section on the About
 * page, three `ShowcaseCard`s picked by `pickShowcaseProjects` (a random
 * sample, with the `featured` project always pinned first). Each card's
 * link deep-links into `/projetos` with that project's detail panel already
 * open (`?project=<slug>`, read by `ProjectsTimeline`'s `initialSelectedSlug`).
 */
export function ProjectsShowcase({ projects }: { projects: Project[] }) {
  const t = useTranslations("ABOUT");
  const picks = pickShowcaseProjects(projects, SHOWCASE_COUNT);

  if (picks.length === 0) {
    return null;
  }

  return (
    <section className={styles.root} aria-labelledby="projects-showcase-heading">
      <h2 id="projects-showcase-heading" className={styles.heading}>
        {t("PROJECTS_SHOWCASE_TITLE")}
      </h2>

      <div className={styles.grid}>
        {picks.map((project) => (
          <ShowcaseCard
            key={project.slug}
            className={styles.card}
            imageUrl={project.coverUrl}
            title={project.title}
            tags={project.tags}
            description={project.summary}
            footer={
              <Link href={`/projetos?project=${project.slug}`} className={styles.link}>
                {t("PROJECTS_SHOWCASE_LINK")}
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </Link>
            }
          />
        ))}
      </div>
    </section>
  );
}

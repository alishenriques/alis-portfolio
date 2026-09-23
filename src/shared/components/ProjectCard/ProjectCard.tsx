import { TagList } from "@alishenriques/design-system";

import type { Project } from "@/lib/schemas";

import { styles } from "./styles/index.styles";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.root}>
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.summary}>{project.summary}</p>
      {project.tags.length > 0 && (
        <div className={styles.tags}>
          <TagList tags={project.tags} />
        </div>
      )}
    </article>
  );
}

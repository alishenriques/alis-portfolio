"use client";

import { SidePanel, TagList } from "@alishenriques/design-system";
import { useTranslations } from "next-intl";

import type { Project } from "@/lib/schemas";
import { cn } from "@/lib/utils";

import { styles } from "./styles/index.styles";

type ProjectDetailPanelProps = {
  /** The selected project, or `null` when nothing is selected (panel stays closed). */
  project: Project | null;
  onClose: () => void;
};

/**
 * The GitKraken-style sliding detail view for a selected project: home-page
 * screenshot, title, type, tags, a "Site Ativo" status dot, a mini bio and a
 * "Visite o site" link. Content is portfolio-specific, so it stays here
 * rather than in the DS — only the sliding-drawer shell (`SidePanel`) does.
 */
export function ProjectDetailPanel({ project, onClose }: ProjectDetailPanelProps) {
  const t = useTranslations("PROJECTS");
  const bioParagraphs = project?.body.split(/\n{2,}/).filter(Boolean) ?? [];

  return (
    <SidePanel open={project !== null} onClose={onClose} label={project?.title ?? ""} closeLabel={t("CLOSE_PANEL")}>
      {project && (
        <>
          {project.coverUrl && <img src={project.coverUrl} alt="" className={styles.cover} />}

          <div>
            <h2 className={styles.title}>{project.title}</h2>
            {project.projectType && <p className={styles.type}>{project.projectType}</p>}
          </div>

          {project.tags.length > 0 && <TagList tags={project.tags} />}

          <p className={styles.status}>
            <span
              className={cn(styles.statusDot, project.isActive ? styles.statusDotActive : styles.statusDotInactive)}
              aria-hidden="true"
            />
            {project.isActive ? t("SITE_ACTIVE") : t("SITE_INACTIVE")}
          </p>

          <p className={styles.summary}>{project.summary}</p>

          {bioParagraphs.map((paragraph, index) => (
            // Static, ordered content split from a single field on blank lines — index is a stable key here.
            <p key={index} className={styles.body}>
              {paragraph}
            </p>
          ))}

          {project.siteUrl && (
            <a href={project.siteUrl} target="_blank" rel="noopener noreferrer" className={styles.cta}>
              {t("VISIT_SITE")}
            </a>
          )}
        </>
      )}
    </SidePanel>
  );
}

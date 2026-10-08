"use client";

import { useState } from "react";

import { Timeline, type TimelineItem } from "@alishenriques/design-system";

import type { Project } from "@/lib/schemas";

import { techBadges } from "../../constants/techBadges";
import { ProjectDetailPanel } from "../ProjectDetailPanel";
import { styles } from "./styles/index.styles";

export type ProjectsTimelineProps = {
  projects: Project[];
  /** Opens this project's detail panel on mount — e.g. a `?project=slug` deep link from another page. */
  initialSelectedSlug?: string | null;
};

/**
 * Client wrapper around the DS `Timeline`: owns which project is selected
 * and renders the GitKraken-style detail `SidePanel` alongside it. Split
 * from `Projects` (the data-fetching Server Component) because selection
 * state needs a Client Component.
 *
 * Selection is keyed by `slug`, not the database `id`: slugs are the public,
 * stable identifier (also what `?project=` deep links use), so there's no
 * need for a separate id/slug lookup anywhere in this tree.
 *
 * The first project (the newest, as the API orders them) is the featured
 * row: bigger node and text, plus a row of icons for its main technologies.
 */
export function ProjectsTimeline({ projects, initialSelectedSlug = null }: ProjectsTimelineProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialSelectedSlug);
  const selected = projects.find((project) => project.slug === selectedSlug) ?? null;

  const items: TimelineItem[] = projects.map((project, index) => ({
    id: project.slug,
    label: project.title,
    iconUrl: project.iconUrl,
    typeLabel: project.projectType,
    description: project.summary,
    ...(index === 0 && { featured: true, badges: techBadges(project.tags) }),
  }));

  return (
    <div className={styles.root}>
      <Timeline items={items} selectedId={selectedSlug} onSelect={setSelectedSlug} />
      <ProjectDetailPanel project={selected} onClose={() => setSelectedSlug(null)} />
    </div>
  );
}

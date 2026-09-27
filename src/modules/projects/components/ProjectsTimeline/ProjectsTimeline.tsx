"use client";

import { useState } from "react";

import { Timeline, type TimelineItem } from "@alishenriques/design-system";

import type { Project } from "@/lib/schemas";

import { ProjectDetailPanel } from "../ProjectDetailPanel";
import { styles } from "./styles/index.styles";

/**
 * Client wrapper around the DS `Timeline`: owns which project is selected
 * and renders the GitKraken-style detail `SidePanel` alongside it. Split
 * from `Projects` (the data-fetching Server Component) because selection
 * state needs a Client Component.
 */
export function ProjectsTimeline({ projects }: { projects: Project[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = projects.find((project) => project.id === selectedId) ?? null;

  const items: TimelineItem[] = projects.map((project) => ({
    id: project.id,
    label: project.title,
    iconUrl: project.iconUrl,
  }));

  return (
    <div className={styles.root}>
      <Timeline items={items} selectedId={selectedId} onSelect={setSelectedId} />
      <ProjectDetailPanel project={selected} onClose={() => setSelectedId(null)} />
    </div>
  );
}

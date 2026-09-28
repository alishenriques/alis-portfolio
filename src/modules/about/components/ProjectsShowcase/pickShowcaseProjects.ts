import type { Project } from "@/lib/schemas";

/** A project known (by the type system, not just at runtime) to have a cover image. */
export type ShowcaseEligibleProject = Project & { coverUrl: string };

function hasCoverImage(project: Project): project is ShowcaseEligibleProject {
  return project.coverUrl !== null;
}

/**
 * Picks `count` projects to showcase on the About page: a project needs a
 * `coverUrl` to show up here at all (the card's whole point is the
 * screenshot), the `featured` one (if any) is always first — the "pin the
 * first project" mechanism the rest are a random sample of, order changing
 * on every request since `About` is rendered fresh each time (no caching).
 *
 * `featured` has no other live meaning in the app right now (the Home page's
 * old projects section, its one other reader, was removed), so it doubles
 * as this section's pin flag rather than adding a new field for the same
 * "highlight this one" idea.
 */
export function pickShowcaseProjects(
  projects: Project[],
  count: number,
  random: () => number = Math.random,
): ShowcaseEligibleProject[] {
  const eligible = projects.filter(hasCoverImage);
  const pinned = eligible.find((project) => project.featured) ?? null;
  const rest = pinned ? eligible.filter((project) => project !== pinned) : eligible;
  const shuffled = shuffle(rest, random);

  return (pinned ? [pinned, ...shuffled] : shuffled).slice(0, count);
}

/** Fisher-Yates, with an injectable random source so this is deterministically testable. */
function shuffle<T>(items: T[], random: () => number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

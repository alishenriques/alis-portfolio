import {
  SiClaude,
  SiClaudeHex,
  SiDrizzle,
  SiDrizzleHex,
  SiGithubactions,
  SiGithubactionsHex,
  SiPostgresql,
  SiPostgresqlHex,
  SiVercel,
  SiVitest,
  SiVitestHex,
  SiZod,
  SiZodHex,
} from "@icons-pack/react-simple-icons";

import { type Skill, skillsList } from "@/modules/skills/constants/skillsList";

import type { TimelineBadge } from "@alishenriques/design-system";

const BADGE_ICON_SIZE = 18;

// The home page's stack icons (same names and colours), plus the extra
// back-end and tooling marks a project's tags can name. Keyed by the exact
// tag text stored in the CMS.
const techIcons = new Map<string, Skill>([
  ...skillsList.map((skill) => [skill.name, skill] as const),
  ["Claude Code", { name: "Claude Code", icon: SiClaude, color: SiClaudeHex }],
  ["Drizzle", { name: "Drizzle", icon: SiDrizzle, color: SiDrizzleHex }],
  ["Zod", { name: "Zod", icon: SiZod, color: SiZodHex }],
  ["PostgreSQL", { name: "PostgreSQL", icon: SiPostgresql, color: SiPostgresqlHex }],
  ["Vitest", { name: "Vitest", icon: SiVitest, color: SiVitestHex }],
  ["GitHub Actions", { name: "GitHub Actions", icon: SiGithubactions, color: SiGithubactionsHex }],
  // Vercel's official mark is black — white so it reads on the dark ground, like Next.js.
  ["Vercel", { name: "Vercel", icon: SiVercel, color: "#FFFFFF" }],
]);

/**
 * The tech icon row for a project's Timeline node: one badge per tag that
 * has a known icon, in the tags' own order. Tags without an icon (e.g.
 * "Elementor") are skipped here; they still show in the detail panel's tag list.
 */
export function techBadges(tags: string[]): TimelineBadge[] {
  return tags.flatMap((tag) => {
    const tech = techIcons.get(tag);
    if (!tech) return [];
    return [{ label: tag, icon: <tech.icon size={BADGE_ICON_SIZE} color={tech.color} aria-hidden="true" /> }];
  });
}

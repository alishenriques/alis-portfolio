import type { ComponentType } from "react";

import {
  SiAngular,
  SiGraphql,
  SiGraphqlHex,
  SiJavascript,
  SiJavascriptHex,
  SiJsonwebtokens,
  SiNextdotjs,
  SiNodedotjs,
  SiNodedotjsHex,
  SiReact,
  SiReactHex,
  SiStorybook,
  SiStorybookHex,
  SiStyledcomponents,
  SiStyledcomponentsHex,
  SiTailwindcss,
  SiTailwindcssHex,
  SiTypescript,
  SiTypescriptHex,
  SiVite,
  SiViteHex,
  SiWordpress,
  SiWordpressHex,
} from "@icons-pack/react-simple-icons";
import { ArrowLeftRight } from "lucide-react";


export type SkillIconProps = {
  size?: number | string;
  color?: string;
  "aria-hidden"?: boolean | "true" | "false";
};

export type Skill = {
  name: string;
  icon: ComponentType<SkillIconProps>;
  /** Simple Icons' official brand color (hex, with #). */
  color: string;
};

// Real primary stack (see CV / Experience entries), not just this site's own build.
// Grouped by area: languages, front-end frameworks/tooling, back-end/APIs, styling, docs/CMS.
export const skillsList: Skill[] = [
  { name: "JavaScript (ES6)", icon: SiJavascript, color: SiJavascriptHex },
  { name: "TypeScript", icon: SiTypescript, color: SiTypescriptHex },
  { name: "React", icon: SiReact, color: SiReactHex },
  // Next.js's official mark is black — swapped for white so it reads on our dark ground.
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  // Simple Icons now ships Angular in near-black, which vanishes on our dark ground — use the classic brand red.
  { name: "Angular", icon: SiAngular, color: "#DD0031" },
  { name: "Vite", icon: SiVite, color: SiViteHex },
  { name: "Node.js", icon: SiNodedotjs, color: SiNodedotjsHex },
  { name: "GraphQL", icon: SiGraphql, color: SiGraphqlHex },
  // REST has no brand mark, so a two-way arrow (request/response) stands in for it.
  { name: "REST", icon: ArrowLeftRight, color: "#FFFFFF" },
  // JWT's own hex is black; jwt.io's magenta reads on the dark ground.
  { name: "JWT", icon: SiJsonwebtokens, color: "#D63AFF" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: SiTailwindcssHex },
  { name: "styled-components", icon: SiStyledcomponents, color: SiStyledcomponentsHex },
  { name: "Storybook", icon: SiStorybook, color: SiStorybookHex },
  { name: "WordPress", icon: SiWordpress, color: SiWordpressHex },
];

import {
  SiAngular,
  SiAngularHex,
  SiGraphql,
  SiGraphqlHex,
  SiNextdotjs,
  SiNodedotjs,
  SiNodedotjsHex,
  SiReact,
  SiReactHex,
  SiTailwindcss,
  SiTailwindcssHex,
  SiTypescript,
  SiTypescriptHex,
} from "@icons-pack/react-simple-icons";

export type Skill = {
  name: string;
  icon: typeof SiReact;
  /** Simple Icons' official brand color (hex, with #). */
  color: string;
};

// Real primary stack (see CV / Experience entries), not just this site's own build.
export const skillsList: Skill[] = [
  { name: "React", icon: SiReact, color: SiReactHex },
  // Next.js's official mark is black — swapped for white so it reads on our dark ground.
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "TypeScript", icon: SiTypescript, color: SiTypescriptHex },
  { name: "Angular", icon: SiAngular, color: SiAngularHex },
  { name: "Node.js", icon: SiNodedotjs, color: SiNodedotjsHex },
  { name: "GraphQL", icon: SiGraphql, color: SiGraphqlHex },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: SiTailwindcssHex },
];

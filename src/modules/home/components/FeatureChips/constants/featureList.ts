import { Accessibility, Blocks, Code2, FlaskConical, Network, Sparkles, Zap } from "lucide-react";

export type Feature = {
  id: string;
  icon: typeof Code2;
  /** Relative to the "HOME.FEATURES" i18n namespace. */
  messageKey: string;
};

export const featureList: Feature[] = [
  { id: "typescript", icon: Code2, messageKey: "TYPESCRIPT" },
  { id: "components", icon: Blocks, messageKey: "COMPONENTS" },
  { id: "performance", icon: Zap, messageKey: "PERFORMANCE" },
  { id: "accessible", icon: Accessibility, messageKey: "ACCESSIBLE" },
  { id: "architecture", icon: Network, messageKey: "ARCHITECTURE" },
  { id: "tests", icon: FlaskConical, messageKey: "TESTS" },
  { id: "clean-code", icon: Sparkles, messageKey: "CLEAN_CODE" },
];

import { Accessibility, Award, Blocks, Code2, FlaskConical, Network, ShieldCheck, Sparkles, Workflow, Zap } from "lucide-react";

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
  { id: "responsible-ai", icon: ShieldCheck, messageKey: "RESPONSIBLE_AI" },
  { id: "process-optimization", icon: Workflow, messageKey: "PROCESS_OPTIMIZATION" },
  { id: "operational-excellence", icon: Award, messageKey: "OPERATIONAL_EXCELLENCE" },
];

import type { ComponentType } from "react";

import { AiAssistedIcon, ModernUiIcon, PerformanceIcon, ScalabilityIcon } from "../icons";

import type { IconProps } from "../icons";

export type HighlightItem = {
  id: string;
  /** Key under `HOME.TAGLINE` in the locale files. */
  messageKey: string;
  icon: ComponentType<IconProps>;
};

export const highlightList: HighlightItem[] = [
  { id: "modern-ui", messageKey: "MODERN_UI", icon: ModernUiIcon },
  { id: "performance", messageKey: "PERFORMANCE", icon: PerformanceIcon },
  { id: "scalability", messageKey: "SCALABILITY", icon: ScalabilityIcon },
  { id: "ai-assisted", messageKey: "AI_ASSISTED", icon: AiAssistedIcon },
];

import type { ComponentType } from "react";

import { CleanCodeIcon, ModernUiIcon, PerformanceIcon, ScalabilityIcon, TestsIcon } from "../icons";

import type { IconProps } from "../icons";

export type HighlightItem = {
  id: string;
  /** Key under `HOME.TAGLINE` in the locale files. */
  messageKey: string;
  icon: ComponentType<IconProps>;
};

export const highlightList: HighlightItem[] = [
  { id: "clean-code", messageKey: "CLEAN_CODE", icon: CleanCodeIcon },
  { id: "modern-ui", messageKey: "MODERN_UI", icon: ModernUiIcon },
  { id: "performance", messageKey: "PERFORMANCE", icon: PerformanceIcon },
  { id: "scalability", messageKey: "SCALABILITY", icon: ScalabilityIcon },
  { id: "tests", messageKey: "TESTS", icon: TestsIcon },
];

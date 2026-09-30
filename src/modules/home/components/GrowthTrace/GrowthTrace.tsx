import type { CSSProperties } from "react";

import { styles } from "./styles/index.styles";

export type GrowthTraceProps = {
  /** Overrides the line/marker color (any CSS color); defaults to the DS accent (lime). */
  color?: string;
};

/**
 * Decorative "growth chart" line that draws itself from bottom-left to top-right,
 * then pops a marker at the peak. Replaces the plain dot divider under the headline.
 * `pathLength` is normalised to 1 so the dash animation doesn't depend on the real length.
 */
export function GrowthTrace({ color }: GrowthTraceProps = {}) {
  return (
    <svg
      viewBox="0 0 260 40"
      className={styles.root}
      style={color ? ({ "--growth-trace-color": color } as CSSProperties) : undefined}
      aria-hidden="true"
    >
      <path
        d="M2 34 C 40 34, 55 30, 80 26 S 130 14, 160 12 S 220 4, 254 5"
        pathLength={1}
        className={styles.line}
      />
      <circle cx="254" cy="5" r="3.5" className={styles.marker} />
    </svg>
  );
}

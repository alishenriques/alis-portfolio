import { styles } from "./styles/index.styles";

/**
 * Decorative "growth chart" line that draws itself from bottom-left to top-right,
 * then pops a marker at the peak. Replaces the plain dot divider under the headline.
 * `pathLength` is normalised to 1 so the dash animation doesn't depend on the real length.
 */
export function GrowthTrace() {
  return (
    <svg viewBox="0 0 260 40" className={styles.root} aria-hidden="true">
      <path
        d="M2 34 C 40 34, 55 30, 80 26 S 130 14, 160 12 S 220 4, 254 5"
        pathLength={1}
        className={styles.line}
      />
      <circle cx="254" cy="5" r="3.5" className={styles.marker} />
    </svg>
  );
}

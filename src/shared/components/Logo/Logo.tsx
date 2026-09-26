import { cn } from "@/lib/utils";

import { ACCENT_PATH, FIRST_NAME_PATH, HORIZONTAL_VIEWBOX, LAST_NAME_PATH, MARK_PATH, SYMBOL_VIEWBOX } from "./logoPaths";
import { styles } from "./styles/index.styles";

export type LogoProps = {
  /** Horizontal lockup (monogram + "Alisson Henriques") instead of the monogram alone. Off for tight spaces like the header. */
  withWordmark?: boolean;
  className?: string;
};

/**
 * The Alisson Henriques logo, rendered inline so it takes the site's tokens: the
 * monogram and first name use the foreground colour, the triangle and last name
 * the accent (the brand files were designed on the same palette). The exported
 * files expose `--logo-*` variables for this; they are set in `styles.root`.
 */
export function Logo({ withWordmark = true, className }: LogoProps) {
  return (
    <svg
      viewBox={withWordmark ? HORIZONTAL_VIEWBOX : SYMBOL_VIEWBOX}
      role="img"
      aria-label="Alisson Henriques"
      className={cn(styles.root, withWordmark ? styles.horizontal : styles.symbol, className)}
    >
      <title>Alisson Henriques</title>
      <path className={styles.mark} d={MARK_PATH} />
      <path className={styles.accent} d={ACCENT_PATH} />
      {withWordmark && (
        <>
          <path className={styles.mark} d={FIRST_NAME_PATH} />
          <path className={styles.accent} d={LAST_NAME_PATH} />
        </>
      )}
    </svg>
  );
}

import { cn } from "@/lib/utils";

import { styles } from "./styles/index.styles";

export type LogoProps = {
  /** Shows "Alisson Henriques" next to the mark. Off for tight spaces (e.g. the drawer trigger). */
  withWordmark?: boolean;
  className?: string;
};

/**
 * Hand-drawn geometric mark (two peaks + one accent triangle), inspired by the
 * user-provided references. Placeholder until a real vector logo is supplied.
 */
export function Logo({ withWordmark = true, className }: LogoProps) {
  return (
    <span className={cn(styles.root, className)}>
      <svg viewBox="0 0 48 40" className={styles.mark} aria-hidden="true">
        <polygon points="4,38 19,6 27,38" fill="var(--ds-color-fg)" />
        <polygon points="17,38 32,14 44,38" fill="var(--ds-color-fg)" opacity="0.85" />
        <polygon points="31,38 38,26 44,38" fill="var(--ds-color-accent)" />
      </svg>
      {withWordmark && (
        <span className={styles.wordmark}>
          Alisson <span className={styles.wordmarkAccent}>Henriques</span>
        </span>
      )}
    </span>
  );
}

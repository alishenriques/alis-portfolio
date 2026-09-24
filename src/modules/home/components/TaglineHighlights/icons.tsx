import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

/**
 * Small hand-drawn icons for the hero tagline: 24x24 grid, 1.75 stroke, rounded caps,
 * each with a playful detail (cursor, speed lines, growing bars, sparkle).
 * `currentColor` for the main stroke, the accent for the fun bits.
 */
function BaseIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

/** A tiny browser window with a mouse cursor about to click. */
export function ModernUiIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="2.5" y="4" width="17" height="14" rx="2.5" />
      <path d="M2.5 8.5h17" />
      <circle cx="5.5" cy="6.25" r="0.4" />
      <path d="M13.5 11.5l7 3-3 1.2-1.2 3z" className="fill-[var(--ds-color-accent)] stroke-[var(--ds-color-accent)]" />
    </BaseIcon>
  );
}

/** Lightning bolt with speed lines. */
export function PerformanceIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M14 3 7.5 13.5H12L10.5 21 18 10h-4.8z" />
      <path d="M2.5 9h3M1.5 13h3.5M3 17h2.5" className="stroke-[var(--ds-color-accent)]" />
    </BaseIcon>
  );
}

/** Growing bars with an upward arrow. */
export function ScalabilityIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 20v-4M10 20v-8M16 20V9" />
      <path d="M3 20.5h17" />
      <path d="M13 4h7v7M20 4l-8 8" className="stroke-[var(--ds-color-accent)]" />
    </BaseIcon>
  );
}

/** A microchip with a sparkle at its core: engineering with an AI assist. */
export function AiAssistedIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="5" y="5" width="14" height="14" rx="3" />
      <path d="M9 2.5V5M15 2.5V5M9 19v2.5M15 19v2.5M2.5 9H5M2.5 15H5M19 9h2.5M19 15h2.5" />
      <path
        d="M12 8.2l1.1 2.7 2.7 1.1-2.7 1.1L12 15.8l-1.1-2.7L8.2 12l2.7-1.1z"
        className="fill-[var(--ds-color-accent)] stroke-[var(--ds-color-accent)]"
      />
    </BaseIcon>
  );
}

import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

/**
 * Small hand-drawn icons for the hero tagline: 24x24 grid, 1.75 stroke, rounded caps,
 * each with a playful detail (sparkle, cursor, speed lines, growing bars, bubbles).
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

/** `< >` brackets with a sparkle: code that shines. */
export function CleanCodeIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M8 8 3.5 12.5 8 17" />
      <path d="M12.5 18l2.2-12" />
      <path d="M17 8l4.5 4.5L17 17" />
      <path d="M19.5 2.5v3M18 4h3" className="stroke-[var(--ds-color-accent)]" />
    </BaseIcon>
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

/** A lab flask, bubbling, with a check. */
export function TestsIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M9.5 3h5M10.5 3v6L5 18.5A2 2 0 0 0 6.8 21.5h10.4a2 2 0 0 0 1.8-3L13.5 9V3" />
      <path d="M9.5 15.5l2 2 3.5-3.5" className="stroke-[var(--ds-color-accent)]" />
      <circle cx="16.5" cy="5.5" r="0.6" className="fill-[var(--ds-color-accent)] stroke-none" />
      <circle cx="18.5" cy="3" r="0.9" className="fill-[var(--ds-color-accent)] stroke-none" />
    </BaseIcon>
  );
}

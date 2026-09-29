export const styles = {
  // "group" + padding-bottom (not a list-level flex gap) is what lets the
  // timeline rail below look continuous: the line is a child of this same
  // element, reaching bottom-0 — which lands exactly at the top of the next
  // item, since the gap between items is this element's own box, not empty
  // space between flex siblings. last:pb-0 drops the trailing gap after the
  // final item.
  root: `
    group
    relative
    pb-10
    pl-8
    last:pb-0
  `,

  marker: `
    absolute
    left-0
    top-7
    z-10
    h-2.5
    w-2.5
    rounded-full
    bg-[var(--ds-color-accent)]
    ring-4
    ring-[var(--ds-color-bg)]
  `,

  // group-last:hidden: no dangling line below the last item.
  line: `
    absolute
    left-1
    top-7
    bottom-0
    w-px
    bg-[var(--ds-color-accent)]
    opacity-35
    group-last:hidden
  `,

  date: `
    font-mono
    text-xs
    uppercase
    tracking-wide
    text-[var(--ds-color-muted)]
  `,

  heading: `
    mt-1
    text-lg
    font-semibold
    text-[var(--ds-color-fg)]
  `,

  separator: `
    text-[var(--ds-color-accent)]
  `,

  // No max-w-[65ch] (removed): it capped this narrower than the page's own
  // max-w-3xl root, the same "empty gap" bug fixed on the About page's bio
  // once before — this fills whatever width the root gives it instead.
  // Lighter color (was --ds-color-muted) for readability, per the user.
  description: `
    mt-3
    whitespace-pre-line
    text-sm
    leading-relaxed
    text-[var(--ds-color-fg)]
  `,
};

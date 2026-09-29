export const styles = {
  root: `
    flex
    flex-col
    gap-6
  `,

  heading: `
    text-2xl
    font-semibold
    text-[var(--ds-color-fg)]
  `,

  // items-start (not the grid default, stretch): each card sizes to its own
  // content, so one card's hover-reveal growing taller doesn't stretch its
  // row siblings along with it.
  grid: `
    grid
    grid-cols-1
    items-start
    gap-8
    sm:grid-cols-2
    lg:grid-cols-3
  `,

  // "group" (plain Tailwind marker, not a design-system class) lets the
  // link/arrow below react to hovering *anywhere* on the card — matching the
  // design system's own Card hover state, which is already whole-card — even
  // though the two live in different stylesheets/components.
  card: `
    group
  `,

  // Smaller than the usual text-xs mono treatment (and less letter-spacing)
  // on purpose: at the card's narrow width, text-xs + tracking-[0.1em] wrapped
  // "+ sobre esse projeto" onto two lines.
  link: `
    inline-flex
    items-center
    gap-1
    whitespace-nowrap
    font-mono
    text-[10px]
    font-medium
    uppercase
    tracking-[0.04em]
    text-[var(--ds-color-accent)]
  `,

  arrow: `
    inline-block
    transition-transform
    duration-200
    group-hover:translate-x-1
    group-focus-within:translate-x-1
  `,
};

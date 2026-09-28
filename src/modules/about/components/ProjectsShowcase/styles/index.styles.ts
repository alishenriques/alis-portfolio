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

  grid: `
    grid
    grid-cols-1
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

  link: `
    inline-flex
    items-center
    gap-1.5
    font-mono
    text-xs
    font-medium
    uppercase
    tracking-[0.1em]
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

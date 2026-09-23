export const styles = {
  list: `
    grid
    grid-cols-2
    gap-x-4
    gap-y-6
    border-t
    border-[var(--ds-color-border)]
    pt-8
    sm:grid-cols-3
    sm:gap-x-6
  `,

  item: `
    flex
    items-start
    gap-2.5
  `,

  icon: `
    mt-0.5
    shrink-0
    text-[var(--ds-color-accent)]
  `,

  text: `
    text-xs
    leading-snug
    text-[var(--ds-color-muted)]
  `,

  highlight: `
    font-semibold
    text-[var(--ds-color-fg)]
  `,
};

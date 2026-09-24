export const styles = {
  root: `
    flex
    flex-col
    items-center
    gap-10
    py-16
  `,

  title: `
    font-mono
    text-xs
    uppercase
    tracking-[0.2em]
    text-[var(--ds-color-muted)]
  `,

  list: `
    flex
    w-full
    flex-wrap
    justify-center
    gap-x-4
    gap-y-10
    sm:gap-x-6
  `,

  item: `
    flex
    basis-[calc(50%-0.5rem)]
    sm:basis-[calc(33.333%-1rem)]
    lg:basis-[calc(20%-1.25rem)]
    flex-col
    items-center
    gap-3
    text-center
  `,

  icon: `
    shrink-0
    text-[var(--ds-color-accent)]
  `,

  text: `
    max-w-[28ch]
    text-[15px]
    leading-snug
    text-[var(--ds-color-muted)]
  `,

  highlight: `
    font-semibold
    text-[var(--ds-color-fg)]
  `,
};

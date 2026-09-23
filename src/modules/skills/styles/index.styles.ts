export const styles = {
  root: `
    mx-auto
    flex
    w-full
    max-w-4xl
    flex-col
    items-center
    gap-8
    px-4
    py-16
    sm:px-6
  `,

  title: `
    font-mono
    text-xs
    uppercase
    tracking-[0.2em]
    text-[var(--ds-color-muted)]
  `,

  list: `
    grid
    w-full
    grid-cols-3
    gap-x-4
    gap-y-8
    divide-[var(--ds-color-border)]
    sm:flex
    sm:flex-wrap
    sm:justify-center
    sm:divide-x
  `,

  item: `
    flex
    flex-col
    items-center
    gap-2
    px-4
  `,

  label: `
    font-mono
    text-xs
    text-[var(--ds-color-muted)]
  `,
};

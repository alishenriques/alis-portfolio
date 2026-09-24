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
    flex
    w-full
    flex-wrap
    justify-center
    gap-x-2
    gap-y-8
  `,

  item: `
    flex
    basis-[calc(33.333%-0.5rem)]
    flex-col
    items-center
    gap-2
    px-2
    text-center
    sm:basis-[calc(25%-0.5rem)]
    lg:basis-[calc(20%-0.5rem)]
    lg:border-l
    lg:border-[var(--ds-color-border)]
    lg:nth-[5n+1]:border-l-0
  `,

  label: `
    font-mono
    text-xs
    text-[var(--ds-color-muted)]
  `,
};

export const styles = {
  root: `
    mx-auto
    flex
    w-full
    max-w-3xl
    flex-1
    flex-col
    gap-8
    px-4
    py-16
    sm:px-6
  `,

  header: `
    flex
    flex-col
    items-center
    gap-6
    text-center
    sm:flex-row
    sm:items-start
    sm:text-left
  `,

  avatar: `
    h-32
    w-32
    shrink-0
    rounded-full
    border
    border-[var(--ds-color-border-strong)]
    object-cover
  `,

  name: `
    mt-2
    text-3xl
    font-semibold
    text-[var(--ds-color-fg)]
  `,

  headline: `
    mt-1
    text-[var(--ds-color-accent)]
  `,

  bio: `
    max-w-[65ch]
    text-[15px]
    leading-relaxed
    text-[var(--ds-color-muted)]
  `,
};

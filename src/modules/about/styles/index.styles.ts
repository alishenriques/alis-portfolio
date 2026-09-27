export const styles = {
  root: `
    mx-auto
    flex
    w-full
    max-w-3xl
    flex-1
    flex-col
    gap-12
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

  // object-top keeps the hairline in frame: a centred crop of this portrait
  // clips the top of the head (see docs/ai/architecture.md).
  avatar: `
    h-36
    w-36
    shrink-0
    rounded-full
    border-2
    border-[var(--ds-color-accent)]
    object-cover
    object-top
  `,

  name: `
    mt-3
    text-3xl
    font-semibold
    text-[var(--ds-color-fg)]
  `,

  headline: `
    mt-2
    text-lg
    font-medium
    text-[var(--ds-color-accent)]
  `,

  bio: `
    max-w-[65ch]
    text-[15px]
    leading-relaxed
    text-[var(--ds-color-muted)]
  `,

  videoSection: `
    flex
    flex-col
    gap-4
  `,

  videoHeading: `
    font-mono
    text-xs
    tracking-[0.2em]
    text-[var(--ds-color-muted)]
    uppercase
  `,
};

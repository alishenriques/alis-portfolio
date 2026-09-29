export const styles = {
  root: `
    mx-auto
    flex
    w-full
    max-w-3xl
    flex-1
    flex-col
    gap-10
    px-4
    py-16
    sm:px-6
  `,

  heading: `
    mt-2
    text-2xl
    font-semibold
    text-[var(--ds-color-fg)]
  `,

  // No gap: each ExperienceItem owns its own trailing space (pb-10) instead,
  // so its timeline-rail line can reach all the way to the next item's
  // marker through that space, not stop short at a flex gap it doesn't own.
  list: `
    flex
    flex-col
  `,

  empty: `
    text-[var(--ds-color-muted)]
  `,
};

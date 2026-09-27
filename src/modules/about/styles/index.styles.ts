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

  // The DS Avatar component owns its own size/border/crop (via props); this
  // is only the flex-layout concern of not letting it get squeezed in the row.
  avatar: `
    shrink-0
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

  education: `
    mt-2
    flex
    items-center
    justify-center
    gap-2
    font-mono
    text-xs
    text-[var(--ds-color-muted)]
    sm:justify-start
  `,

  educationLabel: `
    tracking-[0.1em]
    text-[var(--ds-color-border-strong)]
    uppercase
  `,

  bioSection: `
    flex
    flex-col
    gap-6
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

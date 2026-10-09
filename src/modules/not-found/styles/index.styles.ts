export const styles = {
  root: `
    relative
    isolate
    mx-auto
    flex
    w-full
    max-w-3xl
    flex-1
    flex-col
    items-center
    justify-center
    gap-6
    px-4
    py-16
    text-center
    sm:px-6
  `,

  // The page's blue: the DS's secondary accent.
  glow: `
    pointer-events-none
    absolute
    inset-0
    -z-10
    bg-[radial-gradient(circle_at_50%_35%,color-mix(in_srgb,var(--ds-color-secondary)_12%,transparent),transparent_60%)]
  `,

  logoLink: `
    rounded-md
    focus-visible:outline-2
    focus-visible:outline-offset-4
    focus-visible:outline-[var(--ds-color-secondary)]
  `,

  robot: `
    w-56
    h-auto
    sm:w-72
    drop-shadow-[0_0_24px_color-mix(in_srgb,var(--ds-color-secondary)_25%,transparent)]
    motion-safe:animate-[float-bob_4s_ease-in-out_infinite]
  `,

  text: `
    flex
    flex-col
    items-center
    gap-3
  `,

  code: `
    font-mono
    text-xs
    tracking-[0.2em]
    uppercase
    text-[var(--ds-color-secondary)]
  `,

  heading: `
    font-[family-name:var(--ds-font-display)]
    text-3xl
    font-extrabold
    tracking-tight
    text-[var(--ds-color-fg)]
    sm:text-4xl
  `,

  description: `
    max-w-md
    text-[var(--ds-color-muted)]
  `,

  backLink: `
    mt-2
    inline-flex
    items-center
    gap-2
    rounded-md
    border
    border-[var(--ds-color-secondary)]/40
    px-4
    py-2
    font-mono
    text-sm
    text-[var(--ds-color-secondary)]
    transition-colors
    duration-150
    hover:border-[var(--ds-color-secondary)]
    hover:bg-[var(--ds-color-secondary-soft)]
    focus-visible:outline-2
    focus-visible:outline-offset-2
    focus-visible:outline-[var(--ds-color-secondary)]
  `,
};

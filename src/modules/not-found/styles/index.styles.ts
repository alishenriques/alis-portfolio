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

  // The page's blue: the same one as the Hero's AI slide (#38bdf8).
  glow: `
    pointer-events-none
    absolute
    inset-0
    -z-10
    bg-[radial-gradient(circle_at_50%_35%,rgba(56,189,248,0.12),transparent_60%)]
  `,

  logoLink: `
    rounded-md
    focus-visible:outline-2
    focus-visible:outline-offset-4
    focus-visible:outline-[#38bdf8]
  `,

  robot: `
    w-56
    h-auto
    sm:w-72
    drop-shadow-[0_0_24px_rgba(56,189,248,0.25)]
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
    text-[#38bdf8]
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
    border-[#38bdf8]/40
    px-4
    py-2
    font-mono
    text-sm
    text-[#38bdf8]
    transition-colors
    duration-150
    hover:border-[#38bdf8]
    hover:bg-[#38bdf8]/10
    focus-visible:outline-2
    focus-visible:outline-offset-2
    focus-visible:outline-[#38bdf8]
  `,
};

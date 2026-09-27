export const styles = {
  cover: `
    aspect-video
    w-full
    rounded-lg
    border
    border-[var(--ds-color-border-strong)]
    object-cover
  `,

  title: `
    text-xl
    font-semibold
    text-[var(--ds-color-fg)]
  `,

  type: `
    mt-1
    font-mono
    text-xs
    uppercase
    tracking-[0.14em]
    text-[var(--ds-color-muted)]
  `,

  status: `
    flex
    items-center
    gap-2
    text-sm
    text-[var(--ds-color-fg)]
  `,

  statusDot: `
    h-2
    w-2
    flex-none
    rounded-full
  `,

  statusDotActive: `
    bg-emerald-400
  `,

  statusDotInactive: `
    bg-[var(--ds-color-muted)]
  `,

  summary: `
    text-base
    font-medium
    text-[var(--ds-color-fg)]
  `,

  body: `
    text-sm
    leading-relaxed
    text-[var(--ds-color-muted)]
  `,

  cta: `
    mt-2
    inline-flex
    w-fit
    items-center
    justify-center
    rounded-lg
    bg-[var(--ds-color-accent)]
    px-4
    py-2.5
    text-sm
    font-semibold
    text-[var(--ds-color-accent-ink)]
    transition-[filter]
    duration-150
    hover:brightness-110
  `,
};

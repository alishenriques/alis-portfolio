export const styles = {
  root: `
    ds-dot-grid
    relative
    flex
    flex-col
    items-center
    gap-8
    overflow-hidden
    border-b
    border-[var(--ds-color-border)]
    bg-[radial-gradient(circle_at_50%_0%,rgba(200,255,0,0.08),transparent_60%)]
    px-4
    py-20
    text-center
    sm:px-6
    sm:py-28
  `,

  content: `
    relative
    z-10
    flex
    max-w-2xl
    flex-col
    items-center
    gap-6
  `,

  titleRow: `
    flex
    items-center
    justify-center
    gap-4
  `,

  bracket: `
    hidden
    font-mono
    text-lg
    text-[var(--ds-color-border-strong)]
    sm:inline
  `,

  title: `
    text-[clamp(28px,6vw,48px)]
    leading-[1.05]
    font-extrabold
    tracking-[0.02em]
    text-[var(--ds-color-fg)]
  `,

  titleHighlight: `
    text-[var(--ds-color-accent)]
  `,

  dotDivider: `
    h-1.5
    w-1.5
    rounded-full
    bg-[var(--ds-color-accent)]
  `,

  subtitle: `
    max-w-[56ch]
    text-[15px]
    leading-relaxed
    text-[var(--ds-color-muted)]
  `,

  subtitleHighlight: `
    font-semibold
    text-[var(--ds-color-accent)]
  `,

  contactRow: `
    flex
    flex-wrap
    items-center
    justify-center
    gap-4
    font-mono
    text-sm
    text-[var(--ds-color-muted)]
  `,

  contactItem: `
    inline-flex
    items-center
    gap-2
    transition-colors
    duration-150
    hover:text-[var(--ds-color-fg)]
  `,

  contactSeparator: `
    hidden
    h-4
    w-px
    bg-[var(--ds-color-border-strong)]
    sm:block
  `,

  tagline: `
    relative
    z-10
    max-w-3xl
    px-4
    font-mono
    text-[11px]
    tracking-[0.15em]
    text-[var(--ds-color-border-strong)]
    uppercase
  `,
};

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
    px-4
    py-20
    text-center
    sm:px-6
    sm:py-28
  `,

  // Two stacked radial-glow layers, crossfaded by opacity as the slide
  // changes — plain "background" isn't reliably animatable across two
  // different gradients, but two overlapping layers are.
  glow: `
    pointer-events-none
    absolute
    inset-0
    -z-10
    bg-[radial-gradient(circle_at_50%_0%,rgba(200,255,0,0.08),transparent_60%)]
    opacity-0
    transition-opacity
    duration-700
    ease-out
  `,

  glowActive: `
    pointer-events-none
    absolute
    inset-0
    -z-10
    bg-[radial-gradient(circle_at_50%_0%,rgba(200,255,0,0.08),transparent_60%)]
    opacity-100
    transition-opacity
    duration-700
    ease-out
  `,

  // Slide 2's own accent (blue) — the one deliberate departure from the
  // site's single-lime-accent palette, per the user.
  glow2: `
    pointer-events-none
    absolute
    inset-0
    -z-10
    bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.1),transparent_60%)]
    opacity-0
    transition-opacity
    duration-700
    ease-out
  `,

  glow2Active: `
    pointer-events-none
    absolute
    inset-0
    -z-10
    bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.1),transparent_60%)]
    opacity-100
    transition-opacity
    duration-700
    ease-out
  `,

  content: `
    relative
    z-10
    flex
    max-w-3xl
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
    inline-flex
    h-8
    w-8
    flex-none
    items-center
    justify-center
    rounded-md
    font-mono
    text-base
    text-[var(--ds-color-border-strong)]
    transition-colors
    duration-150
    hover:text-[var(--ds-color-accent)]
    hover:bg-[var(--ds-color-bg-raised)]
    focus-visible:outline
    focus-visible:outline-2
    focus-visible:outline-[var(--ds-color-accent)]
    focus-visible:outline-offset-2
    sm:h-10
    sm:w-10
    sm:text-lg
  `,

  eyebrow: `
    font-mono
    text-xs
    tracking-[0.18em]
    text-[var(--ds-color-muted)]
    uppercase
  `,

  title: `
    font-[family-name:var(--ds-font-display)]
    text-[clamp(30px,5.4vw,52px)]
    leading-[1.06]
    font-extrabold
    tracking-[-0.015em]
    text-balance
    text-[var(--ds-color-fg)]
    animate-[slide-reveal_0.5s_ease-out]
    motion-reduce:animate-none
  `,

  titleHighlight: `
    text-[var(--ds-color-accent)]
  `,

  // "<front-end>", styled like an HTML tag: terminal font instead of the
  // headline's display face, high weight (matching the rest of the
  // headline, not the mono font's own lighter default) so it reads as part
  // of the sentence rather than clashing with it.
  titleTag: `
    inline-block
    whitespace-nowrap
    font-[family-name:var(--ds-font-mono)]
    font-extrabold
    text-[var(--ds-color-accent)]
  `,

  titleTagBracket: `
    text-[var(--ds-color-muted)]
  `,

  titleHighlight2: `
    text-[#38bdf8]
  `,

  slideBody: `
    flex
    flex-col
    items-center
  `,

  subtitle: `
    max-w-[56ch]
    text-[15px]
    leading-relaxed
    text-[var(--ds-color-muted)]
    animate-[slide-reveal_0.5s_ease-out]
    motion-reduce:animate-none
  `,

  subtitleHighlight: `
    font-semibold
    text-[var(--ds-color-accent)]
  `,

  subtitleHighlight2: `
    font-semibold
    text-[#38bdf8]
  `,

  slide2: `
    flex
    flex-col
    items-center
    gap-4
  `,

  // Own animation (not just inherited from .subtitle's) so the chips don't
  // pop in ahead of the paragraph above them.
  featureList: `
    flex
    flex-wrap
    items-center
    justify-center
    gap-2
    animate-[slide-reveal_0.5s_ease-out_0.1s_backwards]
    motion-reduce:animate-none
  `,

  featureItem: `
    inline-flex
    items-center
    gap-1.5
    rounded-full
    border
    border-[rgba(56,189,248,0.35)]
    bg-[rgba(56,189,248,0.08)]
    px-3
    py-1
    font-mono
    text-xs
    text-[var(--ds-color-fg)]
  `,

  featureIcon: `
    flex-none
    text-[#38bdf8]
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
};

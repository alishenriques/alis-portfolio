const titleBase = `
  font-[family-name:var(--ds-font-display)]
  text-[clamp(30px,5.4vw,52px)]
  leading-[1.06]
  font-extrabold
  tracking-[-0.015em]
  text-balance
  text-[var(--ds-color-fg)]
  animate-[slide-reveal_0.5s_ease-out]
  motion-reduce:animate-none
`;

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

  // A thin, edge-to-edge progress line at the very top of the section (right
  // below the sticky site header) showing how much of the autoplay interval
  // has elapsed — the track is a faint constant bar, .progressFill is the
  // part that actually grows, keyed by slide so its fill-animation restarts
  // (from 0%) on every change, same technique as GrowthTrace's redraw.
  progressTrack: `
    absolute
    top-0
    left-0
    right-0
    z-10
    h-[2px]
    bg-[var(--ds-color-border)]
    motion-reduce:hidden
  `,

  progressFill: `
    h-full
    w-0
    bg-[var(--ds-color-accent)]
    [animation-timing-function:linear]
    [animation-fill-mode:forwards]
    [animation-name:hero-progress]
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
    max-w-[850px]
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
    font-semibold
    text-[var(--ds-color-muted)]
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

  title: titleBase,

  // Slide 2's own headline is shorter than slide 1's, so it needs its own
  // (narrower) cap to keep wrapping at 3 lines too, now that .content is
  // wide enough for slide 1 — a shared width can't fit both at once.
  title2: titleBase + " max-w-[640px]",

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

  slideControls: `
    flex
    items-center
    justify-center
  `,

  dots: `
    flex
    items-center
    justify-center
    gap-2
  `,

  dot: `
    h-2
    w-2
    flex-none
    rounded-full
    bg-[var(--ds-color-border-strong)]
    transition-colors
    duration-200
    hover:bg-[var(--ds-color-muted)]
    focus-visible:outline
    focus-visible:outline-2
    focus-visible:outline-[var(--ds-color-accent)]
    focus-visible:outline-offset-2
  `,

  dotActive: `
    h-2
    w-2
    flex-none
    rounded-full
    bg-[var(--ds-color-accent)]
    transition-colors
    duration-200
    focus-visible:outline
    focus-visible:outline-2
    focus-visible:outline-[var(--ds-color-accent)]
    focus-visible:outline-offset-2
  `,

  // Pause/resume autoplay (WCAG 2.2.2). Sits after the dots, sized as a
  // small target that still reads as part of the same control group; hidden
  // under prefers-reduced-motion, where there's no autoplay to pause.
  pauseButton: `
    ml-2
    inline-flex
    h-6
    w-6
    flex-none
    items-center
    justify-center
    rounded-md
    text-[var(--ds-color-muted)]
    transition-colors
    duration-150
    hover:text-[var(--ds-color-accent)]
    hover:bg-[var(--ds-color-bg-raised)]
    focus-visible:outline
    focus-visible:outline-2
    focus-visible:outline-[var(--ds-color-accent)]
    focus-visible:outline-offset-2
    motion-reduce:hidden
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

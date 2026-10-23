const groupBase = `
  absolute
  inset-0
  transition-[opacity,scale]
  duration-700
  ease-out
  motion-reduce:transition-none
`;

export const styles = {
  root: `
    pointer-events-none
    absolute
    inset-0
    hidden
    overflow-hidden
    lg:block
  `,

  // One set of decorations per hero slide, both always mounted: the active
  // one is shown, the other fades (and shrinks slightly) out of view.
  group: groupBase + " opacity-100 scale-100",

  groupHidden: groupBase + " opacity-0 scale-95",

  // Every pointer-driven element (see Floating.tsx); its rotation lives in
  // the inline transform, so position classes below never set one.
  floating: `
    absolute
    transition-transform
    duration-200
    ease-out
    will-change-transform
  `,

  panelBase: `
    w-72
    rounded-xl
    border
    border-[var(--ds-color-border-strong)]
    bg-[var(--ds-color-bg)]/90
    shadow-2xl
    backdrop-blur-sm
  `,

  codePanel: `
    top-16
    -left-6
  `,

  treePanel: `
    top-10
    -right-6
    w-64
  `,

  panelChrome: `
    flex
    items-center
    gap-1.5
    border-b
    border-[var(--ds-color-border)]
    px-3
    py-2
  `,

  panelTitle: `
    ml-2
    font-mono
    text-[10px]
    text-[var(--ds-color-muted)]
  `,

  dot: `
    h-2
    w-2
    rounded-full
    bg-[var(--ds-color-border-strong)]
  `,

  code: `
    overflow-hidden
    p-3
    font-mono
    text-[10px]
    leading-relaxed
    text-[var(--ds-color-muted)]
  `,

  codeLine: `
    flex
    gap-2
    whitespace-pre
  `,

  lineNumber: `
    w-3
    shrink-0
    text-right
    text-[var(--ds-color-border-strong)]
  `,

  tree: `
    overflow-hidden
    py-2
    font-mono
    text-[11px]
    leading-loose
    text-[var(--ds-color-muted)]
  `,

  treeItem: `
    truncate
  `,

  // Lab marks (Anthropic, OpenAI) are the large tiles; tool marks the small ones.
  // Each tile's position comes from AiDecorations' LOGO_TILES.
  logoTileLarge: `
    flex
    h-28
    w-28
    items-center
    justify-center
    text-[var(--ds-color-fg)]
  `,

  logoTile: `
    flex
    h-[72px]
    w-[72px]
    items-center
    justify-center
    rounded-lg
    text-[var(--ds-color-fg)]/80
  `,

  burndownPanel: `
    bottom-44
    -left-4
    w-60
  `,

  velocityPanel: `
    top-[42%]
    -right-6
    w-56
  `,

  chart: `
    block
    w-full
    p-3
  `,

  chartAxis: `
    stroke-[var(--ds-color-border-strong)]
    stroke-1
  `,

  chartIdeal: `
    stroke-[var(--ds-color-muted)]
    stroke-1
    [stroke-dasharray:4_4]
  `,

  chartLine: `
    fill-none
    stroke-[#38bdf8]
    stroke-2
    [stroke-linejoin:round]
  `,

  chartDot: `
    fill-[#38bdf8]
  `,

  chartBar: `
    fill-[var(--ds-color-border-strong)]
  `,

  chartBarCurrent: `
    fill-[#38bdf8]
  `,

  robot: `
    top-10
    right-24
    w-24
  `,

  robotSvg: `
    block
    w-full
    drop-shadow-[0_0_18px_rgba(56,189,248,0.25)]
    animate-[float-bob_4s_ease-in-out_infinite]
    motion-reduce:animate-none
  `,

  // Slide 3 (ideas into digital products): every highlight uses the DS's
  // neon pink tertiary accent.
  sitePanel: `
    top-16
    left-4
    w-64
  `,

  siteBody: `
    flex
    flex-col
    gap-2
    p-4
  `,

  siteHeadline: `
    block
    h-3
    w-3/4
    rounded-sm
    bg-[var(--ds-color-tertiary)]
  `,

  siteLine: `
    block
    h-1.5
    w-full
    rounded-sm
    bg-[var(--ds-color-border-strong)]
  `,

  siteLineShort: `
    block
    h-1.5
    w-2/3
    rounded-sm
    bg-[var(--ds-color-border-strong)]
  `,

  siteButton: `
    mt-2
    block
    h-4
    w-16
    rounded-full
    border
    border-[var(--ds-color-tertiary)]
    bg-[var(--ds-color-tertiary-soft)]
  `,

  bulbTile: `
    top-10
    right-24
    flex
    h-24
    w-24
    items-center
    justify-center
    text-[var(--ds-color-tertiary)]
    drop-shadow-[0_0_18px_rgba(255,62,165,0.3)]
  `,

  storePanel: `
    bottom-24
    left-10
    w-44
  `,

  storeBody: `
    flex
    flex-col
    gap-2
    p-3
  `,

  storeImage: `
    block
    h-16
    rounded-md
    bg-[linear-gradient(135deg,var(--ds-color-tertiary-soft),var(--ds-color-bg-raised))]
  `,

  storeRow: `
    flex
    items-center
    justify-between
  `,

  storePrice: `
    font-mono
    text-[10px]
    text-[var(--ds-color-fg)]
  `,

  storeCart: `
    flex
    h-5
    w-5
    items-center
    justify-center
    rounded-md
    bg-[var(--ds-color-tertiary)]
    text-[var(--ds-color-accent-ink)]
  `,

  stackPanel: `
    top-[40%]
    -right-6
    w-52
  `,

  stackList: `
    flex
    flex-col
    gap-1.5
    p-3
    font-mono
    text-[10px]
    text-[var(--ds-color-muted)]
  `,

  stackItem: `
    flex
    items-center
    gap-2
    rounded-md
    border
    border-[var(--ds-color-border)]
    px-2
    py-1
    [&>svg]:text-[var(--ds-color-tertiary)]
  `,

  galleryPanel: `
    bottom-10
    right-20
    w-48
  `,

  galleryGrid: `
    grid
    grid-cols-3
    gap-1.5
    p-3
  `,

  galleryFrame: `
    block
    aspect-square
    rounded-sm
    bg-[var(--ds-color-bg-raised)]
    ring-1
    ring-[var(--ds-color-border-strong)]
  `,

  galleryFrameFeatured: `
    block
    aspect-square
    rounded-sm
    bg-[var(--ds-color-tertiary-soft)]
    ring-1
    ring-[var(--ds-color-tertiary)]
  `,
};

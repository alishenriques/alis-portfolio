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
    h-24
    w-24
    items-center
    justify-center
    text-[var(--ds-color-fg)]
  `,

  logoTile: `
    flex
    h-16
    w-16
    items-center
    justify-center
    rounded-lg
    text-[var(--ds-color-fg)]/80
  `,

  networkPanel: `
    bottom-36
    left-4
    w-64
  `,

  chart: `
    block
    w-full
    p-3
  `,

  networkEdge: `
    stroke-[var(--ds-color-border-strong)]
    stroke-1
  `,

  // A short dash that hops across its edge in the first 12% of the cycle
  // (one hop of NeuralNetwork's cycle), then waits off the line for the rest.
  networkSignal: `
    stroke-[#38bdf8]
    stroke-2
    [stroke-linecap:round]
    [stroke-dasharray:10_110]
    [stroke-dashoffset:10]
    [animation-name:neural-signal]
    [animation-iteration-count:infinite]
    [animation-timing-function:linear]
    [animation-fill-mode:backwards]
    motion-reduce:hidden
  `,

  networkNode: `
    fill-[var(--ds-color-bg-raised)]
    stroke-[var(--ds-color-muted)]
    stroke-1
  `,

  networkNodeOutput: `
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
};

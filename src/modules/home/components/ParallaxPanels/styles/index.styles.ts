export const styles = {
  root: `
    pointer-events-none
    absolute
    inset-0
    hidden
    overflow-hidden
    lg:block
  `,

  panelBase: `
    absolute
    w-72
    rounded-xl
    border
    border-[var(--ds-color-border-strong)]
    bg-[var(--ds-color-bg)]/90
    shadow-2xl
    backdrop-blur-sm
    transition-transform
    duration-200
    ease-out
    will-change-transform
  `,

  codePanel: `
    top-16
    -left-6
    -rotate-4
  `,

  treePanel: `
    top-10
    -right-6
    w-64
    rotate-4
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
};

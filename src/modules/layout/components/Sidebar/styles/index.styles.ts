export const styles = {
  trigger: `
    inline-flex
    items-center
    justify-center
    rounded-full
    border
    border-[var(--ds-color-border-strong)]
    p-2
    text-[var(--ds-color-fg)]
    transition-colors
    duration-150
    hover:border-[var(--ds-color-accent)]
    hover:text-[var(--ds-color-accent)]
  `,

  backdrop: `
    fixed
    inset-0
    z-40
    bg-[var(--ds-color-bg)]/70
    backdrop-blur-sm
    transition-opacity
    duration-300
  `,

  backdropHidden: `
    pointer-events-none
    opacity-0
  `,

  drawer: `
    fixed
    inset-y-0
    left-0
    z-50
    flex
    w-[min(320px,85vw)]
    flex-col
    gap-8
    border-r
    border-[var(--ds-color-border-strong)]
    bg-[var(--ds-color-bg-raised)]
    p-6
    pt-[calc(1.5rem+env(safe-area-inset-top,0px))]
    transition-transform
    duration-300
    ease-[cubic-bezier(0.22,1,0.36,1)]
  `,

  drawerClosed: `
    -translate-x-full
  `,

  closeButton: `
    inline-flex
    w-fit
    items-center
    justify-center
    self-end
    rounded-full
    border
    border-[var(--ds-color-border-strong)]
    p-2
    text-[var(--ds-color-muted)]
    hover:text-[var(--ds-color-fg)]
  `,

  nav: `
    flex
    flex-1
    flex-col
    gap-1
    font-mono
    text-sm
  `,

  link: `
    rounded-lg
    px-3
    py-2.5
    text-[var(--ds-color-muted)]
    transition-colors
    duration-150
    hover:bg-[var(--ds-color-accent-soft)]
    hover:text-[var(--ds-color-fg)]
  `,

  linkActive: `
    bg-[var(--ds-color-accent-soft)]
    text-[var(--ds-color-accent)]
  `,

  contactButton: `
    inline-flex
    items-center
    justify-center
    gap-2
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

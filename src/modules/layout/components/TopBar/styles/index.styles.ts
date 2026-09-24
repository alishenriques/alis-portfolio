export const styles = {
  root: `
    sticky
    top-0
    z-30
    grid
    grid-cols-[1fr_auto_1fr]
    items-center
    gap-4
    border-b
    border-[var(--ds-color-border)]
    bg-[var(--ds-color-bg)]/85
    px-4
    py-3
    pt-[calc(0.75rem+env(safe-area-inset-top,0px))]
    backdrop-blur-md
    sm:px-6
  `,

  left: `
    flex
    items-center
    justify-start
  `,

  center: `
    flex
    items-center
    justify-center
  `,

  right: `
    flex
    items-center
    justify-end
    gap-3
  `,

  menuTrigger: `
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
    lg:hidden
  `,

  desktopLogo: `
    hidden
    shrink-0
    lg:inline-flex
  `,

  mobileLogo: `
    inline-flex
    shrink-0
    lg:hidden
  `,
};

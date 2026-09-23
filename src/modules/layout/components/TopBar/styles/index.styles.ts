export const styles = {
  root: `
    sticky
    top-0
    z-30
    flex
    items-center
    justify-between
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

  side: `
    flex
    w-24
    items-center
    first:justify-start
    last:justify-end
  `,

  logo: `
    shrink-0
  `,
};

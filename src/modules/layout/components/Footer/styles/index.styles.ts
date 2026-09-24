export const styles = {
  root: `
    flex
    flex-col
    items-center
    justify-between
    gap-4
    border-t
    border-[var(--ds-color-border)]
    px-4
    py-8
    sm:flex-row
    sm:px-6
  `,

  copy: `
    font-mono
    text-xs
    tracking-wide
    text-[var(--ds-color-muted)]
  `,

  list: `
    flex
    items-center
    gap-3
  `,

  link: `
    inline-flex
    rounded-full
    border
    border-[var(--ds-color-border-strong)]
    p-2.5
    text-[var(--ds-color-accent)]
    transition-[transform,border-color,background-color]
    duration-200
    hover:-translate-y-0.5
    hover:border-[var(--ds-color-accent)]
    hover:bg-[var(--ds-color-accent)]/10
    motion-reduce:transition-none
    motion-reduce:hover:translate-y-0
  `,

  icon: `
    block
  `,
};

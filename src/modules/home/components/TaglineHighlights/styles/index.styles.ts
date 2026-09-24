export const styles = {
  list: `
    relative
    z-10
    flex
    max-w-3xl
    flex-wrap
    justify-center
    gap-3
    px-4
  `,

  item: `
    group
    inline-flex
    items-center
    gap-2.5
    rounded-full
    border
    border-[var(--ds-color-border-strong)]
    bg-[var(--ds-color-bg)]/70
    px-4
    py-2
    font-mono
    text-[13px]
    font-medium
    tracking-wide
    text-[var(--ds-color-fg)]
    backdrop-blur-sm
    transition-[transform,border-color,box-shadow]
    duration-200
    hover:-translate-y-0.5
    hover:border-[var(--ds-color-accent)]
    hover:shadow-[0_0_0_3px_rgba(200,255,0,0.08)]
    motion-reduce:transition-none
    motion-reduce:hover:translate-y-0
  `,

  icon: `
    shrink-0
    text-[var(--ds-color-fg)]
    transition-transform
    duration-300
    group-hover:-rotate-6
    group-hover:scale-125
    motion-reduce:transition-none
    motion-reduce:group-hover:rotate-0
    motion-reduce:group-hover:scale-100
  `,
};

export const styles = {
  root: `
    inline-flex
    items-center
    gap-1
    rounded-full
    border
    border-[var(--ds-color-border-strong)]
    p-1
    font-mono
    text-xs
  `,

  option: `
    rounded-full
    px-2.5
    py-1
    text-[var(--ds-color-muted)]
    transition-colors
    duration-150
    hover:text-[var(--ds-color-fg)]
  `,

  optionActive: `
    bg-[var(--ds-color-accent)]
    text-[var(--ds-color-accent-ink)]
    font-semibold
    hover:text-[var(--ds-color-accent-ink)]
  `,
};

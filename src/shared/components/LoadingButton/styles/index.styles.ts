export const styles = {
  // Overlaid on top of the consumer's own className while isLoading, so these
  // win on any conflicting utility (bg, border, text colour, opacity) via
  // tailwind-merge — the idle look (padding, radius, icon) stays untouched.
  loading: `
    border
    border-[var(--ds-color-accent)]
    bg-[var(--ds-color-bg)]
    text-[var(--ds-color-accent)]
    disabled:opacity-100
  `,

  loadingLabel: `
    flex
    items-center
    justify-center
    gap-1
    font-mono
    lowercase
  `,

  cursor: `
    inline-block
    h-3.5
    w-[7px]
    bg-[var(--ds-color-accent)]
    animate-[blink_1s_step-end_infinite]
    motion-reduce:animate-none
  `,
};

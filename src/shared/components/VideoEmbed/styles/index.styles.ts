export const styles = {
  frame: `
    relative
    aspect-video
    w-full
    overflow-hidden
    rounded-xl
    border
    border-[var(--ds-color-border)]
    bg-[var(--ds-color-bg-raised)]
  `,

  media: `
    absolute
    inset-0
    h-full
    w-full
  `,

  // Dashed, not solid: reads as provisional, distinct from the site's other
  // (solid-bordered) real content — matches LoadingOverlay's dashed ring for
  // the same "in progress" association.
  placeholder: `
    absolute
    inset-0
    flex
    flex-col
    items-center
    justify-center
    gap-3
    border
    border-dashed
    border-[var(--ds-color-border-strong)]
    ds-dot-grid
  `,

  playIcon: `
    inline-flex
    h-14
    w-14
    items-center
    justify-center
    rounded-full
    border
    border-[var(--ds-color-accent)]
    text-[var(--ds-color-accent)]
  `,

  placeholderText: `
    font-mono
    text-xs
    tracking-wide
    text-[var(--ds-color-muted)]
  `,
};

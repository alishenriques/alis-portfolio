export const styles = {
  root: `
    hidden
    items-center
    gap-2
    rounded-lg
    border
    border-[var(--ds-color-border)]
    bg-[var(--ds-color-bg-raised)]/60
    py-1
    pr-2
    pl-3
    font-mono
    text-[13px]
    lg:flex
  `,

  prompt: `
    select-none
    text-[var(--ds-color-accent)]
  `,

  list: `
    flex
    items-center
    gap-1
  `,

  link: `
    group
    relative
    flex
    items-center
    rounded-md
    py-1.5
    pr-3
    pl-4
    text-[var(--ds-color-muted)]
    lowercase
    transition-colors
    duration-150
    hover:text-[var(--ds-color-fg)]
    focus-visible:text-[var(--ds-color-fg)]
    focus-visible:outline-none
    focus-visible:ring-1
    focus-visible:ring-[var(--ds-color-accent)]
  `,

  linkActive: `
    text-[var(--ds-color-accent)]
    hover:text-[var(--ds-color-accent)]
  `,

  // The prompt glyph slides in from the left on hover / keyboard focus.
  caret: `
    absolute
    left-0.5
    -translate-x-2
    text-[var(--ds-color-accent)]
    opacity-0
    transition-[opacity,transform]
    duration-200
    ease-out
    group-hover:translate-x-0
    group-hover:opacity-100
    group-focus-visible:translate-x-0
    group-focus-visible:opacity-100
    motion-reduce:transition-none
  `,

  slash: `
    opacity-50
    transition-transform
    duration-200
    ease-out
    group-hover:translate-x-1
    group-focus-visible:translate-x-1
    motion-reduce:transition-none
  `,

  label: `
    transition-transform
    duration-200
    ease-out
    group-hover:translate-x-1
    group-focus-visible:translate-x-1
    motion-reduce:transition-none
  `,

  // Block cursor: appears blinking on hover/focus, and stays on for the current page.
  cursor: `
    ml-1.5
    hidden
    h-3.5
    w-[7px]
    bg-[var(--ds-color-accent)]
    group-hover:inline-block
    group-hover:animate-[blink_1s_step-end_infinite]
    group-focus-visible:inline-block
    group-focus-visible:animate-[blink_1s_step-end_infinite]
    group-aria-[current=page]:inline-block
    group-aria-[current=page]:animate-[blink_1s_step-end_infinite]
    motion-reduce:animate-none
    motion-reduce:group-hover:animate-none
    motion-reduce:group-aria-[current=page]:animate-none
  `,
};

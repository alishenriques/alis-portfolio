export const styles = {
  backdrop: `
    fixed
    inset-0
    z-[60]
    flex
    items-start
    justify-center
    bg-[var(--ds-color-bg)]/70
    px-4
    py-[14vh]
    backdrop-blur-sm
  `,

  dialog: `
    w-full
    max-w-md
    rounded-xl
    border
    border-[var(--ds-color-border-strong)]
    bg-[var(--ds-color-bg-raised)]
    p-6
    shadow-2xl
  `,

  header: `
    mb-5
    flex
    items-center
    justify-between
    gap-4
  `,

  title: `
    text-lg
    font-semibold
    text-[var(--ds-color-fg)]
  `,

  closeButton: `
    grid
    h-8
    w-8
    place-items-center
    rounded-full
    text-xl
    leading-none
    text-[var(--ds-color-muted)]
    hover:bg-[var(--ds-color-accent-soft)]
    hover:text-[var(--ds-color-accent)]
  `,

  form: `
    flex
    flex-col
    gap-3
  `,

  input: `
    rounded-lg
    border
    border-[var(--ds-color-border)]
    bg-[var(--ds-color-bg)]
    px-3
    py-2.5
    text-sm
    text-[var(--ds-color-fg)]
    outline-none
    placeholder:text-[var(--ds-color-muted)]
    focus:border-[var(--ds-color-accent)]
  `,

  textarea: `
    resize-none
    rounded-lg
    border
    border-[var(--ds-color-border)]
    bg-[var(--ds-color-bg)]
    px-3
    py-2.5
    text-sm
    text-[var(--ds-color-fg)]
    outline-none
    placeholder:text-[var(--ds-color-muted)]
    focus:border-[var(--ds-color-accent)]
  `,

  honeypot: `
    absolute
    -left-full
    h-0
    w-0
    opacity-0
  `,

  submit: `
    mt-1
    inline-flex
    items-center
    justify-center
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
    disabled:opacity-60
  `,

  error: `
    text-sm
    text-red-400
  `,

  success: `
    text-sm
    leading-relaxed
    text-[var(--ds-color-fg)]
  `,
};

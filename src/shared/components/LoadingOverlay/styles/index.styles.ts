export const styles = {
  root: `
    fixed
    inset-0
    z-[70]
    flex
    flex-col
    items-center
    justify-center
    gap-4
    bg-[var(--ds-color-bg)]/70
    backdrop-blur-md
    animate-[fade-in_200ms_ease-out_forwards]
    motion-reduce:animate-none
  `,

  stage: `
    relative
    flex
    h-24
    w-24
    items-center
    justify-center
  `,

  ring: `
    absolute
    inset-0
    animate-spin
    rounded-full
    border-2
    border-dashed
    border-[var(--ds-color-accent)]/60
    [animation-duration:1.6s]
    motion-reduce:animate-none
  `,

  logo: `
    relative
    h-9
    w-auto
    animate-[breathe_1.6s_ease-in-out_infinite]
    motion-reduce:animate-none
  `,

  caption: `
    flex
    items-center
    gap-1
    font-mono
    text-xs
    tracking-wide
    text-[var(--ds-color-muted)]
  `,

  cursor: `
    inline-block
    h-3
    w-[6px]
    bg-[var(--ds-color-accent)]
    animate-[blink_1s_step-end_infinite]
    motion-reduce:animate-none
  `,
};

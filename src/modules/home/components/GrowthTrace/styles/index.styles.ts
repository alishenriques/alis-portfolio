export const styles = {
  root: `
    block
    h-10
    w-[min(360px,60%)]
    overflow-visible
  `,

  line: `
    fill-none
    stroke-[var(--ds-color-accent)]
    stroke-2
    [stroke-dasharray:1]
    [stroke-dashoffset:1]
    [stroke-linecap:round]
    animate-[draw_1.4s_ease-out_0.2s_forwards]
    motion-reduce:animate-none
    motion-reduce:[stroke-dashoffset:0]
  `,

  marker: `
    origin-center
    fill-[var(--ds-color-accent)]
    opacity-0
    [transform-box:fill-box]
    animate-[pop_0.4s_ease-out_1.5s_forwards]
    motion-reduce:animate-none
    motion-reduce:opacity-100
  `,
};

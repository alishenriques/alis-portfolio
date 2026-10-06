/**
 * The robot, one character per pixel: `.` is empty, every other letter is a
 * color key in `PIXEL_FILL`. Edit the drawing here, not the rendered rects.
 */
export const ROBOT_PIXELS = [
  "......aa......",
  "......bb......",
  "..bbbbbbbbbb..",
  ".bhhhhhhhhhhb.",
  ".bheehhhheehb.",
  ".bheehhhheehb.",
  ".bhhhhhhhhhhb.",
  ".bhhhmmmmhhhb.",
  "..bbbbbbbbbb..",
  ".....bbbb.....",
  "..bbbbbbbbbb..",
  "bbbhhcchhhhbbb",
  "b.bhhhhhhhhb.b",
  "..bbbbbbbbbb..",
  "...bb....bb...",
];

const PIXEL_FILL: Record<string, string> = {
  a: "fill-[var(--ds-color-accent)]",
  b: "fill-[var(--ds-color-muted)]",
  h: "fill-[var(--ds-color-bg-raised)]",
  e: "fill-[#38bdf8]",
  m: "fill-[#38bdf8]",
  c: "fill-[var(--ds-color-accent)]",
};

export type PixelRun = { x: number; y: number; width: number; key: string };

/**
 * Collapses each row's consecutive same-key pixels into one run, so the SVG
 * draws a rect per run instead of one per pixel.
 */
export function toPixelRuns(rows: readonly string[]): PixelRun[] {
  const runs: PixelRun[] = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const key = row[x];
      let width = 1;
      while (row[x + width] === key) width += 1;
      if (key !== ".") runs.push({ x, y, width, key });
      x += width;
    }
  });
  return runs;
}

const ROBOT_RUNS = toPixelRuns(ROBOT_PIXELS);
const ROBOT_WIDTH = ROBOT_PIXELS[0].length;

/** An 8-bit style robot, drawn on a pixel grid with crisp (non-antialiased) edges. */
export function PixelRobot({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${ROBOT_WIDTH} ${ROBOT_PIXELS.length}`}
      shapeRendering="crispEdges"
      className={className}
    >
      {ROBOT_RUNS.map((run) => (
        <rect
          key={`${run.x}-${run.y}`}
          x={run.x}
          y={run.y}
          width={run.width}
          height={1}
          className={PIXEL_FILL[run.key]}
        />
      ))}
    </svg>
  );
}

import { toPixelRuns } from "@/lib/pixelArt";

/**
 * The robot holding its "0OP5!" sign over its head, one character per pixel:
 * `.` is empty, every other letter is a color key in `PIXEL_FILL`. Edit the
 * drawing here, not the rendered rects.
 */
export const OOPS_ROBOT_PIXELS = [
  ".kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk.",
  ".kfffffffffffffffffffffffffffffk.",
  ".kffftttffftttffttttfftttttftffk.",
  ".kfftffftftffftftffftftffffftffk.",
  ".kfftffttftffftftffftfttttfftffk.",
  ".kfftftftftffftfttttfffffftftffk.",
  ".kffttfftftffftftffffffffftftffk.",
  ".kfftffftftffftftffffftffftffffk.",
  ".kffftttffftttfftfffffftttfftffk.",
  ".kffggggfffffffffffffffffggggffk.",
  ".kkkggggkkkkkkkkkkkkkkkkkggggkkk.",
  "....gggg........a........gggg....",
  ".....bb.........b.........bb.....",
  ".....bb...bbbbbbbbbbbbb...bb.....",
  ".....bb..bhhhhhhhhhhhhhb..bb.....",
  ".....bb..bhhhhhhhhhhhhhb..bb.....",
  ".....bb..bhheehhhhheehhb..bb.....",
  ".....bb..bhheehhhhheehhb..bb.....",
  ".....bb..bhhhhhhhhhhhhhb..bb.....",
  ".....bb..bhhhhhmmmhhhhhb..bb.....",
  ".....bb..bhhhhhmhmhhhhhb..bb.....",
  ".....bb..bhhhhhmmmhhhhhb..bb.....",
  ".....bb...bbbbbbbbbbbbb...bb.....",
  ".....bbbbbbbbbbbbbbbbbbbbbbb.....",
  ".....bbbbbbbbbbbbbbbbbbbbbbb.....",
  ".....bbbbbbbhhhhhhhhhbbbbbbb.....",
  ".....bbbbbbbhhhccchhhbbbbbbb.....",
  ".....bbbbbbbhhhhhhhhhbbbbbbb.....",
  ".....bbbbbbbbbbbbbbbbbbbbbbb.....",
  "..........bbb.......bbb..........",
  ".........bbbb.......bbbb.........",
];

// The DS's blue secondary accent, on its dark surfaces.
const PIXEL_FILL: Record<string, string> = {
  k: "fill-[var(--ds-color-secondary)]",
  f: "fill-[var(--ds-color-bg-raised)]",
  t: "fill-[var(--ds-color-secondary)]",
  g: "fill-[var(--ds-color-fg)]",
  a: "fill-[var(--ds-color-secondary)]",
  b: "fill-[var(--ds-color-muted)]",
  h: "fill-[var(--ds-color-bg-raised)]",
  e: "fill-[var(--ds-color-secondary)]",
  m: "fill-[var(--ds-color-secondary)]",
  c: "fill-[var(--ds-color-secondary)]",
};

const OOPS_ROBOT_RUNS = toPixelRuns(OOPS_ROBOT_PIXELS);
const OOPS_ROBOT_WIDTH = OOPS_ROBOT_PIXELS[0].length;

export type OopsRobotProps = {
  /** Accessible description of the illustration (it carries the "0OP5!" text). */
  label: string;
  className?: string;
};

/** An 8-bit style robot holding up a sign that reads "0OP5!", drawn with crisp (non-antialiased) edges. */
export function OopsRobot({ label, className }: OopsRobotProps) {
  return (
    <svg
      viewBox={`0 0 ${OOPS_ROBOT_WIDTH} ${OOPS_ROBOT_PIXELS.length}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label={label}
      className={className}
    >
      <title>{label}</title>
      {OOPS_ROBOT_RUNS.map((run) => (
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

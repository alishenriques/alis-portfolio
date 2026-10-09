export type PixelRun = { x: number; y: number; width: number; key: string };

/**
 * Collapses each row's consecutive same-key pixels into one run, so an SVG
 * draws a rect per run instead of one per pixel. `.` is an empty pixel.
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

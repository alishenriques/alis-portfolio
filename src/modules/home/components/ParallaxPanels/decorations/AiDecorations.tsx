import { SiAnthropic } from "@icons-pack/react-simple-icons";

import { cn } from "@/lib/utils";

import { Floating } from "./Floating";
import { OpenaiIcon } from "./OpenaiIcon";
import { PixelRobot } from "./PixelRobot";
import { WindowChrome } from "./WindowChrome";
import { styles } from "../styles/index.styles";

// Remaining work per sprint day, in the burndown chart's own 200×90 viewBox
// (y grows downward, so a falling burndown is a rising y).
const BURNDOWN_POINTS: ReadonlyArray<readonly [number, number]> = [
  [8, 10],
  [34, 16],
  [60, 24],
  [86, 28],
  [112, 44],
  [138, 54],
  [164, 66],
  [192, 80],
];

// Story points delivered per sprint, out of the velocity chart's 80-unit height.
const VELOCITY = [34, 42, 40, 52, 60, 70];

/**
 * Hero slide 2's decorations (AI-assisted development): the Anthropic and
 * OpenAI marks, an 8-bit robot, and two agile charts (a sprint burndown and a
 * rising velocity). Purely decorative; the parent is `aria-hidden`.
 */
export function AiDecorations({ active }: { active: boolean }) {
  return (
    <div data-decor="ai" data-active={active} className={active ? styles.group : styles.groupHidden}>
      <Floating rotate={-6} depth={-0.7} className={cn(styles.panelBase, styles.logoTile, styles.anthropicTile)}>
        <SiAnthropic size={40} />
      </Floating>

      <Floating rotate={-3} depth={-0.4} className={cn(styles.panelBase, styles.burndownPanel)}>
        <WindowChrome title="sprint burndown" />
        <svg viewBox="0 0 200 90" className={styles.chart}>
          <line x1="8" y1="84" x2="192" y2="84" className={styles.chartAxis} />
          <line x1="8" y1="10" x2="192" y2="80" className={styles.chartIdeal} />
          <polyline points={BURNDOWN_POINTS.map(([x, y]) => `${x},${y}`).join(" ")} className={styles.chartLine} />
          {BURNDOWN_POINTS.map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="2.5" className={styles.chartDot} />
          ))}
        </svg>
      </Floating>

      <Floating rotate={5} depth={0.6} className={styles.robot}>
        <PixelRobot className={styles.robotSvg} />
      </Floating>

      <Floating rotate={3} depth={0.4} className={cn(styles.panelBase, styles.velocityPanel)}>
        <WindowChrome title="velocity" />
        <svg viewBox="0 0 200 90" className={styles.chart}>
          <line x1="8" y1="84" x2="192" y2="84" className={styles.chartAxis} />
          {VELOCITY.map((points, index) => (
            <rect
              key={index}
              x={14 + index * 30}
              y={84 - points}
              width="20"
              height={points}
              rx="2"
              className={index === VELOCITY.length - 1 ? styles.chartBarCurrent : styles.chartBar}
            />
          ))}
        </svg>
      </Floating>

      <Floating rotate={6} depth={0.7} className={cn(styles.panelBase, styles.logoTile, styles.openaiTile)}>
        <OpenaiIcon size={40} />
      </Floating>
    </div>
  );
}

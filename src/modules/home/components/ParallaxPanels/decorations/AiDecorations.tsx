import type { ComponentType } from "react";

import { SiAnthropic, SiClaude, SiCursor, SiGithubcopilot, SiV0 } from "@icons-pack/react-simple-icons";

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

type LogoTile = {
  name: string;
  Icon: ComponentType<{ size?: number }>;
  /** The lab marks (Anthropic, OpenAI) are bigger; the tools around them smaller. */
  large: boolean;
  rotate: number;
  depth: number;
  position: string;
};

const LOGO_TILES: LogoTile[] = [
  { name: "anthropic", Icon: SiAnthropic, large: true, rotate: -6, depth: -0.7, position: "top-14 left-16" },
  { name: "claude", Icon: SiClaude, large: false, rotate: 5, depth: -0.4, position: "top-[38%] left-8" },
  { name: "cursor", Icon: SiCursor, large: false, rotate: -4, depth: -0.9, position: "bottom-10 left-24" },
  { name: "copilot", Icon: SiGithubcopilot, large: false, rotate: -5, depth: 0.4, position: "top-[28%] right-10" },
  { name: "openai", Icon: OpenaiIcon, large: true, rotate: 6, depth: 0.7, position: "bottom-28 right-28" },
  { name: "v0", Icon: SiV0, large: false, rotate: 4, depth: 0.9, position: "bottom-10 right-12" },
];

/**
 * Hero slide 2's decorations (AI-assisted development): the Anthropic and
 * OpenAI marks, the AI coding tools (Claude, Cursor, GitHub Copilot, v0), an
 * 8-bit robot and two agile charts (a sprint burndown and a rising velocity).
 * Purely decorative; the parent is `aria-hidden`.
 */
export function AiDecorations({ active }: { active: boolean }) {
  return (
    <div data-decor="ai" data-active={active} className={active ? styles.group : styles.groupHidden}>
      {LOGO_TILES.map(({ name, Icon, large, rotate, depth, position }) => (
        <Floating
          key={name}
          rotate={rotate}
          depth={depth}
          className={cn(styles.panelBase, large ? styles.logoTileLarge : styles.logoTile, position)}
        >
          <Icon size={large ? 60 : 38} />
        </Floating>
      ))}

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

      <Floating rotate={5} depth={0.6} className={styles.robot}>
        <PixelRobot className={styles.robotSvg} />
      </Floating>
    </div>
  );
}

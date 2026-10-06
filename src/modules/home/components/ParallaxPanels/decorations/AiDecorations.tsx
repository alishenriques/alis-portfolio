import type { ComponentType } from "react";

import { SiAnthropic, SiClaude, SiCursor, SiGithubcopilot, SiV0 } from "@icons-pack/react-simple-icons";

import { cn } from "@/lib/utils";

import { Floating } from "./Floating";
import { NeuralNetwork } from "./NeuralNetwork";
import { OpenaiIcon } from "./OpenaiIcon";
import { PixelRobot } from "./PixelRobot";
import { WindowChrome } from "./WindowChrome";
import { styles } from "../styles/index.styles";

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
  { name: "copilot", Icon: SiGithubcopilot, large: false, rotate: -5, depth: 0.4, position: "top-[34%] right-10" },
  { name: "openai", Icon: OpenaiIcon, large: true, rotate: 6, depth: 0.7, position: "top-[54%] right-24" },
  { name: "v0", Icon: SiV0, large: false, rotate: 4, depth: 0.9, position: "bottom-10 right-12" },
];

/**
 * Hero slide 2's decorations (AI-assisted development): the Anthropic and
 * OpenAI marks, the AI coding tools (Claude, Cursor, GitHub Copilot, v0), an
 * 8-bit robot and a neural network with signals flowing through it. Purely
 * decorative; the parent is `aria-hidden`.
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
          <Icon size={large ? 52 : 32} />
        </Floating>
      ))}

      <Floating rotate={-3} depth={-0.4} className={cn(styles.panelBase, styles.networkPanel)}>
        <WindowChrome title="neural network" />
        <NeuralNetwork />
      </Floating>

      <Floating rotate={5} depth={0.6} className={styles.robot}>
        <PixelRobot className={styles.robotSvg} />
      </Floating>
    </div>
  );
}

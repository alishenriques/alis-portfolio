import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { styles } from "../styles/index.styles";

/** Max pointer-driven offset, in px, for an element of depth 1. */
const MAX_SHIFT_PX = 24;
/** Max extra tilt, in degrees, added on top of an element's resting rotation. */
const MAX_TILT_DEG = 4;

/**
 * The transform for one floating element, given the pointer's position
 * relative to the hero's center (`x`/`y` in -0.5..0.5). `depth` scales and
 * signs the drift: positive moves with the pointer, negative against it, so
 * elements on opposite sides drift apart and read as different planes.
 */
export function parallaxTransform(rotate: number, depth: number, x: number, y: number): string {
  const tilt = (rotate + y * MAX_TILT_DEG).toFixed(2);
  const shiftX = (x * depth * MAX_SHIFT_PX).toFixed(1);
  const shiftY = (y * depth * MAX_SHIFT_PX).toFixed(1);
  return `rotate(${tilt}deg) translate(${shiftX}px, ${shiftY}px)`;
}

type FloatingProps = {
  /** Resting rotation, in degrees. */
  rotate: number;
  /** Parallax strength and direction (see `parallaxTransform`). */
  depth: number;
  /** Position/size utilities for this element. */
  className: string;
  children: ReactNode;
};

/** One absolutely positioned decoration that `ParallaxPanels` moves with the pointer. */
export function Floating({ rotate, depth, className, children }: FloatingProps) {
  return (
    <div
      data-parallax=""
      data-rotate={rotate}
      data-depth={depth}
      className={cn(styles.floating, className)}
      style={{ transform: parallaxTransform(rotate, depth, 0, 0) }}
    >
      {children}
    </div>
  );
}

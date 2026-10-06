"use client";

import { useEffect, useRef } from "react";

import { AiDecorations } from "./decorations/AiDecorations";
import { CodeDecorations } from "./decorations/CodeDecorations";
import { parallaxTransform } from "./decorations/Floating";
import { styles } from "./styles/index.styles";

export type ParallaxVariant = "code" | "ai";

type ParallaxPanelsProps = {
  /** Which set of decorations is shown; the other one fades out. Defaults to `"code"`. */
  variant?: ParallaxVariant;
};

/**
 * Decorative floating elements around the hero that tilt gently toward the
 * pointer — a lightweight, JS-driven parallax (no scroll listener; the hero
 * sits above the fold, so pointer position is what's available to react to).
 * Two sets, one per hero slide: a code editor + file tree (`"code"`), and AI
 * logos, a pixel robot and agile charts (`"ai"`). Both stay mounted and
 * crossfade on `variant` changes. Each element opts in with `Floating`'s
 * `data-parallax` attributes. Static on touch devices and when the visitor
 * prefers reduced motion.
 */
export function ParallaxPanels({ variant = "code" }: ParallaxPanelsProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const elements = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]"));
    let frame: number | null = null;

    function apply(x: number, y: number) {
      for (const element of elements) {
        const rotate = Number(element.dataset.rotate ?? 0);
        const depth = Number(element.dataset.depth ?? 1);
        element.style.setProperty("transform", parallaxTransform(rotate, depth, x, y));
      }
    }

    function onPointerMove(event: PointerEvent) {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        const rect = root!.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        apply(x, y);
      });
    }

    window.addEventListener("pointermove", onPointerMove);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.root} aria-hidden="true">
      <CodeDecorations active={variant === "code"} />
      <AiDecorations active={variant === "ai"} />
    </div>
  );
}

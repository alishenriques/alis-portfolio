"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

import { styles } from "./styles/index.styles";

const CODE_SNIPPET = [
  "import React from 'react'",
  "import { Container, Title } from './ui'",
  "",
  "export default function Home() {",
  "  return (",
  "    <Container>",
  "      <Title>Front-end com foco",
  "        em performance</Title>",
  "    </Container>",
  "  )",
  "}",
];

const FILE_TREE = [
  { label: "src", depth: 0, kind: "dir" as const },
  { label: "components", depth: 1, kind: "dir" as const },
  { label: "pages", depth: 1, kind: "dir" as const },
  { label: "hooks", depth: 1, kind: "dir" as const },
  { label: "utils", depth: 1, kind: "dir" as const },
  { label: "styles", depth: 1, kind: "dir" as const },
  { label: "services", depth: 1, kind: "dir" as const },
  { label: "index.tsx", depth: 0, kind: "file" as const },
  { label: "tsconfig.json", depth: 0, kind: "file" as const },
];

/**
 * Two decorative "floating window" panels (a code snippet and a file tree)
 * that tilt gently toward the pointer — a lightweight, JS-driven parallax
 * (no scroll listener; the hero sits above the fold, so pointer position is
 * what's available to react to). Static on touch devices and when the
 * visitor prefers reduced motion.
 */
export function ParallaxPanels() {
  const rootRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let frame: number | null = null;

    function apply(x: number, y: number) {
      codeRef.current?.style.setProperty(
        "transform",
        `rotate(${(-4 + y * 4).toFixed(2)}deg) translate(${(x * -12).toFixed(1)}px, ${(y * -12).toFixed(1)}px)`,
      );
      treeRef.current?.style.setProperty(
        "transform",
        `rotate(${(4 + y * 4).toFixed(2)}deg) translate(${(x * 12).toFixed(1)}px, ${(y * 12).toFixed(1)}px)`,
      );
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
      <div ref={codeRef} className={cn(styles.panelBase, styles.codePanel)}>
        <div className={styles.panelChrome}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
        <pre className={styles.code}>
          {CODE_SNIPPET.map((line, index) => (
            <div key={index} className={styles.codeLine}>
              <span className={styles.lineNumber}>{index + 1}</span>
              {line}
            </div>
          ))}
        </pre>
      </div>

      <div ref={treeRef} className={cn(styles.panelBase, styles.treePanel)}>
        <div className={styles.panelChrome}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
        <ul className={styles.tree}>
          {FILE_TREE.map((entry) => (
            <li
              key={entry.label}
              className={styles.treeItem}
              style={{ paddingLeft: `${entry.depth * 14 + 8}px` }}
            >
              {entry.kind === "dir" ? "📁" : "📄"} {entry.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

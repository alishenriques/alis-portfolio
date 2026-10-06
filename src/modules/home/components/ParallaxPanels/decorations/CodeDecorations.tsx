import { cn } from "@/lib/utils";

import { Floating } from "./Floating";
import { WindowChrome } from "./WindowChrome";
import { styles } from "../styles/index.styles";

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

/** Hero slide 1's decorations: a code-editor window and a file-tree window. */
export function CodeDecorations({ active }: { active: boolean }) {
  return (
    <div data-decor="code" data-active={active} className={active ? styles.group : styles.groupHidden}>
      <Floating rotate={-4} depth={-0.5} className={cn(styles.panelBase, styles.codePanel)}>
        <WindowChrome />
        <pre className={styles.code}>
          {CODE_SNIPPET.map((line, index) => (
            <div key={index} className={styles.codeLine}>
              <span className={styles.lineNumber}>{index + 1}</span>
              {line}
            </div>
          ))}
        </pre>
      </Floating>

      <Floating rotate={4} depth={0.5} className={cn(styles.panelBase, styles.treePanel)}>
        <WindowChrome />
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
      </Floating>
    </div>
  );
}

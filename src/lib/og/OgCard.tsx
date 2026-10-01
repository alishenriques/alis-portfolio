import { ACCENT_PATH, MARK_PATH, SYMBOL_VIEWBOX } from "@/shared/components/Logo/logoPaths";

// Satori (next/og) renders inline styles only: no CSS variables, classes or
// stylesheets. These literals mirror the design system's --ds-color-* tokens.
const COLORS = {
  bg: "#0b0b0f",
  bgRaised: "#131318",
  fg: "#f4f1ea",
  muted: "#9a958c",
  accent: "#c8ff00",
  border: "rgba(244, 241, 234, 0.16)",
} as const;

export type OgCardProps = {
  /** Big display line, e.g. the page's headline. */
  headline: string;
  /** Short supporting copy under the headline. */
  description: string;
  /** Role line next to the name, e.g. "Desenvolvedor Front-End Sênior". */
  role: string;
  /** Locale-prefixed path shown as a terminal prompt, e.g. "/pt/sobre". */
  path: string;
};

/** The 1200×630 social card: logo + name, a terminal prompt with the page path, headline and description. */
export function OgCard({ headline, description, role, path }: OgCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: COLORS.bg,
        backgroundImage: `radial-gradient(circle at 1px 1px, ${COLORS.border} 1px, transparent 0)`,
        backgroundSize: "28px 28px",
        color: COLORS.fg,
        fontFamily: "Plex Mono",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <svg viewBox={SYMBOL_VIEWBOX} width={112} height={64}>
          <path d={MARK_PATH} fill={COLORS.fg} />
          <path d={ACCENT_PATH} fill={COLORS.accent} />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 30, fontFamily: "Archivo", color: COLORS.fg }}>Alisson Henriques</span>
          <span style={{ fontSize: 22, color: COLORS.muted }}>{role}</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "center", fontSize: 26, color: COLORS.accent }}>
          <span>$ cd ~</span>
          <span style={{ color: COLORS.muted }}>{path}</span>
          <span style={{ width: 14, height: 30, marginLeft: 8, background: COLORS.accent }} />
        </div>
        <div style={{ display: "flex", fontFamily: "Archivo", fontSize: 72, lineHeight: 1.05, color: COLORS.fg }}>
          {headline}
        </div>
        <div style={{ display: "flex", fontSize: 26, lineHeight: 1.45, color: COLORS.muted }}>{description}</div>
      </div>

      <div style={{ display: "flex", height: 6, width: 160, background: COLORS.accent, borderRadius: 3 }} />
    </div>
  );
}

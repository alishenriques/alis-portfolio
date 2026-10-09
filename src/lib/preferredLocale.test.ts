import { describe, expect, it } from "vitest";

import { preferredLocale } from "./preferredLocale";

describe("preferredLocale", () => {
  it("falls back to Portuguese without a header", () => {
    expect(preferredLocale(null)).toBe("pt");
    expect(preferredLocale("")).toBe("pt");
  });

  it("matches on the primary language subtag", () => {
    expect(preferredLocale("en-US,en;q=0.9")).toBe("en");
    expect(preferredLocale("pt-BR,pt;q=0.9,en;q=0.8")).toBe("pt");
  });

  it("ranks by quality, then by order", () => {
    expect(preferredLocale("pt;q=0.5,en;q=0.8")).toBe("en");
    expect(preferredLocale("en,pt")).toBe("en");
  });

  it("skips unsupported and refused languages", () => {
    expect(preferredLocale("fr-FR,fr;q=0.9,en;q=0.7")).toBe("en");
    expect(preferredLocale("en;q=0,de")).toBe("pt");
  });
});

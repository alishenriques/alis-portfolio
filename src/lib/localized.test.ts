import { describe, expect, it } from "vitest";

import { pickLocalized } from "./localized";

describe("pickLocalized", () => {
  it("uses the English text under the en locale", () => {
    expect(pickLocalized("en", "Olá", "Hello")).toBe("Hello");
  });

  it("falls back to Portuguese when there's no English text", () => {
    expect(pickLocalized("en", "Olá", null)).toBe("Olá");
    expect(pickLocalized("en", "Olá", "")).toBe("Olá");
  });

  it("keeps Portuguese under the pt locale", () => {
    expect(pickLocalized("pt", "Olá", "Hello")).toBe("Olá");
  });
});

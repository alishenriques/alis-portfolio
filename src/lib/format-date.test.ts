import { describe, expect, it } from "vitest";

import { formatDateRange, formatMonthYear } from "./format-date";

describe("formatMonthYear", () => {
  it("formats a YYYY-MM string in Portuguese by default", () => {
    expect(formatMonthYear("2022-10")).toBe("out/2022");
    expect(formatMonthYear("2025-01")).toBe("jan/2025");
  });

  it("formats in English when asked", () => {
    expect(formatMonthYear("2022-10", "en")).toBe("Oct/2022");
  });
});

describe("formatDateRange", () => {
  it("formats a closed range", () => {
    expect(formatDateRange("2022-10", "2025-07")).toBe("out/2022 — jul/2025");
  });

  it("reads a null end date as ongoing, using the given label", () => {
    expect(formatDateRange("2022-10", null)).toBe("out/2022 — presente");
    expect(formatDateRange("2022-10", null, "en", "present")).toBe("Oct/2022 — present");
  });
});

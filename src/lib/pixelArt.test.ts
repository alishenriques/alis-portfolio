import { describe, expect, it } from "vitest";

import { toPixelRuns } from "./pixelArt";

describe("toPixelRuns", () => {
  it("merges consecutive same-color pixels per row and skips empty ones", () => {
    expect(toPixelRuns(["aab.", ".bbb"])).toEqual([
      { x: 0, y: 0, width: 2, key: "a" },
      { x: 2, y: 0, width: 1, key: "b" },
      { x: 1, y: 1, width: 3, key: "b" },
    ]);
  });
});

import { describe, expect, it } from "vitest";

import { parallaxTransform } from "../decorations/Floating";

describe("parallaxTransform", () => {
  it("keeps the resting rotation with the pointer at the center", () => {
    expect(parallaxTransform(-4, 1, 0, 0)).toBe("rotate(-4.00deg) translate(0.0px, 0.0px)");
  });

  it("drifts with the pointer for a positive depth and against it for a negative one", () => {
    expect(parallaxTransform(0, 0.5, 0.5, 0.5)).toBe("rotate(2.00deg) translate(6.0px, 6.0px)");
    expect(parallaxTransform(0, -0.5, 0.5, 0.5)).toBe("rotate(2.00deg) translate(-6.0px, -6.0px)");
  });
});

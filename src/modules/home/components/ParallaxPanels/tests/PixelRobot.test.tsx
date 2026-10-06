import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PixelRobot, ROBOT_PIXELS, toPixelRuns } from "../decorations/PixelRobot";

describe("toPixelRuns", () => {
  it("merges consecutive same-color pixels per row and skips empty ones", () => {
    expect(toPixelRuns(["aab.", ".bbb"])).toEqual([
      { x: 0, y: 0, width: 2, key: "a" },
      { x: 2, y: 0, width: 1, key: "b" },
      { x: 1, y: 1, width: 3, key: "b" },
    ]);
  });
});

describe("PixelRobot", () => {
  it("draws on a grid as wide and tall as its pixel map, with crisp edges", () => {
    const { container } = render(<PixelRobot />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("viewBox", `0 0 ${ROBOT_PIXELS[0].length} ${ROBOT_PIXELS.length}`);
    expect(svg).toHaveAttribute("shape-rendering", "crispEdges");
    expect(container.querySelectorAll("rect")).toHaveLength(toPixelRuns(ROBOT_PIXELS).length);
  });

  it("keeps every row of the pixel map the same width", () => {
    const widths = new Set(ROBOT_PIXELS.map((row) => row.length));
    expect(widths.size).toBe(1);
  });
});

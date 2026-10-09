import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { toPixelRuns } from "@/lib/pixelArt";

import { PixelRobot, ROBOT_PIXELS } from "../decorations/PixelRobot";

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

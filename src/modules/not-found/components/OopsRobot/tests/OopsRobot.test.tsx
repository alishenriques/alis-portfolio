import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { toPixelRuns } from "@/lib/pixelArt";

import { OOPS_ROBOT_PIXELS, OopsRobot } from "../OopsRobot";

describe("OopsRobot", () => {
  it("is an image labelled with the given text", () => {
    render(<OopsRobot label="Robô segurando uma placa escrita OOPS!" />);
    expect(screen.getByRole("img", { name: "Robô segurando uma placa escrita OOPS!" })).toBeInTheDocument();
  });

  it("draws on a grid as wide and tall as its pixel map, with crisp edges", () => {
    const { container } = render(<OopsRobot label="robot" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("viewBox", `0 0 ${OOPS_ROBOT_PIXELS[0].length} ${OOPS_ROBOT_PIXELS.length}`);
    expect(svg).toHaveAttribute("shape-rendering", "crispEdges");
    expect(container.querySelectorAll("rect")).toHaveLength(toPixelRuns(OOPS_ROBOT_PIXELS).length);
  });

  it("keeps every row of the pixel map the same width", () => {
    const widths = new Set(OOPS_ROBOT_PIXELS.map((row) => row.length));
    expect(widths.size).toBe(1);
  });
});

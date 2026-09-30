import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { GrowthTrace } from "../GrowthTrace";

describe("GrowthTrace", () => {
  it("is purely decorative and draws a line with an end marker", () => {
    const { container } = render(<GrowthTrace />);
    const svg = container.querySelector("svg");

    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg?.querySelector("path")).toHaveAttribute("pathLength", "1");
    expect(svg?.querySelector("circle")).not.toBeNull();
  });

  it("defaults to the DS accent color, uncustomized", () => {
    const { container } = render(<GrowthTrace />);
    expect(container.querySelector("svg")).not.toHaveAttribute("style");
  });

  it("lets a consumer override the line/marker color", () => {
    const { container } = render(<GrowthTrace color="#38bdf8" />);
    expect(container.querySelector("svg")).toHaveStyle({ "--growth-trace-color": "#38bdf8" });
  });
});

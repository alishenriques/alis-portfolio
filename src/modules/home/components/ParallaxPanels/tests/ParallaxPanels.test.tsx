import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ParallaxPanels } from "../ParallaxPanels";

describe("ParallaxPanels", () => {
  it("renders as a decorative, non-interactive block", () => {
    const { container } = render(<ParallaxPanels />);
    const root = container.firstElementChild;
    expect(root).toHaveAttribute("aria-hidden", "true");
  });

  it("shows the code decorations by default and hides the AI ones", () => {
    const { container } = render(<ParallaxPanels />);
    expect(container.querySelector('[data-decor="code"]')).toHaveAttribute("data-active", "true");
    expect(container.querySelector('[data-decor="ai"]')).toHaveAttribute("data-active", "false");
  });

  it("swaps to the AI decorations (logos, robot, agile charts) for the ai variant", () => {
    const { container } = render(<ParallaxPanels variant="ai" />);
    const ai = container.querySelector('[data-decor="ai"]');
    expect(ai).toHaveAttribute("data-active", "true");
    expect(container.querySelector('[data-decor="code"]')).toHaveAttribute("data-active", "false");
    // Anthropic + OpenAI marks, the pixel robot and the two charts.
    expect(ai?.querySelectorAll("[data-parallax]")).toHaveLength(5);
    expect(ai?.textContent).toContain("sprint burndown");
    expect(ai?.textContent).toContain("velocity");
  });

  it("gives every floating element its resting rotation before any pointer movement", () => {
    const { container } = render(<ParallaxPanels />);
    const floating = container.querySelectorAll<HTMLElement>("[data-parallax]");
    expect(floating.length).toBeGreaterThan(0);
    floating.forEach((element) => {
      expect(element.style.transform).toBe(`rotate(${Number(element.dataset.rotate).toFixed(2)}deg) translate(0.0px, 0.0px)`);
    });
  });
});

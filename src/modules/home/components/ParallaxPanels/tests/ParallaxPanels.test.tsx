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

  it("swaps to the AI decorations (logos, robot, neural network) for the ai variant", () => {
    const { container } = render(<ParallaxPanels variant="ai" />);
    const ai = container.querySelector('[data-decor="ai"]');
    expect(ai).toHaveAttribute("data-active", "true");
    expect(container.querySelector('[data-decor="code"]')).toHaveAttribute("data-active", "false");
    // Six logo tiles (Anthropic, OpenAI, Claude, Cursor, Copilot, v0), the pixel robot and the network.
    expect(ai?.querySelectorAll("[data-parallax]")).toHaveLength(8);
    expect(ai?.textContent).toContain("neural network");
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

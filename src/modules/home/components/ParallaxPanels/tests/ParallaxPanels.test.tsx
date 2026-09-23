import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ParallaxPanels } from "../ParallaxPanels";

describe("ParallaxPanels", () => {
  it("renders as a decorative, non-interactive block", () => {
    const { container } = render(<ParallaxPanels />);
    const root = container.firstElementChild;
    expect(root).toHaveAttribute("aria-hidden", "true");
  });
});

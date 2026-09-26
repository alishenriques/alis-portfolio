import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Logo } from "../Logo";

describe("Logo", () => {
  it("is exposed as a single named image", () => {
    render(<Logo />);
    expect(screen.getByRole("img", { name: "Alisson Henriques" })).toBeInTheDocument();
  });

  it("draws the monogram, the accent and both names in the horizontal lockup", () => {
    const { container } = render(<Logo />);
    expect(container.querySelectorAll("path")).toHaveLength(4);
    expect(container.querySelector("svg")).toHaveAttribute("viewBox", expect.stringContaining("4950"));
  });

  it("draws only the monogram and accent when withWordmark is false", () => {
    const { container } = render(<Logo withWordmark={false} />);
    expect(container.querySelectorAll("path")).toHaveLength(2);
    expect(container.querySelector("svg")).toHaveAttribute("viewBox", "0 0 700 400");
  });
});

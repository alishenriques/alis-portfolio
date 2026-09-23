import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Logo } from "../Logo";

describe("Logo", () => {
  it("shows the wordmark by default", () => {
    render(<Logo />);
    expect(screen.getByText("Henriques")).toBeInTheDocument();
  });

  it("omits the wordmark when withWordmark is false", () => {
    render(<Logo withWordmark={false} />);
    expect(screen.queryByText("Henriques")).not.toBeInTheDocument();
  });
});

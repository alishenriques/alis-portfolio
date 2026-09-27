import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Home } from "../Home";

// Home's own job is composing the page — its sections (Hero, FeatureChips,
// Skills) each have their own dedicated tests, including real next-intl
// rendering. Mocked here to a marker so this test can run without standing
// up next-intl's request-scoped server context.
vi.mock("../components/Hero", () => ({ Hero: () => <div data-testid="hero" /> }));
vi.mock("../components/FeatureChips", () => ({ FeatureChips: () => <div data-testid="feature-chips" /> }));
vi.mock("../../skills", () => ({ Skills: () => <div data-testid="skills" /> }));

describe("Home", () => {
  it("renders the hero, feature chips and skills", () => {
    render(<Home />);

    expect(screen.getByTestId("hero")).toBeInTheDocument();
    expect(screen.getByTestId("feature-chips")).toBeInTheDocument();
    expect(screen.getByTestId("skills")).toBeInTheDocument();
  });
});

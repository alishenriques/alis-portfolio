import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { getProjects } from "@/lib/portfolio";

import { Home } from "../Home";

// Home's own job is composing the page and fetching data — its sections
// (Hero, FeatureChips, Skills) each have their own dedicated tests, including
// real next-intl rendering. Mocked here to a marker so this test can run
// without standing up next-intl's request-scoped server context.
vi.mock("../components/Hero", () => ({ Hero: () => <div data-testid="hero" /> }));
vi.mock("../components/FeatureChips", () => ({ FeatureChips: () => <div data-testid="feature-chips" /> }));
vi.mock("../../skills", () => ({ Skills: () => <div data-testid="skills" /> }));

vi.mock("@/lib/portfolio", () => ({
  getProjects: vi.fn(),
}));

vi.mock("next-intl/server", () => ({
  getTranslations: async (namespace: string) => (key: string) => `${namespace}.${key}`,
}));

const project = {
  id: "1",
  slug: "demo",
  title: "Demo project",
  summary: "Summary",
  body: "",
  coverUrl: null,
  tags: [],
  featured: true,
  publishedAt: "2020-01-01T00:00:00.000Z",
};

describe("Home", () => {
  it("renders the hero, feature chips, skills and fetched projects", async () => {
    vi.mocked(getProjects).mockResolvedValue([project]);

    render(await Home());

    expect(screen.getByTestId("hero")).toBeInTheDocument();
    expect(screen.getByTestId("feature-chips")).toBeInTheDocument();
    expect(screen.getByTestId("skills")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Demo project" })).toBeInTheDocument();
  });

  it("shows the empty state when there are no projects", async () => {
    vi.mocked(getProjects).mockResolvedValue([]);

    render(await Home());

    expect(screen.getByText("PROJECTS.EMPTY")).toBeInTheDocument();
  });
});

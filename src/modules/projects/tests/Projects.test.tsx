import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { getProjects } from "@/lib/portfolio";

import { Projects } from "../Projects";

vi.mock("@/lib/portfolio", () => ({
  getProjects: vi.fn(),
}));

vi.mock("../components/ProjectsTimeline", () => ({
  ProjectsTimeline: ({
    projects,
    initialSelectedSlug,
  }: {
    projects: { id: string }[];
    initialSelectedSlug?: string | null;
  }) => (
    <div data-testid="projects-timeline" data-initial-slug={initialSelectedSlug ?? ""}>
      {projects.length}
    </div>
  ),
}));

vi.mock("next-intl/server", () => ({
  getTranslations: async (namespace: string) => (key: string, values?: Record<string, unknown>) =>
    values ? `${namespace}.${key}(${JSON.stringify(values)})` : `${namespace}.${key}`,
}));

const project = {
  id: "1",
  slug: "demo",
  title: "Demo",
  summary: "Summary",
  body: "",
  coverUrl: null,
  iconUrl: null,
  projectType: null,
  siteUrl: null,
  isActive: true,
  tags: [],
  featured: true,
  publishedAt: "2020-01-01T00:00:00.000Z",
};

describe("Projects", () => {
  it("renders the timeline with the fetched projects", async () => {
    vi.mocked(getProjects).mockResolvedValue([project]);

    render(await Projects());

    expect(screen.getByTestId("projects-timeline")).toHaveTextContent("1");
  });

  it("shows the empty state when there are no projects", async () => {
    vi.mocked(getProjects).mockResolvedValue([]);

    render(await Projects());

    expect(screen.getByText("PROJECTS.EMPTY")).toBeInTheDocument();
    expect(screen.queryByTestId("projects-timeline")).not.toBeInTheDocument();
  });

  it("passes initialSelectedSlug through to the timeline, for a ?project= deep link", async () => {
    vi.mocked(getProjects).mockResolvedValue([project]);

    render(await Projects({ initialSelectedSlug: "demo" }));

    expect(screen.getByTestId("projects-timeline")).toHaveAttribute("data-initial-slug", "demo");
  });
});

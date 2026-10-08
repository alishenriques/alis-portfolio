import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";

import type { Project } from "@/lib/schemas";

import { ProjectsTimeline } from "../ProjectsTimeline";

const messages = {
  PROJECTS: {
    CLOSE_PANEL: "Fechar detalhes do projeto",
    SITE_ACTIVE: "Site ativo",
    SITE_INACTIVE: "Site fora do ar",
    VISIT_SITE: "Visite o site",
  },
};

function project(overrides: Partial<Project> = {}): Project {
  return {
    id: "1",
    slug: "demo",
    title: "Demo project",
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
    ...overrides,
  };
}

function renderTimeline(projects: Project[], initialSelectedSlug?: string | null) {
  return render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <ProjectsTimeline projects={projects} initialSelectedSlug={initialSelectedSlug} />
    </NextIntlClientProvider>,
  );
}

describe("ProjectsTimeline", () => {
  it("renders a timeline node per project", () => {
    renderTimeline([project({ slug: "a", title: "A" }), project({ slug: "b", title: "B" })]);
    // The DS Timeline builds the button's accessible name as
    // "label — typeLabel — description" (no typeLabel here, since
    // project()'s default projectType is null).
    expect(screen.getByRole("button", { name: "A — Summary" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "B — Summary" })).toBeInTheDocument();
  });

  it("shows the project's type and summary alongside its name", () => {
    renderTimeline([
      project({ slug: "a", title: "Respire C'alma", projectType: "E-Commerce", summary: "Velas terapêuticas." }),
    ]);
    expect(screen.getByText("E-Commerce")).toBeInTheDocument();
    expect(screen.getByText(/Velas terapêuticas\./)).toBeInTheDocument();
  });

  it("starts with the detail panel closed by default", () => {
    renderTimeline([project()]);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("opens the detail panel for the clicked project, and closes it again", () => {
    renderTimeline([project({ slug: "respire-calma", title: "Respire C'alma" })]);

    fireEvent.click(screen.getByRole("button", { name: "Respire C'alma — Summary" }));
    expect(screen.getByRole("dialog", { name: "Respire C'alma" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Fechar detalhes do projeto" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("switches the panel to a different project without closing it first", () => {
    renderTimeline([project({ slug: "a", title: "A" }), project({ slug: "b", title: "B" })]);

    fireEvent.click(screen.getByRole("button", { name: "A — Summary" }));
    expect(screen.getByRole("dialog", { name: "A" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "B — Summary" }));
    expect(screen.getByRole("dialog", { name: "B" })).toBeInTheDocument();
  });

  it("opens the matching project's panel on mount when given an initialSelectedSlug (a ?project= deep link)", () => {
    renderTimeline(
      [project({ slug: "a", title: "A" }), project({ slug: "b", title: "B" })],
      "b",
    );
    expect(screen.getByRole("dialog", { name: "B" })).toBeInTheDocument();
  });

  it("ignores an initialSelectedSlug that doesn't match any project", () => {
    renderTimeline([project({ slug: "a", title: "A" })], "not-a-real-slug");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("features the first project with its tech icons, and only the first", () => {
    renderTimeline([
      project({ slug: "a", title: "A", tags: ["React", "GraphQL", "Elementor"] }),
      project({ slug: "b", title: "B", tags: ["React"] }),
    ]);
    // Badge labels join the accessible name; "Elementor" has no icon, so it's skipped.
    expect(screen.getByRole("button", { name: "A — Summary — React, GraphQL" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "B — Summary" })).toBeInTheDocument();
    expect(screen.getAllByTitle("GraphQL").length).toBeGreaterThan(0);
  });
});

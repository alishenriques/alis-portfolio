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

function renderTimeline(projects: Project[]) {
  return render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <ProjectsTimeline projects={projects} />
    </NextIntlClientProvider>,
  );
}

describe("ProjectsTimeline", () => {
  it("renders a timeline node per project", () => {
    renderTimeline([project({ id: "1", title: "A" }), project({ id: "2", title: "B" })]);
    expect(screen.getByRole("button", { name: "A" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "B" })).toBeInTheDocument();
  });

  it("starts with the detail panel closed", () => {
    renderTimeline([project()]);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("opens the detail panel for the clicked project, and closes it again", () => {
    renderTimeline([project({ id: "1", title: "Respire C'alma" })]);

    fireEvent.click(screen.getByRole("button", { name: "Respire C'alma" }));
    expect(screen.getByRole("dialog", { name: "Respire C'alma" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Fechar detalhes do projeto" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("switches the panel to a different project without closing it first", () => {
    renderTimeline([project({ id: "1", title: "A" }), project({ id: "2", title: "B" })]);

    fireEvent.click(screen.getByRole("button", { name: "A" }));
    expect(screen.getByRole("dialog", { name: "A" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "B" }));
    expect(screen.getByRole("dialog", { name: "B" })).toBeInTheDocument();
  });
});

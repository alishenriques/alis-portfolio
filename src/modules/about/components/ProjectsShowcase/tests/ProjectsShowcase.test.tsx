import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it, vi } from "vitest";

import type { Project } from "@/lib/schemas";

import { ProjectsShowcase } from "../ProjectsShowcase";

vi.mock("@/i18n/navigation", () => ({
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const messages = {
  ABOUT: {
    PROJECTS_SHOWCASE_TITLE: "Conheça alguns dos projetos que criei",
    PROJECTS_SHOWCASE_LINK: "+ sobre esse projeto",
  },
};

function project(overrides: Partial<Project> = {}): Project {
  return {
    id: "1",
    slug: "demo",
    title: "Demo project",
    summary: "Um resumo curto.",
    body: "",
    coverUrl: "https://example.com/cover.jpg",
    iconUrl: null,
    projectType: null,
    siteUrl: null,
    isActive: true,
    tags: ["react"],
    featured: false,
    publishedAt: "2020-01-01T00:00:00.000Z",
    ...overrides,
  };
}

function renderShowcase(projects: Project[]) {
  return render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <ProjectsShowcase projects={projects} />
    </NextIntlClientProvider>,
  );
}

describe("ProjectsShowcase", () => {
  it("renders the section heading and one card per picked project", () => {
    renderShowcase([
      project({ slug: "a", title: "A" }),
      project({ slug: "b", title: "B" }),
      project({ slug: "c", title: "C" }),
    ]);

    expect(screen.getByRole("heading", { name: "Conheça alguns dos projetos que criei" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "A" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "B" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "C" })).toBeInTheDocument();
  });

  it("never shows more than 3 cards, even with more eligible projects", () => {
    const projects = Array.from({ length: 6 }, (_, i) => project({ slug: `p${i}`, title: `P${i}` }));
    renderShowcase(projects);

    expect(screen.getAllByText("+ sobre esse projeto")).toHaveLength(3);
  });

  it("each card links to /projetos?project=<slug>, opening that project's panel", () => {
    renderShowcase([project({ slug: "respire-calma", title: "Respire C'alma" })]);

    expect(screen.getByRole("link", { name: /sobre esse projeto/ })).toHaveAttribute(
      "href",
      "/projetos?project=respire-calma",
    );
  });

  it("shows the project's tags and summary on the card", () => {
    renderShowcase([project({ slug: "a", title: "A", tags: ["wordpress", "elementor"], summary: "Resumo do A" })]);

    expect(screen.getByText("wordpress")).toBeInTheDocument();
    expect(screen.getByText("elementor")).toBeInTheDocument();
    expect(screen.getByText("Resumo do A")).toBeInTheDocument();
  });

  it("excludes projects without a coverUrl from the picks", () => {
    renderShowcase([
      project({ slug: "a", title: "A", coverUrl: null }),
      project({ slug: "b", title: "B" }),
    ]);

    expect(screen.queryByRole("heading", { name: "A" })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "B" })).toBeInTheDocument();
  });

  it("renders nothing when there are no eligible projects", () => {
    const { container } = renderShowcase([project({ coverUrl: null })]);
    expect(container).toBeEmptyDOMElement();
  });
});

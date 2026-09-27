import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it, vi } from "vitest";

import type { Project } from "@/lib/schemas";

import { ProjectDetailPanel } from "../ProjectDetailPanel";

const messages = {
  PROJECTS: {
    CLOSE_PANEL: "Fechar detalhes do projeto",
    SITE_ACTIVE: "Site ativo",
    SITE_INACTIVE: "Site fora do ar",
    VISIT_SITE: "Visite o site",
  },
};

const project: Project = {
  id: "1",
  slug: "respire-calma",
  title: "Respire C'alma",
  summary: "E-commerce de velas terapêuticas.",
  body: "Primeiro parágrafo.\n\nSegundo parágrafo.",
  coverUrl: "https://example.com/cover.jpg",
  iconUrl: "https://example.com/icon.png",
  projectType: "E-Commerce",
  siteUrl: "https://respirecalma.eco.br",
  isActive: true,
  tags: ["WordPress", "WooCommerce"],
  featured: true,
  publishedAt: "2021-08-01T00:00:00.000Z",
};

function renderPanel(overrides: Partial<Project> | null = {}, onClose = vi.fn()) {
  const value = overrides === null ? null : { ...project, ...overrides };
  return render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <ProjectDetailPanel project={value} onClose={onClose} />
    </NextIntlClientProvider>,
  );
}

describe("ProjectDetailPanel", () => {
  it("stays closed when there's no selected project", () => {
    renderPanel(null);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("shows the project's title, type, tags, cover image, summary and bio", () => {
    const { container } = renderPanel();

    expect(screen.getByRole("dialog", { name: "Respire C'alma" })).toBeInTheDocument();
    expect(screen.getByText("E-Commerce")).toBeInTheDocument();
    expect(screen.getByText("WordPress")).toBeInTheDocument();
    expect(screen.getByText("WooCommerce")).toBeInTheDocument();
    expect(screen.getByText("E-commerce de velas terapêuticas.")).toBeInTheDocument();
    expect(screen.getByText("Primeiro parágrafo.")).toBeInTheDocument();
    expect(screen.getByText("Segundo parágrafo.")).toBeInTheDocument();
    // The cover is decorative (alt=""), so it's excluded from the accessibility tree on purpose.
    expect(container.querySelector("img")).toHaveAttribute("src", "https://example.com/cover.jpg");
  });

  it("shows the active indicator when the site is up", () => {
    renderPanel({ isActive: true });
    expect(screen.getByText("Site ativo")).toBeInTheDocument();
  });

  it("shows the inactive indicator when the site is down", () => {
    renderPanel({ isActive: false });
    expect(screen.getByText("Site fora do ar")).toBeInTheDocument();
  });

  it("links to the live site in a new tab, safely", () => {
    renderPanel();
    const link = screen.getByRole("link", { name: "Visite o site" });
    expect(link).toHaveAttribute("href", "https://respirecalma.eco.br");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("omits the tag list, cover image, type and visit link when absent", () => {
    const { container } = renderPanel({ tags: [], coverUrl: null, siteUrl: null, projectType: null });
    expect(container.querySelector("img")).toBeNull();
    expect(screen.queryByRole("link", { name: "Visite o site" })).toBeNull();
    expect(screen.queryByRole("list")).toBeNull();
    expect(screen.queryByText("E-Commerce")).toBeNull();
  });

  it("calls onClose from the close button", () => {
    const onClose = vi.fn();
    renderPanel({}, onClose);
    fireEvent.click(screen.getByRole("button", { name: "Fechar detalhes do projeto" }));
    expect(onClose).toHaveBeenCalled();
  });
});

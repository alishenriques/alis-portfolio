import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { getProfile, getProjects } from "@/lib/portfolio";
import type { Profile } from "@/lib/schemas";

import { About } from "../About";

vi.mock("@/lib/portfolio", () => ({
  getProfile: vi.fn(),
  // Most tests here aren't about the projects showcase; default to empty so
  // they don't have to care. Tests that do care override this per-test.
  getProjects: vi.fn().mockResolvedValue([]),
}));

const { getLocale } = vi.hoisted(() => ({ getLocale: vi.fn() }));

vi.mock("next-intl/server", () => ({
  getLocale,
  getTranslations: async (namespace: string) => (key: string) => `${namespace}.${key}`,
}));

// ProjectsShowcase (rendered by About) uses the client-hook form of
// translations and the app's locale-aware Link — mocked the same way
// Sidebar.test.tsx and ProjectsShowcase's own test do.
vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string) => `${namespace}.${key}`,
}));

vi.mock("@/i18n/navigation", () => ({
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

function profile(overrides: Partial<Profile> = {}): Profile {
  return {
    id: "1",
    name: "Alisson",
    headline: "H",
    bio: "B",
    headlineEn: null,
    bioEn: null,
    avatarUrl: null,
    ...overrides,
  };
}

beforeEach(() => {
  getLocale.mockResolvedValue("pt");
});

describe("About", () => {
  it("renders the profile's name, headline and bio", async () => {
    vi.mocked(getProfile).mockResolvedValue(
      profile({
        name: "Alisson Henriques",
        headline: "Desenvolvedor Front-End Sênior",
        bio: "Bio completa do perfil.",
      }),
    );

    render(await About());

    expect(screen.getByRole("heading", { name: "Alisson Henriques" })).toBeInTheDocument();
    expect(screen.getByText("Desenvolvedor Front-End Sênior")).toBeInTheDocument();
    expect(screen.getByText("Bio completa do perfil.")).toBeInTheDocument();
    expect(screen.getByText("ABOUT.TITLE")).toBeInTheDocument();
  });

  it("renders a '> ' bio paragraph as a pull-quote, and bold markup as <strong>", async () => {
    vi.mocked(getProfile).mockResolvedValue(
      profile({
        bio: "Parágrafo normal com **termo em destaque**.\n\n> Frase citada em destaque.\n\nOutro parágrafo normal.",
      }),
    );

    render(await About());

    expect(screen.getByText("termo em destaque").tagName).toBe("STRONG");
    const quote = screen.getByText(/Frase citada em destaque/).closest("blockquote");
    expect(quote).toBeInTheDocument();
    expect(screen.getByText(/Outro parágrafo normal/)).toBeInTheDocument();
  });

  it("keeps every quote inline (no side-floating — tried it, hurt readability)", async () => {
    vi.mocked(getProfile).mockResolvedValue(profile({ bio: "Intro.\n\n> Primeira.\n\nMeio.\n\n> Segunda." }));

    render(await About());

    const quotes = Array.from(document.querySelectorAll("blockquote"));
    expect(quotes).toHaveLength(2);
    quotes.forEach((quote) => expect(quote.className).not.toMatch(/float/i));
  });

  it("renders '## ' bio lines as headings, and builds a table of contents from them", async () => {
    vi.mocked(getProfile).mockResolvedValue(
      profile({ bio: "Intro.\n\n## Primeira Seção\n\nTexto da primeira.\n\n## Segunda Seção\n\nTexto da segunda." }),
    );

    render(await About());

    expect(screen.getByRole("heading", { name: "Primeira Seção" }).tagName).toBe("H2");
    expect(document.getElementById("primeira-secao")).not.toBeNull();

    const toc = screen.getByRole("navigation", { name: "ABOUT.TOC_LABEL" });
    expect(toc.querySelectorAll("a")).toHaveLength(2);
    expect(screen.getByRole("link", { name: /Segunda Seção/ })).toHaveAttribute(
      "href",
      "#segunda-secao",
    );
  });

  it("omits the table of contents when the bio has no headings", async () => {
    vi.mocked(getProfile).mockResolvedValue(profile({ bio: "Só um parágrafo, sem seções." }));

    render(await About());

    expect(screen.queryByRole("navigation", { name: "ABOUT.TOC_LABEL" })).not.toBeInTheDocument();
  });

  it("shows the estimated reading time", async () => {
    vi.mocked(getProfile).mockResolvedValue(profile({ bio: "Um parágrafo curto." }));

    render(await About());

    expect(screen.getByText("ABOUT.READING_TIME")).toBeInTheDocument();
  });

  it("renders the education field below the headline", async () => {
    vi.mocked(getProfile).mockResolvedValue(profile());

    render(await About());

    expect(screen.getByText("ABOUT.EDUCATION_LABEL")).toBeInTheDocument();
    expect(screen.getByText("ABOUT.EDUCATION_VALUE")).toBeInTheDocument();
  });

  it("renders the avatar as an expandable photo when avatarUrl is set", async () => {
    vi.mocked(getProfile).mockResolvedValue(profile({ avatarUrl: "https://example.com/avatar.jpg" }));

    render(await About());

    const trigger = screen.getByRole("button", { name: "Alisson" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.getByRole("dialog", { name: "Alisson" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "ABOUT.CLOSE_PHOTO" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("omits the avatar image when avatarUrl is null", async () => {
    vi.mocked(getProfile).mockResolvedValue(profile());

    render(await About());

    expect(screen.queryByRole("img", { name: "Alisson" })).not.toBeInTheDocument();
  });

  it("renders the intro video section with the coming-soon placeholder", async () => {
    vi.mocked(getProfile).mockResolvedValue(profile());

    render(await About());

    expect(screen.getByRole("heading", { name: "ABOUT.VIDEO_TITLE" })).toBeInTheDocument();
    expect(screen.getByText("ABOUT.VIDEO_COMING_SOON")).toBeInTheDocument();
    expect(document.querySelector("iframe")).toBeNull();
  });

  it("shows the projects showcase when there are projects with a cover image", async () => {
    vi.mocked(getProfile).mockResolvedValue(profile());
    vi.mocked(getProjects).mockResolvedValue([
      {
        id: "1",
        slug: "respire-calma",
        title: "Respire C'alma",
        summary: "Resumo",
        body: "",
        coverUrl: "https://example.com/cover.jpg",
        iconUrl: null,
        projectType: null,
        siteUrl: null,
        isActive: true,
        tags: [],
        featured: false,
        publishedAt: "2021-01-01T00:00:00.000Z",
      },
    ]);

    render(await About());

    expect(screen.getByRole("heading", { name: "ABOUT.PROJECTS_SHOWCASE_TITLE" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Respire C'alma" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ABOUT.PROJECTS_SHOWCASE_LINK/ })).toHaveAttribute(
      "href",
      "/projetos?project=respire-calma",
    );
  });

  it("omits the projects showcase entirely when there are no eligible projects", async () => {
    vi.mocked(getProfile).mockResolvedValue(profile());
    vi.mocked(getProjects).mockResolvedValue([]);

    render(await About());

    expect(screen.queryByRole("heading", { name: "ABOUT.PROJECTS_SHOWCASE_TITLE" })).not.toBeInTheDocument();
  });

  describe("English locale", () => {
    it("shows the English headline/bio when the locale is en and a translation exists", async () => {
      getLocale.mockResolvedValue("en");
      vi.mocked(getProfile).mockResolvedValue(
        profile({
          headline: "Desenvolvedor Front-End Sênior",
          bio: "Bio em português.",
          headlineEn: "Senior Front-End Developer",
          bioEn: "Bio in English.",
        }),
      );

      render(await About());

      expect(screen.getByText("Senior Front-End Developer")).toBeInTheDocument();
      expect(screen.getByText("Bio in English.")).toBeInTheDocument();
      expect(screen.queryByText("Desenvolvedor Front-End Sênior")).not.toBeInTheDocument();
      expect(screen.queryByText("Bio em português.")).not.toBeInTheDocument();
    });

    it("falls back to the Portuguese headline/bio when the locale is en but no translation exists yet", async () => {
      getLocale.mockResolvedValue("en");
      vi.mocked(getProfile).mockResolvedValue(
        profile({ headline: "Desenvolvedor Front-End Sênior", bio: "Bio em português." }),
      );

      render(await About());

      expect(screen.getByText("Desenvolvedor Front-End Sênior")).toBeInTheDocument();
      expect(screen.getByText("Bio em português.")).toBeInTheDocument();
    });

    it("keeps the Portuguese headline/bio when the locale is pt, even if an English version exists", async () => {
      getLocale.mockResolvedValue("pt");
      vi.mocked(getProfile).mockResolvedValue(
        profile({
          headline: "Desenvolvedor Front-End Sênior",
          bio: "Bio em português.",
          headlineEn: "Senior Front-End Developer",
          bioEn: "Bio in English.",
        }),
      );

      render(await About());

      expect(screen.getByText("Desenvolvedor Front-End Sênior")).toBeInTheDocument();
      expect(screen.getByText("Bio em português.")).toBeInTheDocument();
      expect(screen.queryByText("Senior Front-End Developer")).not.toBeInTheDocument();
    });
  });
});

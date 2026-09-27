import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { getProfile } from "@/lib/portfolio";

import { About } from "../About";

vi.mock("@/lib/portfolio", () => ({
  getProfile: vi.fn(),
}));

vi.mock("next-intl/server", () => ({
  getTranslations: async (namespace: string) => (key: string) => `${namespace}.${key}`,
}));

describe("About", () => {
  it("renders the profile's name, headline and bio", async () => {
    vi.mocked(getProfile).mockResolvedValue({
      id: "1",
      name: "Alisson Henriques",
      headline: "Desenvolvedor Front-End Sênior",
      bio: "Bio completa do perfil.",
      avatarUrl: null,
    });

    render(await About());

    expect(screen.getByRole("heading", { name: "Alisson Henriques" })).toBeInTheDocument();
    expect(screen.getByText("Desenvolvedor Front-End Sênior")).toBeInTheDocument();
    expect(screen.getByText("Bio completa do perfil.")).toBeInTheDocument();
    expect(screen.getByText("ABOUT.TITLE")).toBeInTheDocument();
  });

  it("renders a '> ' bio paragraph as a pull-quote, and bold markup as <strong>", async () => {
    vi.mocked(getProfile).mockResolvedValue({
      id: "1",
      name: "Alisson",
      headline: "H",
      bio: "Parágrafo normal com **termo em destaque**.\n\n> Frase citada em destaque.\n\nOutro parágrafo normal.",
      avatarUrl: null,
    });

    render(await About());

    expect(screen.getByText("termo em destaque").tagName).toBe("STRONG");
    const quote = screen.getByText(/Frase citada em destaque/).closest("blockquote");
    expect(quote).toBeInTheDocument();
    expect(screen.getByText(/Outro parágrafo normal/)).toBeInTheDocument();
  });

  it("keeps every quote inline (no side-floating — tried it, hurt readability)", async () => {
    vi.mocked(getProfile).mockResolvedValue({
      id: "1",
      name: "Alisson",
      headline: "H",
      bio: "Intro.\n\n> Primeira.\n\nMeio.\n\n> Segunda.",
      avatarUrl: null,
    });

    render(await About());

    const quotes = Array.from(document.querySelectorAll("blockquote"));
    expect(quotes).toHaveLength(2);
    quotes.forEach((quote) => expect(quote.className).not.toMatch(/float/i));
  });

  it("renders '## ' bio lines as headings, and builds a table of contents from them", async () => {
    vi.mocked(getProfile).mockResolvedValue({
      id: "1",
      name: "Alisson",
      headline: "H",
      bio: "Intro.\n\n## Primeira Seção\n\nTexto da primeira.\n\n## Segunda Seção\n\nTexto da segunda.",
      avatarUrl: null,
    });

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
    vi.mocked(getProfile).mockResolvedValue({
      id: "1",
      name: "Alisson",
      headline: "H",
      bio: "Só um parágrafo, sem seções.",
      avatarUrl: null,
    });

    render(await About());

    expect(screen.queryByRole("navigation", { name: "ABOUT.TOC_LABEL" })).not.toBeInTheDocument();
  });

  it("shows the estimated reading time", async () => {
    vi.mocked(getProfile).mockResolvedValue({
      id: "1",
      name: "Alisson",
      headline: "H",
      bio: "Um parágrafo curto.",
      avatarUrl: null,
    });

    render(await About());

    expect(screen.getByText("ABOUT.READING_TIME")).toBeInTheDocument();
  });

  it("renders the education field below the headline", async () => {
    vi.mocked(getProfile).mockResolvedValue({
      id: "1",
      name: "Alisson",
      headline: "H",
      bio: "B",
      avatarUrl: null,
    });

    render(await About());

    expect(screen.getByText("ABOUT.EDUCATION_LABEL")).toBeInTheDocument();
    expect(screen.getByText("ABOUT.EDUCATION_VALUE")).toBeInTheDocument();
  });

  it("renders the avatar as an expandable photo when avatarUrl is set", async () => {
    vi.mocked(getProfile).mockResolvedValue({
      id: "1",
      name: "Alisson",
      headline: "H",
      bio: "B",
      avatarUrl: "https://example.com/avatar.jpg",
    });

    render(await About());

    const trigger = screen.getByRole("button", { name: "Alisson" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.getByRole("dialog", { name: "Alisson" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "ABOUT.CLOSE_PHOTO" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("omits the avatar image when avatarUrl is null", async () => {
    vi.mocked(getProfile).mockResolvedValue({
      id: "1",
      name: "Alisson",
      headline: "H",
      bio: "B",
      avatarUrl: null,
    });

    render(await About());

    expect(screen.queryByRole("img", { name: "Alisson" })).not.toBeInTheDocument();
  });

  it("renders the intro video section with the coming-soon placeholder", async () => {
    vi.mocked(getProfile).mockResolvedValue({
      id: "1",
      name: "Alisson",
      headline: "H",
      bio: "B",
      avatarUrl: null,
    });

    render(await About());

    expect(screen.getByRole("heading", { name: "ABOUT.VIDEO_TITLE" })).toBeInTheDocument();
    expect(screen.getByText("ABOUT.VIDEO_COMING_SOON")).toBeInTheDocument();
    expect(document.querySelector("iframe")).toBeNull();
  });
});

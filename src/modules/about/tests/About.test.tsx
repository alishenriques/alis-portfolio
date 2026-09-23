import { render, screen } from "@testing-library/react";
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

  it("omits the avatar image when avatarUrl is null", async () => {
    vi.mocked(getProfile).mockResolvedValue({
      id: "1",
      name: "Alisson",
      headline: "H",
      bio: "B",
      avatarUrl: null,
    });

    render(await About());

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});

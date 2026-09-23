import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home from "./page";

vi.mock("@/lib/portfolio", () => ({
  getProfile: vi.fn().mockResolvedValue({
    id: "1",
    name: "Alisson Henriques",
    headline: "Front-end engineer",
    bio: "Bio",
    avatarUrl: null,
  }),
  getProjects: vi.fn().mockResolvedValue([
    {
      id: "1",
      slug: "demo",
      title: "Demo project",
      summary: "Summary",
      body: "",
      coverUrl: null,
      tags: [],
      featured: true,
      publishedAt: "2020-01-01T00:00:00.000Z",
    },
  ]),
}));

describe("Home", () => {
  it("renders the profile and the project list", async () => {
    render(await Home());

    expect(screen.getByRole("heading", { name: "Alisson Henriques" })).toBeInTheDocument();
    expect(screen.getByText("Front-end engineer")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Demo project" })).toBeInTheDocument();
  });
});

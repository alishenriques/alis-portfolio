import { afterEach, describe, expect, it, vi } from "vitest";
import { getProfile, getProjects } from "./portfolio";

const { post } = vi.hoisted(() => ({ post: vi.fn() }));

vi.mock("axios", () => ({
  default: { create: () => ({ post }) },
}));

afterEach(() => {
  post.mockReset();
});

const profile = {
  id: "1",
  name: "Alisson",
  headline: "Engineer",
  bio: "Bio",
  avatarUrl: null,
};

const project = {
  id: "1",
  slug: "demo",
  title: "Demo",
  summary: "Summary",
  body: "Body",
  coverUrl: null,
  tags: ["react"],
  featured: true,
  publishedAt: "2020-01-01T00:00:00.000Z",
};

describe("getProfile", () => {
  it("returns the parsed profile", async () => {
    post.mockResolvedValue({ data: { data: { profile } } });
    await expect(getProfile()).resolves.toEqual(profile);
  });
});

describe("getProjects", () => {
  it("returns the parsed project list", async () => {
    post.mockResolvedValue({ data: { data: { projects: [project] } } });
    await expect(getProjects()).resolves.toEqual([project]);
  });

  it("returns an empty list when there are no projects", async () => {
    post.mockResolvedValue({ data: { data: { projects: [] } } });
    await expect(getProjects()).resolves.toEqual([]);
  });
});

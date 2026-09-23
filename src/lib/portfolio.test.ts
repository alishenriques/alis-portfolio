import { afterEach, describe, expect, it, vi } from "vitest";

import { getExperiences, getProfile, getProjects, sendContactMessage } from "./portfolio";

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

const experience = {
  id: "1",
  company: "Ingresse",
  companyLogoUrl: null,
  role: "Front-End Sênior",
  startDate: "2022-10",
  endDate: "2025-07",
  description: "Descrição",
  sortOrder: 0,
};

describe("getExperiences", () => {
  it("returns the parsed experience list", async () => {
    post.mockResolvedValue({ data: { data: { experiences: [experience] } } });
    await expect(getExperiences()).resolves.toEqual([experience]);
  });

  it("returns an empty list when there are no experiences", async () => {
    post.mockResolvedValue({ data: { data: { experiences: [] } } });
    await expect(getExperiences()).resolves.toEqual([]);
  });
});

describe("sendContactMessage", () => {
  it("returns true and posts the input as a variable", async () => {
    post.mockResolvedValue({ data: { data: { sendContactMessage: true } } });
    const input = { name: "Ana", email: "ana@example.com", message: "Oi!" };

    await expect(sendContactMessage(input)).resolves.toBe(true);
    expect(post).toHaveBeenCalledWith(
      "",
      expect.objectContaining({ variables: { input } }),
    );
  });
});

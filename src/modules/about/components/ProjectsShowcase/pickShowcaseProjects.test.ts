import { describe, expect, it } from "vitest";

import type { Project } from "@/lib/schemas";

import { pickShowcaseProjects } from "./pickShowcaseProjects";

function project(overrides: Partial<Project> = {}): Project {
  return {
    id: "1",
    slug: "demo",
    title: "Demo",
    summary: "Summary",
    body: "",
    coverUrl: "https://example.com/cover.jpg",
    iconUrl: null,
    projectType: null,
    siteUrl: null,
    isActive: true,
    tags: [],
    featured: false,
    publishedAt: "2020-01-01T00:00:00.000Z",
    ...overrides,
  };
}

// A random source that never shuffles (always picks index 0), so tests can
// assert on exact order without depending on real randomness.
const noShuffle = () => 0;

describe("pickShowcaseProjects", () => {
  it("drops projects without a coverUrl — the card's whole point is the screenshot", () => {
    const projects = [
      project({ slug: "a", coverUrl: "https://example.com/a.jpg" }),
      project({ slug: "b", coverUrl: null }),
    ];

    const picks = pickShowcaseProjects(projects, 3, noShuffle);
    expect(picks.map((p) => p.slug)).toEqual(["a"]);
  });

  it("puts the featured project first, always", () => {
    const projects = [
      project({ slug: "a" }),
      project({ slug: "b", featured: true }),
      project({ slug: "c" }),
    ];

    const picks = pickShowcaseProjects(projects, 3, noShuffle);
    expect(picks[0]?.slug).toBe("b");
    expect(picks).toHaveLength(3);
  });

  it("returns a plain random sample (no pin) when nothing is featured", () => {
    const projects = [project({ slug: "a" }), project({ slug: "b" }), project({ slug: "c" })];

    const picks = pickShowcaseProjects(projects, 2, noShuffle);
    expect(picks).toHaveLength(2);
    expect(picks.every((p) => projects.some((project) => project.slug === p.slug))).toBe(true);
  });

  it("never returns more than count, and never duplicates a project", () => {
    const projects = Array.from({ length: 5 }, (_, i) => project({ slug: `p${i}` }));

    const picks = pickShowcaseProjects(projects, 3, Math.random);
    expect(picks).toHaveLength(3);
    expect(new Set(picks.map((p) => p.slug)).size).toBe(3);
  });

  it("returns fewer than count when there aren't enough eligible projects", () => {
    const projects = [project({ slug: "a" })];
    const picks = pickShowcaseProjects(projects, 3, noShuffle);
    expect(picks).toHaveLength(1);
  });

  it("returns an empty list when there are no eligible projects", () => {
    expect(pickShowcaseProjects([], 3, noShuffle)).toEqual([]);
  });
});

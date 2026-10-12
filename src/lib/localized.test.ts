import { describe, expect, it } from "vitest";

import { localizeProject, pickLocalized } from "./localized";

import type { Project } from "./schemas";

describe("pickLocalized", () => {
  it("uses the English text under the en locale", () => {
    expect(pickLocalized("en", "Olá", "Hello")).toBe("Hello");
  });

  it("falls back to Portuguese when there's no English text", () => {
    expect(pickLocalized("en", "Olá", null)).toBe("Olá");
    expect(pickLocalized("en", "Olá", "")).toBe("Olá");
  });

  it("keeps Portuguese under the pt locale", () => {
    expect(pickLocalized("pt", "Olá", "Hello")).toBe("Olá");
  });
});

describe("localizeProject", () => {
  const project: Project = {
    id: "1",
    slug: "respire-calma",
    title: "Respire C'alma",
    summary: "Velas terapêuticas.",
    summaryEn: "Therapeutic candles.",
    body: "Loja virtual.",
    bodyEn: "Online store.",
    coverUrl: null,
    iconUrl: null,
    projectType: "Loja Virtual",
    projectTypeEn: "Online Store",
    siteUrl: null,
    isActive: true,
    tags: ["WordPress"],
    featured: false,
    publishedAt: null,
  };

  it("swaps summary, body and projectType for their English versions under en, keeping the title", () => {
    expect(localizeProject(project, "en")).toMatchObject({
      title: "Respire C'alma",
      summary: "Therapeutic candles.",
      body: "Online store.",
      projectType: "Online Store",
    });
  });

  it("falls back to Portuguese per field when a translation is missing", () => {
    const partial = { ...project, bodyEn: null, projectTypeEn: null };
    expect(localizeProject(partial, "en")).toMatchObject({
      summary: "Therapeutic candles.",
      body: "Loja virtual.",
      projectType: "Loja Virtual",
    });
  });

  it("keeps a missing projectType as null", () => {
    expect(localizeProject({ ...project, projectType: null }, "en").projectType).toBeNull();
  });

  it("keeps Portuguese under pt", () => {
    expect(localizeProject(project, "pt")).toEqual(project);
  });
});

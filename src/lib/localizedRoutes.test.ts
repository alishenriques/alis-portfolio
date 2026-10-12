import { describe, expect, it } from "vitest";

import { legacyPathRedirect, localizedPathname } from "./localizedRoutes";

describe("localizedPathname", () => {
  it("keeps the Portuguese routes as they are", () => {
    expect(localizedPathname("pt", "/sobre")).toBe("/sobre");
    expect(localizedPathname("pt", "/")).toBe("/");
  });

  it("translates the routes in English", () => {
    expect(localizedPathname("en", "/sobre")).toBe("/about");
    expect(localizedPathname("en", "/corporativo")).toBe("/corporate");
    expect(localizedPathname("en", "/projetos")).toBe("/projects");
  });
});

describe("legacyPathRedirect", () => {
  it("moves the old English URLs to the translated ones", () => {
    expect(legacyPathRedirect("/en/sobre")).toBe("/en/about");
    expect(legacyPathRedirect("/en/corporativo")).toBe("/en/corporate");
    expect(legacyPathRedirect("/en/projetos")).toBe("/en/projects");
    expect(legacyPathRedirect("/en/projetos/")).toBe("/en/projects");
  });

  it("sends an English spelling under /pt to the Portuguese page", () => {
    expect(legacyPathRedirect("/pt/about")).toBe("/pt/sobre");
  });

  it("leaves correct, unknown and unprefixed paths alone", () => {
    expect(legacyPathRedirect("/en/about")).toBeUndefined();
    expect(legacyPathRedirect("/pt/sobre")).toBeUndefined();
    expect(legacyPathRedirect("/en")).toBeUndefined();
    expect(legacyPathRedirect("/en/")).toBeUndefined();
    expect(legacyPathRedirect("/en/nao-existe")).toBeUndefined();
    expect(legacyPathRedirect("/en/sobre/opengraph-image-1/og")).toBeUndefined();
    expect(legacyPathRedirect("/sobre")).toBeUndefined();
  });
});

import { describe, expect, it } from "vitest";

import en from "@/locales/en.json";
import pt from "@/locales/pt.json";

import { buildPageMetadata, buildRobots, buildSitemap, languageAlternates, localizedPath, SEO_PAGES } from "./seo";

const SITE = "https://alis.example";

describe("localizedPath", () => {
  it("maps the home page to the bare locale prefix", () => {
    expect(localizedPath("pt", "/")).toBe("/pt");
  });

  it("prefixes other pages with the locale", () => {
    expect(localizedPath("en", "/sobre")).toBe("/en/sobre");
  });
});

describe("languageAlternates", () => {
  it("lists every locale plus x-default pointing at Portuguese", () => {
    expect(languageAlternates("/projetos")).toEqual({
      "pt-BR": "/pt/projetos",
      en: "/en/projetos",
      "x-default": "/pt/projetos",
    });
  });

  it("can make the URLs absolute", () => {
    expect(languageAlternates("/", (path) => `${SITE}${path}`)["en"]).toBe(`${SITE}/en`);
  });
});

describe("buildPageMetadata", () => {
  const base = { title: "Sobre", description: "Quem sou", siteName: "Alisson Henriques" };

  it("sets canonical, hreflang and Open Graph for a page", () => {
    const metadata = buildPageMetadata({ ...base, locale: "pt", page: "ABOUT" });

    expect(metadata.title).toBe("Sobre");
    expect(metadata.description).toBe("Quem sou");
    expect(metadata.alternates?.canonical).toBe("/pt/sobre");
    expect(metadata.alternates?.languages).toEqual({ "pt-BR": "/pt/sobre", en: "/en/sobre", "x-default": "/pt/sobre" });
    expect(metadata.openGraph).toMatchObject({
      url: "/pt/sobre",
      title: "Sobre | Alisson Henriques",
      siteName: "Alisson Henriques",
      locale: "pt_BR",
      alternateLocale: ["en_US"],
    });
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image", title: "Sobre | Alisson Henriques" });
  });

  it("uses an absolute title on the home page so the site name isn't repeated", () => {
    const metadata = buildPageMetadata({ ...base, title: "Alisson Henriques · Dev", locale: "en", page: "HOME" });

    expect(metadata.title).toEqual({ absolute: "Alisson Henriques · Dev" });
    expect(metadata.alternates?.canonical).toBe("/en");
    expect(metadata.openGraph).toMatchObject({ title: "Alisson Henriques · Dev", locale: "en_US", alternateLocale: ["pt_BR"] });
  });
});

describe("buildSitemap", () => {
  const sitemap = buildSitemap(SITE);

  it("has one absolute entry per page and locale", () => {
    expect(sitemap).toHaveLength(Object.keys(SEO_PAGES).length * 2);
    expect(sitemap.map((entry) => entry.url)).toEqual(
      expect.arrayContaining([`${SITE}/pt`, `${SITE}/en`, `${SITE}/pt/sobre`, `${SITE}/en/projetos`]),
    );
  });

  it("links each entry to its translations", () => {
    const entry = sitemap.find((item) => item.url === `${SITE}/en/corporativo`);
    expect(entry?.alternates?.languages).toEqual({
      "pt-BR": `${SITE}/pt/corporativo`,
      en: `${SITE}/en/corporativo`,
      "x-default": `${SITE}/pt/corporativo`,
    });
  });
});

describe("buildRobots", () => {
  it("allows everything and points at the sitemap", () => {
    expect(buildRobots(SITE)).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: `${SITE}/sitemap.xml`,
    });
  });
});

describe("SEO translations", () => {
  it.each([
    ["pt", pt],
    ["en", en],
  ])("%s has a title, description and OG headline for every page", (_, messages) => {
    for (const page of Object.keys(SEO_PAGES) as (keyof typeof SEO_PAGES)[]) {
      const entry = messages.SEO.PAGES[page];
      expect(entry.TITLE).toBeTruthy();
      expect(entry.DESCRIPTION).toBeTruthy();
      expect(entry.OG_HEADLINE).toBeTruthy();
    }
  });
});

import { describe, expect, it, vi } from "vitest";

import { getPageMetadata, resolveLocale } from "./pageMetadata";

const getTranslations = vi.hoisted(() =>
  vi.fn(async ({ locale, namespace }: { locale: string; namespace: string }) => (key: string) =>
    `${locale}:${namespace}.${key}`,
  ),
);

vi.mock("next-intl/server", () => ({ getTranslations }));

describe("resolveLocale", () => {
  it("keeps a supported locale", async () => {
    await expect(resolveLocale(Promise.resolve({ locale: "en" }))).resolves.toBe("en");
  });

  it("falls back to the default locale for anything else", async () => {
    await expect(resolveLocale(Promise.resolve({ locale: "fr" }))).resolves.toBe("pt");
  });
});

describe("getPageMetadata", () => {
  it("builds the page's metadata from its SEO translations", async () => {
    const metadata = await getPageMetadata(Promise.resolve({ locale: "en" }), "PROJECTS");

    expect(getTranslations).toHaveBeenCalledWith({ locale: "en", namespace: "SEO" });
    expect(metadata.title).toBe("en:SEO.PAGES.PROJECTS.TITLE");
    expect(metadata.description).toBe("en:SEO.PAGES.PROJECTS.DESCRIPTION");
    expect(metadata.alternates?.canonical).toBe("/en/projetos");
  });
});

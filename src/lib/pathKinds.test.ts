import { describe, expect, it } from "vitest";

import { isFileLikePath, isRootFile, pathLocale } from "./pathKinds";

describe("path helpers", () => {
  it("spots file-like paths by a dot in the last segment", () => {
    expect(isFileLikePath("/wp-login.php")).toBe(true);
    expect(isFileLikePath("/pt/foo.html")).toBe(true);
    expect(isFileLikePath("/pt/sobre")).toBe(false);
    expect(isFileLikePath("/v1.2/docs")).toBe(false);
  });

  it("knows the root metadata files", () => {
    expect(isRootFile("/robots.txt")).toBe(true);
    expect(isRootFile("/pt/robots.txt")).toBe(false);
  });

  it("reads the locale prefix", () => {
    expect(pathLocale("/en/sobre")).toBe("en");
    expect(pathLocale("/pt")).toBe("pt");
    expect(pathLocale("/xyz")).toBeUndefined();
  });
});

import { describe, expect, it } from "vitest";

import { techBadges } from "../techBadges";

describe("techBadges", () => {
  it("returns one badge per tag with a known icon, keeping the tags' order", () => {
    expect(techBadges(["TypeScript", "React", "Claude Code"]).map((badge) => badge.label)).toEqual([
      "TypeScript",
      "React",
      "Claude Code",
    ]);
  });

  it("skips tags with no icon", () => {
    expect(techBadges(["Elementor", "GraphQL", "Slider Revolution"]).map((badge) => badge.label)).toEqual(["GraphQL"]);
  });

  it("returns an empty list for no tags", () => {
    expect(techBadges([])).toEqual([]);
  });
});

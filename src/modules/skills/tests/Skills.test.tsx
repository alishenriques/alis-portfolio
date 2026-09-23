import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";

import { skillsList } from "../constants/skillsList";
import { Skills } from "../Skills";

describe("Skills", () => {
  it("renders every skill's name", () => {
    render(
      <NextIntlClientProvider locale="pt" messages={{ SKILLS: { TITLE: "Stack principal" } }}>
        <Skills />
      </NextIntlClientProvider>,
    );

    expect(screen.getByText("Stack principal")).toBeInTheDocument();
    for (const skill of skillsList) {
      // Each icon also renders an SVG <title> with the same text (for a11y),
      // so scope to the visible label to keep the query unique.
      expect(screen.getByText(skill.name, { selector: "span" })).toBeInTheDocument();
    }
  });
});

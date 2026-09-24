import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";

import { TaglineHighlights } from "../TaglineHighlights";

const messages = {
  HOME: {
    TAGLINE: {
      CLEAN_CODE: "Código limpo",
      MODERN_UI: "Interfaces modernas",
      PERFORMANCE: "Performance",
      SCALABILITY: "Escalabilidade",
      TESTS: "Testes automatizados",
    },
  },
};

describe("TaglineHighlights", () => {
  it("renders the five highlights, each with a decorative icon", () => {
    const { container } = render(
      <NextIntlClientProvider locale="pt" messages={messages}>
        <TaglineHighlights />
      </NextIntlClientProvider>,
    );

    expect(screen.getAllByRole("listitem")).toHaveLength(5);
    expect(screen.getByText("Código limpo")).toBeInTheDocument();
    expect(screen.getByText("Testes automatizados")).toBeInTheDocument();
    const icons = container.querySelectorAll("li svg");
    expect(icons).toHaveLength(5);
    icons.forEach((icon) => expect(icon).toHaveAttribute("aria-hidden", "true"));
  });
});

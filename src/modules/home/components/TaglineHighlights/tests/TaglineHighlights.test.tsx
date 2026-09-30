import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";

import { TaglineHighlights } from "../TaglineHighlights";

const messages = {
  HOME: {
    TAGLINE: {
      MODERN_UI: "Interfaces modernas",
      PERFORMANCE: "Performance",
      SCALABILITY: "Escalabilidade",
      AI_ASSISTED: "Engenharia de Software Assistida por IA",
      ECOMMERCE: "E-Commerces",
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
    expect(screen.getByText("Interfaces modernas")).toBeInTheDocument();
    expect(screen.getByText("Engenharia de Software Assistida por IA")).toBeInTheDocument();
    expect(screen.getByText("E-Commerces")).toBeInTheDocument();
    const icons = container.querySelectorAll("li svg");
    expect(icons).toHaveLength(5);
    icons.forEach((icon) => expect(icon).toHaveAttribute("aria-hidden", "true"));
  });
});

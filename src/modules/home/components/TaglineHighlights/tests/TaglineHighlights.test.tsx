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
    },
  },
};

describe("TaglineHighlights", () => {
  it("renders the three highlights, each with a decorative icon", () => {
    const { container } = render(
      <NextIntlClientProvider locale="pt" messages={messages}>
        <TaglineHighlights />
      </NextIntlClientProvider>,
    );

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByText("Interfaces modernas")).toBeInTheDocument();
    expect(screen.getByText("Escalabilidade")).toBeInTheDocument();
    const icons = container.querySelectorAll("li svg");
    expect(icons).toHaveLength(3);
    icons.forEach((icon) => expect(icon).toHaveAttribute("aria-hidden", "true"));
  });
});

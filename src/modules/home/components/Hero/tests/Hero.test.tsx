import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";

import { Hero } from "../Hero";

const messages = {
  HOME: {
    TITLE_LINE_1: "DEV",
    TITLE_HIGHLIGHT: "FRONT-END",
    TITLE_LINE_2: "SÊNIOR",
    SUBTITLE: "Foco em <hl>experiência do usuário</hl>.",
    TAGLINE: "Código limpo • Performance",
  },
};

describe("Hero", () => {
  it("renders the headline, highlighted subtitle and contact info", () => {
    render(
      <NextIntlClientProvider locale="pt" messages={messages}>
        <Hero />
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole("heading", { name: /DEV.*FRONT-END.*SÊNIOR/ })).toBeInTheDocument();
    expect(screen.getByText("experiência do usuário")).toBeInTheDocument();
    expect(screen.getByText("Código limpo • Performance")).toBeInTheDocument();
    expect(screen.getByText("alishenriques@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("(11) 98118-4672")).toBeInTheDocument();
  });
});

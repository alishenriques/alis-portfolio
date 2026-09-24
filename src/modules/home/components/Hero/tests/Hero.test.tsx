import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";

import { Hero } from "../Hero";

const messages = {
  HOME: {
    EYEBROW: "Alisson Henriques · Desenvolvedor Front‑End Sênior",
    HEADLINE: "Arquitetura de front‑end que <hl>escala</hl> — construída com engenharia e IA.",
    SUBTITLE: "Foco em <hl>experiência do usuário</hl>.",
    TAGLINE: {
      CLEAN_CODE: "Código limpo",
      MODERN_UI: "Interfaces modernas",
      PERFORMANCE: "Performance",
      SCALABILITY: "Escalabilidade",
      TESTS: "Testes automatizados",
    },
  },
};

describe("Hero", () => {
  it("renders the headline, highlighted subtitle and contact info", () => {
    render(
      <NextIntlClientProvider locale="pt" messages={messages}>
        <Hero />
      </NextIntlClientProvider>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: /Arquitetura de front‑end que escala/ }),
    ).toBeInTheDocument();
    expect(screen.getByText("escala")).toBeInTheDocument();
    expect(screen.getByText("Alisson Henriques · Desenvolvedor Front‑End Sênior")).toBeInTheDocument();
    expect(screen.getByText("experiência do usuário")).toBeInTheDocument();
    expect(screen.getByText("Código limpo")).toBeInTheDocument();
    expect(screen.getByText("Testes automatizados")).toBeInTheDocument();
    expect(screen.getByText("alishenriques@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("(11) 98118-4672")).toBeInTheDocument();
  });
});

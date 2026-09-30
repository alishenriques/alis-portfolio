import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";

import { Hero } from "../Hero";

const messages = {
  HOME: {
    EYEBROW: "Alisson Henriques · Desenvolvedor Front‑End Sênior",
    HEADLINE: "Arquitetura de front‑end que <hl>escala</hl> — construída com engenharia e IA.",
    SUBTITLE: "Foco em <hl>experiência do usuário</hl>.",
    SLIDE_NAV: {
      PREV: "Slide anterior",
      NEXT: "Próximo slide",
    },
    SLIDE2: {
      HEADLINE: "Quer <hl>vender mais</hl> nessa temporada?",
      SUBTITLE: "Pacote pra <hl>vender mais</hl>.",
      FEATURES: {
        GBP: "Google Meu Negócio arrumado",
        WHATSAPP: "WhatsApp Business configurado",
        PAGE: "Página com link de reserva",
        AI: "Atendente de IA (opcional)",
      },
    },
    TAGLINE: {
      MODERN_UI: "Interfaces modernas",
      PERFORMANCE: "Performance",
      SCALABILITY: "Escalabilidade",
      AI_ASSISTED: "Engenharia de Software Assistida por IA",
    },
  },
};

function renderHero() {
  render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <Hero />
    </NextIntlClientProvider>,
  );
}

describe("Hero", () => {
  it("renders the headline, highlighted subtitle and contact info", () => {
    renderHero();

    expect(
      screen.getByRole("heading", { level: 1, name: /Arquitetura de front‑end que escala/ }),
    ).toBeInTheDocument();
    expect(screen.getByText("escala")).toBeInTheDocument();
    expect(screen.getByText("Alisson Henriques · Desenvolvedor Front‑End Sênior")).toBeInTheDocument();
    expect(screen.getByText("experiência do usuário")).toBeInTheDocument();
    expect(screen.getByText("Interfaces modernas")).toBeInTheDocument();
    expect(screen.getByText("Engenharia de Software Assistida por IA")).toBeInTheDocument();
    expect(screen.getByText("alishenriques@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("(11) 98118-4672")).toBeInTheDocument();
  });

  it("swaps to the services pitch when the next control is clicked, and back on prev", () => {
    renderHero();

    fireEvent.click(screen.getByRole("button", { name: "Próximo slide" }));

    expect(
      screen.getByRole("heading", { level: 1, name: /Quer vender mais nessa temporada/ }),
    ).toBeInTheDocument();
    expect(screen.getByText("Google Meu Negócio arrumado")).toBeInTheDocument();
    expect(screen.getByText("Atendente de IA (opcional)")).toBeInTheDocument();
    // Constant chrome stays put across slides.
    expect(screen.getByText("alishenriques@gmail.com")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Slide anterior" }));

    expect(
      screen.getByRole("heading", { level: 1, name: /Arquitetura de front‑end que escala/ }),
    ).toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";

import { Hero } from "../Hero";

const messages = {
  HOME: {
    EYEBROW: "Alisson Henriques · Desenvolvedor Front‑End Sênior",
    HEADLINE: "Arquitetura de <tag>front-end</tag> que <hl>escala</hl> — construída com engenharia e IA.",
    SUBTITLE: "Foco em <hl>experiência do usuário</hl>.",
    SLIDE_NAV: {
      PREV: "Slide anterior",
      NEXT: "Próximo slide",
      LABEL: "Navegação de slides",
      GOTO: "Ir para o slide {number}",
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
  return render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <Hero />
    </NextIntlClientProvider>,
  );
}

describe("Hero", () => {
  it("renders the headline, highlighted subtitle and contact info", () => {
    renderHero();

    expect(
      screen.getByRole("heading", { level: 1, name: /Arquitetura de front-end que escala/ }),
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
    const { container } = renderHero();
    const growthTraceSvg = () => container.querySelector('svg[viewBox="0 0 260 40"]');

    fireEvent.click(screen.getByRole("button", { name: "Próximo slide" }));

    expect(
      screen.getByRole("heading", { level: 1, name: /Quer vender mais nessa temporada/ }),
    ).toBeInTheDocument();
    expect(screen.getByText("Google Meu Negócio arrumado")).toBeInTheDocument();
    expect(screen.getByText("Atendente de IA (opcional)")).toBeInTheDocument();
    // Constant chrome stays put across slides.
    expect(screen.getByText("alishenriques@gmail.com")).toBeInTheDocument();
    // The growth-chart SVG picks up slide 2's own accent too.
    expect(growthTraceSvg()).toHaveStyle({ "--growth-trace-color": "#38bdf8" });

    fireEvent.click(screen.getByRole("button", { name: "Slide anterior" }));
    expect(growthTraceSvg()?.getAttribute("style") ?? "").not.toContain("--growth-trace-color");

    expect(
      screen.getByRole("heading", { level: 1, name: /Arquitetura de front-end que escala/ }),
    ).toBeInTheDocument();
  });

  it("jumps to a slide via its dot, keeping the dots' selected state in sync", () => {
    renderHero();
    const dots = screen.getAllByRole("tab");
    expect(dots).toHaveLength(2);
    expect(dots[0]).toHaveAttribute("aria-selected", "true");
    expect(dots[1]).toHaveAttribute("aria-selected", "false");

    fireEvent.click(dots[1]);

    expect(
      screen.getByRole("heading", { level: 1, name: /Quer vender mais nessa temporada/ }),
    ).toBeInTheDocument();
    expect(dots[0]).toHaveAttribute("aria-selected", "false");
    expect(dots[1]).toHaveAttribute("aria-selected", "true");
  });
});

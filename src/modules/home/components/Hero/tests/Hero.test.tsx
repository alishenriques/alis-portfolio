import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";

import { Hero } from "../Hero";

const messages = {
  HOME: {
    EYEBROW: "Alisson Henriques - Engenheiro de Software Sênior",
    HEADLINE: "Arquitetura de <tag>front-end</tag> que <hl>escala</hl> — construída com engenharia e IA.",
    SUBTITLE: "Foco em <hl>experiência do usuário</hl>.",
    SLIDE_NAV: {
      PREV: "Slide anterior",
      NEXT: "Próximo slide",
      LABEL: "Navegação de slides",
      GOTO: "Ir para o slide {number}",
      PAUSE: "Pausar apresentação",
      PLAY: "Retomar apresentação",
    },
    SLIDE2: {
      HEADLINE: "Programação assistida por <hl>IA</hl> com <hl>precisão arquitetural</hl>.",
      SUBTITLE: "IA para <hl>acelerar entregas sem perder qualidade</hl>.",
    },
    SLIDE3: {
      HEADLINE: "Materializo <hl>ideias</hl> em <hl>produtos digitais</hl> completos.",
      SUBTITLE: "Sistemas completos, com <hl>front-end, back-end, banco de dados e integrações</hl>.",
    },
    TAGLINE: {
      MODERN_UI: "Interfaces modernas",
      PERFORMANCE: "Performance",
      SCALABILITY: "Escalabilidade",
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
    expect(screen.getByText("Alisson Henriques - Engenheiro de Software Sênior")).toBeInTheDocument();
    expect(screen.getByText("experiência do usuário")).toBeInTheDocument();
    expect(screen.getByText("Interfaces modernas")).toBeInTheDocument();
    expect(screen.getByText("alishenriques@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("(11) 98118-4672")).toBeInTheDocument();
  });

  it("swaps to the AI-assisted development pitch when the next control is clicked, and back on prev", () => {
    const { container } = renderHero();
    const growthTraceSvg = () => container.querySelector('svg[viewBox="0 0 260 40"]');
    const decor = (name: string) => container.querySelector(`[data-decor="${name}"]`);
    expect(decor("code")).toHaveAttribute("data-active", "true");
    expect(decor("ai")).toHaveAttribute("data-active", "false");

    fireEvent.click(screen.getByRole("button", { name: "Próximo slide" }));

    expect(
      screen.getByRole("heading", { level: 1, name: /Programação assistida por IA com precisão arquitetural/ }),
    ).toBeInTheDocument();
    expect(screen.getByText("acelerar entregas sem perder qualidade")).toBeInTheDocument();
    // The floating decorations swap to the AI set along with the copy.
    expect(decor("ai")).toHaveAttribute("data-active", "true");
    expect(decor("code")).toHaveAttribute("data-active", "false");
    // Constant chrome stays put across slides.
    expect(screen.getByText("alishenriques@gmail.com")).toBeInTheDocument();
    // The growth-chart SVG picks up slide 2's own accent too.
    expect(growthTraceSvg()).toHaveStyle({ "--growth-trace-color": "#38bdf8" });

    fireEvent.click(screen.getByRole("button", { name: "Slide anterior" }));
    expect(growthTraceSvg()?.getAttribute("style") ?? "").not.toContain("--growth-trace-color");
    expect(decor("code")).toHaveAttribute("data-active", "true");

    expect(
      screen.getByRole("heading", { level: 1, name: /Arquitetura de front-end que escala/ }),
    ).toBeInTheDocument();
  });

  it("jumps to a slide via its dot, keeping the dots' selected state in sync", () => {
    renderHero();
    const dots = screen.getAllByRole("tab");
    expect(dots).toHaveLength(3);
    expect(dots[0]).toHaveAttribute("aria-selected", "true");
    expect(dots[1]).toHaveAttribute("aria-selected", "false");

    fireEvent.click(dots[1]);

    expect(
      screen.getByRole("heading", { level: 1, name: /Programação assistida por IA/ }),
    ).toBeInTheDocument();
    expect(dots[0]).toHaveAttribute("aria-selected", "false");
    expect(dots[1]).toHaveAttribute("aria-selected", "true");
  });

  it("shows the ideas-into-products pitch on slide 3, in the neon pink accent, and wraps around to slide 1", () => {
    const { container } = renderHero();
    const growthTraceSvg = () => container.querySelector('svg[viewBox="0 0 260 40"]');
    const decor = (name: string) => container.querySelector(`[data-decor="${name}"]`);

    fireEvent.click(screen.getAllByRole("tab")[2]);

    expect(
      screen.getByRole("heading", { level: 1, name: /Materializo ideias em produtos digitais completos/ }),
    ).toBeInTheDocument();
    expect(screen.getByText("front-end, back-end, banco de dados e integrações")).toBeInTheDocument();
    expect(decor("ideas")).toHaveAttribute("data-active", "true");
    expect(decor("ai")).toHaveAttribute("data-active", "false");
    expect(decor("code")).toHaveAttribute("data-active", "false");
    expect(growthTraceSvg()).toHaveStyle({ "--growth-trace-color": "var(--ds-color-tertiary)" });
    expect(screen.getAllByRole("tab")[2]).toHaveStyle({ background: "var(--ds-color-tertiary)" });

    fireEvent.click(screen.getByRole("button", { name: "Próximo slide" }));
    expect(
      screen.getByRole("heading", { level: 1, name: /Arquitetura de front-end que escala/ }),
    ).toBeInTheDocument();
  });

  it("goes back from slide 1 to slide 3 on prev", () => {
    renderHero();

    fireEvent.click(screen.getByRole("button", { name: "Slide anterior" }));

    expect(screen.getByRole("heading", { level: 1, name: /Materializo ideias/ })).toBeInTheDocument();
  });

  describe("autoplay", () => {
    const progress = () => screen.getByTestId("hero-progress");
    const currentHeadline = () => screen.getByRole("heading", { level: 1 }).textContent;
    // jsdom has no AnimationEvent, so React listens for the vendor-prefixed
    // name instead of "animationend"; fire that one directly.
    const endProgress = () => fireEvent(progress(), new Event("webkitAnimationEnd", { bubbles: true }));

    it("advances to the next slide when the progress line finishes", () => {
      renderHero();
      expect(progress()).toHaveStyle({ animationPlayState: "running" });

      endProgress();

      expect(currentHeadline()).toMatch(/Programação assistida por IA/);
    });

    it("keeps running on hover and after a control is clicked (only the pause button pauses)", () => {
      const { container } = renderHero();
      const section = container.querySelector("section")!;
      const next = screen.getByRole("button", { name: "Próximo slide" });

      fireEvent.mouseEnter(section);
      fireEvent.focus(next);
      fireEvent.click(next);

      expect(progress()).toHaveStyle({ animationPlayState: "running" });
      endProgress();
      expect(currentHeadline()).toMatch(/Materializo ideias/);
    });

    it("toggles with the pause button, and resumes autoplay when played again", () => {
      renderHero();

      fireEvent.click(screen.getByRole("button", { name: "Pausar apresentação" }));
      expect(progress()).toHaveStyle({ animationPlayState: "paused" });

      fireEvent.click(screen.getByRole("button", { name: "Retomar apresentação" }));
      expect(progress()).toHaveStyle({ animationPlayState: "running" });
      expect(screen.getByRole("button", { name: "Pausar apresentação" })).toBeInTheDocument();

      endProgress();
      expect(currentHeadline()).toMatch(/Programação assistida por IA/);
    });

    it("stays paused across manual slide changes until resumed", () => {
      renderHero();

      fireEvent.click(screen.getByRole("button", { name: "Pausar apresentação" }));
      fireEvent.click(screen.getByRole("button", { name: "Próximo slide" }));

      expect(progress()).toHaveStyle({ animationPlayState: "paused" });
    });
  });
});

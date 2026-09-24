import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";

import { FeatureChips } from "../FeatureChips";

const messages = {
  HOME: {
    FEATURES: {
      TITLE: "O que eu valorizo",
      TYPESCRIPT: { LABEL: "Tipagem forte", HIGHLIGHT: "com TypeScript" },
      COMPONENTS: { LABEL: "Componentes", HIGHLIGHT: "reutilizáveis" },
      PERFORMANCE: { LABEL: "Foco em", HIGHLIGHT: "performance" },
      ACCESSIBLE: { LABEL: "UI responsiva", HIGHLIGHT: "e acessível" },
      ARCHITECTURE: { LABEL: "Arquitetura", HIGHLIGHT: "escalável" },
      TESTS: { LABEL: "Testes", HIGHLIGHT: "automatizados" },
      CLEAN_CODE: { LABEL: "Código", HIGHLIGHT: "limpo" },
      RESPONSIBLE_AI: { LABEL: "Desenvolvimento de IA", HIGHLIGHT: "responsável" },
      PROCESS_OPTIMIZATION: { LABEL: "Otimização de", HIGHLIGHT: "processos" },
      OPERATIONAL_EXCELLENCE: { LABEL: "Excelência", HIGHLIGHT: "operacional" },
    },
  },
};

describe("FeatureChips", () => {
  it("renders a titled section with all ten feature items", () => {
    render(
      <NextIntlClientProvider locale="pt" messages={messages}>
        <FeatureChips />
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole("heading", { level: 2, name: "O que eu valorizo" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(10);
    expect(screen.getByText("com TypeScript")).toBeInTheDocument();
    expect(screen.getByText("automatizados")).toBeInTheDocument();
    expect(screen.getByText("limpo")).toBeInTheDocument();
    expect(screen.getByText("responsável")).toBeInTheDocument();
    expect(screen.getByText("processos")).toBeInTheDocument();
    expect(screen.getByText("operacional")).toBeInTheDocument();
  });
});

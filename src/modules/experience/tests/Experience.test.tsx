import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it, vi } from "vitest";

import { getExperiences } from "@/lib/portfolio";

import { Experience } from "../Experience";

vi.mock("@/lib/portfolio", () => ({
  getExperiences: vi.fn(),
}));

vi.mock("next-intl/server", () => ({
  getTranslations: async (namespace: string) => (key: string, values?: Record<string, unknown>) =>
    values ? `${namespace}.${key}(${JSON.stringify(values)})` : `${namespace}.${key}`,
}));

const experience = {
  id: "1",
  company: "Ingresse",
  companyLogoUrl: null,
  role: "Desenvolvedor Front-End Sênior",
  startDate: "2022-10",
  endDate: "2025-07",
  description: "Descrição",
  sortOrder: 0,
};

const messages = { EXPERIENCE: { PRESENT: "presente" } };

describe("Experience", () => {
  it("renders one item per experience", async () => {
    vi.mocked(getExperiences).mockResolvedValue([experience]);

    render(
      <NextIntlClientProvider locale="pt" messages={messages}>
        {await Experience()}
      </NextIntlClientProvider>,
    );

    expect(
      screen.getByRole("heading", { name: /Desenvolvedor Front-End Sênior.*Ingresse/ }),
    ).toBeInTheDocument();
  });

  it("shows the empty state when there are no experiences", async () => {
    vi.mocked(getExperiences).mockResolvedValue([]);

    render(
      <NextIntlClientProvider locale="pt" messages={messages}>
        {await Experience()}
      </NextIntlClientProvider>,
    );

    expect(screen.getByText("EXPERIENCE.EMPTY")).toBeInTheDocument();
  });
});

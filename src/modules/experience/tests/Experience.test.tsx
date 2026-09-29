import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it, vi } from "vitest";

import { getExperiences } from "@/lib/portfolio";
import type { Experience as ExperienceType } from "@/lib/schemas";

import { Experience } from "../Experience";

vi.mock("@/lib/portfolio", () => ({
  getExperiences: vi.fn(),
}));

vi.mock("next-intl/server", () => ({
  getTranslations: async (namespace: string) => (key: string, values?: Record<string, unknown>) =>
    values ? `${namespace}.${key}(${JSON.stringify(values)})` : `${namespace}.${key}`,
}));

function experience(overrides: Partial<ExperienceType> = {}): ExperienceType {
  return {
    id: "1",
    company: "Ingresse",
    companyLogoUrl: null,
    role: "Desenvolvedor Front-End Sênior",
    startDate: "2022-10",
    endDate: "2025-07",
    description: "Descrição",
    isCorporate: true,
    sortOrder: 0,
    ...overrides,
  };
}

const messages = { EXPERIENCE: { PRESENT: "presente" } };

describe("Experience", () => {
  it("renders one item per corporate experience", async () => {
    vi.mocked(getExperiences).mockResolvedValue([experience()]);

    render(
      <NextIntlClientProvider locale="pt" messages={messages}>
        {await Experience()}
      </NextIntlClientProvider>,
    );

    expect(
      screen.getByRole("heading", { name: /Desenvolvedor Front-End Sênior.*Ingresse/ }),
    ).toBeInTheDocument();
  });

  it("excludes non-corporate work history (e.g. a public-sector internship) from the list and the count", async () => {
    vi.mocked(getExperiences).mockResolvedValue([
      experience({ id: "1", company: "Ingresse" }),
      experience({ id: "2", company: "Tribunal Regional Federal", isCorporate: false }),
    ]);

    render(
      <NextIntlClientProvider locale="pt" messages={messages}>
        {await Experience()}
      </NextIntlClientProvider>,
    );

    expect(screen.getByText(/Ingresse/)).toBeInTheDocument();
    expect(screen.queryByText(/Tribunal Regional Federal/)).not.toBeInTheDocument();
    // The heading text comes from the mocked t("SUBTITLE", { count }) — count
    // should reflect only the one corporate entry, not both.
    expect(screen.getByText(/"count":1/)).toBeInTheDocument();
  });

  it("shows the empty state when there are no corporate experiences", async () => {
    vi.mocked(getExperiences).mockResolvedValue([]);

    render(
      <NextIntlClientProvider locale="pt" messages={messages}>
        {await Experience()}
      </NextIntlClientProvider>,
    );

    expect(screen.getByText("EXPERIENCE.EMPTY")).toBeInTheDocument();
  });

  it("shows the empty state when every experience is non-corporate", async () => {
    vi.mocked(getExperiences).mockResolvedValue([experience({ isCorporate: false })]);

    render(
      <NextIntlClientProvider locale="pt" messages={messages}>
        {await Experience()}
      </NextIntlClientProvider>,
    );

    expect(screen.getByText("EXPERIENCE.EMPTY")).toBeInTheDocument();
  });
});

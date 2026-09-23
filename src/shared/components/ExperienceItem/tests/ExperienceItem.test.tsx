import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";

import type { Experience } from "@/lib/schemas";

import { ExperienceItem } from "../ExperienceItem";

const experience: Experience = {
  id: "1",
  company: "Ingresse",
  companyLogoUrl: null,
  role: "Desenvolvedor Front-End Sênior",
  startDate: "2022-10",
  endDate: "2025-07",
  description: "Linha 1\nLinha 2",
  sortOrder: 0,
};

function renderItem(experienceOverrides: Partial<Experience> = {}, locale = "pt") {
  const messages = { EXPERIENCE: { PRESENT: locale === "en" ? "present" : "presente" } };
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ExperienceItem experience={{ ...experience, ...experienceOverrides }} />
    </NextIntlClientProvider>,
  );
}

describe("ExperienceItem", () => {
  it("renders the role, company and formatted date range", () => {
    renderItem();
    expect(
      screen.getByRole("heading", { name: /Desenvolvedor Front-End Sênior.*Ingresse/ }),
    ).toBeInTheDocument();
    expect(screen.getByText("out/2022 — jul/2025")).toBeInTheDocument();
  });

  it("reads a null endDate as ongoing, in the current locale", () => {
    renderItem({ endDate: null });
    expect(screen.getByText("out/2022 — presente")).toBeInTheDocument();
  });

  it("formats months and the ongoing label in English", () => {
    renderItem({ endDate: null }, "en");
    expect(screen.getByText("Oct/2022 — present")).toBeInTheDocument();
  });
});

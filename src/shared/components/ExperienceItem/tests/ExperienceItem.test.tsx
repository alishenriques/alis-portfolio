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
  roleEn: null,
  startDate: "2022-10",
  endDate: "2025-07",
  description: "Linha 1\nLinha 2",
  descriptionEn: null,
  isCorporate: true,
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

  it("shows the English role and description under /en", () => {
    renderItem({ roleEn: "Senior Front-End Developer", descriptionEn: "English text" }, "en");
    expect(
      screen.getByRole("heading", { name: /Senior Front-End Developer.*Ingresse/ }),
    ).toBeInTheDocument();
    expect(screen.getByText("English text")).toBeInTheDocument();
  });

  it("falls back to Portuguese under /en when there's no translation", () => {
    renderItem({}, "en");
    expect(
      screen.getByRole("heading", { name: /Desenvolvedor Front-End Sênior.*Ingresse/ }),
    ).toBeInTheDocument();
  });

  it("keeps Portuguese under /pt even with a translation", () => {
    renderItem({ roleEn: "Senior Front-End Developer", descriptionEn: "English text" });
    expect(screen.queryByText("English text")).not.toBeInTheDocument();
  });
});

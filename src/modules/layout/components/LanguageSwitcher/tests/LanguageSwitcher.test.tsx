import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it, vi } from "vitest";

import { LanguageSwitcher } from "../LanguageSwitcher";

vi.mock("@/i18n/navigation", () => ({
  usePathname: () => "/sobre",
  Link: ({ children, locale, ...props }: { children: React.ReactNode; locale: string }) => (
    <a data-locale={locale} {...props}>
      {children}
    </a>
  ),
}));

function renderWithIntl() {
  return render(
    <NextIntlClientProvider locale="pt" messages={{}}>
      <LanguageSwitcher />
    </NextIntlClientProvider>,
  );
}

describe("LanguageSwitcher", () => {
  it("renders a link for every configured locale", () => {
    renderWithIntl();
    expect(screen.getByText("PT")).toBeInTheDocument();
    expect(screen.getByText("EN")).toBeInTheDocument();
  });

  it("marks the active locale", () => {
    renderWithIntl();
    expect(screen.getByText("PT")).toHaveAttribute("aria-current", "true");
    expect(screen.getByText("EN")).not.toHaveAttribute("aria-current");
  });
});

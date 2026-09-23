import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it, vi } from "vitest";

import { ContactDialogProvider } from "../../../ContactDialogContext";
import { TopBar } from "../TopBar";

vi.mock("@/i18n/navigation", () => ({
  usePathname: () => "/",
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const messages = {
  NAV: {
    HOME: "Início",
    ABOUT: "Sobre",
    EXPERIENCE: "Experiência",
    PROJECTS: "Projetos",
    OPEN_MENU: "Abrir menu",
    CLOSE_MENU: "Fechar menu",
  },
  CONTACT: { OPEN: "Vamos conversar" },
};

describe("TopBar", () => {
  it("renders the menu trigger and both language options", () => {
    render(
      <NextIntlClientProvider locale="pt" messages={messages}>
        <ContactDialogProvider>
          <TopBar />
        </ContactDialogProvider>
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole("button", { name: "Abrir menu" })).toBeInTheDocument();
    expect(screen.getByText("PT")).toBeInTheDocument();
    expect(screen.getByText("EN")).toBeInTheDocument();
  });
});

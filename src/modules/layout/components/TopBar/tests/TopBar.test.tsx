import { fireEvent, render, screen } from "@testing-library/react";
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
    PRIMARY: "Navegação principal",
    LOGO_LABEL: "Alisson Henriques — início",
  },
  CONTACT: { OPEN: "Vamos conversar" },
};

function renderTopBar() {
  return render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <ContactDialogProvider>
        <TopBar />
      </ContactDialogProvider>
    </NextIntlClientProvider>,
  );
}

describe("TopBar", () => {
  it("renders the menu trigger, the language options and the desktop contact button", () => {
    renderTopBar();

    expect(screen.getByRole("button", { name: "Abrir menu" })).toBeInTheDocument();
    expect(screen.getByText("PT")).toBeInTheDocument();
    expect(screen.getByText("EN")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Vamos conversar" }).length).toBeGreaterThan(0);
  });

  it("renders the desktop navigation in the header, separate from the drawer", () => {
    renderTopBar();

    const header = screen.getByRole("banner");
    expect(header.querySelector("nav")).not.toBeNull();
    // The drawer must be a sibling of <header>, never inside it (backdrop-filter
    // on the header would otherwise become its containing block).
    expect(header.querySelector("aside")).toBeNull();
    expect(document.querySelector("aside")).not.toBeNull();
  });

  it("opens the drawer from the hamburger and closes it again", () => {
    renderTopBar();
    const drawerLinks = () => document.querySelectorAll("aside a");
    expect(document.querySelector("aside")).toHaveAttribute("aria-hidden", "true");
    expect(drawerLinks()).toHaveLength(4);

    fireEvent.click(screen.getByRole("button", { name: "Abrir menu" }));
    expect(document.querySelector("aside")).toHaveAttribute("aria-hidden", "false");

    fireEvent.click(screen.getByRole("button", { name: "Fechar menu" }));
    expect(document.querySelector("aside")).toHaveAttribute("aria-hidden", "true");
  });
});

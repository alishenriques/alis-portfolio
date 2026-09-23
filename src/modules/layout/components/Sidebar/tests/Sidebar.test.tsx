import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it, vi } from "vitest";

import { ContactDialogProvider, useContactDialog } from "../../../ContactDialogContext";
import { Sidebar } from "../Sidebar";

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

function Probe() {
  const { isOpen } = useContactDialog();
  return <span data-testid="contact-open">{String(isOpen)}</span>;
}

function renderSidebar() {
  return render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <ContactDialogProvider>
        <Sidebar />
        <Probe />
      </ContactDialogProvider>
    </NextIntlClientProvider>,
  );
}

// The drawer stays mounted and slides off-screen via a CSS transform (not
// display/visibility), so its accessibility is driven by `aria-hidden` on the
// <aside>, not the drawer's own visual state. getByRole excludes aria-hidden
// subtrees by default, which is exactly what these assertions rely on.
describe("Sidebar", () => {
  it("is closed by default and opens on trigger click", () => {
    renderSidebar();
    expect(screen.queryByRole("link", { name: "Início" })).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Abrir menu" }));
    expect(screen.getByRole("link", { name: "Início" })).toBeInTheDocument();
  });

  it("closes on the close button", () => {
    renderSidebar();
    fireEvent.click(screen.getByRole("button", { name: "Abrir menu" }));
    fireEvent.click(screen.getByRole("button", { name: "Fechar menu" }));
    expect(screen.queryByRole("link", { name: "Início" })).toBeNull();
  });

  it("closes on Escape", () => {
    renderSidebar();
    fireEvent.click(screen.getByRole("button", { name: "Abrir menu" }));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("link", { name: "Início" })).toBeNull();
  });

  it("closes and opens the contact dialog when the contact item is picked", () => {
    renderSidebar();
    fireEvent.click(screen.getByRole("button", { name: "Abrir menu" }));
    fireEvent.click(screen.getByRole("button", { name: "Vamos conversar" }));

    expect(screen.getByTestId("contact-open")).toHaveTextContent("true");
    expect(screen.queryByRole("link", { name: "Início" })).toBeNull();
  });
});

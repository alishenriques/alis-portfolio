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
    CLOSE_MENU: "Fechar menu",
    PRIMARY: "Navegação principal",
  },
  CONTACT: { OPEN: "Vamos conversar" },
};

function Probe() {
  const { isOpen } = useContactDialog();
  return <span data-testid="contact-open">{String(isOpen)}</span>;
}

function renderSidebar(isOpen: boolean, onClose = vi.fn()) {
  render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <ContactDialogProvider>
        <Sidebar isOpen={isOpen} onClose={onClose} />
        <Probe />
      </ContactDialogProvider>
    </NextIntlClientProvider>,
  );
  return onClose;
}

// The drawer stays mounted and slides off-screen via a CSS transform (not
// display/visibility), so its accessibility is driven by `aria-hidden` on the
// <aside>. getByRole excludes aria-hidden subtrees by default, which is what
// these assertions rely on.
describe("Sidebar", () => {
  it("is hidden from the accessibility tree while closed", () => {
    renderSidebar(false);
    expect(screen.queryByRole("link", { name: "Início" })).toBeNull();
  });

  it("exposes the navigation links while open", () => {
    renderSidebar(true);
    expect(screen.getByRole("link", { name: "Início" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Experiência" })).toBeInTheDocument();
  });

  it("locks page scroll only while open", () => {
    const { rerender } = render(
      <NextIntlClientProvider locale="pt" messages={messages}>
        <ContactDialogProvider>
          <Sidebar isOpen onClose={vi.fn()} />
        </ContactDialogProvider>
      </NextIntlClientProvider>,
    );
    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <NextIntlClientProvider locale="pt" messages={messages}>
        <ContactDialogProvider>
          <Sidebar isOpen={false} onClose={vi.fn()} />
        </ContactDialogProvider>
      </NextIntlClientProvider>,
    );
    expect(document.body.style.overflow).toBe("");
  });

  it("asks to close from the close button, the backdrop and Escape", () => {
    const onClose = renderSidebar(true);

    fireEvent.click(screen.getByRole("button", { name: "Fechar menu" }));
    fireEvent.keyDown(document, { key: "Escape" });
    fireEvent.click(document.querySelector("[aria-hidden='true'].fixed") as HTMLElement);

    expect(onClose).toHaveBeenCalledTimes(3);
  });

  it("does not react to Escape while closed", () => {
    const onClose = renderSidebar(false);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("closes and opens the contact dialog when the contact item is picked", () => {
    const onClose = renderSidebar(true);
    fireEvent.click(screen.getByRole("button", { name: "Vamos conversar" }));

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("contact-open")).toHaveTextContent("true");
  });
});

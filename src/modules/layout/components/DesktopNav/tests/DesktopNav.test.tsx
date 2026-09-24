import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it, vi } from "vitest";

import { DesktopNav } from "../DesktopNav";

vi.mock("@/i18n/navigation", () => ({
  usePathname: () => "/sobre",
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
    PRIMARY: "Navegação principal",
  },
};

function renderNav() {
  return render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <DesktopNav />
    </NextIntlClientProvider>,
  );
}

describe("DesktopNav", () => {
  it("renders one link per menu item inside a labelled nav", () => {
    renderNav();
    expect(screen.getByRole("navigation", { name: "Navegação principal" })).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(4);
    expect(screen.getByRole("link", { name: "Projetos" })).toHaveAttribute("href", "/#projetos");
  });

  it("marks only the current page with aria-current", () => {
    renderNav();
    expect(screen.getByRole("link", { name: "Sobre" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Início" })).not.toHaveAttribute("aria-current");
  });

  it("keeps the decorative prompt glyphs out of the accessible name", () => {
    renderNav();
    // Links are named by the label alone, not "> ~/ sobre".
    expect(screen.getByRole("link", { name: "Sobre" })).toBeInTheDocument();
  });
});

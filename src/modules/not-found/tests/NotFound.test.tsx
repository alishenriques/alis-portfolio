import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, describe, expect, it, vi } from "vitest";

import ptMessages from "@/locales/pt.json";

import { NotFound } from "../NotFound";

const back = vi.fn();

vi.mock("@/i18n/navigation", () => ({
  useRouter: () => ({ back }),
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

function renderNotFound() {
  return render(
    <NextIntlClientProvider locale="pt" messages={ptMessages}>
      <NotFound />
    </NextIntlClientProvider>,
  );
}

function stubHistoryLength(length: number) {
  vi.spyOn(window.history, "length", "get").mockReturnValue(length);
}

afterEach(() => {
  vi.restoreAllMocks();
  back.mockClear();
});

describe("NotFound", () => {
  it("shows the 404 heading, the hint and the OOPS robot", () => {
    renderNotFound();

    expect(screen.getByRole("heading", { level: 1, name: "Não encontramos essa página" })).toBeInTheDocument();
    expect(screen.getByText("Verifique a URL ou volte para a página anterior.")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Robô em pixel art segurando uma placa escrita OOPS!" })).toBeInTheDocument();
  });

  it("links the logo to the home page", () => {
    renderNotFound();
    expect(screen.getByRole("link", { name: "Alisson Henriques — início" })).toHaveAttribute("href", "/");
  });

  it("goes back in history when there is a previous page", async () => {
    stubHistoryLength(3);
    renderNotFound();

    await userEvent.click(screen.getByRole("link", { name: "Voltar para a página anterior" }));
    expect(back).toHaveBeenCalledOnce();
  });

  it("falls back to the home link when the tab has no previous page", async () => {
    stubHistoryLength(1);
    renderNotFound();

    const link = screen.getByRole("link", { name: "Voltar para a página anterior" });
    expect(link).toHaveAttribute("href", "/");
    await userEvent.click(link);
    expect(back).not.toHaveBeenCalled();
  });
});

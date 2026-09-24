import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";

import { Footer } from "../Footer";

const messages = {
  FOOTER: {
    LABEL: "Rodapé",
    GITHUB: "Perfil do GitHub",
    LINKEDIN: "Perfil do LinkedIn",
  },
};

describe("Footer", () => {
  it("links to GitHub and LinkedIn in a new tab, with accessible names", () => {
    render(
      <NextIntlClientProvider locale="pt" messages={messages}>
        <Footer />
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole("contentinfo", { name: "Rodapé" })).toBeInTheDocument();

    const github = screen.getByRole("link", { name: "Perfil do GitHub" });
    expect(github).toHaveAttribute("href", "https://github.com/alishenriques");
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", expect.stringContaining("noopener"));

    expect(screen.getByRole("link", { name: "Perfil do LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/alisson-henriques",
    );
  });
});

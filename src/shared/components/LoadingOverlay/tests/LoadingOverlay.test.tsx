import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";

import { LoadingOverlay } from "../LoadingOverlay";

const messages = { COMMON: { LOADING: "Carregando" } };

function renderOverlay() {
  return render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <LoadingOverlay />
    </NextIntlClientProvider>,
  );
}

describe("LoadingOverlay", () => {
  it("announces itself as a status region carrying the loading caption", () => {
    renderOverlay();
    expect(screen.getByRole("status")).toHaveTextContent("Carregando");
  });

  // The logo/ring stage is purely decorative (aria-hidden); the accessible name
  // comes from the caption text, so the logo's own `role="img"` must not leak
  // into the a11y tree. Same aria-hidden-exclusion pattern as the Sidebar tests.
  it("hides the animated logo from the accessibility tree", () => {
    renderOverlay();
    expect(screen.queryByRole("img")).toBeNull();
  });
});

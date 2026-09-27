import { act, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";

import { beginHttpRequest, endHttpRequest } from "@/lib/httpActivity";

import { HttpActivityOverlay } from "../HttpActivityOverlay";

const messages = { COMMON: { LOADING: "Carregando" } };

function renderOverlay() {
  return render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <HttpActivityOverlay />
    </NextIntlClientProvider>,
  );
}

describe("HttpActivityOverlay", () => {
  it("stays hidden while no browser request is in flight", () => {
    renderOverlay();
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("shows the loading overlay while a request is pending, and hides it once it settles", () => {
    renderOverlay();

    act(() => beginHttpRequest());
    expect(screen.getByRole("status")).toBeInTheDocument();

    act(() => endHttpRequest());
    expect(screen.queryByRole("status")).toBeNull();
  });
});

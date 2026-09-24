import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";

import { ContactDialogProvider, useContactDialog } from "../../../ContactDialogContext";
import { ContactButton } from "../ContactButton";

function Probe() {
  const { isOpen } = useContactDialog();
  return <span data-testid="contact-open">{String(isOpen)}</span>;
}

describe("ContactButton", () => {
  it("opens the contact dialog", () => {
    render(
      <NextIntlClientProvider locale="pt" messages={{ CONTACT: { OPEN: "Vamos conversar" } }}>
        <ContactDialogProvider>
          <ContactButton />
          <Probe />
        </ContactDialogProvider>
      </NextIntlClientProvider>,
    );

    expect(screen.getByTestId("contact-open")).toHaveTextContent("false");
    fireEvent.click(screen.getByRole("button", { name: "Vamos conversar" }));
    expect(screen.getByTestId("contact-open")).toHaveTextContent("true");
  });
});

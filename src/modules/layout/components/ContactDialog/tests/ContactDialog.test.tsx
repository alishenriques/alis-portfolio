import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it, vi } from "vitest";

import { sendContactMessage } from "@/lib/portfolio";

import { ContactDialogProvider, useContactDialog } from "../../../ContactDialogContext";
import { ContactDialog } from "../ContactDialog";

vi.mock("@/lib/portfolio", () => ({
  sendContactMessage: vi.fn(),
}));

const messages = {
  CONTACT: {
    TITLE: "Vamos conversar?",
    NAME: "Nome",
    EMAIL: "Seu e-mail",
    MESSAGE: "Mensagem",
    SEND: "Enviar mensagem",
    SENDING: "Enviando…",
    SUCCESS: "Mensagem enviada!",
    ERROR: "Não foi possível enviar. Escreva para {email}.",
    CLOSE: "Fechar",
  },
};

function AutoOpen() {
  const { open } = useContactDialog();
  return (
    <button type="button" onClick={open}>
      open
    </button>
  );
}

function renderDialog() {
  return render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <ContactDialogProvider>
        <AutoOpen />
        <ContactDialog />
      </ContactDialogProvider>
    </NextIntlClientProvider>,
  );
}

function fillValidForm() {
  fireEvent.change(screen.getByPlaceholderText("Nome"), { target: { value: "Ana" } });
  fireEvent.change(screen.getByPlaceholderText("Seu e-mail"), { target: { value: "ana@example.com" } });
  fireEvent.change(screen.getByPlaceholderText("Mensagem"), { target: { value: "Olá!" } });
}

describe("ContactDialog", () => {
  it("renders nothing until opened", () => {
    renderDialog();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens with the form visible", () => {
    renderDialog();
    fireEvent.click(screen.getByText("open"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("sends the form and shows the success state", async () => {
    vi.mocked(sendContactMessage).mockResolvedValue(true);
    renderDialog();
    fireEvent.click(screen.getByText("open"));
    fillValidForm();

    fireEvent.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    await waitFor(() => expect(screen.getByText("Mensagem enviada!")).toBeInTheDocument());
    expect(sendContactMessage).toHaveBeenCalledWith({
      name: "Ana",
      email: "ana@example.com",
      message: "Olá!",
      website: "",
    });
  });

  it("shows an error message when sending fails", async () => {
    vi.mocked(sendContactMessage).mockRejectedValue(new Error("network"));
    renderDialog();
    fireEvent.click(screen.getByText("open"));
    fillValidForm();

    fireEvent.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    await waitFor(() =>
      expect(screen.getByText(/Não foi possível enviar/)).toBeInTheDocument(),
    );
  });

  it("blocks submission client-side when the honeypot is filled", () => {
    renderDialog();
    fireEvent.click(screen.getByText("open"));
    fillValidForm();

    const honeypot = document.querySelector('input[name="website"]') as HTMLInputElement;
    fireEvent.change(honeypot, { target: { value: "http://spam.example" } });
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    expect(sendContactMessage).not.toHaveBeenCalled();
  });

  it("closes on Escape", () => {
    renderDialog();
    fireEvent.click(screen.getByText("open"));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

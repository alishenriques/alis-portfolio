import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { LoadingButton } from "../LoadingButton";

describe("LoadingButton", () => {
  it("renders its children and stays enabled while idle", () => {
    render(
      <LoadingButton isLoading={false} loadingText="enviando">
        Enviar
      </LoadingButton>,
    );

    const button = screen.getByRole("button", { name: "Enviar" });
    expect(button).toBeEnabled();
    expect(button).not.toHaveAttribute("aria-busy");
  });

  it("swaps to the terminal-style loading label and disables the button while loading", () => {
    render(
      <LoadingButton isLoading loadingText="enviando">
        Enviar
      </LoadingButton>,
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(screen.queryByText("Enviar")).toBeNull();
    expect(button).toHaveTextContent("enviando");
  });

  it("stays disabled while loading even if the caller passes disabled={false}", () => {
    render(
      <LoadingButton isLoading loadingText="enviando" disabled={false}>
        Enviar
      </LoadingButton>,
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("behaves like a normal button when idle: fires onClick, keeps its type", () => {
    const onClick = vi.fn();
    render(
      <LoadingButton type="submit" isLoading={false} loadingText="enviando" onClick={onClick}>
        Enviar
      </LoadingButton>,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

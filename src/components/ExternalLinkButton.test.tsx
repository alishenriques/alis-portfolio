import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ExternalLinkButton } from "./ExternalLinkButton";

describe("ExternalLinkButton", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("opens the href in a new tab when clicked", async () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    render(<ExternalLinkButton href="mailto:alishenriques@gmail.com">Let&apos;s talk</ExternalLinkButton>);

    await userEvent.click(screen.getByRole("button", { name: "Let's talk" }));

    expect(open).toHaveBeenCalledWith(
      "mailto:alishenriques@gmail.com",
      "_blank",
      "noopener,noreferrer",
    );
  });
});

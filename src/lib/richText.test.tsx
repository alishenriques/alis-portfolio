import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { parseBio, renderInlineMarkup } from "./richText";

describe("parseBio", () => {
  it("splits blank-line-separated text into paragraph blocks", () => {
    const bio = "Primeiro parágrafo.\n\nSegundo parágrafo.";
    expect(parseBio(bio)).toEqual([
      { type: "paragraph", text: "Primeiro parágrafo." },
      { type: "paragraph", text: "Segundo parágrafo." },
    ]);
  });

  it("treats a '> ' prefixed paragraph as a quote block, prefix stripped", () => {
    const bio = "Texto normal.\n\n> Uma frase de destaque.\n\nMais texto.";
    expect(parseBio(bio)).toEqual([
      { type: "paragraph", text: "Texto normal." },
      { type: "quote", text: "Uma frase de destaque." },
      { type: "paragraph", text: "Mais texto." },
    ]);
  });

  it("tolerates extra blank lines and surrounding whitespace", () => {
    const bio = "\n\nA.\n\n\n\nB.\n\n";
    expect(parseBio(bio)).toEqual([
      { type: "paragraph", text: "A." },
      { type: "paragraph", text: "B." },
    ]);
  });
});

describe("renderInlineMarkup", () => {
  it("renders **bold** runs as <strong>, leaving the rest as plain text", () => {
    const { container } = render(<p>{renderInlineMarkup("normal **destacado** normal")}</p>);
    expect(container.querySelector("strong")).toHaveTextContent("destacado");
    expect(container).toHaveTextContent("normal destacado normal");
  });

  it("returns the text unchanged when there is no bold markup", () => {
    const { container } = render(<p>{renderInlineMarkup("sem destaque nenhum")}</p>);
    expect(container.querySelector("strong")).toBeNull();
    expect(container).toHaveTextContent("sem destaque nenhum");
  });
});

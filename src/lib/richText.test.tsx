import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { estimateReadingMinutes, getBioHeadings, parseBio, renderInlineMarkup, slugify } from "./richText";

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

  it("treats a '## ' prefixed line as a heading block with a slugified id", () => {
    const bio = "Intro.\n\n## Uma Seção Aqui\n\nCorpo da seção.";
    expect(parseBio(bio)).toEqual([
      { type: "paragraph", text: "Intro." },
      { type: "heading", text: "Uma Seção Aqui", id: "uma-secao-aqui" },
      { type: "paragraph", text: "Corpo da seção." },
    ]);
  });
});

describe("getBioHeadings", () => {
  it("returns only the heading blocks, in order", () => {
    const bio = "Intro.\n\n## Primeira\n\nTexto.\n\n## Segunda\n\nMais texto.";
    expect(getBioHeadings(bio)).toEqual([
      { type: "heading", text: "Primeira", id: "primeira" },
      { type: "heading", text: "Segunda", id: "segunda" },
    ]);
  });

  it("returns an empty list when the bio has no headings", () => {
    expect(getBioHeadings("Só um parágrafo, sem seções.")).toEqual([]);
  });
});

describe("slugify", () => {
  it("lowercases, strips accents and collapses non-alphanumerics to hyphens", () => {
    expect(slugify("Como penso arquitetura")).toBe("como-penso-arquitetura");
    expect(slugify("IA no meu fluxo de trabalho")).toBe("ia-no-meu-fluxo-de-trabalho");
    expect(slugify("  Espaços & Símbolos!! ")).toBe("espacos-simbolos");
  });
});

describe("estimateReadingMinutes", () => {
  it("rounds up to whole minutes at ~200 words/minute", () => {
    const words = Array(250).fill("palavra").join(" ");
    expect(estimateReadingMinutes(words)).toBe(2);
  });

  it("never returns less than 1 minute, even for very short text", () => {
    expect(estimateReadingMinutes("Só isso.")).toBe(1);
  });

  it("does not count '##'/'>'/'**' markup characters as words", () => {
    const bio = "## Título\n\n> **Destaque** aqui.";
    expect(estimateReadingMinutes(bio)).toBe(1);
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

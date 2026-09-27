import type { ReactNode } from "react";

export type BioBlock =
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "heading"; text: string; id: string };

const WORDS_PER_MINUTE = 200;

/**
 * Splits `Profile.bio` (plain text from the CMS) into blocks on blank lines.
 * Three bits of standard Markdown syntax are recognised — familiar to write,
 * nothing new to learn:
 *  - a line starting with "## " becomes a heading (id slugified for anchors)
 *  - a paragraph starting with "> " becomes a pull-quote
 *  - everything else is a regular paragraph
 * `**bold**` runs inside paragraph/quote text are left as-is here; render
 * each block's `text` through `renderInlineMarkup`.
 */
export function parseBio(bio: string): BioBlock[] {
  return bio
    .split(/\n\s*\n/)
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((block): BioBlock => {
      if (block.startsWith("## ")) {
        const text = block.slice(3).trim();
        return { type: "heading", text, id: slugify(text) };
      }
      if (block.startsWith("> ")) {
        return { type: "quote", text: block.slice(2).trim() };
      }
      return { type: "paragraph", text: block };
    });
}

/** Only the headings from `parseBio(bio)` — for building a table of contents. */
export function getBioHeadings(bio: string) {
  return parseBio(bio).filter((block) => block.type === "heading");
}

/**
 * A URL-safe anchor id from a heading: lowercased, accents stripped, runs of
 * non-alphanumerics collapsed to a single hyphen.
 */
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Rough reading time in whole minutes (minimum 1), at ~200 words/minute —
 * a commonly cited average for Portuguese/English prose. Strips the "## "/
 * "> "/"**" markup before counting, so it reflects words actually read, not
 * syntax characters.
 */
export function estimateReadingMinutes(bio: string): number {
  const plainText = bio
    .replace(/^##\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/\*\*/g, "");
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

/**
 * Renders `**bold**` runs in `text` as `<strong>`, everything else as plain
 * text. The only inline markup `Profile.bio` supports — deliberately not a
 * full Markdown parser, since this is the one field that needs it.
 */
export function renderInlineMarkup(text: string): ReactNode[] {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  // split() on a capturing group alternates [plain, bold, plain, bold, ...];
  // odd indexes are always the captured (bold) runs.
  return parts.map((part, index) => (index % 2 === 1 ? <strong key={index}>{part}</strong> : part));
}

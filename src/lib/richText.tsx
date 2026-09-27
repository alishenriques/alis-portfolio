import type { ReactNode } from "react";

export type BioBlock = { type: "paragraph" | "quote"; text: string };

/**
 * Splits `Profile.bio` (plain text from the CMS) into paragraphs on blank
 * lines. A paragraph starting with "> " (standard Markdown blockquote syntax
 * — familiar to write, no new convention to learn) becomes a pull-quote
 * block instead of a regular paragraph. Inline `**bold**` runs are left as-is
 * here; render each block's `text` through `renderInlineMarkup`.
 */
export function parseBio(bio: string): BioBlock[] {
  return bio
    .split(/\n\s*\n/)
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((block): BioBlock => {
      if (block.startsWith("> ")) {
        return { type: "quote", text: block.slice(2).trim() };
      }
      return { type: "paragraph", text: block };
    });
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

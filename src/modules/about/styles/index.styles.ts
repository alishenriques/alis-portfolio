export const styles = {
  root: `
    mx-auto
    flex
    w-full
    max-w-3xl
    flex-1
    flex-col
    gap-12
    px-4
    py-16
    sm:px-6
  `,

  header: `
    flex
    flex-col
    items-center
    gap-6
    text-center
    sm:flex-row
    sm:items-start
    sm:text-left
  `,

  // The DS Avatar component owns its own size/border/crop (via props); this
  // is only the flex-layout concern of not letting it get squeezed in the row.
  avatar: `
    shrink-0
  `,

  name: `
    mt-3
    text-3xl
    font-semibold
    text-[var(--ds-color-fg)]
  `,

  headline: `
    mt-2
    text-lg
    font-medium
    text-[var(--ds-color-accent)]
  `,

  education: `
    mt-2
    flex
    items-center
    justify-center
    gap-2
    font-mono
    text-xs
    text-[var(--ds-color-muted)]
    sm:justify-start
  `,

  educationLabel: `
    tracking-[0.1em]
    text-[var(--ds-color-border-strong)]
    uppercase
  `,

  bioMeta: `
    flex
    flex-col
    gap-4
    border-y
    border-[var(--ds-color-border)]
    py-5
  `,

  readingTime: `
    flex
    items-center
    gap-2
    font-mono
    text-xs
    text-[var(--ds-color-muted)]
  `,

  toc: `
    flex
    flex-col
    gap-2
  `,

  tocTitle: `
    font-mono
    text-xs
    tracking-[0.2em]
    text-[var(--ds-color-muted)]
    uppercase
  `,

  tocList: `
    flex
    flex-col
    gap-1.5
    sm:flex-row
    sm:flex-wrap
    sm:gap-x-6
  `,

  tocLink: `
    inline-flex
    items-center
    gap-1.5
    font-mono
    text-sm
    text-[var(--ds-color-fg)]
    underline
    decoration-[var(--ds-color-border-strong)]
    underline-offset-4
    transition-colors
    duration-150
    hover:text-[var(--ds-color-accent)]
    hover:decoration-[var(--ds-color-accent)]
  `,

  // Plain block flow, not flex: CSS float has no effect on flex items, and
  // the whole point of Quote's float prop is letting paragraphs wrap around
  // it (a flex column would just force it to the same full-width column as
  // everything else). Spacing between blocks comes from each block's own
  // margin-bottom instead of a flex gap.
  bioSection: `
    max-w-[65ch]
  `,

  // clear-both: a new section heading always starts on its own full-width
  // line, never squeezed beside a still-active floated Quote from above.
  bioHeading: `
    mt-10
    mb-4
    scroll-mt-24
    clear-both
    text-xl
    font-semibold
    text-[var(--ds-color-fg)]
  `,

  // Justified only from sm up: on narrow screens a justified paragraph has too
  // few words per line, so the browser stretches gaps into visible rivers of
  // whitespace instead. hyphens:auto keeps justified lines from gapping on
  // long Portuguese words (lang="pt"/"en" is already set on <html>, which the
  // browser's hyphenation dictionary relies on).
  bio: `
    mb-6
    text-[15px]
    leading-relaxed
    text-[var(--ds-color-fg)]
    sm:text-justify
    sm:[hyphens:auto]
  `,

  // Passed to every <Quote> as className, on top of whatever float styles it
  // applies internally: gives inline (float="none") quotes breathing room
  // below them in normal block flow, same as a paragraph's mb-6. Floated
  // quotes already carry their own margin, but this wins over it (this
  // stylesheet loads after the design system's), which is harmless — 24px
  // instead of 16px below a floated quote reads fine.
  quoteSpacing: `
    mb-6
  `,

  videoSection: `
    flex
    flex-col
    gap-4
  `,

  videoHeading: `
    font-mono
    text-xs
    tracking-[0.2em]
    text-[var(--ds-color-muted)]
    uppercase
  `,
};

const MONTHS: Record<string, string[]> = {
  pt: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

/** Formats a "YYYY-MM" string as e.g. "out/2022" (pt) or "Oct/2022" (en). Parsed manually (no Date math) to avoid timezone drift. */
export function formatMonthYear(value: string, locale: string = "pt"): string {
  const [year, month] = value.split("-").map(Number);
  const months = MONTHS[locale] ?? MONTHS.pt;
  const label = months[month - 1];
  return label ? `${label}/${year}` : value;
}

/** Formats an experience date range; a null end date uses `presentLabel` (e.g. "presente"/"present"). */
export function formatDateRange(
  start: string,
  end: string | null,
  locale: string = "pt",
  presentLabel: string = "presente",
): string {
  return `${formatMonthYear(start, locale)} — ${end ? formatMonthYear(end, locale) : presentLabel}`;
}

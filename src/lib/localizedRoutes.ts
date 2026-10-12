import { routing, type AppPathname } from "@/i18n/routing";

type AppLocale = (typeof routing.locales)[number];

const LOCALES = routing.locales as readonly string[];

/** The public path for an internal route in one locale, without the locale prefix (`/sobre` → `/about` in English). */
export function localizedPathname(locale: AppLocale, internal: AppPathname): string {
  const config = routing.pathnames[internal];
  return typeof config === "string" ? config : config[locale];
}

/**
 * Where a locale-prefixed path that uses another locale's spelling of a page
 * should go (`/en/sobre` → `/en/about`, `/pt/about` → `/pt/sobre`), or
 * `undefined` when the path is already right or isn't a known page. The proxy
 * answers these with a permanent redirect, so old links and indexed URLs keep
 * their ranking; next-intl alone would answer with a temporary one.
 */
export function legacyPathRedirect(pathname: string): string | undefined {
  const [, first, ...rest] = pathname.split("/");
  if (!LOCALES.includes(first) || rest.length === 0) return undefined;

  const locale = first as AppLocale;
  const unprefixed = `/${rest.join("/")}`.replace(/\/+$/, "");

  for (const internal of Object.keys(routing.pathnames) as AppPathname[]) {
    const target = localizedPathname(locale, internal);
    if (unprefixed === target) return undefined;

    const spellings = new Set<string>([internal, ...routing.locales.map((other) => localizedPathname(other, internal))]);
    if (spellings.has(unprefixed)) return `/${locale}${target}`;
  }
  return undefined;
}

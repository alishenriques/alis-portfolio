import { routing } from "@/i18n/routing";

/** Files served at the site root by app/ metadata conventions (no locale prefix). */
const ROOT_FILES = new Set(["/favicon.ico", "/icon.svg", "/robots.txt", "/sitemap.xml"]);

const LOCALES = routing.locales as readonly string[];

/** A path's last segment has a dot, like a file (`/wp-login.php`, `/pt/foo.html`). */
export function isFileLikePath(pathname: string): boolean {
  return /\.[^/]*$/.test(pathname);
}

export function isRootFile(pathname: string): boolean {
  return ROOT_FILES.has(pathname);
}

/** The locale a path starts with (`/en/sobre` → "en"), if any. */
export function pathLocale(pathname: string): string | undefined {
  const first = pathname.split("/")[1];
  return LOCALES.includes(first) ? first : undefined;
}

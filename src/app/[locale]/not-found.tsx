import { NotFound } from "@/modules/not-found";

// Rendered for any notFound() under [locale], including unknown paths (see
// [...rest]/page.tsx), so it keeps the site's layout and the visitor's locale.
export default function NotFoundPage() {
  return <NotFound />;
}

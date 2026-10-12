import { getNotFoundMetadata, type LocaleParams } from "@/lib/pageMetadata";
import { NotFound } from "@/modules/not-found";

import type { Metadata } from "next";

// Next resolves a not-found boundary's metadata from this file, not from the
// page that called notFound(), so the 404's title, description and robots live here.
export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return getNotFoundMetadata(params);
}

// Rendered for any notFound() under [locale], including unknown paths (see
// [...rest]/page.tsx), so it keeps the site's layout and the visitor's locale.
export default function NotFoundPage() {
  return <NotFound />;
}

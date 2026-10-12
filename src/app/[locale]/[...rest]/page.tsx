import { notFound } from "next/navigation";

// Catches every path under a locale that no other route matches, so it hits
// [locale]/not-found.tsx (inside the site's layout) instead of Next's default
// 404, which has no layout and no locale. Its metadata lives in not-found.tsx.
export default function CatchAllPage() {
  notFound();
}

import { LoadingOverlay } from "@/shared/components/LoadingOverlay";

/**
 * Next's file-convention loading UI: wraps `page.tsx` (and its nested routes,
 * `sobre` and `experiencia`) in a Suspense boundary, shown while that page's
 * Server Component fetches data from the API — otherwise the screen would sit
 * frozen on the old page during navigation. See `node_modules/next/dist/docs/
 * .../loading.md`.
 */
export default function Loading() {
  return <LoadingOverlay />;
}

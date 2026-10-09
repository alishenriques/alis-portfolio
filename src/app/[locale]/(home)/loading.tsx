import { LoadingOverlay } from "@/shared/components/LoadingOverlay";

/**
 * Next's file-convention loading UI: wraps the home page in a Suspense
 * boundary, shown while its Server Component fetches data from the API —
 * otherwise the screen would sit frozen on the old page during navigation.
 * `sobre`, `corporativo` and `projetos` each have their own copy. Kept per
 * page rather than once at `[locale]` on purpose: there it would also wrap the
 * 404 catch-all (`[...rest]`), and a streamed 404 can only answer HTTP 200
 * (see `node_modules/next/dist/docs/.../loading.md`, "Status Codes").
 */
export default function Loading() {
  return <LoadingOverlay />;
}

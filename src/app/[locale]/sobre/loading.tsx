import { LoadingOverlay } from "@/shared/components/LoadingOverlay";

// Per-page loading UI; see (home)/loading.tsx for why it isn't at [locale].
export default function Loading() {
  return <LoadingOverlay />;
}

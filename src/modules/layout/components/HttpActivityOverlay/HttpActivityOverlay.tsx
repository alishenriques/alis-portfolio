"use client";

import { useSyncExternalStore } from "react";

import { isHttpRequestPending, subscribeHttpActivity } from "@/lib/httpActivity";
import { LoadingOverlay } from "@/shared/components/LoadingOverlay";

/**
 * Renders `LoadingOverlay` while an axios request issued from the browser is
 * in flight — currently only the contact form's `sendContactMessage` call
 * (see `lib/graphql-client.ts`'s interceptors). Mounted once in `Layout`.
 * Route-level loading (server data fetching during navigation) is a separate
 * concern handled by `app/[locale]/loading.tsx`, unaffected by this.
 */
export function HttpActivityOverlay() {
  const isPending = useSyncExternalStore(subscribeHttpActivity, isHttpRequestPending, () => false);

  if (!isPending) return null;
  return <LoadingOverlay />;
}

type Listener = () => void;

let pendingRequestCount = 0;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((listener) => listener());
}

/**
 * Minimal vanilla store (no React import, so it's safe to pull into both the
 * server and browser bundles) tracking how many axios requests issued from
 * the browser are currently in flight. `graphql-client.ts`'s interceptors
 * drive it; `HttpActivityOverlay` is the only reader, via React's
 * `useSyncExternalStore`. Server-side calls (Server Components fetching page
 * data) go through a separate module instance in the Node process and never
 * touch this counter — see that component's doc comment.
 */
export function beginHttpRequest() {
  pendingRequestCount += 1;
  notify();
}

export function endHttpRequest() {
  pendingRequestCount = Math.max(0, pendingRequestCount - 1);
  notify();
}

export function subscribeHttpActivity(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function isHttpRequestPending() {
  return pendingRequestCount > 0;
}

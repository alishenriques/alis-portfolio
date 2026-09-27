import { describe, expect, it } from "vitest";

import { beginHttpRequest, endHttpRequest, isHttpRequestPending, subscribeHttpActivity } from "./httpActivity";

describe("httpActivity", () => {
  it("is pending while at least one request is in flight", () => {
    expect(isHttpRequestPending()).toBe(false);

    beginHttpRequest();
    expect(isHttpRequestPending()).toBe(true);

    endHttpRequest();
    expect(isHttpRequestPending()).toBe(false);
  });

  it("stays pending until every concurrent request has ended", () => {
    beginHttpRequest();
    beginHttpRequest();
    expect(isHttpRequestPending()).toBe(true);

    endHttpRequest();
    expect(isHttpRequestPending()).toBe(true);

    endHttpRequest();
    expect(isHttpRequestPending()).toBe(false);
  });

  it("never goes negative on an unbalanced end call", () => {
    endHttpRequest();
    expect(isHttpRequestPending()).toBe(false);

    beginHttpRequest();
    expect(isHttpRequestPending()).toBe(true);

    endHttpRequest(); // balances the extra begin() above, so later tests start from zero
    expect(isHttpRequestPending()).toBe(false);
  });

  it("notifies subscribers on every begin/end, and stops once unsubscribed", () => {
    const calls: boolean[] = [];
    const unsubscribe = subscribeHttpActivity(() => calls.push(isHttpRequestPending()));

    beginHttpRequest();
    endHttpRequest();
    expect(calls).toEqual([true, false]);

    unsubscribe();
    beginHttpRequest();
    endHttpRequest();
    expect(calls).toEqual([true, false]);
  });
});

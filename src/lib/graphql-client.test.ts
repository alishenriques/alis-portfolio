import { afterEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";

import { GraphQLRequestError, graphqlRequest } from "./graphql-client";
import { isHttpRequestPending } from "./httpActivity";

const { post, requestUse, responseUse } = vi.hoisted(() => ({
  post: vi.fn(),
  requestUse: vi.fn(),
  responseUse: vi.fn(),
}));

vi.mock("axios", () => ({
  default: {
    create: () => ({
      post,
      interceptors: { request: { use: requestUse }, response: { use: responseUse } },
    }),
  },
}));

type FakeConfig = { trackGlobalLoading?: boolean };

// graphql-client.ts registers these interceptors once, as a side effect of the
// module import above — not per request. Captured here, at module scope, because
// Vitest 5's `clearMocks: true` default wipes `requestUse`/`responseUse`'s call
// history before every `it()`; the plain function references below survive that.
const onRequest = requestUse.mock.calls[0]?.[0] as (config: FakeConfig) => unknown;
const onResponseSuccess = responseUse.mock.calls[0]?.[0] as (response: { config: FakeConfig }) => unknown;
const onResponseError = responseUse.mock.calls[0]?.[1] as (error: { config?: FakeConfig }) => Promise<never>;

afterEach(() => {
  post.mockReset();
});

describe("graphqlRequest", () => {
  it("parses and returns data that matches the schema", async () => {
    post.mockResolvedValue({ data: { data: { health: "ok" } } });
    const result = await graphqlRequest(z.object({ health: z.string() }), "{ health }");
    expect(result).toEqual({ health: "ok" });
  });

  it("throws GraphQLRequestError when the response has GraphQL errors", async () => {
    post.mockResolvedValue({ data: { data: null, errors: [{ message: "Unauthorized" }] } });
    await expect(graphqlRequest(z.object({}), "{ health }")).rejects.toThrow(GraphQLRequestError);
    await expect(graphqlRequest(z.object({}), "{ health }")).rejects.toThrow("Unauthorized");
  });

  it("throws a validation error when the payload does not match the schema", async () => {
    post.mockResolvedValue({ data: { data: { health: 123 } } });
    await expect(graphqlRequest(z.object({ health: z.string() }), "{ health }")).rejects.toThrow();
  });

  it("passes trackGlobalLoading: false through to the request config when opted out", async () => {
    post.mockResolvedValue({ data: { data: { health: "ok" } } });
    await graphqlRequest(z.object({ health: z.string() }), "{ health }", undefined, {
      trackGlobalLoading: false,
    });

    expect(post).toHaveBeenCalledWith("", expect.anything(), { trackGlobalLoading: false });
  });
});

describe("HTTP activity tracking", () => {
  it("marks a request pending on the way out, and clears it once the response settles", () => {
    expect(isHttpRequestPending()).toBe(false);

    onRequest({});
    expect(isHttpRequestPending()).toBe(true);
    onResponseSuccess({ config: {} });
    expect(isHttpRequestPending()).toBe(false);
  });

  it("also clears the pending state when the request fails", async () => {
    onRequest({});
    expect(isHttpRequestPending()).toBe(true);

    const error = Object.assign(new Error("network error"), { config: {} });
    await expect(onResponseError(error)).rejects.toThrow("network error");
    expect(isHttpRequestPending()).toBe(false);
  });

  it("never marks trackGlobalLoading: false requests as pending", async () => {
    onRequest({ trackGlobalLoading: false });
    expect(isHttpRequestPending()).toBe(false);

    onResponseSuccess({ config: { trackGlobalLoading: false } });
    expect(isHttpRequestPending()).toBe(false);
  });
});

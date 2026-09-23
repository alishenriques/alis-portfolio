import { z } from "zod";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GraphQLRequestError, graphqlRequest } from "./graphql-client";

const { post } = vi.hoisted(() => ({ post: vi.fn() }));

vi.mock("axios", () => ({
  default: { create: () => ({ post }) },
}));

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
});

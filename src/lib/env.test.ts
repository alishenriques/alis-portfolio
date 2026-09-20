import { describe, expect, it } from "vitest";
import { loadPublicEnv } from "./env";

describe("loadPublicEnv", () => {
  it("falls back to the local GraphQL endpoint", () => {
    expect(loadPublicEnv({}).NEXT_PUBLIC_GRAPHQL_URL).toBe("http://localhost:4000/graphql");
  });

  it("accepts a custom endpoint", () => {
    const env = loadPublicEnv({ NEXT_PUBLIC_GRAPHQL_URL: "https://api.example.com/graphql" });
    expect(env.NEXT_PUBLIC_GRAPHQL_URL).toBe("https://api.example.com/graphql");
  });

  it("rejects an invalid URL", () => {
    expect(() => loadPublicEnv({ NEXT_PUBLIC_GRAPHQL_URL: "not-a-url" })).toThrow();
  });
});

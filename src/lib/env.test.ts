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

  it("falls back to the production site URL", () => {
    expect(loadPublicEnv({}).NEXT_PUBLIC_SITE_URL).toBe("https://alis-portfolio-three.vercel.app");
  });

  it("accepts a custom site URL and rejects an invalid one", () => {
    expect(loadPublicEnv({ NEXT_PUBLIC_SITE_URL: "https://alis.dev" }).NEXT_PUBLIC_SITE_URL).toBe("https://alis.dev");
    expect(() => loadPublicEnv({ NEXT_PUBLIC_SITE_URL: "alis.dev" })).toThrow();
  });
});

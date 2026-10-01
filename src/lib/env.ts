import { z } from "zod";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_GRAPHQL_URL: z.string().url().default("http://localhost:4000/graphql"),
  // Absolute origin used for canonical URLs, hreflang, Open Graph, sitemap and
  // robots. Defaults to the production deployment so SEO tags are never relative.
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://alis-portfolio-three.vercel.app"),
});

export type PublicEnv = z.infer<typeof publicEnvSchema>;

export function loadPublicEnv(
  source: Partial<Record<keyof PublicEnv, string | undefined>> = {
    NEXT_PUBLIC_GRAPHQL_URL: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
): PublicEnv {
  return publicEnvSchema.parse(source);
}

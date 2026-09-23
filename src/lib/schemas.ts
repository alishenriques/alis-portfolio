import { z } from "zod";

// Mirrors alis-portfolio-api's src/schemas/domain.ts. Kept separate on purpose:
// the front-end must not trust the network even though the API also validates.
export const profileSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  headline: z.string().min(1),
  bio: z.string().min(1),
  avatarUrl: z.string().url().nullable(),
});

export const projectSchema = z.object({
  id: z.string(),
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  body: z.string(),
  coverUrl: z.string().url().nullable(),
  tags: z.array(z.string()),
  featured: z.boolean(),
  publishedAt: z.string().nullable(),
});

export type Profile = z.infer<typeof profileSchema>;
export type Project = z.infer<typeof projectSchema>;

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

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1),
  companyLogoUrl: z.string().url().nullable(),
  role: z.string().min(1),
  startDate: z.string(),
  endDate: z.string().nullable(),
  description: z.string(),
  sortOrder: z.number(),
});

export const contactFormSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email(),
  message: z.string().trim().min(1).max(5000),
  website: z.string().max(0).optional().default(""), // honeypot
});

export type Profile = z.infer<typeof profileSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type ContactFormValues = z.infer<typeof contactFormSchema>;

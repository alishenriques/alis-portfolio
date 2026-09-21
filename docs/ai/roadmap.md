# Roadmap

## Done
- Three repos scaffolded: Next.js app, GraphQL API (Yoga, Drizzle, Zod), design system (Vite lib, `Button`)
- Lint, typecheck and unit tests pass in the API and design system
- API adapted for Vercel serverless (`api/graphql.ts`); `db:migrate` script created
- Architecture docs and agent instructions
- Public GitHub repos, CI green, design system published to npm as `@alishenriques/design-system` (Trusted Publishing configured on npm)
- Neon database created and migrated; Cloudinary credentials set locally
- CMS API: project mutations, signed uploads, draft visibility, seed script, PGlite-backed tests

## Next
1. Portfolio MVP: install `@alishenriques/design-system`, Axios GraphQL client with Zod, tests, simple home fed by the CMS
2. Deploy API and portfolio on Vercel (env vars set in the Vercel dashboard)
3. Real content: seed/edit profile and projects, upload images to Cloudinary
4. Later: visual concept, animations, CMS UI

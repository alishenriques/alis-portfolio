# Roadmap

## Done
- Three repos scaffolded: Next.js app, GraphQL API (Yoga, Drizzle, Zod), design system (Vite lib, `Button`)
- Lint, typecheck and unit tests pass in the API and design system
- API adapted for Vercel serverless (`api/graphql.ts`); `db:migrate` script created
- Architecture docs and agent instructions
- Public GitHub repos, CI green, design system published to npm as `@alishenriques/design-system` (Trusted Publishing configured on npm)
- Neon database created and migrated; Cloudinary credentials set locally
- CMS API: project mutations, signed uploads, draft visibility, seed script, PGlite-backed tests
- Portfolio MVP: `@alishenriques/design-system` installed, Axios/Zod GraphQL client, simple home page fed by the CMS, tests, verified end-to-end locally against the real Neon-backed API
- `Experience` entity added end-to-end (schema, migration applied to Neon, GraphQL type/mutations, 29 API tests total); not yet rendered on the front-end

## Next
1. Ingest real content from the user's LinkedIn/CV/images (profile, projects, experiences) and apply it via the CMS mutations; upload logos/photos to Cloudinary via `createUploadSignature`
2. Add an Experience section to the front-end once that content exists
3. Deploy API and portfolio on Vercel (env vars set in the Vercel dashboard)
4. Later: visual concept, animations, CMS UI

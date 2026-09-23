# Architecture

## Repos (siblings under `~/repos`, GitHub owner `alishenriques`)

| Repo | Package | Role |
|---|---|---|
| `alis-portfolio` | (private app) | Next.js App Router front-end; main repo and source of these docs |
| `alis-portfolio-api` | `@alishenriques/portfolio-api` | GraphQL API and CMS backend |
| `alis-design-system` | `@alishenriques/design-system` | React component library published to public npm |

## Data flow

Next.js (server components / route handlers) → Axios POST to `NEXT_PUBLIC_GRAPHQL_URL` → GraphQL Yoga → Drizzle → Neon Postgres. Images live in Cloudinary; the DB stores their URLs (`media` table).

Responses are parsed with Zod schemas on the front-end as well, even though the API already validates them.

## API (`alis-portfolio-api`)

- `src/app.ts`: `createApp(env)` builds the Yoga instance. Used by `src/index.ts` (local Node server) and `api/graphql.ts` (Vercel function). `vercel.json` rewrites `/graphql` to `/api/graphql`.
- `src/graphql/schema.ts`: SDL and resolvers. Domain models are in `src/schemas/domain.ts` (Zod, the source of truth for types).
- `src/db/schema.ts`: Drizzle tables (`profiles`, `projects`, `experiences`, `media`). Migrations are generated into `drizzle/` and applied with `yarn db:migrate`.
- **Fallback mode:** without `DATABASE_URL` the API serves data from `src/db/fallback.ts`; without Cloudinary credentials the upload client is `null`.
- **CMS auth:** mutations require header `x-cms-key` equal to `CMS_API_KEY`. Unauthorized returns a `GraphQLError` with code `UNAUTHORIZED`. Throw `GraphQLError` for client-visible errors: Yoga masks plain `Error`s. Invalid input becomes `BAD_USER_INPUT`; writes without a database become `DATABASE_UNAVAILABLE`.
- **CMS operations:** `updateProfile` (single profile row); `upsertProject` (replaces the project with that slug) / `deleteProject`; `upsertExperience` (create when `id` is omitted, update when given) / `deleteExperience`; `createUploadSignature` (signed params for direct browser uploads to Cloudinary; the secret never leaves the API).
- **Visibility:** public `projects` / `project` return only published projects (`publishedAt` in the past), ordered by `sortOrder`. A valid `x-cms-key` also sees drafts. `experiences` has no draft concept — it's owner-authored, so every row is public; ordered by `sortOrder`, then most recent `startDate` first. Dates are `YYYY-MM` text (no fabricated day), validated by `yearMonthSchema`; `endDate: null` means the role is current.
- **Seed:** `yarn db:seed` upserts placeholder profile/project into the configured database (idempotent). Doesn't touch `experiences` — real data comes from the CMS once available.
- **Testing DB code:** tests use PGlite (in-memory Postgres) with the real migrations from `drizzle/` via `src/test/helpers.ts`; `createApp(env, { db, cloudinary })` accepts injected dependencies. `Database` is typed as the driver-agnostic `PgDatabase`.

## Front-end (`alis-portfolio`)

- `src/lib/env.ts`: Zod-validated public env (`NEXT_PUBLIC_GRAPHQL_URL`).
- `src/lib/graphql-client.ts`: a single Axios instance; `graphqlRequest(schema, query, variables?)` posts a query, throws `GraphQLRequestError` on GraphQL errors, and parses `data` with the given Zod schema (schemas mirror, but are independent from, the API's — the front-end doesn't trust the network either).
- `src/lib/schemas.ts` / `src/lib/portfolio.ts`: `Profile`/`Project` schemas and `getProfile()` / `getProjects()`.
- `src/app/page.tsx`: async Server Component rendering the home page. Marked `export const dynamic = "force-dynamic"` — required because Axios calls aren't native `fetch`, so Next can't detect they're dynamic on its own; without this the build tries (and fails) to fetch data at build time. Revisit if a caching strategy is added later.
- `src/app/error.tsx`: route-level error boundary (e.g. API unreachable).
- `src/components/ExternalLinkButton.tsx`: thin client-side wrapper (`"use client"`) around the design system's `Button`, since `Button` has no `href`.
- Tests mock `axios` with `vi.hoisted` (the axios instance is created at module load, so the mock must exist before the module is imported) and mock `@/lib/portfolio` when testing pages.

## Design system (`alis-design-system`)

Vite library build (ES module + `.d.ts`), React as peer dependency. Styling via CSS Modules and tokens in `src/tokens.css` (`--ds-*`). Consumers import `@alishenriques/design-system` and `@alishenriques/design-system/styles.css`. The portfolio's `next.config.ts` lists it in `transpilePackages`.

## Decisions made

| Decision | Choice |
|---|---|
| DS distribution | Public npm, versioned, published by CI |
| API hosting | Vercel serverless functions |
| Delivery strategy | Ship a simple MVP first, add the animated concept afterwards |
| Database / media | Neon Postgres / Cloudinary (free tiers) |

## Open decisions

- Visual identity and concept for the animated site
- CMS editing UI (currently API only)
- Animation library (Framer Motion / GSAP / CSS only)

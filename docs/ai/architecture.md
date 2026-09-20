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
- `src/db/schema.ts`: Drizzle tables (`profiles`, `projects`, `media`). Migrations are generated into `drizzle/` and applied with `yarn db:migrate`.
- **Fallback mode:** without `DATABASE_URL` the API serves data from `src/db/fallback.ts`; without Cloudinary credentials the upload client is `null`.
- **CMS auth:** mutations require header `x-cms-key` equal to `CMS_API_KEY`. Unauthorized returns a `GraphQLError` with code `UNAUTHORIZED`. Throw `GraphQLError` for client-visible errors: Yoga masks plain `Error`s.

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

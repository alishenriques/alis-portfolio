# Roadmap

## Done
- Three repos scaffolded: Next.js app, GraphQL API (Yoga, Drizzle, Zod), design system (Vite lib, `Button`)
- Lint, typecheck and unit tests pass in the API and design system
- API adapted for Vercel serverless (`api/graphql.ts`); `db:migrate` script created
- Architecture docs and agent instructions
- Public GitHub repos, CI green, design system published to npm as `@alishenriques/design-system` (Trusted Publishing configured on npm)
- Neon database created and migrated; Cloudinary credentials set locally
- CMS API: project mutations, signed uploads, draft visibility, seed script, PGlite-backed tests
- Real content ingested: profile (name, headline, bio, Cloudinary-hosted photo) and all 7 experiences applied to the live Neon database via GraphQL mutations
- Visual direction locked — "Console" (see `architecture.md`); prototype approved by the user, then evolved further from a reference mockup (logo, headline treatment, skills icons, feature chips, floating parallax panels)
- `alis-design-system@0.2.0` **published to npm** (manually, via `npm publish` from the user's machine — see "Fixed along the way" for why CI's automated publish still doesn't work): 7 new components (`Panel`, `Eyebrow`, `TerminalPrompt`, `PipelineBadges`, `TagList`, `StatGrid`, `CommandPalette`) plus the Console direction's fonts/tokens; 18 tests; verified against the real published package (not a local tarball) with a standalone ESM import check
- **Front-end restructured to a modular architecture** mirroring the reference app `awa-backstage-web` (`app/`, `i18n/`, `locales/`, `modules/`, `shared/`, `lib/` — full breakdown in `architecture.md`)
- **i18n**: `next-intl`, locale-prefixed routes (`/pt`, `/en`), `src/proxy.ts` (Next 16 renamed `middleware.ts`), a `LanguageSwitcher` in the top bar
- **Layout**: sticky `TopBar` with a centred terminal-style `DesktopNav` from `lg` up, and an animated slide-in/out `Sidebar` drawer below `lg` (replaces the old anchor nav and the command palette as the nav trigger — `CommandPalette` itself stays in the DS, unused, earmarked for a future search feature)
- **Pages split**: Sobre and Experiência are now their own routes (`/sobre`, `/experiencia`), no longer anchored sections on the home page
- **Home evolved**: new `Hero` (logo mark, `</>`-flanked headline, rich-text highlighted subtitle, email/phone contact row, tagline strip, decorative pointer-driven `ParallaxPanels`), a `FeatureChips` value-prop grid, and a `Skills` section with real brand icons (`@icons-pack/react-simple-icons`) — replaced the old tech-stack text line and the companies strip (companies now live on the Experiência page)
- **Deployed on Vercel (free tier)**: API at `alis-portfolio-api.vercel.app`, site at `alis-portfolio-three.vercel.app`; both projects are connected to GitHub, so every push to `main` deploys to production automatically. Contact email verified end-to-end in production with the Resend key rotated (the old one revoked).
- **Contact form**: `ContactDialog` (client-side Zod validation, honeypot) wired to a new public `sendContactMessage` GraphQL mutation; the API sends via Resend, gracefully reports `EMAIL_UNAVAILABLE` until `RESEND_API_KEY` is set (user is creating that account — see Next)
- Two real bugs found by testing and fixed: a duplicate React `key` in `CommandPalette` (now keyed by `href`, with a regression test) and a `event.currentTarget` accessed after an `await` in `ContactDialog`'s submit handler (see "A real bug this surfaced" in `architecture.md`)
- `window.matchMedia` polyfilled in the shared Vitest setup (jsdom doesn't implement it)
- Dead code removed: `ExternalLinkButton` (a DS `Button` wrapper) had no remaining callers once the Home's old Contato section became `ContactDialog` (plain `<a>`/`<button>` elements, not the DS `Button`)
- **`alis-portfolio` now installs `@alishenriques/design-system@0.2.0` from the real npm registry** (no more local tarball); lint/typecheck/49 tests/build all green; verified end-to-end in the browser (curl) against the real Neon-backed API
- 101 tests total across the three repos as of this line: 34 API + 18 design system + 49 portfolio

## Next
1. Waiting on the user: a real logo asset (current `Logo` is a hand-drawn placeholder) to replace/refine per the mockup
2. Publish the next real design-system version through CI (tag `v*`): the automated workflow is fixed but has not yet run a real publish (see below)
3. Later: About page long-form text once finalized, CMS editing UI, a dedicated Projetos page/content, revisit `CommandPalette` as an actual search feature

## Fixed along the way
- **Automated npm publish (resolved).** The workflow first 404'd because `actions/setup-node`'s `registry-url` writes an empty `NODE_AUTH_TOKEN` into `.npmrc`, which breaks OIDC auto-detection (fixed by dropping `registry-url`). It then failed with `ENEEDAUTH`. A temporary `workflow_dispatch` diagnostic that did the OIDC token exchange by hand showed the GitHub claims were correct (repository, `publish.yml`, audience `npm:registry.npmjs.org`) but npm answered `404 OIDC token exchange error - package not found`: **no Trusted Publisher was registered for `@alishenriques/design-system`** on npmjs.com. After adding it (GitHub Actions, `alishenriques/alis-design-system`, `publish.yml`, empty environment) the exchange returned 201. The earlier note that the job lacked `id-token: write` was a misreading; the workflow was right all along. The diagnostic job has been removed. Publishing is by pushing a `v*` tag whose version matches `package.json`; a version already on npm (v0.2.0 was published manually) cannot be reused.

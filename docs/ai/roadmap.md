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
- **Layout**: sticky `TopBar` + an animated slide-in/out `Sidebar` drawer (replaces the old anchor nav and the command palette as the nav trigger — `CommandPalette` itself stays in the DS, unused, earmarked for a future search feature)
- **Pages split**: Sobre and Experiência are now their own routes (`/sobre`, `/experiencia`), no longer anchored sections on the home page
- **Home evolved**: new `Hero` (logo mark, `</>`-flanked headline, rich-text highlighted subtitle, email/phone contact row, tagline strip, decorative pointer-driven `ParallaxPanels`), a `FeatureChips` value-prop grid, and a `Skills` section with real brand icons (`@icons-pack/react-simple-icons`) — replaced the old tech-stack text line and the companies strip (companies now live on the Experiência page)
- **Contact form**: `ContactDialog` (client-side Zod validation, honeypot) wired to a new public `sendContactMessage` GraphQL mutation; the API sends via Resend, gracefully reports `EMAIL_UNAVAILABLE` until `RESEND_API_KEY` is set (user is creating that account — see Next)
- Two real bugs found by testing and fixed: a duplicate React `key` in `CommandPalette` (now keyed by `href`, with a regression test) and a `event.currentTarget` accessed after an `await` in `ContactDialog`'s submit handler (see "A real bug this surfaced" in `architecture.md`)
- `window.matchMedia` polyfilled in the shared Vitest setup (jsdom doesn't implement it)
- Dead code removed: `ExternalLinkButton` (a DS `Button` wrapper) had no remaining callers once the Home's old Contato section became `ContactDialog` (plain `<a>`/`<button>` elements, not the DS `Button`)
- **`alis-portfolio` now installs `@alishenriques/design-system@0.2.0` from the real npm registry** (no more local tarball); lint/typecheck/49 tests/build all green; verified end-to-end in the browser (curl) against the real Neon-backed API
- 101 tests total across the three repos as of this line: 34 API + 18 design system + 49 portfolio

## Next
1. Once the user has a `RESEND_API_KEY`: set it (and `CONTACT_TO_EMAIL` if different from the default) in `alis-portfolio-api`'s `.env` and in Vercel; verify a real contact-form send end-to-end
2. Deploy API and portfolio on Vercel (env vars set in the Vercel dashboard)
3. Waiting on the user: a real logo asset (current `Logo` is a hand-drawn placeholder) to replace/refine per the mockup
4. Investigate why the DS's automated npm-publish workflow still fails (see below) — not blocking (manual `npm publish` works), but worth fixing before the next version
5. Later: About page long-form text once finalized, CMS editing UI, a dedicated Projetos page/content, revisit `CommandPalette` as an actual search feature

## Fixed along the way
- The npm publish workflow 404'd on the first `v0.2.0` attempt: `actions/setup-node`'s `registry-url` writes an (empty, since we use no `NPM_TOKEN` secret) `NODE_AUTH_TOKEN` into `.npmrc`, which broke npm's OIDC Trusted Publishing auto-detection. Fixed by dropping `registry-url` from the workflow (npm defaults to the public registry on its own).
- That fix advanced the error from a 404 to `ENEEDAUTH`: the "Set up job" log shows only `Contents: read` / `Metadata: read` granted to `GITHUB_TOKEN`, **no `Id-token: write`**, despite the workflow declaring it — so npm's CLI never gets an OIDC token to try Trusted Publishing with. Root cause not yet found (not an `allowed_actions`/`default_workflow_permissions` restriction — checked via the GitHub API, both look unrestricted). **Unblocked by publishing manually instead** (`npm login --auth-type=web` + `npm publish --access public --provenance=false` from the user's machine, same as `v0.1.0`) — v0.2.0 is live. CI automation for future versions is still broken and would need more digging (or just keep publishing manually, which works fine).

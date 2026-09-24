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
- **`sendContactMessage`** (`SendContactMessageInput { name, email, message, website }`): the only **public** mutation — no `x-cms-key`. Sends via Resend (`src/lib/resend.ts`, same "returns `null` if unconfigured" pattern as Cloudinary; `EMAIL_UNAVAILABLE` if so). `website` is a honeypot: real visitors never see that field (hidden via CSS on the form), so a non-empty value means a bot filled every input — the resolver returns `true` (same response as a real send) **without** sending, so a bot can't distinguish "detected" from "sent". No other spam mitigation (no rate limiting/CAPTCHA) — a deliberate zero-infra trade-off for a portfolio's traffic level.
- **Visibility:** public `projects` / `project` return only published projects (`publishedAt` in the past), ordered by `sortOrder`. A valid `x-cms-key` also sees drafts. `experiences` has no draft concept — it's owner-authored, so every row is public; ordered by `sortOrder`, then most recent `startDate` first. Dates are `YYYY-MM` text (no fabricated day), validated by `yearMonthSchema`; `endDate: null` means the role is current.
- **Seed:** `yarn db:seed` upserts placeholder profile/project into the configured database (idempotent). Doesn't touch `experiences` — real data comes from the CMS once available.
- **Testing DB code:** tests use PGlite (in-memory Postgres) with the real migrations from `drizzle/` via `src/test/helpers.ts`; `createApp(env, { db, cloudinary })` accepts injected dependencies. `Database` is typed as the driver-agnostic `PgDatabase`.

## Front-end (`alis-portfolio`)

### Folder architecture

Mirrors the modular structure of the reference app `~/repos/awa-backstage-web` (see that repo's own docs for the original), translated from its Vite/react-router SPA idioms to Next.js App Router:

```
src/
  app/[locale]/       # routes only — every page.tsx is a thin wrapper delegating to a module (see below)
  i18n/                # next-intl config: routing.ts, navigation.ts, request.ts
  locales/             # pt.json, en.json — flat translation files, nested UPPER_CASE namespaces
  proxy.ts             # Next.js 16's middleware (renamed — see "Next 16 gotchas")
  modules/             # feature/page compositions, each self-contained
    home/, about/, experience/, skills/, layout/
    <module>/
      <Name>.tsx
      styles/index.styles.ts   # Tailwind class strings grouped in a plain object, not inline in JSX
      tests/<Name>.test.tsx
      components/<SubComponent>/...  # same Name/styles/tests shape, one level deeper
      constants/                     # config data (menu items, skill lists) kept out of the component body
  shared/
    components/<Name>/   # same Name/styles/tests shape — reused across modules, not generic enough for the DS
  lib/                 # non-UI: GraphQL client, schemas, small utilities (env.ts, graphql-client.ts, portfolio.ts, schemas.ts, format-date.ts, utils.ts)
```

A component/page that's only used by one module lives inside that module (`modules/home/components/Hero`); one used by two or more lives in `shared/components`; one general enough for other projects goes in `alis-design-system` instead (see below — several `shared`/`modules` pieces here are DS candidates once there's a second consumer, per the user: built here first for deadline reasons).

### i18n (`next-intl`, locale-prefixed URLs)

- Locales `pt` (default) and `en`, URLs `/pt/...` and `/en/...` (`src/i18n/routing.ts`). `/` redirects to the default locale.
- `src/proxy.ts` runs `next-intl`'s middleware for locale detection/redirect. **Not named `middleware.ts`**: Next.js 16 renamed that file convention to `proxy.ts` (deprecated but likely still functional either way — don't reintroduce `middleware.ts`).
- `src/app/[locale]/layout.tsx` is the **root layout** (renders `<html lang={locale}>`; there is no separate top-level `app/layout.tsx` — a root layout under a dynamic segment is an officially documented Next.js pattern for i18n). Wraps children in `NextIntlClientProvider` and the app's `Layout` (TopBar + Sidebar + ContactDialog, see below).
- Server Components call translations with `getTranslations()` (async, `next-intl/server`); Client Components and Server Components alike can use the `useTranslations()`/`useLocale()` hooks — `next-intl` special-cases these to also work in RSC (no `"use client"` needed just for translations).
- `src/locales/{pt,en}.json`: nested namespaces in `UPPER_CASE` (`NAV.HOME`, `HOME.FEATURES.TYPESCRIPT.LABEL`, `CONTACT.SUCCESS`), matching the reference app's key style. Rich/highlighted text (e.g. the hero subtitle) uses `next-intl`'s tag syntax (`<hl>...</hl>`) with `t.rich(...)`, not plain `{variable}` interpolation — the latter can't carry JSX.
- `src/i18n/navigation.ts` exports locale-aware `Link`/`usePathname`/`useRouter` (wraps Next's own); always import navigation from there, not `next/link` / `next/navigation`, so links keep the current locale prefix.
- `ExperienceItem` formats dates via `formatDateRange(start, end, locale, presentLabel)` — month abbreviations and the "current role" label both vary by locale (`src/lib/format-date.ts`).

### Layout: terminal nav on desktop, drawer below `lg`

- `src/modules/layout/Layout.tsx`: wraps every page with `ContactDialogProvider` + `TopBar` + the page + `ContactDialog`.
- `TopBar`: sticky 3-column header (`grid-cols-[1fr_auto_1fr]`, so the centre stays centred). Below `lg`: hamburger (left), logo (centre), `LanguageSwitcher` (right). From `lg` up: logo (left), `DesktopNav` (centre), `LanguageSwitcher` + `ContactButton` (right). It owns the drawer's open state.
- `DesktopNav` (`modules/layout/components/DesktopNav`): the header menu on desktop, styled as a shell prompt (`$ ~/início ~/sobre …`). Hover/focus slides a `>` in, nudges the label and blinks a cursor; the current page (`aria-current="page"`) keeps a blinking cursor. Motion is disabled under `prefers-reduced-motion` (`motion-reduce:` variants); the `blink` keyframe lives in `globals.css`. Prompt glyphs are `aria-hidden`.
- `ContactButton`: the desktop header CTA that opens the contact dialog (the drawer has its own copy of the action).
- Menu items live in `modules/layout/constants/menuConfig.ts` and feed both `DesktopNav` and `Sidebar`.
- `Footer` (`modules/layout/components/Footer`): site-wide, rendered by `Layout` after the page. Copyright plus GitHub/LinkedIn icon links (`constants/socialLinks.ts`, `FOOTER.*` labels), accent-coloured. LinkedIn's mark is inlined (`LinkedinIcon.tsx`) because Simple Icons dropped that brand.
- `Sidebar` (`modules/layout/components/Sidebar`): a controlled (`isOpen`/`onClose`) animated slide-in/out overlay drawer, shown only below `lg`; the trigger is in `TopBar`. **It must stay a sibling of `<header>`, never inside it**: the header's `backdrop-blur` makes it the containing block for `position: fixed` descendants, which pinned the drawer to the header's height (the overlap bug). While open it locks body scroll and closes on Escape/backdrop/link click. The drawer stays mounted and slides off-screen via a CSS transform, with `aria-hidden` toggled on the closed `<aside>` for accessibility — tests rely on `aria-hidden` exclusion (`queryByRole` returns null for hidden content), not `toBeVisible()`, which doesn't account for transforms.
- The `⌘K` **CommandPalette is intentionally unused right now** (removed from the visible nav, replaced by the Sidebar), but its code stays in `alis-design-system` — the plan is to repurpose it later as an actual search feature. Don't delete it.
- `ContactDialog` (`modules/layout/components/ContactDialog`): opened from anywhere via `useContactDialog()` (`modules/layout/ContactDialogContext.tsx`, a small React Context — justified here because both the Sidebar's "Contact" item and any future CTA need to open the same dialog without prop drilling). Client-side Zod validation (`contactFormSchema` in `lib/schemas.ts`) mirrors the API's; submits via `sendContactMessage()` (`lib/portfolio.ts`) straight from the browser to the GraphQL API (public mutation, no CMS key). Has a hidden honeypot field (`website`) for basic spam mitigation — see the API section.

### Home page composition

- `app/[locale]/page.tsx` → `modules/home/Home.tsx`: `Hero` (logo, eyebrow line "Alisson Henriques · Desenvolvedor Front‑End Sênior", the headline "Arquitetura de front‑end que escala — construída com engenharia e IA." in the Archivo display face with a `<hl>` highlight, `GrowthTrace`, rich-text subtitle, email/phone contact row, `TaglineHighlights`, decorative `ParallaxPanels`) → `FeatureChips` ("O que eu valorizo" / "What I value": a titled, centred flex-wrap section with the 7 value props, so an orphan last row stays centred, icon above text) → `Skills` (`modules/skills`, real primary stack rendered with official brand icons from `@icons-pack/react-simple-icons`; 15 techs grouped by area in `skillsList.ts`; brand colours are overridden where the package's own hex vanishes on the dark ground — Angular `#DD0031`, JWT `#D63AFF`, CSS3 `#1572B6`, Next.js white. Layout: centred flex-wrap, three rows of 5 with dividers from `lg`) → the Projects section (`ProjectCard`, from `shared/components`).
- `GrowthTrace`: decorative SVG line chart under the headline that draws itself (`pathLength` normalised to 1, `draw`/`pop` keyframes in `globals.css`) then pops a marker; disabled under `prefers-reduced-motion`.
- `TaglineHighlights`: the four highlight phrases (`HOME.TAGLINE.*`: modern interfaces, performance, scalability, AI-assisted software engineering) as pill chips, each with a small custom inline SVG icon (`icons.tsx`, currentColor + accent details) and hover motion. Not lucide: these are bespoke on purpose.
- `ParallaxPanels` (`modules/home/components/ParallaxPanels`): two decorative "floating window" panels (a code snippet, a file tree) that tilt toward the pointer on `pointermove`, RAF-throttled. Skipped entirely (no listener attached) under `prefers-reduced-motion: reduce` or `(pointer: coarse)` (touch). Purely `aria-hidden` — not real content.
- `Sobre`/`Experiência` are their own routes now (`app/[locale]/sobre`, `app/[locale]/experiencia` → `modules/about`, `modules/experience`) — **not** anchored sections on the home page anymore. Projetos and Contato are not (yet): Projetos stays a Home section, Contato is the dialog, not a page.
- All pages are marked `export const dynamic = "force-dynamic"` — required because the GraphQL calls go through Axios, not Next's `fetch`, so Next can't detect they're dynamic on its own; without this the build tries (and fails) to fetch data at build time.

### Other front-end notes

- `src/lib/env.ts`: Zod-validated public env (`NEXT_PUBLIC_GRAPHQL_URL`).
- `src/lib/graphql-client.ts`: a single Axios instance; `graphqlRequest(schema, query, variables?)` posts a query, throws `GraphQLRequestError` on GraphQL errors, and parses `data` with the given Zod schema (schemas mirror, but are independent from, the API's — the front-end doesn't trust the network either).
- `src/lib/schemas.ts` / `src/lib/portfolio.ts`: `Profile`/`Project`/`Experience` schemas plus `contactFormSchema`, and `getProfile()` / `getProjects()` / `getExperiences()` / `sendContactMessage()`.
- `src/lib/utils.ts`: `cn()` (clsx + tailwind-merge), same as the reference app.
- `next.config.ts`: wrapped with `next-intl`'s plugin; `images.remotePatterns` allows `res.cloudinary.com` so `next/image` can optimize the CMS-hosted avatar.
- ESLint: `eslint-plugin-import`'s `import/order` enforces the same grouping/alphabetization as the reference app (builtin → external, react first → internal `@/*` → relative), `--fix` handles almost all of it.
- Tests mock `axios` with `vi.hoisted` (the axios instance is created at module load, so the mock must exist before the module is imported) and mock `@/lib/portfolio` / `next-intl/server` when testing pages/modules that fetch data and translate server-side.
- `src/test/setup.ts` polyfills `window.matchMedia` (jsdom doesn't implement it) — needed by anything checking `prefers-reduced-motion`/`pointer` media queries (e.g. `ParallaxPanels`).

### A real bug this surfaced (worth remembering)

`event.currentTarget` in a React event handler is only valid for the **synchronous** part of the handler — re-reading it after an `await` returns `null` (per the DOM event dispatch spec; React doesn't special-case this). `ContactDialog`'s submit handler originally called `event.currentTarget.reset()` *after* `await sendContactMessage(...)`, which threw and silently flipped a successful send into the shown "failed" state. Fix: capture the element you'll need (`const form = event.currentTarget`) before any `await`, and use that captured reference afterward. General rule: never touch `event.currentTarget`/`event.target` after an `await` in a handler.

## Design system (`alis-design-system`)

Vite library build (ES module + `.d.ts`), React as peer dependency (externalized in the Vite build, not bundled). Styling via CSS Modules and tokens in `src/tokens.css` (`--ds-*`) plus decorative utility classes in `src/patterns.css` (e.g. `.ds-dot-grid`), both imported once as a side effect from `src/index.ts`. Consumers import `@alishenriques/design-system` and `@alishenriques/design-system/styles.css`. The portfolio's `next.config.ts` lists it in `transpilePackages`.

**Components:** `Button`, `Eyebrow` (small muted uppercase label), `TagList` — currently used by the portfolio. `Panel` (raised bordered surface, optional dot-grid background), `TerminalPrompt` (mono prompt line with a blinking cursor), `PipelineBadges` (chips for real CI/test facts), `StatGrid` and `CommandPalette` (⌘K-triggered filterable overlay) — built for the original Console-only hero, **not used by the current mockup-driven Home** (superseded by `FeatureChips`/`Skills`/`Sidebar`), kept in the DS as they're still generically useful (e.g. `CommandPalette` is earmarked for a future search feature; see "Layout" above). All presentational/generic (content comes from props, no hardcoded copy), so they stay reusable beyond this one portfolio.

**Two build gotchas worth knowing before touching this package again:**
1. **`"use client"` gets stripped by Rollup.** `CommandPalette` needs client hooks, but Vite/Rollup's library build silently drops the inline `"use client"` directive from `dist/index.js`. Since the whole package bundles into one file anyway, the fix is a Rollup output `banner: '"use client";'` in `vite.config.ts` — re-added unconditionally, so the *entire* bundle is client-boundary. That's fine here (no server-only code in this package) but re-check this if the library ever needs a server-only export. Verify after any build with `head -1 dist/index.js`.
2. **Local cross-repo testing needs a real tarball, not `portal:`/`file:` to the source dir.** Yarn's `portal:` protocol (or pointing `file:` at the repo directory) resolves Node's module graph against the *design system's own* `node_modules/react` (installed there for its own test suite), which is a second React copy from the portfolio's — causes "Invalid hook call" the moment a DS component uses a hook. `Button` never surfaced this because it has no hooks. The real npm-published package never has this problem (no `node_modules` in the published tarball, so the consumer's own React is what resolves). To test a local, unpublished DS change from `alis-portfolio`: run `yarn pack --out alis-design-system.tgz` in `alis-design-system`, then depend on `"file:../alis-design-system/alis-design-system.tgz"` in the portfolio temporarily — this is what a real npm install will actually contain, unlike a live source link.

## Decisions made

| Decision | Choice |
|---|---|
| DS distribution | Public npm, versioned, published by CI |
| API hosting | Vercel serverless functions |
| Delivery strategy | Ship a simple MVP first, add the animated concept afterwards |
| Database / media | Neon Postgres / Cloudinary (free tiers) |

## Visual direction (locked 2026-09-22)

"Console" — an engineering/dev-tool aesthetic, not an animated showcase. Rationale: the audience is senior front-end / architecture hiring, who respond to demonstrated technical rigor (real CI status, real test counts, clean typography, fast/native-feeling mobile) more than motion effects. Two directions were prototyped and compared; "Console" won, with the bold accent-highlighted headline treatment merged in from the runner-up. Prototype: https://claude.ai/artifact/WjWaEenJaw8ScKKHT3QuEa (private to the user).

Palette/type below is still current. The **layout** was further evolved from a reference mockup the user provided afterward (centered hero with logo, `</>`-flanked headline, contact row, skills icon row, feature-chip grid, floating "code editor" / "file tree" decorative panels) — see "Home page composition" under Front-end for what actually shipped.

- **Palette:** near-black `#0b0b0f` background, warm off-white `#f4f1ea` foreground, lime accent `#c8ff00` (already in `alis-design-system`'s `tokens.css` as `--ds-color-bg` / `--ds-color-fg` / `--ds-color-accent`). Single dark theme by design choice, not light/dark toggle.
- **Type:** IBM Plex Mono for prompts, labels, data and small UI chrome; Archivo (weight ~800) for high-impact headlines, with one word/phrase set in the accent color; IBM Plex Sans for body copy. All via Google Fonts.
- **Motifs:** dot-grid background, a terminal-style prompt line, "pipeline" chips showing real facts (`lint ✓`, `test 29 ✓`, `build ✓` — pulled from actual CI/test results, never invented numbers), outline tag chips, a stat grid, a functional `⌘K` command palette as the one signature interactive/"cool" detail (not decorative animation).
- **Motion:** minimal and native-feeling — CSS transitions and the View Transitions API preferred over an animation library; respect `prefers-reduced-motion` everywhere.
- **Content strategy:** the site should demonstrate the claims (CI badge, real stack, real test count, public repos) rather than just asserting them in prose.
- **Implementation rule:** this becomes tokens + components in `alis-design-system` (fonts, command palette, pipeline/stat/tag components), not one-off Tailwind classes in `alis-portfolio/src/app/page.tsx`, so it scales to more pages later.

## Open decisions

- CMS editing UI (currently API only)
- Whether/how the long-form "About" text (still a draft per the user) gets its own `Profile` field and page
- Projetos: currently a Home section only — no dedicated `/projetos` route yet
- Company logos on the Home hero and the `logo-wordmark.jpg` the user sent: the `Logo` component (`shared/components/Logo`) is a **hand-drawn placeholder SVG**, not derived from that file (a JPEG inside a larger composite mockup — not something to losslessly re-vectorize). Swap it for a real vector logo if/when the user provides one.

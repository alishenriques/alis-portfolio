# Conventions

## Code

- TypeScript `strict`, no `any`. Prefer `unknown` plus Zod parsing at boundaries.
- Derive types from Zod schemas with `z.infer`; do not hand-write duplicates.
- Small, modular files. Colocate tests next to the code (`Foo.test.tsx`).
- API imports use the `.js` extension (ESM); do not remove it.
- Match the surrounding code's style and comment density.

## Testing

- Vitest everywhere. Testing Library for React (`@testing-library/react` and `@testing-library/dom` are both required).
- Test behavior, not implementation. Test GraphQL through `createApp(...).fetch(...)`, not by calling resolvers directly.
- Before finishing: `yarn lint && yarn typecheck && yarn test` in every repo touched.

## Design system

- **Where a new component goes** (user rule, 2026-09-27): if it's reusable across contexts — not tied to this portfolio's specific brand assets, copy, or data — it's built in `alis-design-system`, not duplicated locally in `alis-portfolio`'s `shared/components`. Props must be dynamic (text/behaviour passed in, never hardcoded), the component decoupled from any one caller, and always unit-tested. `LoadingButton` and `Avatar` are the reference examples: both were first considered for the portfolio, then built in/moved to the DS because nothing in them is portfolio-specific. By contrast, `Logo` (Alisson's actual brand SVG) and `LoadingOverlay` (which renders that `Logo`) stay in `alis-portfolio`, since they're inherently tied to this one product. When in doubt: could a *different* app reasonably import this component as-is, with different props? If yes, it belongs in the DS.
- Every component: folder `Name/` with `Name.tsx`, `Name.module.css`, `Name.test.tsx`, `index.ts`; export it and its prop types from `src/index.ts`.
- Use `--ds-*` tokens, never hardcoded colors or spacing.
- A DS component overriding a CSS property the *consumer's own className* might also set (e.g. `LoadingButton`'s loading-state colours) must do it via inline `style`, not a CSS class — the consumer's stylesheet could be bundled either side of the DS's CSS in the final app, so a class-based override can't reliably win the cascade; inline styles always do.
- Any change to public exports needs a version bump, so the portfolio can consume it.

## Git

- Default branch `main`. Work on feature branches (one branch per change).
- Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `test:`).
- Never commit `.env*` (except `.env.example`), `dist/`, `node_modules/`.

## Pull requests (user rule, 2026-10-06)

Every big change (the SEO work is the reference example: new features, pages, components, refactors, schema changes, anything touching more than a small fix) follows this flow, in every repo of the ecosystem:

1. **Branch**: create a new branch from up-to-date `main`.
2. **PR**: open a detailed, informative PR so Alisson can evaluate it without reading the code first. The body covers:
   - **What changed** and **what it is about** (context).
   - **The problem it solves** (why now, what was wrong or missing).
   - **New or changed components**: what each is for and how to use it (props, a usage snippet), plus the DS version bump when there is one.
   - **Architecture decisions** and alternatives discarded, when there were any.
   - **How it was verified** (lint/typecheck/test/build results, a preview URL or screenshots for visual changes) and anything left out on purpose.
   - Cross-links to the matching PRs in the other repos when a change spans several.
3. **Review**: Alisson comments on the PR asking for structural, visual, architectural or convention fixes. Reply to each comment on its thread, push the fix to the same branch, and keep the PR description current.
4. **Merge only after his explicit approval on the PR.** Never merge on your own, not even when CI is green.

Small fixes may still go on a branch with a short PR; when in doubt, treat the change as big.

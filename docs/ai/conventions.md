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

- Every component: folder `Name/` with `Name.tsx`, `Name.module.css`, `Name.test.tsx`, `index.ts`; export it and its prop types from `src/index.ts`.
- Use `--ds-*` tokens, never hardcoded colors or spacing.
- Any change to public exports needs a version bump, so the portfolio can consume it.

## Git

- Default branch `main`. Work on feature branches and open PRs once CI exists.
- Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `test:`).
- Never commit `.env*` (except `.env.example`), `dist/`, `node_modules/`.

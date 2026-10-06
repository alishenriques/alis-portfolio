# AI agent instructions (index)

Instructions for AI agents (Claude Code, Cursor, etc.) working on the Alis portfolio ecosystem. Keep these files current: update them in the same change that alters what they describe.

- [architecture.md](architecture.md): the three repos, data flow, and decisions already made
- [conventions.md](conventions.md): code, testing, typing and git rules
- [roadmap.md](roadmap.md): what is done and what comes next

## Scope (decided by the user, 2026-10-06)

- **`alis-portfolio` is a corporate career portfolio only**: Alisson as developer, tech lead, systems analyst and software architect, aimed at companies hiring for those roles. It does **not** sell services.
- **Freelance services** (digital solutions for small businesses and entrepreneurs) get a **separate, future sales site** in its own repo. It consumes the same `alis-portfolio-api` and the same `@alishenriques/design-system`, so both stay consumer-agnostic: nothing portfolio-specific in the API's contract or in DS components.
- When a request blurs the line (a services pitch, pricing, packages), it belongs to the services site, not here. Ask before adding it to the portfolio.

## Non-negotiables

1. **Zero cost.** Never add a paid service or dependency requiring payment.
2. **Everything typed.** TypeScript `strict`; no `any`. Data crossing a boundary (API, env, forms) is validated with a Zod schema.
3. **Everything tested.** New logic ships with unit tests. Run `lint`, `typecheck` and `test` before finishing.
4. **Design system stays isolated.** Reusable UI lives in `alis-design-system` and is consumed as the `@alishenriques/design-system` package. Never import from its source path or copy components.
5. **Do not guess Next.js APIs.** This is Next 16; read `node_modules/next/dist/docs/` first (see `AGENTS.md`).
6. **Never commit secrets.** Only `.env.example` is tracked.
7. **Confirm before outward-facing actions** (push, publish to npm, deploy, creating accounts or repos), unless already asked to.
8. **Big changes go through a reviewed PR, never straight to `main`.** New branch, a detailed PR (see "Pull requests" in [conventions.md](conventions.md)), and **no merge until Alisson explicitly approves it on the PR**. He reviews by commenting on the PR; answer and fix each comment there.

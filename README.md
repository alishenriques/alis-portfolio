# Alis Portfolio

Portfólio online interativo e animado de Alisson Henriques (`alishenriques`). Este é o **repositório principal** do ecossistema; ele consome o design system e a API descritos abaixo.

> Agentes de IA: leia [`CLAUDE.md`](CLAUDE.md) e [`docs/ai/`](docs/ai/) antes de alterar qualquer coisa.

## Ecossistema

| Repositório | Papel | Pacote / URL | Deploy |
|---|---|---|---|
| **alis-portfolio** (este) | Front-end Next.js (App Router) | — | Vercel |
| [alis-portfolio-api](https://github.com/alishenriques/alis-portfolio-api) | API GraphQL / CMS | `@alishenriques/portfolio-api` | Vercel (serverless) |
| [alis-design-system](https://github.com/alishenriques/alis-design-system) | Biblioteca de componentes React | `@alishenriques/design-system` (npm público) | npm via GitHub Actions |

```
Navegador ─▶ alis-portfolio (Next.js) ──Axios/GraphQL──▶ alis-portfolio-api ─▶ Neon Postgres
                   │                                            └────────────▶ Cloudinary (imagens)
                   └── importa ──▶ @alishenriques/design-system (npm)
```

## Stack

- **Front-end:** Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Data fetching:** Axios + GraphQL, respostas validadas com Zod
- **Design system:** React, Vite (lib mode), CSS Modules + tokens `--ds-*`
- **API:** Node, GraphQL Yoga, Drizzle ORM, Zod
- **Dados:** Neon (Postgres) e Cloudinary (imagens)
- **Qualidade:** Vitest + Testing Library, ESLint, TypeScript `strict`
- **Gerenciador de pacotes:** Yarn 4 (`nodeLinker: node-modules`)
- **CI/CD:** GitHub Actions + Vercel

**Custo zero é requisito.** Só usar planos gratuitos; se algo exigir pagamento, buscar alternativa antes de adotar.

## Rodando localmente

Pré-requisitos: Node 22+, Yarn 4 (via Corepack: `corepack enable`).

```bash
yarn install
cp .env.example .env.local
yarn dev          # http://localhost:3000
```

A API roda em `http://localhost:4000/graphql` (`yarn dev` no repo da API). Sem `DATABASE_URL`, ela usa dados de fallback.

## Scripts

| Comando | O que faz |
|---|---|
| `yarn dev` | Servidor de desenvolvimento |
| `yarn build` | Build de produção |
| `yarn lint` | ESLint |
| `yarn typecheck` | `tsc --noEmit` |
| `yarn test` | Testes unitários (Vitest) |

## Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_GRAPHQL_URL` | URL do endpoint GraphQL da API |

## Status

Ver [`docs/ai/roadmap.md`](docs/ai/roadmap.md).

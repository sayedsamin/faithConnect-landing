# Questura V2

Production-oriented TanStack Start starter with enterprise-grade baseline tooling preinstalled.

## Core Stack

- TanStack Start + Router + Query
- Prisma ORM + PostgreSQL
- Supabase Auth (`@supabase/supabase-js`, `@supabase/ssr`)
- TypeScript + Zod + `@t3-oss/env-core`
- Tailwind CSS + shadcn/ui

## Observability

- Sentry
- Pino
- Google Analytics 4
- PostHog (feature flags/product analytics)

## Security and API Governance

- Security headers utility (`src/lib/server/security.ts`)
- API rate limiting (`rate-limiter-flexible`)
- OpenAPI generation from Zod (`@asteasolutions/zod-to-openapi`)
- Health endpoint: `/api/health`
- OpenAPI doc endpoint: `/api/openapi.json`

## Testing

- Vitest
- Testing Library
- Playwright
- Axe accessibility checks in E2E (`@axe-core/playwright`)
- MSW for API mocking scaffolding

## Code Quality and Automation

- ESLint + Prettier
- Husky + lint-staged pre-commit hook
- Knip (`npm run deps:unused`)
- Dependency Cruiser (`npm run deps:cruise`)
- CI workflow for lint/type/test/audit

## Optional Scale Tooling Included

- BullMQ + ioredis (queue scaffolding)

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Scripts

- `npm run dev` - start local dev server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint
- `npm run format` - run Prettier check
- `npm run check` - format + fix lint issues
- `npm run typecheck` - TypeScript checks
- `npm run test` - unit tests (Vitest)
- `npm run test:watch` - unit tests watch mode
- `npm run playwright:install` - install Playwright browsers
- `npm run test:e2e` - e2e tests (Playwright)
- `npm run test:e2e:ui` - interactive Playwright UI
- `npm run audit` - dependency vulnerability audit
- `npm run audit:prod` - prod dependency audit only
- `npm run deps:unused` - detect unused code/deps
- `npm run deps:cruise` - dependency boundary checks
- `npm run prisma:validate` - validate the Prisma schema
- `npm run prisma:generate` - generate the Prisma client
- `npm run prisma:migrate:deploy` - deploy pending Prisma migrations
- `npm run prisma:verify:runtime` - verify live Prisma connectivity

## Key Files

- `src/lib/env.ts` and `src/lib/env.server.ts` for typed env validation
- `src/integrations/prisma/server.ts` for server-only application-table access
- `src/integrations/supabase/` for browser/server Supabase Auth clients
- `src/portals/` for UI-facing data access and orchestration
- `src/lib/auth/rbac.ts` for role model + checks
- `src/lib/server/` for headers and rate limiting
- `src/contracts/` for Zod/OpenAPI contracts
- `src/lib/queue/jobs.ts` for BullMQ baseline
- `.github/workflows/ci.yml` for CI baseline
- `docs/FEATURE_DEVELOPMENT_GUIDE.md` for page/feature implementation rules

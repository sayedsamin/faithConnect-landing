# Feature Development Guide

This guide defines the default rules and procedures for building pages and features in this repository.

## 1. Core Principles

1. Validate at boundaries.
   Use Zod at all external boundaries: request payloads, response payloads, URL params, and environment variables.

2. Prefer server-side trust.
   Put privileged logic and secrets in server handlers/functions only. Never expose service keys to client code.

3. Ship typed contracts.
   If you create or change an API route, update/register the Zod schema in `src/contracts/*` and make sure `/api/openapi.json` reflects it.

4. Secure by default.
   Server endpoints should apply security headers and rate limiting unless there is a clear reason not to.

5. Test every feature path.
   Add unit tests for business logic and e2e coverage for user-visible flows.

## 2. Repo Structure Rules

- Routes/pages: `src/routes/**`
- API routes: `src/routes/api/**`
- Contracts (Zod/OpenAPI): `src/contracts/**`
- Portal data layers: `src/portals/**`
- Infrastructure and generic utilities: `src/lib/**`
- Integrations (analytics, Prisma, Supabase Auth, query wrappers): `src/integrations/**`
- Reusable UI: `src/components/**`
- Unit tests: `tests/unit/**`
- E2E tests: `tests/e2e/**`

Keep route-specific UI in route-local `-components/` folders. Keep UI-facing
data access and orchestration in `src/portals/**`.

## 3. Creating a New Page

1. Create a route file in `src/routes`.
   Example: `src/routes/account.tsx`

2. Keep route components lean.
   Route file should orchestrate data + layout. Move route-local UI to a
   sibling `-components/` folder and UI-facing data behavior to `src/portals/**`.

3. Use TanStack Query for async data.
   Components use portal query and mutation modules. Portal `api.ts` modules
   expose server functions and are the only UI-facing request layer.

4. If route types are stale, regenerate:

```bash
npx @tanstack/router-cli@latest generate
```

### Page template

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/account')({
  component: AccountPage,
})

function AccountPage() {
  return <div>Account</div>
}
```

## 4. Creating a New API Endpoint (Server Handler)

1. Add route file under `src/routes/api`.
   Example: `src/routes/api/account.tsx`

2. Define request/response schemas in `src/contracts`.
   Register route in OpenAPI registry.

3. Apply rate limiting + security headers.
   Use:

- `enforceRateLimit` from `src/lib/server/rate-limit.ts`
- `applySecurityHeaders` from `src/lib/server/security.ts`

4. Validate response payload before returning.

### API route template

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { z } from 'zod'
import { applySecurityHeaders } from '#/lib/server/security'
import { enforceRateLimit } from '#/lib/server/rate-limit'

const responseSchema = z.object({
  ok: z.boolean(),
})

export const Route = createFileRoute('/api/example')({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const clientKey = request.headers.get('x-forwarded-for') ?? 'unknown'
        const limit = await enforceRateLimit(`example:${clientKey}`)

        if (!limit.allowed) {
          const headers = applySecurityHeaders()
          headers.set('retry-after', String(limit.retryAfterSeconds))
          return json({ ok: false }, { status: 429, headers })
        }

        const payload = responseSchema.parse({ ok: true })
        return json(payload, { headers: applySecurityHeaders() })
      },
    },
  },
})
```

## 5. Prisma And Supabase Auth Rules

1. Application-table usage:
   Use server-side Prisma through `getPrismaClient()` from
   `src/integrations/prisma/server.ts`.

2. Portal usage:
   Expose UI-facing Prisma operations through `src/portals/**/api.ts` server
   functions. Components consume portal queries or mutations.

3. Supabase Auth browser usage:
   Use `getSupabaseBrowserClient()` from `src/integrations/supabase/client.ts`
   only for `supabase.auth.*`.

4. Supabase Auth server usage:
   Use `createSupabaseServerClient()` from `src/integrations/supabase/server.ts` with a cookie adapter.

5. Role checks:
   Enforce authorization with `src/lib/auth/rbac.ts` for privileged operations.

6. Never use Supabase `.from()` or `.rpc()` for application tables.
   Supabase secret keys remain server-only and are reserved for Auth
   administration scripts.

## 6. Forms and Validation

Default stack is `react-hook-form` + `zodResolver`.

Rules:

- Define schema first with Zod.
- Infer form type from schema (`z.infer`).
- Keep submit handler thin; delegate UI-facing side effects to portal mutations.
- Render field errors from resolver output.

Use `src/components/forms/contact-form.tsx` as baseline reference.

## 7. Observability and Analytics

1. Logging:
   Use `logger` from `src/lib/logger.ts` for app-level logs.

2. Error monitoring:
   Sentry init runs in `instrument.server.mjs`.
3. Product analytics:
   GA4 and PostHog providers are mounted in root route.
   Do not initialize analytics separately in random components.

## 8. Security Rules

1. Every new API route should set security headers.
2. Rate limit externally reachable endpoints.
3. Validate all inputs (query/body/params) with Zod.
4. Do not leak internal errors to response bodies.
5. Keep secrets in `.env.local` and typed through:

- `src/lib/env.ts` (client-safe vars)
- `src/lib/env.server.ts` (server-only vars)

## 9. Testing Procedure per Feature

For each feature:

1. Unit test business rules in `tests/unit/**`.
2. Add/extend e2e test in `tests/e2e/**` for user-visible behavior.
3. Preserve accessibility checks for page flows (`@axe-core/playwright`).
4. If API behavior is mocked in unit tests, add MSW handlers in `src/mocks/handlers.ts`.

## 10. Dependency and Quality Gates

Before opening a PR, run:

```bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run audit:prod
npm run deps:unused
npm run deps:cruise
```

Pre-commit hook runs `lint-staged`, but do not rely on hook alone.

## 11. Feature Delivery Checklist

1. Route/API file created in correct folder.
2. Zod schema added for all new input/output boundaries.
3. OpenAPI contracts updated (for API changes).
4. Security headers + rate limiting applied (for API routes).
5. Prisma table access and Supabase Auth client/server separation are respected.
6. RBAC check added where privilege is required.
7. Unit and e2e tests added/updated.
8. Lint/typecheck/tests/audit/dependency checks pass.
9. README/docs updated if behavior or setup changed.

## 12. Anti-Patterns to Avoid

- Fetching directly in many components without query caching strategy.
- Calling Supabase `.from()` or `.rpc()` for application tables.
- Importing Prisma into browser code.
- Duplicating env parsing logic outside `env.ts` / `env.server.ts`.
- Mixing client and server secrets.
- Returning unvalidated data from API handlers.
- Adding feature logic only in UI components with no test coverage.

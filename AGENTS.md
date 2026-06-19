# AGENTS.md

## Purpose

This file defines the default implementation rules for Codex and contributors
working in this repository.

## Core Engineering Rules

1. Validate at boundaries with Zod.

- Validate request payloads, response payloads, URL params, search params, form
  inputs, and env values.

2. Keep privileged logic server-side.

- Secrets and privileged operations must stay in server handlers/functions.
- Never expose service keys in client code.

3. Keep API contracts typed and in sync.

- Any API route change must update/register schemas in `src/contracts/**`.
- Ensure `/api/openapi.json` reflects route contract changes.

4. Secure endpoints by default.

- Apply security headers and rate limiting to externally reachable endpoints
  unless explicitly justified.

5. Test every feature path.

- Add or update unit tests for business logic and user-facing feature behavior.
- E2E coverage is not required by default.
- Add E2E tests only when explicitly requested.

## Source Ownership Rules

`src/portals/**` is the default home for user-facing data access and feature data
orchestration:

- portal API wrappers
- query definitions/hooks
- mutation hooks
- portal-specific data hooks
- schemas for portal forms, filters, search params, request payloads, and
  response payloads
- user, student, guardian, admin, supervisor, tenant, attendance, billing, and
  portal-related data helpers

`src/portals/**` must not contain UI components:

- no JSX components
- no `components/` folders
- no page layout components
- no presentational components
- no shared UI primitives

`src/routes/**` owns route-specific UI:

- route files
- page-level orchestration
- page-specific components
- route-local `-components/` folders

`src/components/**` is only for shared app-level UI:

- header
- footer
- buttons
- card shells
- layout primitives
- modals
- typography
- design-system components

`src/lib/**` is only for infrastructure and generic utilities that are not
directly tied to user-facing product features:

- rate limiting
- security headers
- logging
- env parsing
- auth/RBAC primitives
- low-level server utilities
- generic formatting/date/string utilities

Do not put UI components in `src/portals/**`.

Do not put portal data access, query/mutation hooks, feature-specific hooks,
portal business rules, or user-domain helpers in `src/lib/**`.

## Repo Placement Rules

- Routes/pages and route-specific UI: `src/routes/**`
- Route-local components: `src/routes/**/-components/**`
- API routes: `src/routes/api/**`
- Contracts (Zod/OpenAPI): `src/contracts/**`
- Portal data layers, hooks, schemas, and API wrappers: `src/portals/**`
- Infrastructure, platform utilities, and generic helpers: `src/lib/**`
- Integrations: `src/integrations/**`
- Shared app-level UI components: `src/components/**`
- Unit tests: `tests/unit/**`

## Portals-Only Data Architecture

All UI-facing network calls must live in `src/portals/**`.

Pages and components must not call `fetch`, Supabase, server functions,
generated API clients, external API clients, or service clients directly.

UI code reaches data through portal query or mutation modules.

### Portal Structure

```txt
src/portals/
├── superadmin/
├── admin/
├── supervisor/
├── guardian/
├── student/
└── common/
```

Each portal owns its own data layer.

```txt
src/portals/{portalName}/{featureName}/
├── api.ts
├── queries.ts
├── mutations.ts
├── schemas.ts
└── hooks.ts
```

Example:

```txt
src/portals/superadmin/users/
├── api.ts
├── queries.ts
├── mutations.ts
├── schemas.ts
└── hooks.ts
```

Do not create `components/` folders inside `src/portals/**`.

### Portal Responsibilities

- `src/portals/superadmin/**`: superadmin-only data needs such as platform
  users, tenant management, global settings, and system-wide reports.
- `src/portals/admin/**`: admin-only data needs such as school settings, staff
  management, student management, guardian management, and reports.
- `src/portals/supervisor/**`: supervisor-only data needs such as assigned
  students, attendance review, progress monitoring, and class/session oversight.
- `src/portals/guardian/**`: guardian-only data needs such as child profile,
  child attendance, child progress, billing/payment views, and guardian
  communication.
- `src/portals/student/**`: student-only data needs such as student profile,
  assigned work, attendance, progress, and announcements.
- `src/portals/common/**`: data-layer or portal-domain code currently reused by
  two or more portals. Do not put code in `common` because it may be reused
  later.

### Portal File Rules

#### `api.ts`

`api.ts` contains actual request functions.

`api.ts` is the only portal file that may call:

- `fetch`
- server functions
- generated API clients
- external service clients
- request payload mapping
- response parsing

Not allowed:

- React components
- JSX
- route logic
- page layout logic
- `useQuery`
- `useMutation`
- component-specific UI state

#### `queries.ts`

`queries.ts` contains TanStack Query read definitions.

Allowed:

- `queryOptions()`
- query functions that call `api.ts`
- query keys
- cache behavior such as `staleTime`, `select`, and `enabled`

Not allowed:

- mutation hooks
- JSX
- React components
- form UI logic
- direct component-side fetching
- direct generated API client calls
- direct Supabase calls
- direct `fetch` calls

#### `mutations.ts`

`mutations.ts` contains TanStack Mutation write hooks.

Allowed:

- `useMutation()`
- mutation functions that call `api.ts`
- query invalidation
- cache updates with `setQueryData`
- optimistic updates

Not allowed:

- JSX
- React components
- route logic
- raw API implementation
- direct generated API client calls
- direct Supabase calls
- direct `fetch` calls

#### `schemas.ts`

`schemas.ts` contains Zod runtime validation for forms, filters, search params,
request payloads, and API response payloads. It may export schema-derived types.

```ts
export type CreateStudentInput = z.infer<typeof createStudentSchema>
```

Not allowed:

- JSX
- React components
- route logic
- raw API implementation

#### `hooks.ts` or `hooks/`

Portal-specific data and orchestration hooks belong in the relevant portal
feature.

Allowed:

- feature-specific data hooks
- table/filter/sort/pagination data hooks
- derived feature data behavior
- composition of portal queries/mutations
- user-facing data orchestration without JSX

Not allowed:

- JSX
- React components
- presentational UI hooks tied to component rendering
- raw API implementation
- direct `fetch`
- direct Supabase calls
- direct generated API client calls
- cross-portal dumping-ground utilities

### Portal Data Flow

All CRUD requests must follow this path:

```txt
Page / Component
  -> queries.ts or mutations.ts
  -> api.ts
  -> backend/server function/external API
```

Components must not call `api.ts` directly.

### Portal Placement Rules

- Private to one data feature: keep it inside the relevant
  `src/portals/{portalName}/{featureName}/` folder.
- Shared across multiple data features in one portal: keep it in
  `src/portals/{portalName}/common/` or another explicit portal-level shared
  data folder.
- Shared across two or more portals: move it to `src/portals/common/`.
- Used by all portals but still portal/domain-specific: keep it in
  `src/portals/common/`.
- If code is reused by multiple portals but still relates to user-facing product
  data behavior, place it in `src/portals/common/**`, not `src/lib/**`.
- UI components never belong in `src/portals/**`.

### Portal Naming Rules

Use explicit portal-aware names.

Good:

```ts
superadminTenantsQueryOptions()
useCreateSuperadminTenantMutation()

getAdminStudents()
adminStudentsQueryOptions()
useUpdateAdminStudentMutation()

getSupervisorAssignedStudents()
supervisorAssignedStudentsQueryOptions()

getGuardianChildren()
guardianChildrenQueryOptions()

getStudentAssignments()
studentAssignmentsQueryOptions()
```

Avoid vague names inside portal-specific folders:

```ts
getStudents()
usersQueryOptions()
studentsQueryOptions()
```

Generic names are acceptable only inside `src/portals/common/`.

### Portal Common Promotion Rule

Use `src/portals/common/**` only for code currently reused by two or more
portals. Do not move code there speculatively.

Code used by all portals but still portal/domain-specific also belongs in
`src/portals/common/**`.

### Portal Hard Rules

- Do not put UI components in `src/portals/**`.
- Do not create `components/` folders inside `src/portals/**`.
- Do not write JSX in portal files.
- Do not call `api.ts` directly from route components.
- Do not duplicate the same API/query/mutation in portal-specific and common
  folders.
- Do not move code to `common` until at least two portals use it.
- Do not let `common` become a dumping ground.
- Do not mix superadmin, admin, supervisor, guardian, and student data logic in
  the same feature folder.
- Do not put user, student, guardian, admin, supervisor, tenant, attendance,
  billing, or portal-specific helpers in `src/lib/**`.

## Component Locality Rule

- Route-specific UI belongs in `src/routes/**`.
- Route files such as `src/routes/about.tsx` should own route registration,
  route metadata, and the top-level page composition for that route.
- Do not create a separate route-local wrapper file whose only job is to render
  the page sections, such as `src/routes/-components/about-page.tsx`. Put that
  composition directly in the route file instead.
- For route-specific UI, colocate components beside the route file using a
  `-components/` folder.
- For pages with multiple sections or repeated elements, create a
  page-specific folder under `-components/` and split each section, card, list,
  hook, data set, or reusable page element into its own file.
- If the route file is `route.tsx`, place local components in a sibling
  `-components/` folder.
- If the route file is `index.tsx`, place local components in a sibling
  `-components/` folder.
- Use `src/components/**` only for shared app-level UI primitives or components
  reused across multiple unrelated route areas.
- Do not place UI components in `src/portals/**`.
- Do not move route-specific components to `src/components/**` just because
  they may be reused later.

Examples:

Preferred page composition pattern:

```txt
src/routes/
+-- about.tsx
+-- -components/
    +-- about-page/
        +-- about-hero.tsx
        +-- about-values.tsx
        +-- about-benefit-card.tsx
        +-- about-data.ts
        +-- feature-reveal.ts
```

```txt
├── route.tsx
└── -components/
    ├── StudentTable.tsx
    ├── StudentFilters.tsx
    └── StudentEmptyState.tsx
```

```txt
├── index.tsx
└── -components/
    ├── StudentTable.tsx
    ├── StudentFilters.tsx
    └── StudentEmptyState.tsx
```

## New Page Rules

1. Create route files in `src/routes/**`.
2. Keep route files focused on route registration, metadata, and top-level page
   composition.
3. Move every non-trivial route-specific section, card, list, hook, data set,
   or reusable page element into its own file under a route-local
   `-components/{page-name}/` folder.
4. Keep user-facing data access, data orchestration, hooks, API wrappers,
   queries, mutations, and schemas in `src/portals/**`.
5. Do not put UI components in `src/portals/**`.
6. Use `src/lib/**` only for infrastructure or generic utilities unrelated to a
   specific user-facing feature.
7. Use TanStack Query for async data; avoid repeated deep component fetch
   patterns.
8. Regenerate route types when needed:

```bash
npx @tanstack/router-cli@latest generate
```

## New API Endpoint Rules

1. Add endpoint under `src/routes/api/**`.
2. Define input/output schemas in `src/contracts/**` and register OpenAPI
   metadata.
3. Apply:

- `enforceRateLimit` from `src/lib/server/rate-limit.ts`
- `applySecurityHeaders` from `src/lib/server/security.ts`

4. Validate request payloads, URL params, search params, and response payloads.
5. Validate response payload before returning.
6. Do not leak internal errors in responses.
7. Keep privileged authorization server-side.

## Prisma And Supabase Auth Rules

- Application-table access: use server-side Prisma through
  `getPrismaClient()` from `src/integrations/prisma/server.ts`.
- UI-facing application-table calls must flow through portal `api.ts` server
  functions. Never import Prisma into browser code.
- Supabase remains the identity provider. Browser Auth flows use
  `getSupabaseBrowserClient()` from
  `src/integrations/supabase/client.ts`.
- Server Auth flows use `createSupabaseServerClient()` from
  `src/integrations/supabase/server.ts` with cookie adapter.
- Do not use Supabase `.from()` or `.rpc()` for application-table access.
- Supabase secret keys are server-only and reserved for Auth administration
  scripts.
- Enforce privileged authorization with `src/lib/auth/rbac.ts`.
- Auth/RBAC primitives may live in `src/lib/**` as infrastructure.
- Portal-specific permission decisions and data behavior belong in
  `src/portals/**`.

## Forms and Validation

- Default stack: `react-hook-form` + `zodResolver`.
- Define schema first with Zod.
- Infer form types with `z.infer`.
- Keep submit handlers thin.
- Move side effects to portal mutations or portal data modules.
- Render validation errors from resolver output.
- Form UI belongs in route-local `-components/` folders or shared
  `src/components/**` only when truly shared.
- Do not put form UI in `src/portals/**`.
- Do not put user-facing form business rules in `src/lib/**` unless they are
  truly generic utilities.

## Observability and Analytics

- Use `logger` from `src/lib/logger.ts`.
- Sentry bootstrap lives in `instrument.server.mjs`.
- GA4 and PostHog providers are mounted in root route.
- Do not initialize analytics ad hoc in random components.

### Logging and Audit Standards (No separate runbook required)

- Use `src/lib/observability/logging.ts` for all server-side request and business/event logging.
- Required imports for logging in API handlers: use `createRequestContext`, `addRequestId`, and `logRequest`.
- Required imports for domain writes/privileged mutations: use `logBusinessEvent`.

#### Standard request log shape

- Event name: `event: 'http.request'`
- Fields:
  - `requestId` (generated/propgated)
  - `path`
  - `method`
- `status`
  - `durationMs`
  - `actor` (only `id`, `role` when known)
  - `ip` and `userAgent` (best effort)
  - `metadata` (safe fields only; no secrets)
- Use `logRequest` for all externally reachable `/api/*` outcomes:
  - success
  - validation failure
  - rate-limit denial
  - auth/authorization failure
  - internal failure
- Return and include `x-request-id` and `x-correlation-id` on API responses.

#### Standard business audit event shape

- Event name: `event: 'business'`
- Fields:
  - `requestId`
  - `action` (`team.create`, `team.update`, `team.delete`, `admin.create`, `admin.remove`, `staff.add`, `staff.update`, `staff.remove`, `program.create`, `summerProgramRegistration.create`, `summerProgramRegistration.updateStatus`, etc.)
  - `actor` (`id`, `role`)
  - `outcome` (`success | failure`)
  - `resource` (`type`, optional `id`)
  - `status`
  - `metadata` (counts/names/ids)
  - `error` on failures (normalized only)
- Log **one business event per write path** in portal mutation handlers.

#### Data safety

- Never log raw credentials/tokens/passwords/API keys/secrets/cookies.
- Always sanitize request payloads and metadata before logging.
- Keep payloads lean: IDs, counts, booleans, enum-like status values, actor context.
- Prefer async/low-cost logging path by relying on the shared logger and platform log sink, not synchronous per-request external writes.

#### Required log coverage

- All API routes under `src/routes/api/**` must emit request logs with status + latency.
- All privileged writes in `src/portals/**` mutation paths should emit a business log.
- `team`, `staff`, `admin`, `program`, and summer-program registration mutation handlers must include explicit success and failure logs.

#### Placement

- Put logging utilities only in `src/lib/observability` and `src/lib/logger.ts`.
- Keep logging calls server-side; do not add logging in client components.

## Env and Secrets

- Keep secrets in `.env.local`.
- Client-safe env parsing: `src/lib/env.ts`.
- Server-only env parsing: `src/lib/env.server.ts`.
- Do not duplicate env parsing logic elsewhere.
- Never expose service keys or privileged env values in client code.

## Feature Testing Requirements

Per feature:

1. Unit tests in `tests/unit/**`.
2. If unit tests mock API behavior, add/update MSW handlers in
   `src/mocks/handlers.ts`.
3. E2E tests are not required by default.
4. Add E2E tests only when explicitly requested for a specific task.

## Pre-PR Quality Gates

Run before opening PR:

```bash
npm run typecheck
npm run test
npm run audit:prod
npm run deps:unused
npm run deps:cruise
```

Do not run `npm run test:e2e` unless E2E coverage was explicitly requested or
the task specifically changes existing E2E-tested flows.

## Delivery Checklist

1. Route/API file is in the correct folder.
2. Route-specific UI lives in `src/routes/**/-components/**`.
3. Zod schemas are added for all new boundaries.
4. OpenAPI contracts are updated for API changes.
5. Security headers and rate limiting are applied for API routes.
6. Prisma table access and Supabase Auth client/server separation are respected.
7. RBAC checks exist for privileged actions.
8. User-facing data access lives in `src/portals/**`.
9. `src/portals/**` contains no UI components, JSX, or `components/` folders.
10. Shared app-level UI components live in `src/components/**`.
11. Infrastructure and generic utilities live in `src/lib/**`.
12. Unit tests are added/updated.
13. MSW handlers are added/updated when unit tests mock API behavior.
14. Lint, typecheck, tests, audit, and dependency checks pass.
15. README/docs are updated when behavior/setup changes.

## Anti-Patterns

- Repeated direct fetching in nested components without caching strategy.
- Calling `fetch`, Supabase, server functions, generated API clients, or
  external API clients directly from components.
- Calling portal `api.ts` functions directly from components.
- Returning unvalidated data from API handlers.
- Mixing client and server secrets.
- Duplicating env parsing outside `env.ts` / `env.server.ts`.
- Putting user-facing feature logic in `src/lib/**`.
- Putting UI components in `src/portals/**`.
- Creating `components/` folders inside `src/portals/**`.
- Putting route-specific UI in `src/components/**`.
- Moving code to `src/portals/common/**` speculatively.
- Putting feature logic only in UI components without test coverage.

## UI Standards

These UI standards apply when creating or modifying user-facing UI. They do not
apply to backend-only, test-only, documentation-only, or infrastructure-only
changes unless relevant.

Use MUST/SHOULD/NEVER to guide decisions.

### Theme and Color

- MUST: Follow the existing theme color system as much as possible.
- MUST: Prefer theme tokens, CSS variables, or design-system color references
  over literal color values.
- SHOULD: Avoid hardcoding colors such as hex/rgb/hsl/named colors unless there
  is a clear, documented exception.

### Interactions

#### Keyboard

- MUST: Full keyboard support per WAI-ARIA APG.
- MUST: Visible focus rings with `:focus-visible`; group with `:focus-within`
  when appropriate.
- MUST: Manage focus traps, focus movement, and focus return per APG patterns.
- NEVER: Use `outline: none` without a visible focus replacement.

#### Targets and Input

- MUST: Hit target = 24px minimum; mobile = 44px minimum.
- MUST: If visual target is smaller than 24px, expand the hit area.
- MUST: Mobile `<input>` font-size = 16px to prevent iOS zoom.
- NEVER: Disable browser zoom with `user-scalable=no` or `maximum-scale=1`.
- MUST: Use `touch-action: manipulation` to prevent double-tap zoom.
- SHOULD: Set `-webkit-tap-highlight-color` to match design.

#### Forms

- MUST: Hydration-safe inputs with no lost focus/value.
- NEVER: Block paste in `<input>` or `<textarea>`.
- MUST: Loading buttons show spinner and keep original label.
- MUST: Enter submits focused input.
- MUST: In `<textarea>`, Cmd/Ctrl+Enter submits.
- MUST: Keep submit enabled until request starts; then disable with spinner.
- MUST: Accept free text while typing; validate after input or on submit. Do not
  block typing.
- MUST: Allow incomplete form submission to surface validation.
- MUST: Errors inline next to fields; on submit, focus first error.
- MUST: Use `autocomplete` and meaningful `name`; use correct `type` and
  `inputmode`.
- SHOULD: Disable spellcheck for emails/codes/usernames.
- SHOULD: Placeholders end with `...` and show example pattern.
- MUST: Warn on unsaved changes before navigation.
- MUST: Compatible with password managers and 2FA; allow pasting codes.
- MUST: Trim values to handle text expansion trailing spaces.
- MUST: No dead zones on checkboxes/radios; label and control share one hit
  target.

#### State and Navigation

- MUST: URL reflects state for deep-link filters, tabs, pagination, and expanded
  panels.
- MUST: Back/Forward restores scroll position.
- MUST: Links use `<a>`/`<Link>` for navigation and support Cmd/Ctrl/middle-click.
- NEVER: Use `<div onClick>` for navigation.

#### Feedback

- SHOULD: Optimistic UI; reconcile on response; on failure, rollback or offer
  Undo.
- MUST: Confirm destructive actions or provide Undo window.
- MUST: Use polite `aria-live` for toasts and inline validation.
- SHOULD: Use ellipsis (`...`) for options opening follow-ups, such as
  `Rename...`, and loading states, such as `Loading...`.

#### Touch and Drag

- MUST: Generous targets and clear affordances; avoid finicky interactions.
- MUST: Delay first tooltip; subsequent peer tooltips may be instant.
- MUST: Use `overscroll-behavior: contain` in modals/drawers.
- MUST: During drag, disable text selection and set `inert` on dragged elements.
- MUST: If it looks clickable, it must be clickable.

#### Autofocus

- SHOULD: Autofocus on desktop with a single primary input.
- SHOULD: Avoid autofocus on mobile unless clearly beneficial.

### Animation

- MUST: Honor `prefers-reduced-motion` with a reduced variant or disabled
  animation.
- SHOULD: Prefer CSS over Web Animations API over JS libraries.
- MUST: Animate compositor-friendly props: `transform` and `opacity`.
- NEVER: Animate layout props such as `top`, `left`, `width`, or `height`.
- NEVER: Use `transition: all`; list properties explicitly.
- SHOULD: Animate only to clarify cause/effect or add deliberate delight.
- SHOULD: Choose easing to match the change in size, distance, and trigger.
- MUST: Animations are interruptible and input-driven.
- MUST: Correct `transform-origin`; motion starts where it physically should.
- MUST: SVG transforms on `<g>` wrapper with `transform-box: fill-box`.

### Layout

- SHOULD: Use optical alignment; adjust +/-1px when perception beats geometry.
- MUST: Deliberate alignment to grid, baseline, and edges - no accidental
  placement.
- SHOULD: Balance icon/text lockups by weight, size, spacing, and color.
- MUST: Verify mobile, laptop, and ultra-wide layouts.
- MUST: Respect safe areas with `env(safe-area-inset-*)`.
- MUST: Avoid unwanted scrollbars; fix overflows.
- SHOULD: Prefer flex/grid over JS measurement for layout.

### Content and Accessibility

- SHOULD: Inline help first; tooltips as a last resort.
- MUST: Skeletons mirror final content to avoid layout shift.
- MUST: `<title>` matches current context.
- MUST: No dead ends; always offer next step/recovery.
- MUST: Design empty, sparse, dense, and error states.
- SHOULD: Use curly quotes (" ").
- SHOULD: Avoid widows/orphans with `text-wrap: balance`.
- MUST: Use `font-variant-numeric: tabular-nums` for number comparisons.
- MUST: Use redundant status cues; never rely on color only.
- MUST: Icons have text labels or accessible names.
- MUST: Accessible names exist even when visuals omit labels.
- MUST: Use the ellipsis character (`…`), not three periods (`...`).
- MUST: Use `scroll-margin-top` on headings.
- MUST: Include a "Skip to content" link.
- MUST: Use hierarchical `<h1>` through `<h6>`.
- MUST: UI is resilient to user-generated content: short, average, very long.
- MUST: Use locale-aware dates/times/numbers with `Intl.DateTimeFormat` and
  `Intl.NumberFormat`.
- SHOULD: Use `translate="no"` on brand names, code tokens, and identifiers to
  prevent garbled auto-translation.
- MUST: Accurate `aria-label`.
- MUST: Decorative elements use `aria-hidden`.
- MUST: Icon-only buttons have descriptive `aria-label`.
- MUST: Prefer native semantics: `button`, `a`, `label`, `table` before ARIA.
- MUST: Use non-breaking spaces where appropriate: `10 MB`, `Cmd K`, brand
  names.

### Content Handling

- MUST: Text containers handle long content with `truncate`, `line-clamp-*`, or
  `break-words`.
- MUST: Flex children use `min-w-0` to allow truncation.
- MUST: Handle empty states - no broken UI for empty strings or empty arrays.

### Performance

- SHOULD: Test iOS Low Power Mode and macOS Safari for meaningful UI/performance
  work.
- MUST: Measure reliably; disable extensions that skew runtime.
- MUST: Track and minimize re-renders with React DevTools/React Scan where
  relevant.
- MUST: Profile with CPU/network throttling for performance-sensitive flows.
- MUST: Batch layout reads/writes; avoid reflows/repaints.
- SHOULD: Mutations target <500ms where backend constraints allow.
- SHOULD: Prefer uncontrolled inputs; keep controlled inputs cheap per keystroke.
- SHOULD: Virtualize large lists when rendering more than 50 items.
- MUST: Preload above-fold images; lazy-load the rest.
- MUST: Prevent CLS with explicit image dimensions.
- SHOULD: Use `<link rel="preconnect">` for CDN domains.
- SHOULD: Use `<link rel="preload" as="font">` with `font-display: swap` for
  critical fonts.

### Dark Mode and Theming

- MUST: Use `color-scheme: dark` on `<html>` for dark themes.
- SHOULD: `<meta name="theme-color">` matches page background.
- MUST: Native `<select>` has explicit `background-color` and `color`.

### Hydration

- MUST: Inputs with `value` need `onChange`, or use `defaultValue`.
- SHOULD: Guard date/time rendering against hydration mismatch.

### Design

- SHOULD: Use layered shadows: ambient + direct.
- SHOULD: Use crisp edges via semi-transparent borders + shadows.
- SHOULD: Nested radii: child <= parent; concentric.
- SHOULD: Hue consistency: tint borders, shadows, and text toward background hue.
- MUST: Accessible charts with color-blind-friendly palettes.
- SHOULD: Prefer APCA contrast guidance over WCAG 2 where practical.
- MUST: Increase contrast on `:hover`, `:active`, and `:focus`.
- SHOULD: Match browser UI to background.
- SHOULD: Avoid dark color gradient banding; use background images when needed.

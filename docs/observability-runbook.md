# Observability and Audit Logging Runbook

## What was implemented

- Structured request logging is now available for all API routes under `src/routes/api`.
- Business/audit logging is now emitted from privileged write handlers in portals.
- All logs use `src/lib/observability/logging.ts` and write through `logger` in `src/lib/logger.ts`.

## Request log fields

- `event`: always `http.request`
- `action`: request-level event name (`api.health.success`, `api.contact.submit.denied`, etc.)
- `requestId`: per-request correlation id, also returned in:
  - `x-request-id`
  - `x-correlation-id`
- `method`: HTTP method
- `path`: route path
- `status`: response status
- `durationMs`: handler duration
- `actor`: actor id/role when available
- `metadata`: safe fields (sensitive values redacted)
- `error`: normalized name/message on failure

## Business event fields

- `event`: `business`
- `action`: domain event (`team.create`, `team.update`, `admin.create`, etc.)
- `requestId`: correlation id from request flow
- `actor`: `{ id, role }`
- `outcome`: `success | failure`
- `resource`: `{ type, id }`
- `status`: HTTP-like status code for the business event
- `metadata`: counts, ids, status labels, etc. (sensitive values redacted)
- `error`: normalized name/message for failures

## Alerting guidance (MVP)

- Alert if `level: error` spikes in `event: http.request`.
- Alert on repeated status `5xx` from `http.request` (for service incidents).
- Alert if `event: business` and `outcome=failure` rises above normal for:
  - `team.create`, `team.update`, `team.delete`
  - `admin.create`, `admin.remove`
  - `staff.add`, `staff.update`, `staff.remove`
  - `program.create`
  - `summerProgramRegistration.create`
  - `summerProgramRegistration.updateStatus`
- Alert on `rate-limit` actions:
  - `api.contact.submit.denied`
  - `api.zeffy.webhook.rate_limit`
  - `api.health.rate_limit`
- Alert for auth/authorization failures from request handlers:
  - `api.zeffy.webhook.unauthorized`
  - any request action ending in `.validation_failed`

## Runbook actions

1. Verify whether `requestId` is present and trace across `http.request` and `business` events.
2. For failures, inspect `error.name`, `error.message`, and `metadata` for impacted actor/resource.
3. If failure rate is sustained, check recent deploys, auth/config changes, and dependency health.
4. If sensitive fields appear in logs, pause and patch redaction pattern immediately and replay last 24 hours of logs.

## Optional phase 2 (not implemented here)

- Add immutable DB-backed audit records for `event: business`.
- Add retention policy + export hooks for compliance review.

# Deferred Database Updates

This note tracks database work intentionally left for later, plus the code that
should change when each database object exists. Keep this file current whenever
UI or portal code ships with placeholder data because the backing schema is not
ready yet.

## Admin Programs

### Program Registrations

**Needed database work**

- Add a program registration/enrollment table that links children or
  participants to `public.programs`.
- Store a registration lifecycle status if registrations can be pending,
  confirmed, cancelled, waitlisted, or refunded.
- Add indexes for `program_id` and status fields used by admin dashboards.
- Add RLS so admins and superadmins can read all registrations, while guardians
  can only read their own family registrations.

**Reason**

The admin programs list must show the number of registered children per program.
The current database has `public.programs`, `public.transactions`, and
`public.participants`, but no reliable program-specific registration table or
foreign key from participant records to a program.

**Code to update**

- `src/portals/admin/programs/api.ts`
  - Replace the placeholder `registered_children_count: 0` with a real count
    from the registration/enrollment table.
  - Prefer a single query, view, or RPC that returns programs with counts rather
    than per-row queries.
- `src/portals/admin/programs/schemas.ts`
  - Keep validating `registered_children_count`; extend the schema if the UI
    needs count breakdowns such as waitlisted or cancelled.
- `src/routes/dashboard/admin/-components/admin-programs-panel.tsx`
  - Update table columns or summary cards if counts are split by registration
    status.
- `tests/unit/admin-programs-schemas.test.ts`
  - Add/update schema coverage for any new count fields.

### Program Supervisor Assignments

**Needed database work**

- Add a join table such as `public.program_supervisors` with:
  - `program_id uuid references public.programs(id)`
  - `supervisor_id uuid references public.profiles(id)`
  - timestamps and optional assignment status fields.
- Enforce that assigned profiles have the `supervisor` role, either with a
  trigger or server-side validation plus RLS.
- Add indexes on `program_id` and `supervisor_id`.
- Add RLS so admins and superadmins can manage assignments, while supervisors
  can read their own assignments.

**Reason**

The admin programs list must show assigned supervisors. The current schema has
roles in `public.profiles`, but no table that connects supervisors to programs.

**Code to update**

- `src/portals/admin/programs/api.ts`
  - Replace the placeholder `assigned_supervisors: []` with supervisor names
    joined through the assignment table and `public.profiles.full_name`.
- `src/portals/admin/programs/schemas.ts`
  - If the UI needs richer supervisor data, replace `string[]` with objects
    such as `{ id, full_name, email }`.
- `src/routes/dashboard/admin/-components/admin-programs-panel.tsx`
  - Replace the plain comma-separated display if assignments become interactive
    or need links.
- Future supervisor portal code under `src/portals/supervisor/**`
  - Use this table for the supervisor dashboard and assigned program views.

### Program Status Lifecycle

**Needed database work**

- Decide whether `public.programs.program_status` should stay as
  `draft | published | archived` or become the full operational lifecycle:
  `draft | open | closed | active | completed | cancelled`.
- If statuses are stored directly, update the `programs` check constraint
  and existing data with a migration.
- If statuses stay derived, consider adding a database view/RPC that returns the
  display status from `program_status`, `registration_status`, `start_date`, and
  `end_date`.

**Reason**

The admin story asks for Draft, Open, Closed, Active, Completed, and Cancelled
programs. The current table only stores `program_status` as
`draft | published | archived` and `registration_status` as
`closed | open | waitlist`. The admin programs UI currently follows the stored
`program_status` values only, so any expanded lifecycle needs a database
migration before it is shown in the UI.

**Code to update**

- `src/portals/admin/programs/schemas.ts`
  - Align `adminProgramStatusSchema`, `adminProgramRegistrationStatusSchema`,
    and any future display-status schema with the final database contract.
- `src/routes/dashboard/admin/-components/admin-programs-panel.tsx`
  - Add lifecycle filters only after the database returns or derives the final
    status.
- `src/routes/dashboard/admin/-components/admin-program-form.tsx`
  - Update status select options if create/edit should use the expanded
    lifecycle.
- `tests/unit/admin-programs-schemas.test.ts`
  - Update accepted/rejected status cases.
- Add a new Prisma migration for lifecycle changes after the final database
  contract is chosen.

### Program Registration Source Mapping

**Needed database work**

- If Zeffy remains the registration source, add a durable mapping from incoming
  Zeffy items/campaigns to `public.programs.id`.
- Options include a `program_id` column on `public.participants`, a mapping
  table for Zeffy campaign/item IDs, or a normalized registration table fed by
  the webhook.

**Reason**

Existing payment and participant data can show who paid, but it cannot
authoritatively answer which program each child registered for unless the
program relationship is stored.

**Code to update**

- `src/portals/common/transactions/api.ts`
  - Include the program relationship if transaction and participant tables gain
    program columns.
- `src/portals/common/transactions/schemas.ts`
  - Validate any new program fields returned with participants.
- `src/components/transactions/transactions-panel.tsx`
  - Show program context in the transaction table if useful.
- `src/portals/admin/programs/api.ts`
  - Use the mapped records to calculate registered child counts.

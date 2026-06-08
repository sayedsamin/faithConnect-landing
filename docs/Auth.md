<!-- Last updated on: 1 June, 2026 -->

# Auth Flow

This document describes the current Questura signup and signin implementation:
where the UI lives, where validation/types are defined, which Supabase Auth
calls are made, and how profile reads reach Prisma.

## Overview

Authentication is handled in the browser with Supabase Auth through the shared
browser client in `src/integrations/supabase/client.ts`.

Application-table access is server-side Prisma. Auth UI surfaces load the
validated current profile through `src/lib/auth/profile-api.ts`.

The app currently supports email/password auth for parent or guardian accounts.
Google/social auth is not rendered in the current signup or signin UI.

Main routes:

- Signup page: `src/routes/signup.tsx`
- Signin page: `src/routes/signin.tsx`
- Shared auth UI: `src/routes/-auth/components/**`
- Auth form schemas and inferred types: `src/routes/-auth/auth-schemas.ts`
- Redirect query validation: `src/routes/-auth/redirect-search.ts`
- Role and dashboard routing logic: `src/lib/auth/rbac.ts`
- Supabase browser client: `src/integrations/supabase/client.ts`
- Server Auth/profile helper: `src/lib/auth/server.ts`
- Browser-callable validated profile RPC: `src/lib/auth/profile-api.ts`

## Environment

The browser Supabase client reads client-safe values from `src/lib/env.ts`.
Server-side Prisma profile reads use `DATABASE_URL` from `src/lib/env.server.ts`.

Required variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

`getSupabaseBrowserClient()` throws if either value is missing. The client is
created with `@supabase/ssr` and `flowType: 'implicit'`.

## Shared Types And Schemas

Auth form validation uses Zod first, then TypeScript types are inferred from the
schemas.

Defined in `src/routes/-auth/auth-schemas.ts`:

- `signInSchema`
- `SignInFormValues`
- `guardianSignUpSchema`
- `GuardianSignUpFormValues`
- `forgotPasswordSchema`
- `ForgotPasswordFormValues`
- `resetPasswordSchema`
- `ResetPasswordFormValues`

Signin fields:

- `email`: trimmed, required, valid email
- `password`: required

Signup fields:

- `guardianName`: trimmed, minimum 2 characters
- `email`: trimmed, required, valid email
- `password`: minimum 8 characters
- `confirmPassword`: required and must match `password`

Redirect search params are validated in
`src/routes/-auth/redirect-search.ts`.

`authRedirectSearchSchema` only accepts internal redirects:

- must start with `/`
- must not start with `//`
- must not include `://`

`getPostAuthRedirect(redirect, fallback)` returns the validated redirect when it
exists, otherwise the fallback route.

## App Roles

Application roles are defined in `src/lib/auth/rbac.ts`.

Roles:

- `superadmin`
- `admin`
- `supervisor`
- `camp_leader`
- `guardian`
- `student`

Important exports:

- `APP_ROLES`
- `AppRole`
- `appRoleSchema`
- `DASHBOARD_PATH_BY_ROLE`
- `DashboardPath`
- `hasMinimumRole()`
- `assertMinimumRole()`
- `getDashboardPathForRole()`
- `parseAppRole()`

Dashboard mapping:

- `superadmin` -> `/dashboard/superadmin`
- `admin` -> `/dashboard/admin`
- `supervisor` -> `/dashboard/supervisor`
- `camp_leader` -> `/dashboard/supervisor`
- `guardian` -> `/dashboard/guardian`
- `student` -> `/dashboard/student`

`parseAppRole()` validates untrusted database values before the app uses them
for navigation or authorization decisions.

## Signup Flow

### Route

`src/routes/signup.tsx` registers the `/signup` route with TanStack Router.

Route behavior:

1. Validates the optional `redirect` search param with
   `authRedirectSearchSchema`.
2. Sets the page title to `Create Account | Questura`.
3. Renders `AuthLayout`.
4. Passes the validated `redirect` value into `SignUpForm`.
5. Links existing users to `/signin`, preserving `redirect` when present.

### Form

`src/routes/-auth/components/sign-up-form.tsx` contains the signup form.

The form uses:

- `react-hook-form`
- `zodResolver(guardianSignUpSchema)`
- `GuardianSignUpFormValues`
- `getSupabaseBrowserClient()`

Default field values:

- `guardianName: ''`
- `email: ''`
- `password: ''`
- `confirmPassword: ''`

The submit button is disabled until the component hydrates. During submission it
shows a spinner and the busy label.

### Submit Behavior

On submit, `SignUpForm`:

1. Clears any previous form error and submitted-email state.
2. Creates a Supabase browser client.
3. Builds an email confirmation redirect URL pointing to `/signin`.
4. Preserves the original `redirect` query param on that email confirmation URL
   when one was provided.
5. Calls `supabase.auth.signUp()`.

The Supabase call:

```ts
await supabase.auth.signUp({
  email: values.email,
  password: values.password,
  options: {
    emailRedirectTo: emailRedirectUrl.toString(),
    data: {
      app_role_hint: 'guardian',
      guardian_name: values.guardianName,
    },
  },
})
```

Metadata sent to Supabase Auth:

- `app_role_hint: 'guardian'`
- `guardian_name: values.guardianName`

The database trigger uses `guardian_name` to populate
`public.profiles.full_name`.

Current behavior after Supabase responds:

- If Supabase returns an error, the error message is shown in
  `AuthErrorMessage`.
- If Supabase returns a session immediately and a redirect exists, the app
  navigates to that redirect.
- Otherwise, the form shows `Check <email> to confirm your account.`

## Signin Flow

### Route

`src/routes/signin.tsx` registers the `/signin` route with TanStack Router.

Route behavior:

1. Validates the optional `redirect` search param with
   `authRedirectSearchSchema`.
2. Sets the page title to `Sign In | Questura`.
3. Renders `AuthLayout`.
4. Passes the validated `redirect` value into `SignInForm`.
5. Links new users to `/signup`, preserving `redirect` when present.

Special copy is shown when:

```ts
redirect === '/summer-program/register'
```

That version tells parents or guardians to create and verify an account before
returning to the registration flow.

### Form

`src/routes/-auth/components/sign-in-form.tsx` contains the signin form.

The form uses:

- `react-hook-form`
- `zodResolver(signInSchema)`
- `SignInFormValues`
- `getSupabaseBrowserClient()`
- `getCurrentUserProfileRpc()`
- `getDashboardPathForRole()`
- `getPostAuthRedirect()`

Default field values:

- `email: ''`
- `password: ''`

The form also links to `/forgot-password`.

### Submit Behavior

On submit, `SignInForm`:

1. Clears any previous form error.
2. Creates a Supabase browser client.
3. Calls `supabase.auth.signInWithPassword()`.

The Supabase call:

```ts
await supabase.auth.signInWithPassword({
  email: values.email,
  password: values.password,
})
```

Then it:

1. Reads `data.user?.id`.
2. If no user id exists, shows an error.
3. Calls the validated current-profile server RPC.

Profile query:

```ts
await getCurrentUserProfileRpc()
```

The RPC calls Supabase Auth `getUser()` on the server, loads `public.profiles`
through Prisma, and validates the result with Zod.

4. Uses the validated profile role.
5. Navigates to the validated `redirect` if one exists.
6. Otherwise navigates to the dashboard for the user's role.

Fallback dashboard routing uses:

```ts
getDashboardPathForRole(role)
```

Example: a guardian without a redirect lands on `/dashboard/guardian`.

## Navigation And Session Awareness

`src/components/auth-nav.tsx` keeps the site navigation in sync with the current
Supabase session.

On mount, it:

1. Creates a Supabase browser client.
2. Calls `supabase.auth.getSession()`.
3. Subscribes to `supabase.auth.onAuthStateChange()`.
4. When a session exists, calls `getCurrentUserProfileRpc()`.
5. Uses the validated profile role.
6. Shows a Dashboard link for the user's role.

Sign out is handled with:

```ts
await supabase.auth.signOut()
```

After signout, the nav clears the local email/dashboard state and navigates to
`/signin`.

## Dashboard Access Check

`src/components/dashboard/dashboard-shell.tsx` checks that the signed-in user is
on the dashboard that matches their profile role.

On mount, it:

1. Calls `supabase.auth.getSession()`.
2. Redirects to `/signin` if there is no session.
3. Calls `getCurrentUserProfileRpc()` for the current user.
4. Uses the validated profile role.
5. If the profile role does not match the dashboard's expected role, redirects
   to the correct dashboard with `getDashboardPathForRole(profileRole)`.
6. Shows the dashboard content only after the check passes.

## Database Objects Touched

Signup and signin use Supabase Auth. The Auth mirror trigger maintains
`public.profiles`, and application profile reads use server-side Prisma.

### Supabase Auth

Supabase Auth owns the `auth.users` table.

Touched by signup:

- `supabase.auth.signUp()` creates a new Supabase Auth user in `auth.users`.
- The user metadata includes `guardian_name` and `app_role_hint`.
- Supabase sends the email confirmation link using `emailRedirectTo`.

Touched by signin:

- `supabase.auth.signInWithPassword()` authenticates against Supabase Auth.
- Supabase returns a session and user payload on success.

### `public.app_role`

Defined in `prisma/migrations/20260601000000_baseline/migration.sql`.

Enum values:

- `superadmin`
- `admin`
- `supervisor`
- `camp_leader`
- `guardian`
- `student`

This enum backs `public.profiles.role`.

### `public.profiles`

Defined and backfilled from retained Auth accounts in
`prisma/migrations/20260601000000_baseline/migration.sql`.

Columns after current migrations:

- `id uuid primary key references auth.users(id) on delete cascade`
- `email text not null`
- `role public.app_role not null`
- `full_name text`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`
- `phone text`

Row level security:

- RLS is enabled on `public.profiles`.
- Authenticated users can select their own profile where `auth.uid() = id`.

Policy:

```sql
create policy "Users can read their own profile"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);
```

Triggers and functions:

- `public.set_updated_at()` updates `updated_at` before profile updates.
- `profiles_set_updated_at` runs `public.set_updated_at()`.
- `public.handle_new_auth_user()` inserts a profile after a new Auth user is
  created.
- `on_auth_user_created` runs `public.handle_new_auth_user()` after insert on
  `auth.users`.

`public.handle_new_auth_user()` inserts:

- `id`: `new.id`
- `email`: `coalesce(new.email, '')`
- `role`: `'guardian'`
- `full_name`: `nullif(new.raw_user_meta_data->>'guardian_name', '')`

This means new public signups become guardian profiles by default.

## Files In The Auth UI

Shared components:

- `src/routes/-auth/components/auth-layout.tsx`
- `src/routes/-auth/components/form-field.tsx`
- `src/routes/-auth/components/password-field.tsx`
- `src/routes/-auth/components/submit-button.tsx`
- `src/routes/-auth/components/auth-message.tsx`

Accessibility and interaction details:

- Inputs render labels and inline errors.
- Invalid fields set `aria-invalid`.
- Error text is connected with `aria-describedby`.
- Password fields have a show/hide button with an accessible label.
- Form-level auth errors render with `role="alert"`.
- Signup success renders a status message with `role="status"`.
- Submit buttons keep a stable label pattern and show a spinner while submitting.

## Tests

Current auth-related test coverage:

- `tests/e2e/auth.spec.ts`
- `tests/unit/rbac.test.ts`

`tests/e2e/auth.spec.ts` covers:

- signin form rendering and links
- signin success with mocked Supabase Auth and validated profile RPC response
- invalid signin credentials
- signup form rendering and validation errors
- forgot-password UI
- reset-password UI
- accessibility checks with `@axe-core/playwright`

`tests/unit/rbac.test.ts` covers:

- app role list
- role rank comparisons
- role-to-dashboard routing
- parsing/validation of untrusted role values

## Important Implementation Notes

- API routes are not involved in the current signup/signin flow.
- Signup and signin use the browser Supabase client, not a server-side service
  role key.
- The public signup role is fixed by the database trigger as `guardian`.
- The `app_role_hint` metadata is sent during signup, but the current database
  trigger does not use it for role assignment.
- Signin depends on a matching row in `public.profiles`; if the profile or role
  is missing, dashboard navigation fails with a user-facing error.
- Dashboard navigation is client-checked in `DashboardShell`; server functions
  enforce authorization before Prisma table access. Supabase Data API table
  access is disabled, and RLS remains defense-in-depth.

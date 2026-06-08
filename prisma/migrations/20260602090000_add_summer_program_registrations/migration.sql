create table public.summer_program_registrations (
  id uuid primary key default gen_random_uuid(),
  guardian_id uuid not null references public.profiles(id) on delete cascade,
  program_code text not null,
  guardian_name text not null,
  guardian_email text not null,
  guardian_phone text not null,
  emergency_contact_name text,
  emergency_contact_phone text,
  notes text,
  status text not null default 'awaiting_confirmation' check (
    status in ('awaiting_confirmation', 'confirmed', 'cancelled')
  ),
  terms_accepted_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.participants
  alter column transaction_id drop not null,
  alter column zeffy_payment_id drop not null,
  alter column zeffy_item_id drop not null,
  add column summer_program_registration_id uuid
    references public.summer_program_registrations(id) on delete cascade,
  add constraint participants_source_check check (
    transaction_id is not null
    or summer_program_registration_id is not null
  );

create index summer_program_registrations_guardian_id_created_at_idx
  on public.summer_program_registrations (guardian_id, created_at desc);
create index summer_program_registrations_program_code_status_idx
  on public.summer_program_registrations (program_code, status);
create index participants_summer_program_registration_id_idx
  on public.participants (summer_program_registration_id);

create trigger summer_program_registrations_set_updated_at
  before update on public.summer_program_registrations
  for each row execute function public.set_updated_at();

grant all on public.summer_program_registrations to service_role;
revoke all privileges on table public.summer_program_registrations
from anon, authenticated;

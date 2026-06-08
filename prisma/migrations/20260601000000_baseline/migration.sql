create type public.app_role as enum (
  'superadmin',
  'admin',
  'supervisor',
  'camp_leader',
  'guardian',
  'student'
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role public.app_role not null,
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  zeffy_payment_id text not null unique,
  webhook_event_id uuid,
  guardian_id uuid references public.profiles(id) on delete set null,
  buyer_email text,
  buyer_phone text,
  amount_cents integer not null,
  eligible_amount_cents integer not null,
  currency text not null,
  status text not null,
  payment_type text not null,
  refund_status text not null,
  campaign_id text,
  campaign_type text,
  campaign_category text,
  campaign_title text,
  receipt_url text,
  paid_at timestamptz not null,
  raw_payload jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.participants (
  id uuid primary key default gen_random_uuid(),
  transaction_id uuid not null references public.transactions(id) on delete cascade,
  guardian_id uuid not null references public.profiles(id) on delete cascade,
  zeffy_payment_id text not null,
  zeffy_item_id text not null unique,
  first_name text not null,
  last_name text,
  age text,
  gender text,
  grade_level text,
  amount_cents integer,
  currency text,
  raw_item jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  topic text not null check (
    topic in ('general', 'programs', 'summer-program', 'partnerships')
  ),
  message text not null,
  ip_address text not null,
  user_agent text,
  browser text,
  device text,
  referer text,
  accept_language text,
  metadata jsonb not null default '{}'::jsonb,
  email_status text not null default 'pending' check (
    email_status in ('pending', 'sent', 'failed')
  ),
  email_error text,
  emailed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.programs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  minimum_age integer not null check (minimum_age >= 0),
  maximum_age integer not null check (maximum_age >= minimum_age),
  start_date date not null,
  end_date date not null check (end_date >= start_date),
  location text not null,
  capacity integer not null check (capacity > 0),
  registration_status text not null check (
    registration_status in ('closed', 'open', 'waitlist')
  ),
  program_status text not null check (
    program_status in ('draft', 'published', 'archived')
  ),
  created_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.program_supervisors (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs(id) on delete cascade,
  supervisor_id uuid not null references public.profiles(id) on delete cascade,
  assigned_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  unique (program_id, supervisor_id)
);

create table public.teams (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs(id) on delete cascade,
  name text not null,
  description text,
  capacity integer check (capacity is null or capacity > 0),
  created_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (program_id, name)
);

create table public.team_leaders (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  camp_leader_id uuid not null references public.profiles(id) on delete cascade,
  assigned_by uuid not null references public.profiles(id) on delete restrict,
  role_label text not null,
  created_at timestamptz not null default now(),
  unique (team_id, camp_leader_id)
);

create table public.team_participants (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  participant_id uuid not null references public.participants(id) on delete cascade,
  assigned_by uuid not null references public.profiles(id) on delete restrict,
  status text not null check (status in ('active', 'removed')),
  created_at timestamptz not null default now(),
  unique (team_id, participant_id)
);

create index transactions_guardian_id_paid_at_idx
  on public.transactions (guardian_id, paid_at desc);
create index transactions_paid_at_idx
  on public.transactions (paid_at desc);
create index participants_guardian_id_created_at_idx
  on public.participants (guardian_id, created_at desc);
create index participants_transaction_id_idx
  on public.participants (transaction_id);
create index contact_messages_created_at_idx
  on public.contact_messages (created_at desc);
create index contact_messages_email_status_idx
  on public.contact_messages (email_status, created_at desc);
create index programs_start_date_idx on public.programs (start_date);
create index programs_status_idx
  on public.programs (program_status, registration_status);
create index program_supervisors_program_id_idx
  on public.program_supervisors (program_id);
create index program_supervisors_supervisor_id_idx
  on public.program_supervisors (supervisor_id);
create index teams_program_id_idx on public.teams (program_id);
create index team_leaders_team_id_idx on public.team_leaders (team_id);
create index team_leaders_camp_leader_id_idx
  on public.team_leaders (camp_leader_id);
create index team_participants_team_id_idx
  on public.team_participants (team_id);
create index team_participants_participant_id_idx
  on public.team_participants (participant_id);
create index team_participants_status_idx
  on public.team_participants (status);

create function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger transactions_set_updated_at
  before update on public.transactions
  for each row execute function public.set_updated_at();
create trigger participants_set_updated_at
  before update on public.participants
  for each row execute function public.set_updated_at();
create trigger contact_messages_set_updated_at
  before update on public.contact_messages
  for each row execute function public.set_updated_at();
create trigger programs_set_updated_at
  before update on public.programs
  for each row execute function public.set_updated_at();
create trigger teams_set_updated_at
  before update on public.teams
  for each row execute function public.set_updated_at();

create function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role, full_name)
  values (
    new.id,
    coalesce(new.email, ''),
    'guardian',
    nullif(new.raw_user_meta_data->>'guardian_name', '')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

create function public.handle_updated_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles
  set email = coalesce(new.email, '')
  where id = new.id;

  return new;
end;
$$;

create function public.handle_deleted_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.profiles where id = old.id;
  return old;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();
create trigger on_auth_user_email_updated
  after update of email on auth.users
  for each row execute function public.handle_updated_auth_user();
create trigger on_auth_user_deleted
  before delete on auth.users
  for each row execute function public.handle_deleted_auth_user();

insert into public.profiles (id, email, role, full_name)
select
  users.id,
  coalesce(users.email, ''),
  'guardian',
  nullif(users.raw_user_meta_data->>'guardian_name', '')
from auth.users
where not exists (
  select 1 from public.profiles where profiles.id = users.id
);

alter table public.profiles enable row level security;
alter table public.transactions enable row level security;
alter table public.participants enable row level security;
alter table public.contact_messages enable row level security;
alter table public.programs enable row level security;
alter table public.program_supervisors enable row level security;
alter table public.teams enable row level security;
alter table public.team_leaders enable row level security;
alter table public.team_participants enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select to authenticated
  using (auth.uid() = id);
create policy "Guardians can read their own transactions"
  on public.transactions for select to authenticated
  using (guardian_id = auth.uid());
create policy "Guardians can read their own participants"
  on public.participants for select to authenticated
  using (guardian_id = auth.uid());

create policy "Admins can read all transactions"
  on public.transactions for select to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role in ('admin', 'superadmin')
    )
  );
create policy "Admins can read all participants"
  on public.participants for select to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role in ('admin', 'superadmin')
    )
  );
create policy "Admins can read contact messages"
  on public.contact_messages for select to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role in ('admin', 'superadmin')
    )
  );

create policy "Admins can read programs"
  on public.programs for select to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role in ('admin', 'superadmin')
    )
  );
create policy "Admins can create programs"
  on public.programs for insert to authenticated
  with check (
    created_by = auth.uid()
    and exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role in ('admin', 'superadmin')
    )
  );
create policy "Admins can update programs"
  on public.programs for update to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role in ('admin', 'superadmin')
    )
  )
  with check (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role in ('admin', 'superadmin')
    )
  );

create policy "Admins can read program supervisors"
  on public.program_supervisors for select to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role in ('admin', 'superadmin')
    )
  );
create policy "Admins can create program supervisors"
  on public.program_supervisors for insert to authenticated
  with check (
    assigned_by = auth.uid()
    and exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role in ('admin', 'superadmin')
    )
  );
create policy "Admins can delete program supervisors"
  on public.program_supervisors for delete to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role in ('admin', 'superadmin')
    )
  );

create policy "Admins can read teams"
  on public.teams for select to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role in ('admin', 'superadmin')
    )
  );
create policy "Admins can create teams"
  on public.teams for insert to authenticated
  with check (
    created_by = auth.uid()
    and exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role in ('admin', 'superadmin')
    )
  );
create policy "Admins can update teams"
  on public.teams for update to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role in ('admin', 'superadmin')
    )
  )
  with check (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role in ('admin', 'superadmin')
    )
  );
create policy "Admins can delete teams"
  on public.teams for delete to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role in ('admin', 'superadmin')
    )
  );

create policy "Admins can read team leaders"
  on public.team_leaders for select to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role in ('admin', 'superadmin')
    )
  );
create policy "Admins can create team leaders"
  on public.team_leaders for insert to authenticated
  with check (
    assigned_by = auth.uid()
    and exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role in ('admin', 'superadmin')
    )
  );
create policy "Admins can delete team leaders"
  on public.team_leaders for delete to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role in ('admin', 'superadmin')
    )
  );

create policy "Admins can read team participants"
  on public.team_participants for select to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role in ('admin', 'superadmin')
    )
  );
create policy "Admins can create team participants"
  on public.team_participants for insert to authenticated
  with check (
    assigned_by = auth.uid()
    and exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role in ('admin', 'superadmin')
    )
  );
create policy "Admins can update team participants"
  on public.team_participants for update to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role in ('admin', 'superadmin')
    )
  )
  with check (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role in ('admin', 'superadmin')
    )
  );
create policy "Admins can delete team participants"
  on public.team_participants for delete to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role in ('admin', 'superadmin')
    )
  );

grant usage on schema public to authenticated, service_role;
grant usage on type public.app_role to authenticated, service_role;
grant all on public.profiles, public.transactions, public.participants,
  public.contact_messages, public.programs, public.program_supervisors,
  public.teams, public.team_leaders, public.team_participants
  to authenticated, service_role;

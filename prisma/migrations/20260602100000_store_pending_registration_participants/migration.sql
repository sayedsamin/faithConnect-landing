alter table public.summer_program_registrations
  add column participant_data jsonb not null default '[]'::jsonb;

update public.summer_program_registrations registration
set participant_data = coalesce(participants.participant_data, '[]'::jsonb)
from (
  select
    summer_program_registration_id,
    jsonb_agg(
      jsonb_build_object(
        'first_name', first_name,
        'last_name', last_name,
        'age', age,
        'grade_level', grade_level,
        'gender', gender
      )
      order by created_at asc
    ) as participant_data
  from public.participants
  where summer_program_registration_id is not null
    and transaction_id is null
  group by summer_program_registration_id
) participants
where registration.id = participants.summer_program_registration_id;

delete from public.participants
where summer_program_registration_id is not null
  and transaction_id is null;

revoke all privileges on table
  public.profiles,
  public.transactions,
  public.participants,
  public.contact_messages,
  public.programs,
  public.program_supervisors,
  public.teams,
  public.team_leaders,
  public.team_participants
from anon, authenticated;

revoke usage on type public.app_role from anon, authenticated;

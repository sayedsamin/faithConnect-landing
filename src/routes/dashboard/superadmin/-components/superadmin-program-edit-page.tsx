import { useQuery } from '@tanstack/react-query'
import { adminProgramQueryOptions } from '#/portals/admin/programs/queries'
import { SuperadminProgramForm } from './superadmin-program-form'

export function SuperadminProgramEditPage({
  programId,
}: {
  programId: string
}) {
  const programQuery = useQuery(adminProgramQueryOptions(programId))
  const program = programQuery.data

  if (programQuery.isLoading) {
    return (
      <p
        role="status"
        className="rounded-md border border-border bg-muted px-4 py-3 text-sm font-semibold text-foreground"
      >
        Loading program
      </p>
    )
  }

  if (programQuery.isError || !program) {
    return (
      <p
        role="alert"
        className="rounded-md border border-destructive bg-background px-4 py-3 text-sm font-semibold text-destructive"
      >
        Unable to load program.
      </p>
    )
  }

  return (
    <SuperadminProgramForm
      programId={program.id}
      programName={program.name}
      initialValues={{
        name: program.name,
        description: program.description,
        minimum_age: program.minimum_age,
        maximum_age: program.maximum_age,
        start_date: program.start_date,
        end_date: program.end_date,
        location: program.location,
        capacity: program.capacity,
        registration_status: program.registration_status,
        program_status: program.program_status,
      }}
    />
  )
}

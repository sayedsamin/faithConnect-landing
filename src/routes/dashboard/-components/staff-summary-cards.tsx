type StaffSummaryCardsProps = {
  total: number
  supervisors: number
  campLeaders: number
}

export function StaffSummaryCards({
  total,
  supervisors,
  campLeaders,
}: StaffSummaryCardsProps) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-3">
      <SummaryCard label="Total staff" value={total} />
      <SummaryCard label="Supervisors" value={supervisors} />
      <SummaryCard label="Camp leaders" value={campLeaders} />
    </div>
  )
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <article className="rounded-md border border-border p-5">
      <p className="text-sm font-bold text-muted-foreground">{label}</p>
      <p className="mt-3 text-3xl font-extrabold text-foreground tabular-nums">
        {value.toLocaleString()}
      </p>
    </article>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import { StudentDashboard } from './-components/student-dashboard'

export const Route = createFileRoute('/dashboard/student')({
  component: StudentDashboardPage,
  head: () => ({
    meta: [{ title: 'Student Dashboard | Questura' }],
  }),
})

function StudentDashboardPage() {
  return <StudentDashboard />
}

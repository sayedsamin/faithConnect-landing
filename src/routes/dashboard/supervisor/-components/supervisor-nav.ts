import { LayoutDashboard, UsersRound } from 'lucide-react'
import type { DashboardSidebarSection } from '#/components/dashboard/dashboard-shell'

export const supervisorDashboardSections = [
  {
    label: 'Dashboard',
    items: [
      {
        label: 'Overview',
        to: '/dashboard/supervisor',
        Icon: LayoutDashboard,
      },
      {
        label: 'Teams',
        to: '/dashboard/supervisor/teams',
        Icon: UsersRound,
      },
    ],
  },
] satisfies DashboardSidebarSection[]

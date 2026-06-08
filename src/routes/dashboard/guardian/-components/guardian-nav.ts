import { ClipboardList } from 'lucide-react'
import type { DashboardSidebarItem } from '#/components/dashboard/dashboard-shell'

export const guardianDashboardItems = [
  {
    label: 'Registrations',
    to: '/dashboard/guardian/registrations',
    Icon: ClipboardList,
  },
] satisfies DashboardSidebarItem[]

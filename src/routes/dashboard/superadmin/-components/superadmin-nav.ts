import {
  ClipboardCheck,
  CreditCard,
  LayoutDashboard,
  CalendarPlus,
  UserCog,
  UsersRound,
  CalendarDays,
} from 'lucide-react'
import type { DashboardSidebarSection } from '#/components/dashboard/dashboard-shell'

export const superadminDashboardSections = [
  {
    label: 'Dashboard',
    items: [
      {
        label: 'Overview',
        to: '/dashboard/superadmin',
        Icon: LayoutDashboard,
      },
      {
        label: 'Transactions',
        to: '/dashboard/superadmin/transactions',
        Icon: CreditCard,
      },
      {
        label: 'Registration approvals',
        to: '/dashboard/superadmin/registrations',
        Icon: ClipboardCheck,
      },
    ],
  },
  {
    label: 'Programs',
    items: [
      {
        label: 'Programs',
        to: '/dashboard/superadmin/programs',
        Icon: CalendarDays,
      },
      {
        label: 'New program',
        to: '/dashboard/superadmin/programs/new',
        Icon: CalendarPlus,
      },
    ],
  },
  {
    label: 'User Management',
    items: [
      {
        label: 'Roles',
        to: '/dashboard/superadmin/roles',
        Icon: UserCog,
      },
      {
        label: 'Staff',
        to: '/dashboard/superadmin/staff',
        Icon: UsersRound,
      },
    ],
  },
] satisfies DashboardSidebarSection[]

import {
  ClipboardCheck,
  ClipboardList,
  LayoutDashboard,
  UserCog,
  UsersRound,
} from 'lucide-react'
import type { DashboardSidebarSection } from '#/components/dashboard/dashboard-shell'

export const adminDashboardSections = [
  {
    label: 'Dashboard',
    items: [
      {
        label: 'Overview',
        to: '/dashboard/admin',
        Icon: LayoutDashboard,
      },
      // {
      //   label: 'Transactions',
      //   to: '/dashboard/admin/transactions',
      //   Icon: CreditCard,
      // },
    ],
  },
  {
    label: 'Registrations',
    items: [
      {
        label: 'Registration approvals',
        to: '/dashboard/admin/registrations',
        Icon: ClipboardCheck,
      },
      {
        label: 'Participants',
        to: '/dashboard/admin/registrations/summer2026/participants',
        Icon: ClipboardList,
      },
    ],
  },
  {
    label: 'Operations',
    items: [
      {
        label: 'Staff',
        to: '/dashboard/admin/staff',
        Icon: UserCog,
      },
      {
        label: 'Teams',
        to: '/dashboard/admin/teams',
        Icon: UsersRound,
      },
    ],
  },
  // {
  //   label: 'Programs',
  //   items: [
  //     {
  //       label: 'All programs',
  //       to: '/dashboard/admin/programs',
  //       Icon: CalendarDays,
  //     },
  //     {
  //       label: 'New program',
  //       to: '/dashboard/admin/programs/new',
  //       Icon: CalendarPlus,
  //     },
  //   ],
  // },
] satisfies DashboardSidebarSection[]

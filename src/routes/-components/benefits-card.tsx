import {
  Users,
  DollarSign,
  CalendarDays,
  Megaphone,
  Heart,
  ChartNoAxesColumnDecreasing,
  Church,
  Shield,
} from 'lucide-react'

const benefitItems = [
  {
    title: 'Membership Management',
    icon: <Users className="w-6 h-6 text-brand-white" />,
    color: 'bg-blue-500',
    description:
      'Manage member profiles, groups, attendance, and engagement in one place.',
  },
  {
    title: 'Donations & Recurring Giving',
    icon: <DollarSign className="w-6 h-6 text-brand-white" />,
    color: 'bg-green-600',
    description: 'Accept one-time and recurring donations easily.',
  },
  {
    title: 'Events & RSVP Tracking',
    icon: <CalendarDays className="w-6 h-6 text-brand-white" />,
    color: 'bg-purple-600',
    description: 'Create events and track RSVPs with ease.',
  },
  {
    title: 'Announcements & Notifications',
    icon: <Megaphone className="w-6 h-6 text-brand-white" />,
    color: 'bg-orange-400',
    description: 'Send updates via app, email, and push notifications.',
  },
  {
    title: 'Prayer Wall',
    icon: <Heart className="w-6 h-6 text-brand-white" />,
    color: 'bg-pink-400',
    description: 'Allow members to share and pray together.',
  },
  {
    title: 'Reports & Analytics',
    icon: <ChartNoAxesColumnDecreasing className="w-6 h-6 text-brand-white" />,
    color: 'bg-cyan-700',
    description: 'Gain insights with powerful reports and dashboards.',
  },
  {
    title: 'Multi-Church SaaS Management',
    icon: <Church className="w-6 h-6 text-brand-white" />,
    color: 'bg-blue-400',
    description: 'Manage multiple churches from one platform.',
  },
  {
    title: 'Secure Role-Based Access',
    icon: <Shield className="w-6 h-6 text-brand-white" />,
    color: 'bg-green-800',
    description: 'Control permissions and protect sensitive data.',
  },
]

export function BenefitsCard() {
  return (
    <div>
      <p className="w-1/2 font-bold text-gray-700 text-4xl mb-4">
        Everything your church needs in one secure platform.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {benefitItems.map((item) => (
          <div className="p-5 bg-brand-white rounded-xl aspect-square">
            <div
              className={`w-1/6 h-auto mb-2 ${item.color} rounded-full aspect-square grid grid-cols-1 items-center justify-items-center`}
            >
              {item.icon}
            </div>
            <p className="mb-2 text-2xl leading-7 font-bold">{item.title}</p>
            <p className="text-lg">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BenefitsCard

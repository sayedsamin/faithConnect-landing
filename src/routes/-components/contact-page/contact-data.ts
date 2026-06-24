export type ContactOption = {
  action: string
  description: string
  email: string
  iconSrc: string
  title: string
}

export const contactOptions: ContactOption[] = [
  {
    title: 'Talk to sales',
    description:
      'Explore plans, rollout options, and the right setup for your church.',
    action: 'Contact sales',
    email: 'sales@faithconnect.com',
    iconSrc: '/images/home/reports.webp',
  },
  {
    title: 'Product support',
    description:
      'Get help with your FaithConnect workspace, access, or product questions.',
    action: 'Get support',
    email: 'support@faithconnect.com',
    iconSrc: '/images/home/message.webp',
  },
  {
    title: 'Partnerships',
    description:
      'Connect with us about networks, integrations, and ministry partnerships.',
    action: 'Discuss a partnership',
    email: 'partners@faithconnect.com',
    iconSrc: '/images/home/members.webp',
  },
]

export const contactFaqs = [
  {
    question: 'Can I request a product demonstration?',
    answer:
      'Yes. Our sales team can walk you through the platform and discuss how FaithConnect could support your church structure and ministry workflows.',
  },
  {
    question: 'Where should existing customers ask for help?',
    answer:
      'Existing customers should contact product support for account access, setup guidance, troubleshooting, and general product questions.',
  },
  {
    question: 'Does FaithConnect work with multi-site churches?',
    answer:
      'FaithConnect is designed to support independent churches as well as growing and multi-site organizations. Contact sales to discuss a suitable configuration.',
  },
  {
    question: 'Can organizations discuss integrations or partnerships?',
    answer:
      'Yes. We welcome conversations with ministry networks, service providers, and organizations interested in thoughtful integrations or partnerships.',
  },
] as const

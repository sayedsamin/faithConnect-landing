export type TermsSection = {
  body: string[]
  id: string
  title: string
}

export const termsEffectiveDate = 'June 23, 2026'

export const termsHighlights = [
  'FaithConnect provides church management software and related onboarding, support, and communication services.',
  'Churches are responsible for the people they invite, the information they enter, and the permissions they assign.',
  'Platform use must respect privacy, ministry trust, and applicable laws.',
]

export const termsSections: TermsSection[] = [
  {
    id: 'agreement',
    title: 'Agreement to these terms',
    body: [
      'These Terms of Service apply when you visit the FaithConnect website, request a demo, contact our team, subscribe to FaithConnect, or use our church management platform and related services.',
      'If you use FaithConnect on behalf of a church, ministry, nonprofit, school, or other organization, you confirm that you are authorized to accept these terms for that organization.',
    ],
  },
  {
    id: 'services',
    title: 'FaithConnect services',
    body: [
      'FaithConnect helps churches organize ministry operations, including people records, groups, communications, events, giving workflows, reporting, and administrative coordination.',
      'We may improve, add, remove, or update features over time. When a change materially affects a paid plan or active customer workflow, we aim to communicate the change with reasonable notice.',
    ],
  },
  {
    id: 'accounts',
    title: 'Accounts and administration',
    body: [
      'Organizations are responsible for maintaining accurate account information, choosing appropriate administrator permissions, and removing access for staff or volunteers who no longer need it.',
      'You are responsible for activity that occurs under accounts you create or manage. Please keep credentials confidential and notify FaithConnect promptly if you believe an account has been compromised.',
    ],
  },
  {
    id: 'data',
    title: 'Church and member data',
    body: [
      'FaithConnect processes information that churches and authorized users provide to the platform, such as contact details, household information, ministry participation, communication preferences, and operational records.',
      'Churches are responsible for collecting and using member, attendee, donor, child, guardian, volunteer, and staff information lawfully and with appropriate consent where required.',
      'We do not sell church or member data. Our use of customer data is limited to operating, securing, supporting, and improving FaithConnect, plus any additional uses described in our privacy practices or written agreement with a customer.',
    ],
  },
  {
    id: 'communications',
    title: 'Communications',
    body: [
      'By submitting a form or using FaithConnect, you agree that we may contact you about demos, onboarding, support, product updates, billing, security, and service-related notices.',
      'Organizations using FaithConnect are responsible for the messages they send through the platform, including recipient permissions, unsubscribe requirements, content accuracy, and compliance with applicable email, SMS, privacy, and anti-spam laws.',
    ],
  },
  {
    id: 'subscriptions',
    title: 'Subscriptions, demos, and billing',
    body: [
      'Demo requests and sales conversations do not create a paid subscription unless both parties complete the applicable ordering or subscription process.',
      'Paid subscriptions, billing cycles, taxes, cancellations, renewals, and plan limits are governed by the pricing terms, order form, or written agreement accepted by the customer.',
    ],
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable use',
    body: [
      'You may not use FaithConnect to violate laws, infringe rights, send abusive or deceptive communications, upload malicious code, attempt unauthorized access, interfere with platform operations, or misuse another organization’s information.',
      'FaithConnect may suspend or restrict access when necessary to protect the platform, customers, members, or the public, including when we reasonably believe these terms have been violated.',
    ],
  },
  {
    id: 'availability',
    title: 'Availability and support',
    body: [
      'We work to keep FaithConnect reliable, secure, and useful, but no online service is perfect or uninterrupted. Maintenance, third-party providers, network issues, and unexpected events may affect availability.',
      'Support availability, response times, training, onboarding, and implementation services may vary by plan or written agreement.',
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual property',
    body: [
      'FaithConnect, including its software, design, branding, documentation, website content, and underlying technology, is owned by FaithConnect or its licensors.',
      'Customers retain ownership of the content and data they submit to FaithConnect. You grant us the limited rights needed to host, process, transmit, secure, back up, and support that content as part of the services.',
    ],
  },
  {
    id: 'limitations',
    title: 'Disclaimers and limitations',
    body: [
      'FaithConnect is provided for ministry and operational support. It is not a substitute for legal, financial, tax, safeguarding, counseling, or professional advice.',
      'To the fullest extent allowed by law, FaithConnect is not liable for indirect, incidental, special, consequential, or punitive damages, or for losses caused by misuse, unauthorized access resulting from customer-side credential issues, third-party services, or content supplied by users.',
    ],
  },
  {
    id: 'updates',
    title: 'Updates to these terms',
    body: [
      'We may update these terms as FaithConnect evolves or as legal, operational, or security requirements change. The effective date above shows when this version was last updated.',
      'Continued use of FaithConnect after updated terms take effect means you accept the revised terms.',
    ],
  },
  {
    id: 'contact',
    title: 'Questions',
    body: [
      'Questions about these terms can be sent to hello@faithconnect.com. If your organization has a separate signed agreement with FaithConnect, that agreement controls where it conflicts with these terms.',
    ],
  },
]

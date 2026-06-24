import { createFileRoute } from '@tanstack/react-router'

import { CtaBanner } from '#/components/cta-banner'
import { ContactDetails } from './-components/contact-page/contact-details'
import { ContactFaq } from './-components/contact-page/contact-faq'
import { ContactHero } from './-components/contact-page/contact-hero'
import { useContactMotion } from './-components/contact-page/contact-motion'
import { ContactOptions } from './-components/contact-page/contact-options'
import './-components/contact-page/contact-page.css'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: 'Contact | FaithConnect' },
      {
        name: 'description',
        content:
          'Contact the FaithConnect team about church management software, support, partnerships, and general company inquiries.',
      },
    ],
    links: [
      {
        rel: 'preload',
        href: '/images/contact/contact-hero-support.webp',
        as: 'image',
      },
    ],
  }),
})

function ContactPage() {
  const motionRef = useContactMotion<HTMLElement>()

  return (
    <main ref={motionRef} className="overflow-hidden bg-white text-brand-dark">
      <ContactHero />
      <ContactOptions />
      <ContactDetails />
      <ContactFaq />
      <CtaBanner />
    </main>
  )
}

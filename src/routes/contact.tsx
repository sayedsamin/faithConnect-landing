import { createFileRoute } from '@tanstack/react-router'
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  UsersRound,
} from 'lucide-react'
import { ContactForm } from '#/components/forms/contact-form'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
  head: () => ({
    meta: [{ title: 'Contact Us | Questura Academy' }],
  }),
})

const contactMethods = [
  {
    title: 'Email',
    description: 'info@questura.ca',
    href: 'mailto:info@questura.ca',
    Icon: Mail,
  },
  {
    title: 'Phone',
    description: '431-996-9120',
    href: 'tel:+14319969120',
    Icon: Phone,
  },
  {
    title: 'Location',
    description: '80 Barnes St, Winnipeg, MB R3T 5J2',
    href: null,
    Icon: MapPin,
  },
]

const supportNotes = [
  {
    title: 'Program questions',
    description: 'Ask about ages, schedules, learning goals, or registration.',
    Icon: UsersRound,
  },
  {
    title: 'Response time',
    description: 'Most messages receive a reply within 1-2 business days.',
    Icon: Clock,
  },
  {
    title: 'Partnerships',
    description: 'Reach out about schools, community groups, or funders.',
    Icon: MessageCircle,
  },
]

function ContactPage() {
  return (
    <section className="page-wrap px-4 pt-32 pb-16 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
        <div className="rounded-md border border-brand-white/15 bg-shadow-grey p-6 text-brand-white shadow-[0_18px_34px_rgba(0,0,0,0.18)] sm:p-8 lg:sticky lg:top-28">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-school-bus-yellow">
            Contact Questura
          </p>
          <h1 className="display-title mt-3 text-4xl font-bold leading-tight sm:text-5xl">
            How can we help?
          </h1>
          <p className="mt-4 text-base leading-7 text-brand-white/76">
            Send a message about programs, summer camp registration,
            partnerships, or general questions. We will route your note to the
            right person.
          </p>

          <div className="mt-7 grid gap-3">
            {contactMethods.map(({ description, href, Icon, title }) => {
              const content = (
                <>
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-school-bus-yellow text-shadow-grey">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-extrabold text-brand-white">
                      {title}
                    </span>
                    <span className="mt-1 block break-words text-sm text-brand-white/76">
                      {description}
                    </span>
                  </span>
                </>
              )

              return href ? (
                <a
                  key={title}
                  className="grid grid-cols-[2.75rem_1fr] gap-3 rounded-md border border-brand-white/12 bg-brand-white/6 p-4 !text-brand-white no-underline transition-[background-color,border-color] hover:border-school-bus-yellow/42 hover:bg-brand-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-school-bus-yellow/35"
                  href={href}
                >
                  {content}
                </a>
              ) : (
                <div
                  key={title}
                  className="grid grid-cols-[2.75rem_1fr] gap-3 rounded-md border border-brand-white/12 bg-brand-white/6 p-4"
                >
                  {content}
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="feature-card rounded-md border p-6 shadow-[0_18px_34px_rgba(23,58,64,0.08)] sm:p-8">
            <div className="border-b border-border pb-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-primary">
                Send a Message
              </p>
              <h2 className="display-title mt-2 text-3xl font-bold text-foreground">
                Contact us
              </h2>
            </div>

            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {supportNotes.map(({ description, Icon, title }) => (
              <article
                key={title}
                className="rounded-md border border-border bg-background/70 p-5 shadow-[0_10px_22px_rgba(23,58,64,0.07)]"
              >
                <Icon aria-hidden="true" className="size-5 text-primary" />
                <h2 className="mt-3 text-base font-extrabold text-foreground">
                  {title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

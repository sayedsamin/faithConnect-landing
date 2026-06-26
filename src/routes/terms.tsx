import { createFileRoute } from '@tanstack/react-router'

import { CtaBanner } from '#/components/cta-banner'
import { TermsHero } from './-components/terms-page/terms-hero'
import { TermsSection } from './-components/terms-page/terms-section'
import { TermsSummary } from './-components/terms-page/terms-summary'
import { termsSections } from './-components/terms-page/terms-data'

export const Route = createFileRoute('/terms')({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: 'Terms of Service | GraceNexa' },
      {
        name: 'description',
        content:
          'Review the GraceNexa terms for church management software, demos, accounts, subscriptions, communications, and acceptable platform use.',
      },
    ],
  }),
})

function TermsPage() {
  return (
    <main className="overflow-hidden bg-white text-brand-dark">
      <TermsHero />

      <section className="page-shell grid gap-8 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
        <TermsSummary sections={termsSections} />

        <div className="grid gap-5 lg:order-first">
          {termsSections.map((section, index) => (
            <TermsSection
              key={section.id}
              section={section}
              number={index + 1}
            />
          ))}
        </div>
      </section>

      <CtaBanner />
    </main>
  )
}

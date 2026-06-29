import { createFileRoute } from '@tanstack/react-router'
import { CtaBanner } from '#/components/cta-banner'
import './-components/about-page/about-page.css'
import { AboutBenefits } from './-components/about-page/about-benefits'
import { AboutExperience } from './-components/about-page/about-experience'
import { AboutFeatures } from './-components/about-page/about-features'
import { AboutHero } from './-components/about-page/about-hero'
import { AboutTrust } from './-components/about-page/about-trust'
import { AboutValues } from './-components/about-page/about-values'

export const Route = createFileRoute('/about')({
  component: AboutPage,
  head: () => ({
    meta: [{ title: 'About | GraceNexa' }],
    links: [
      {
        rel: 'preload',
        href: '/images/about/gracenexa-about-hero.webp',
        as: 'image',
      },
    ],
  }),
})

function AboutPage() {
  return (
    <main className="overflow-hidden bg-white pb-20 text-brand-dark">
      <AboutHero />

      <div className="page-shell">
        <AboutValues />
        <AboutFeatures />
        <AboutBenefits />
        <AboutExperience />
      </div>

      <div className="about-closing-band">
        <AboutTrust />
        <CtaBanner />
      </div>
    </main>
  )
}

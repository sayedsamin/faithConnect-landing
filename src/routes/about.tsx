import { createFileRoute } from '@tanstack/react-router'
import './-components/about-page/about-page.css'
import { AboutBenefits } from './-components/about-page/about-benefits'
import { AboutCta } from './-components/about-page/about-cta'
import { AboutExperience } from './-components/about-page/about-experience'
import { AboutFeatures } from './-components/about-page/about-features'
import { AboutHero } from './-components/about-page/about-hero'
import { AboutTrust } from './-components/about-page/about-trust'
import { AboutValues } from './-components/about-page/about-values'

export const Route = createFileRoute('/about')({
  component: AboutPage,
  head: () => ({
    meta: [{ title: 'About | FaithConnect' }],
    links: [
      {
        rel: 'preload',
        href: '/images/about/faithconnect-about-hero.png',
        as: 'image',
      },
    ],
  }),
})

function AboutPage() {
  return (
    <section className="pb-20">
      <AboutHero />

      <div className="px-4 sm:px-6">
        <AboutValues />
        <AboutFeatures />
        <AboutBenefits />
        <AboutExperience />
        <AboutTrust />
        <AboutCta />
      </div>
    </section>
  )
}

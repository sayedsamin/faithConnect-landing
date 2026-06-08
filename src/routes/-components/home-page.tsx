import { HeroSection } from '#/routes/-components/hero-section'
import { AboutSection } from '#/routes/-components/about-section'
import { ImpactSection } from '#/routes/-components/impact-section'
import { ProgramStreams } from '#/routes/-components/program-streams'
import { PartnershipsAndFundingSection } from '#/routes/-components/partnerships-and-funding-section'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ImpactSection />
      <ProgramStreams />
      <PartnershipsAndFundingSection />
    </>
  )
}

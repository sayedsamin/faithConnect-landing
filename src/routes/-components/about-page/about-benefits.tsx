import { AboutBenefitCard } from './about-benefit-card'
import { benefitCards } from './about-data'
import { useFeatureReveal } from './feature-reveal'

export function AboutBenefits() {
  const { ref, visibleStep } = useFeatureReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      className="benefits-section relative left-1/2 w-screen -translate-x-1/2 py-16"
      aria-labelledby="benefits-title"
    >
      <div className="mx-auto mb-8 w-full max-w-6xl px-4 text-center sm:px-6">
        <h2
          id="benefits-title"
          className="text-2xl font-extrabold text-brand-dark"
        >
          What we value
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 font-semibold text-brand-dark/60">
          Practical benefits for churches, ministries, campuses, and faith-based
          nonprofits.
        </p>
      </div>

      <div className="benefits-grid mx-auto grid w-full max-w-6xl gap-3 px-4 sm:px-6 md:grid-cols-2 xl:grid-cols-4">
        {benefitCards.map((benefit, index) => (
          <AboutBenefitCard
            key={benefit.title}
            description={benefit.description}
            iconSrc={benefit.iconSrc}
            index={index}
            title={benefit.title}
            visibleStep={visibleStep}
          />
        ))}
      </div>
    </section>
  )
}

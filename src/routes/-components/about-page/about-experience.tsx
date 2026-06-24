import { AboutExperienceCard } from './about-experience-card'
import { experienceCards } from './about-data'

export function AboutExperience() {
  return (
    <section
      className="experience-section relative left-1/2 w-screen -translate-x-1/2 py-16"
      aria-labelledby="experience-title"
    >
      <div className="mx-auto mb-6 w-full max-w-6xl px-4 text-center sm:px-6">
        <h2
          id="experience-title"
          className="text-xl font-extrabold text-brand-dark"
        >
          What FaithConnect helps churches do
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 font-semibold text-brand-dark/60">
          Built around how churches actually work across admin, cloud, and
          member-facing tools.
        </p>
      </div>

      <div className="experience-strip">
        <div className="mx-auto grid w-full max-w-6xl gap-y-4 px-4 sm:px-6 md:grid-cols-2 xl:grid-cols-4">
          {experienceCards.map(({ title, description }) => (
            <AboutExperienceCard
              key={title}
              description={description}
              title={title}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

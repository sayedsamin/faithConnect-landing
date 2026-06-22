import { AboutExperienceCard } from './about-experience-card'
import { experienceCards } from './about-data'

export function AboutExperience() {
  return (
    <section
      className="relative left-1/2 w-screen -translate-x-1/2 py-16"
      aria-labelledby="experience-title"
    >
      <div className="mx-auto mb-6 w-full max-w-6xl px-4 text-center sm:px-6">
        <h2
          id="experience-title"
          className="text-xl font-extrabold text-foreground"
        >
          What FaithConnect helps churches do
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Built around how churches actually work across admin, cloud, and
          member-facing tools.
        </p>
      </div>

      <div className="experience-strip">
        <div className="mx-auto grid w-full max-w-6xl gap-y-8 px-4 sm:px-6 md:grid-cols-2 xl:grid-cols-4">
          {experienceCards.map(({ title, description }, index) => (
            <AboutExperienceCard
              key={title}
              description={description}
              index={index}
              title={title}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

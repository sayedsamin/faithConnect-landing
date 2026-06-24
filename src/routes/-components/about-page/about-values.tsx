import { missionHighlights } from './about-data'
import { AboutMissionHighlightCard } from './about-mission-highlight-card'

export function AboutValues() {
  return (
    <section
      className="mx-auto w-full max-w-6xl py-16 text-center"
      aria-labelledby="values-title"
    >
      <h2 id="values-title" className="text-2xl font-extrabold text-brand-dark">
        Our mission
      </h2>
      <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 font-semibold text-brand-dark/60">
        We empower churches with simple, secure digital tools that strengthen
        administration, communication, generosity, and community engagement.
      </p>

      <div className="mx-auto mt-6 grid max-w-4xl gap-4 md:grid-cols-3">
        {missionHighlights.map((highlight, index) => (
          <AboutMissionHighlightCard
            key={highlight.title}
            description={highlight.description}
            iconSrc={highlight.iconSrc}
            index={index}
            title={highlight.title}
          />
        ))}
      </div>
    </section>
  )
}

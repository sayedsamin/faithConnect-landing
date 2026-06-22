import { trustCards } from './about-data'
import { AboutTrustCard } from './about-trust-card'

export function AboutTrust() {
  return (
    <section
      className="mx-auto w-full max-w-6xl py-16"
      aria-labelledby="trust-title"
    >
      <div className="mb-6 text-center">
        <h2
          id="trust-title"
          className="text-2xl font-extrabold text-foreground"
        >
          Built on trust, security, and stability
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          FaithConnect is designed to help churches manage people, giving, and
          communication with responsible access, dependable workflows, and
          privacy-aware defaults.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {trustCards.map(({ iconSrc, title, description }) => (
          <AboutTrustCard
            key={title}
            description={description}
            iconSrc={iconSrc}
            title={title}
          />
        ))}
      </div>
    </section>
  )
}

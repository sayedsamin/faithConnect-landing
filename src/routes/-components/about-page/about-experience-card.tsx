type AboutExperienceCardProps = {
  description: string
  title: string
}

export function AboutExperienceCard({
  description,
  title,
}: AboutExperienceCardProps) {
  return (
    <article className="experience-strip-item group relative min-h-56 px-4 py-8 text-center transition-colors duration-200 hover:bg-brand-blue/[0.025]">
      <div className="mx-auto flex max-w-64 flex-col items-center">
        <h3 className="text-2xl font-extrabold leading-tight text-brand-dark sm:text-3xl">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-6 font-semibold text-brand-dark/60">
          {description}
        </p>
      </div>
    </article>
  )
}

type AboutExperienceCardProps = {
  description: string
  index: number
  title: string
}

export function AboutExperienceCard({
  description,
  index,
  title,
}: AboutExperienceCardProps) {
  return (
    <article className="experience-strip-item group relative min-h-56 px-4 py-8 text-center transition-colors duration-200 hover:bg-brand-blue/[0.025]">
      <div className="mx-auto flex max-w-64 flex-col items-center">
        <p className="text-xs font-bold uppercase tracking-wide text-brand-blue">
          Experience 0{index + 1}
        </p>
        <h3 className="mt-2 text-2xl font-extrabold leading-tight text-foreground sm:text-3xl">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </article>
  )
}

import { sectionIconShellClass } from './about-styles'

type AboutTrustCardProps = {
  description: string
  iconSrc: string
  title: string
}

export function AboutTrustCard({
  description,
  iconSrc,
  title,
}: AboutTrustCardProps) {
  return (
    <article className="group relative flex min-h-32 items-center gap-4 overflow-hidden rounded-lg border border-border/80 bg-background/80 p-4 shadow-sm backdrop-blur-sm transition-transform duration-200 hover:-translate-y-1 hover:border-brand-blue/25 hover:shadow-md">
      <span
        className={`${sectionIconShellClass} overflow-hidden rounded-full bg-transparent ring-1 ring-border/80`}
      >
        <img
          src={iconSrc}
          alt=""
          aria-hidden="true"
          className="size-full object-cover"
        />
      </span>

      <div className="min-w-0 pr-9">
        <h3 className="text-sm font-extrabold leading-5 text-foreground">
          {title}
        </h3>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      </div>

      <span
        aria-hidden="true"
        className="absolute right-4 top-4 inline-flex size-6 items-center justify-center rounded-full border border-brand-blue/20 bg-brand-blue/5 text-[10px] font-extrabold text-brand-blue transition-colors duration-200 group-hover:bg-brand-blue group-hover:text-white"
      >
        FC
      </span>
    </article>
  )
}

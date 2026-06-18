import {
  iconColorClasses,
  sectionIconImageClass,
  sectionIconShellClass,
} from './about-styles'
import { getBenefitRevealClass } from './feature-reveal'

type AboutBenefitCardProps = {
  description: string
  iconSrc: string
  index: number
  title: string
  visibleStep: number
}

export function AboutBenefitCard({
  description,
  iconSrc,
  index,
  title,
  visibleStep,
}: AboutBenefitCardProps) {
  return (
    <article
      className={`${getBenefitRevealClass(index + 1, visibleStep)} benefit-card-pop group relative flex min-h-48 items-start gap-4 overflow-hidden rounded-lg p-5 sm:p-6`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/35 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />
      <span
        className={`${sectionIconShellClass} transition-transform duration-200 group-hover:-translate-y-1 ${iconColorClasses[index % iconColorClasses.length]}`}
      >
        <img
          src={iconSrc}
          alt=""
          aria-hidden="true"
          className={sectionIconImageClass}
        />
      </span>
      <div className="min-w-0 pt-1">
        <h3 className="text-base font-extrabold leading-6 text-foreground">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </article>
  )
}

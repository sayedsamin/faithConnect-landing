import {
  iconColorClasses,
  sectionIconImageClass,
  sectionIconShellClass,
} from './about-styles'

type AboutMissionHighlightCardProps = {
  description: string
  iconSrc: string
  index: number
  title: string
}

export function AboutMissionHighlightCard({
  description,
  iconSrc,
  index,
  title,
}: AboutMissionHighlightCardProps) {
  return (
    <div className="value-card-pop flex min-h-28 items-center gap-4 rounded-lg p-5 text-left">
      <span
        className={`${sectionIconShellClass} ${iconColorClasses[index % iconColorClasses.length]}`}
      >
        <img
          src={iconSrc}
          alt=""
          aria-hidden="true"
          className={sectionIconImageClass}
        />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-extrabold text-brand-dark">
          {title}
        </span>
        <span className="mt-1 block text-xs leading-5 font-semibold text-brand-dark/58">
          {description}
        </span>
      </span>
    </div>
  )
}

import type { ComponentType, SVGProps } from 'react'

type FeatureCardProps = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  title: string
  description: string
  colorClass?: string
}

export default function FeatureCard({
  Icon,
  title,
  description,
  colorClass = 'bg-indigo-100 text-indigo-600',
}: FeatureCardProps) {
  return (
    <article className="flex h-full min-h-40 flex-col justify-center rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <span
        className={`inline-flex size-12 shrink-0 items-center justify-center rounded-full ${colorClass}`}
      >
        <Icon aria-hidden="true" className="size-6" />
      </span>
      <h3 className="mt-4 text-sm font-bold leading-5 text-slate-900">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-5 text-slate-600">{description}</p>
    </article>
  )
}

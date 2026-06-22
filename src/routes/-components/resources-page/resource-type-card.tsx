import { ArrowRight } from 'lucide-react'

import type { ResourceType, ResourceTypeIcon } from './resources-data'

const iconByType = {
  book: '/images/home/file.png',
  download: '/images/home/reports.png',
  lightbulb: '/images/home/message.png',
  video: '/images/home/phone.png',
} satisfies Record<ResourceTypeIcon, string>

const iconToneByType = {
  book: 'bg-brand-blue/10',
  download: 'bg-violet-500/10',
  lightbulb: 'bg-amber-500/10',
  video: 'bg-emerald-500/10',
} satisfies Record<ResourceTypeIcon, string>

export function ResourceTypeCard({
  action,
  description,
  icon,
  title,
}: ResourceType) {
  return (
    <article className="feature-card flex min-h-64 flex-col rounded-xl border border-brand-blue/10 bg-white p-6 shadow-[0_16px_38px_rgb(0_14_53/0.06)]">
      <span
        className={`grid size-14 place-items-center rounded-full ${iconToneByType[icon]}`}
      >
        <img
          src={iconByType[icon]}
          alt=""
          width={28}
          height={28}
          loading="lazy"
          decoding="async"
          className="size-7 object-contain"
          aria-hidden="true"
          draggable={false}
        />
      </span>
      <h3 className="mt-5 text-lg font-extrabold text-brand-dark">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-brand-dark/62">
        {description}
      </p>
      <a
        href="#popular-resources"
        className="mt-5 inline-flex min-h-11 touch-manipulation items-center gap-2 self-start rounded-md text-sm font-extrabold text-brand-blue no-underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/20"
      >
        {action}
        <ArrowRight className="size-4" aria-hidden="true" />
      </a>
    </article>
  )
}

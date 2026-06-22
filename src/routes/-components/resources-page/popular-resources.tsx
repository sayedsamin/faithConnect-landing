import { ArrowRight, SearchX } from 'lucide-react'

import type { PopularResource } from './resources-data'

type PopularResourcesProps = {
  onClear: () => void
  query: string
  resources: PopularResource[]
}

const badgeToneByType = {
  Article: 'bg-emerald-500/10 text-emerald-700',
  Guide: 'bg-brand-blue/10 text-brand-blue',
  Template: 'bg-amber-500/10 text-amber-700',
  Video: 'bg-violet-500/10 text-violet-700',
} satisfies Record<PopularResource['type'], string>

export function PopularResources({
  onClear,
  query,
  resources,
}: PopularResourcesProps) {
  return (
    <section
      id="popular-resources"
      className="page-shell scroll-mt-28 pb-14 sm:pb-18"
      aria-labelledby="popular-resources-title"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2
            id="popular-resources-title"
            className="text-2xl font-extrabold text-brand-dark"
          >
            {query ? 'Search results' : 'Popular resources'}
          </h2>
          {query ? (
            <p className="mt-2 text-sm text-brand-dark/60" aria-live="polite">
              {resources.length}{' '}
              {resources.length === 1 ? 'resource' : 'resources'} found for “
              {query}”.
            </p>
          ) : null}
        </div>
        <a
          href="#resource-types-title"
          className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-extrabold text-brand-blue no-underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/20"
        >
          View resource types
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </div>

      {resources.length ? (
        <div className="mt-7 overflow-hidden rounded-xl border border-brand-blue/10 bg-white shadow-[0_18px_44px_rgb(0_14_53/0.07)]">
          {resources.map((resource) => (
            <article
              key={resource.title}
              className="grid gap-4 border-b border-brand-blue/8 p-4 last:border-b-0 sm:grid-cols-[9rem_minmax(0,1fr)_auto] sm:items-center sm:p-5"
            >
              <img
                src={resource.imageSrc}
                alt={resource.imageAlt}
                width={288}
                height={176}
                loading="lazy"
                decoding="async"
                className="aspect-[18/11] w-full rounded-lg border border-brand-blue/8 bg-brand-blue/[0.035] object-cover sm:w-36"
              />
              <div className="min-w-0">
                <h3 className="text-base leading-6 font-extrabold text-brand-dark">
                  {resource.title}
                </h3>
                <p className="mt-1 max-w-3xl text-sm leading-6 text-brand-dark/62">
                  {resource.description}
                </p>
              </div>
              <span
                className={`w-fit rounded-full px-3 py-1.5 text-xs font-extrabold ${badgeToneByType[resource.type]}`}
              >
                {resource.type}
              </span>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-7 flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-brand-blue/20 bg-brand-blue/[0.025] p-8 text-center">
          <SearchX className="size-10 text-brand-blue" aria-hidden="true" />
          <h3 className="mt-4 text-lg font-extrabold text-brand-dark">
            No resources found
          </h3>
          <p className="mt-2 max-w-md text-sm leading-6 text-brand-dark/60">
            Try a broader search, or clear the current search to browse every
            resource.
          </p>
          <button
            type="button"
            onClick={onClear}
            className="mt-5 min-h-11 touch-manipulation rounded-md bg-brand-blue px-5 py-2.5 text-sm font-extrabold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/25"
          >
            Clear search
          </button>
        </div>
      )}
    </section>
  )
}

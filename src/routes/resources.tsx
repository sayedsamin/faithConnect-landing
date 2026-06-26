import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { CtaBanner } from '#/components/cta-banner'
import { PopularResources } from './-components/resources-page/popular-resources'
import { ResourceTypeCard } from './-components/resources-page/resource-type-card'
import {
  filterPopularResources,
  popularResources,
  resourceTypes,
} from './-components/resources-page/resources-data'
import { ResourcesHero } from './-components/resources-page/resources-hero'

const resourcesSearchSchema = z.object({
  q: z.string().trim().catch(''),
})

export const Route = createFileRoute('/resources')({
  validateSearch: resourcesSearchSchema,
  component: ResourcesPage,
  head: () => ({
    meta: [
      { title: 'Resources | GraceNexa' },
      {
        name: 'description',
        content:
          'Explore practical church leadership guides, webinars, templates, and ministry insights from GraceNexa.',
      },
    ],
  }),
})

function ResourcesPage() {
  const { q } = Route.useSearch()
  const navigate = Route.useNavigate()
  const filteredResources = filterPopularResources(popularResources, q)

  function updateSearch(value: string) {
    void navigate({
      replace: true,
      search: { q: value },
    })
  }

  return (
    <main className="overflow-hidden bg-white text-brand-dark">
      <ResourcesHero query={q} onQueryChange={updateSearch} />

      <section
        className="page-shell py-12 sm:py-16"
        aria-labelledby="resource-types-title"
      >
        <h2
          id="resource-types-title"
          className="text-2xl font-extrabold text-brand-dark"
        >
          Explore by resource type
        </h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {resourceTypes.map((resourceType) => (
            <ResourceTypeCard key={resourceType.title} {...resourceType} />
          ))}
        </div>
      </section>

      <PopularResources
        query={q}
        resources={filteredResources}
        onClear={() => updateSearch('')}
      />

      <CtaBanner />
    </main>
  )
}

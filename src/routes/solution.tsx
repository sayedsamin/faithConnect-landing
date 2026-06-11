import { createFileRoute } from '@tanstack/react-router'
import { SolutionPage } from '#/routes/-components/solution-page'

export const Route = createFileRoute('/solution')({
  component: SolutionPage,
  head: () => ({
    meta: [{ title: 'Solution | FaithConnect' }],
  }),
})

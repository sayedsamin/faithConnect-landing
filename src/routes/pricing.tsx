import { createFileRoute } from '@tanstack/react-router'
import { PricingPage } from '#/routes/-components/pricing-page'

export const Route = createFileRoute('/pricing')({
  component: PricingPage,
  head: () => ({
    meta: [{ title: 'Pricing | FaithConnect' }],
  }),
})

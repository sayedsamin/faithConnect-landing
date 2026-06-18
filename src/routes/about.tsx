import { createFileRoute } from '@tanstack/react-router'
import { AboutPage } from '#/routes/-components/about-page'

export const Route = createFileRoute('/about')({
  component: AboutPage,
  head: () => ({
    meta: [{ title: 'About | FaithConnect' }],
    links: [
      {
        rel: 'preload',
        href: '/images/about/faithconnect-about-hero.png',
        as: 'image',
      },
    ],
  }),
})

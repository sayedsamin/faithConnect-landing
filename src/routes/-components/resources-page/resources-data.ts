export type ResourceTypeIcon = 'book' | 'download' | 'lightbulb' | 'video'

export type ResourceType = {
  action: string
  description: string
  icon: ResourceTypeIcon
  title: string
}

export type PopularResource = {
  description: string
  imageAlt: string
  imageSrc: string
  title: string
  type: 'Article' | 'Guide' | 'Template' | 'Video'
}

export const resourceTypes: ResourceType[] = [
  {
    title: 'Guides & Articles',
    description: 'Step-by-step resources to help your church thrive.',
    action: 'Browse articles',
    icon: 'book',
  },
  {
    title: 'Videos & Webinars',
    description: 'Watch expert-led sessions on practical ministry topics.',
    action: 'Watch now',
    icon: 'video',
  },
  {
    title: 'Templates & Tools',
    description: 'Download ready-to-use templates for your church.',
    action: 'Explore tools',
    icon: 'download',
  },
  {
    title: 'Ministry Insights',
    description: 'Practical ideas and inspiration for church leaders.',
    action: 'Read insights',
    icon: 'lightbulb',
  },
]

export const popularResources: PopularResource[] = [
  {
    title: 'Getting Started with GraceNexa',
    description:
      'A practical guide to setting up your church and bringing your team onto one connected platform.',
    type: 'Guide',
    imageSrc: '/images/about/gracenexa-about-hero.webp',
    imageAlt: 'Church leaders collaborating with GraceNexa',
  },
  {
    title: 'Five Ways to Strengthen Church Communication',
    description:
      'Simple ways to keep members informed, engaged, and connected throughout the week.',
    type: 'Article',
    imageSrc: '/images/about/team.webp',
    imageAlt: 'Illustration of a collaborative ministry team',
  },
  {
    title: 'Webinar: Simplifying Church Operations',
    description:
      'See how a shared dashboard can streamline everyday ministry tasks and save your team time.',
    type: 'Video',
    imageSrc: '/images/about/member-overview.webp',
    imageAlt: 'GraceNexa member overview and recent activity dashboard',
  },
  {
    title: 'Church Event Planning Template',
    description:
      'Plan responsibilities, communication, registration, and follow-up with one adaptable template.',
    type: 'Template',
    imageSrc: '/images/pricing/contract.webp',
    imageAlt: 'Illustration of a church planning document',
  },
]

export function filterPopularResources(
  resources: PopularResource[],
  query: string,
) {
  const normalizedQuery = query.trim().toLocaleLowerCase()

  if (!normalizedQuery) {
    return resources
  }

  return resources.filter((resource) =>
    [resource.title, resource.description, resource.type]
      .join(' ')
      .toLocaleLowerCase()
      .includes(normalizedQuery),
  )
}

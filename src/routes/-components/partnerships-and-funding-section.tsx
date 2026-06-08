import {
  Building2,
  GraduationCap,
  HandCoins,
  Library,
  Lightbulb,
  UsersRound,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const fundingSources = [
  {
    title: 'Public grants',
    detail:
      'Federal and provincial education, youth, and development programs.',
  },
  {
    title: 'Community sponsors',
    detail: 'Corporate, local business, and donor support for program access.',
  },
  {
    title: 'Sliding-scale fees',
    detail: 'Paid seats help offset subsidized access for low-income families.',
  },
  {
    title: 'Campaigns',
    detail: 'Targeted fundraising for equipment, scholarships, and showcases.',
  },
]

type Partnership = {
  category: string
  icon: LucideIcon
  name: string
}

const partnerships: Partnership[] = [
  {
    category: 'Schools',
    icon: Building2,
    name: 'Local schools and school divisions',
  },
  {
    category: 'Post-secondary',
    icon: GraduationCap,
    name: 'University of Winnipeg and PACE',
  },
  {
    category: 'Innovation',
    icon: Lightbulb,
    name: 'Tech start-ups and innovation hubs',
  },
  {
    category: 'Youth services',
    icon: UsersRound,
    name: 'Youth organizations and municipal programs',
  },
  {
    category: 'Community spaces',
    icon: Library,
    name: 'Libraries and community centers',
  },
  {
    category: 'Mentorship',
    icon: GraduationCap,
    name: 'Universities and youth mentorship organizations',
  },
]

export function PartnershipsAndFundingSection() {
  return (
    <section
      className="relative py-16 sm:py-20"
      aria-labelledby="funding-title"
    >
      <div className="page-wrap">
        <div className="mb-12 max-w-3xl">
          <p className="island-kicker rise-in">Partnerships &amp; Funding</p>
          <h2
            id="funding-title"
            className="display-title rise-in mt-3 text-3xl font-bold text-primary sm:text-5xl"
            style={{ animationDelay: '80ms' }}
          >
            A practical model for sustainable access
          </h2>
          <p
            className="rise-in mt-5 text-lg leading-8 text-muted-foreground"
            style={{ animationDelay: '140ms' }}
          >
            Questura combines public funding, community backing, and
            institutional partnerships so programs can grow without becoming
            inaccessible.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <article
            className="feature-card rise-in rounded-lg border p-6 sm:p-8"
            style={{ animationDelay: '180ms' }}
            aria-labelledby="funding-model-title"
          >
            <div
              className="flex items-start justify-between gap-6 border-b pb-6"
              style={{ borderColor: 'var(--line)' }}
            >
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-muted-foreground">
                  Funding Model
                </p>
                <h3
                  id="funding-model-title"
                  className="mt-2 text-2xl font-bold text-foreground"
                >
                  Sustainable Growth
                </h3>
              </div>
              <span
                className="inline-flex size-12 shrink-0 items-center justify-center rounded-md"
                style={{
                  background:
                    'color-mix(in oklab, var(--primary) 16%, transparent)',
                  color:
                    'color-mix(in oklab, var(--primary) 88%, var(--white))',
                }}
              >
                <HandCoins className="size-6" aria-hidden />
              </span>
            </div>

            <div className="mt-6 space-y-5">
              {fundingSources.map((source, index) => (
                <div key={source.title} className="flex gap-4">
                  <span
                    className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-md text-sm font-extrabold tabular-nums"
                    style={{
                      background:
                        'color-mix(in oklab, var(--accent) 14%, transparent)',
                      color:
                        'color-mix(in oklab, var(--foreground) 78%, var(--accent))',
                    }}
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="font-extrabold text-foreground">
                      {source.title}
                    </h4>
                    <p className="mt-1 leading-7 text-muted-foreground">
                      {source.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <div aria-labelledby="partnerships-title">
            <h3 id="partnerships-title" className="sr-only">
              Key Partnerships
            </h3>
            <div className="grid h-full grid-cols-1 gap-3 sm:grid-cols-2">
              {partnerships.map((partner, index) => (
                <article
                  key={partner.name}
                  className="feature-card rise-in group flex min-h-36 items-start gap-4 rounded-lg border p-5 transition-[border-color,transform] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
                  style={{ animationDelay: `${220 + index * 55}ms` }}
                >
                  <span
                    className="inline-flex size-11 shrink-0 items-center justify-center rounded-md"
                    style={{
                      background:
                        'color-mix(in oklab, var(--primary) 10%, transparent)',
                      color:
                        'color-mix(in oklab, var(--primary) 84%, var(--white))',
                    }}
                  >
                    <partner.icon className="size-5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-extrabold uppercase tracking-[0.12em] text-muted-foreground">
                      {partner.category}
                    </span>
                    <span className="mt-2 block font-bold leading-6 text-foreground transition-colors group-hover:text-primary">
                      {partner.name}
                    </span>
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

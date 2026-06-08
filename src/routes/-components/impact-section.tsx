import {
  ChartNoAxesCombined,
  GraduationCap,
  Puzzle,
  Sparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { ImageSlot } from '#/routes/-components/image-slot'

type ImpactGoal = {
  text: string
  icon: LucideIcon
  iconBg: string
  iconColor: string
}

const impactGoals: ImpactGoal[] = [
  {
    text: 'Reduce summer learning loss and after-school idle time',
    icon: GraduationCap,
    iconBg: 'color-mix(in oklab, var(--primary) 14%, transparent)',
    iconColor: 'color-mix(in oklab, var(--primary) 85%, var(--white))',
  },
  {
    text: 'Increase confidence and school engagement in at-risk youth',
    icon: Sparkles,
    iconBg: 'color-mix(in oklab, var(--accent) 14%, transparent)',
    iconColor: 'color-mix(in oklab, var(--accent) 86%, var(--white))',
  },
  {
    text: 'Build digital skills, creativity, and teamwork',
    icon: Puzzle,
    iconBg: 'color-mix(in oklab, var(--secondary) 38%, transparent)',
    iconColor: 'color-mix(in oklab, var(--foreground) 70%, var(--accent))',
  },
  {
    text: "Develop Canada's future innovators, thinkers, and leaders",
    icon: ChartNoAxesCombined,
    iconBg: 'color-mix(in oklab, var(--primary) 16%, var(--secondary) 6%)',
    iconColor: 'color-mix(in oklab, var(--primary) 92%, var(--white))',
  },
]

const metrics = [
  'Enrollment growth',
  'Participant feedback and satisfaction',
  'Academic skill improvements (pre/post assessments)',
  'Diversity and inclusion benchmarks',
  'Program completion rates',
]

export function ImpactSection() {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20"
      aria-labelledby="impact-title"
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/4 left-0 h-64 w-64 rounded-full blur-3xl"
          style={{
            background: 'color-mix(in oklab, var(--primary) 10%, transparent)',
          }}
        />
        <div
          className="absolute right-0 bottom-1/4 h-96 w-96 rounded-full blur-3xl"
          style={{
            background:
              'color-mix(in oklab, var(--secondary) 16%, transparent)',
          }}
        />
      </div>

      <div className="page-wrap relative z-10">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <h2
            id="impact-title"
            className="display-title rise-in text-3xl font-bold tracking-tight text-primary sm:text-5xl"
          >
            Our Impact
          </h2>
          <p
            className="rise-in mt-6 text-lg text-muted-foreground sm:text-xl"
            style={{ animationDelay: '120ms' }}
          >
            Measuring our success through the growth and achievements of our
            students.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex h-full flex-col">
            <h3
              className="rise-in mb-8 text-2xl font-bold text-foreground"
              style={{ animationDelay: '160ms' }}
            >
              Long-Term Impact Goals
            </h3>
            <ImageSlot
              src="/images/home/impact-goals.jpg"
              alt="Students presenting their science projects during an impact showcase"
              className="rise-in mb-6 aspect-video"
              width={1400}
              height={788}
              label="Impact goals image"
            />
            <div className="space-y-5">
              {impactGoals.map((goal, index) => (
                <article
                  key={goal.text}
                  className="feature-card rise-in flex items-start rounded-xl border p-4"
                  style={{ animationDelay: `${220 + index * 80}ms` }}
                >
                  <div
                    className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: goal.iconBg }}
                  >
                    <goal.icon
                      className="h-6 w-6"
                      style={{ color: goal.iconColor }}
                      aria-hidden
                    />
                  </div>
                  <p className="pt-2 text-lg font-medium text-foreground">
                    {goal.text}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div
            className="rise-in relative h-full overflow-hidden rounded-3xl border p-8 sm:p-12"
            style={{
              animationDelay: '220ms',
              background:
                'linear-gradient(165deg, color-mix(in oklab, var(--primary) 8%, var(--surface-strong)), color-mix(in oklab, var(--secondary) 8%, var(--surface)))',
              borderColor: 'var(--line)',
            }}
            aria-labelledby="impact-metrics-title"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom right, color-mix(in oklab, var(--white) 42%, transparent), transparent)',
              }}
            />
            <h3
              id="impact-metrics-title"
              className="relative z-10 mb-8 text-2xl font-bold text-foreground"
            >
              Performance Metrics
            </h3>
            <ImageSlot
              src="/images/home/impact-metrics.jpg"
              alt="Educators reviewing student progress metrics on a dashboard"
              className="relative z-10 mb-6 aspect-video"
              width={1400}
              height={788}
              label="Impact metrics image"
            />
            <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {metrics.map((metric, index) => (
                <div
                  key={metric}
                  className={`rise-in flex items-center rounded-xl border p-4 ${
                    index === metrics.length - 1 ? 'sm:col-span-2' : ''
                  }`}
                  style={{
                    animationDelay: `${280 + index * 70}ms`,
                    background:
                      'color-mix(in oklab, var(--surface-strong) 88%, transparent)',
                    borderColor: 'var(--line)',
                  }}
                >
                  <span
                    className="mr-3 block h-2 w-2 rounded-full"
                    style={{
                      background:
                        'color-mix(in oklab, var(--secondary) 76%, var(--accent))',
                    }}
                    aria-hidden
                  />
                  <span className="font-medium text-foreground">{metric}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

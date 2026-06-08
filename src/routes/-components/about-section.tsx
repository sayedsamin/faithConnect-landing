import type { ReactNode } from 'react'
import {
  Compass,
  Code2,
  Handshake,
  Lightbulb,
  Network,
  Rocket,
  ShieldCheck,
  Sparkles,
  Telescope,
  Waypoints,
} from 'lucide-react'
import { ImageSlot } from '#/routes/-components/image-slot'

type BentoCardProps = {
  children: ReactNode
  className?: string
  delayMs?: number
}

function BentoCard({ children, className, delayMs = 0 }: BentoCardProps) {
  return (
    <article
      className={`feature-card rise-in group relative overflow-hidden rounded-3xl border p-8 ${className ?? ''}`}
      style={{
        animationDelay: `${delayMs}ms`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(145deg, color-mix(in oklab, var(--primary) 8%, transparent), transparent 45%, color-mix(in oklab, var(--secondary) 14%, transparent) 100%)',
        }}
      />
      <div className="relative z-10 flex h-full flex-col justify-between">
        {children}
      </div>
    </article>
  )
}

export function AboutSection() {
  const standForItems = [
    {
      title: 'Explore',
      description: 'New ideas with curiosity',
      Icon: Sparkles,
      tone: 'accent',
    },
    {
      title: 'Create',
      description: 'Innovative solutions with confidence',
      Icon: Lightbulb,
      tone: 'primary',
    },
    {
      title: 'Code',
      description: 'Future-ready skills through hands-on building',
      Icon: Code2,
      tone: 'secondary',
    },
    {
      title: 'Lead',
      description: 'With purpose, teamwork, and impact',
      Icon: Rocket,
      tone: 'accent',
    },
  ]

  return (
    <section
      id="about"
      className="relative overflow-hidden py-16 sm:py-20"
      aria-labelledby="about-title"
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 right-0 h-72 w-1/2"
          style={{
            background:
              'linear-gradient(to bottom left, color-mix(in oklab, var(--primary) 12%, transparent), transparent)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 h-64 w-1/3"
          style={{
            background:
              'linear-gradient(to top right, color-mix(in oklab, var(--accent) 10%, transparent), transparent)',
          }}
        />
      </div>

      <div className="page-wrap relative z-10">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <h2
            id="about-title"
            className="display-title rise-in text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Who We Are
          </h2>
          <p
            className="rise-in mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl"
            style={{ animationDelay: '120ms' }}
          >
            Questura Academy is a federally incorporated non-profit learning
            center based in Canada, committed to providing innovative, engaging,
            and inclusive educational programs for children and youth.
          </p>
        </div>

        <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-6 md:grid-cols-6">
          <BentoCard className="md:col-span-4 md:self-start" delayMs={120}>
            <div className="mb-8 flex items-start justify-between">
              <div
                className="rounded-2xl p-3"
                style={{
                  background:
                    'color-mix(in oklab, var(--white) 12%, var(--primary) 24%)',
                }}
              >
                <Telescope
                  className="h-8 w-8"
                  style={{
                    color:
                      'color-mix(in oklab, var(--primary) 72%, var(--white) 28%)',
                  }}
                  aria-hidden
                />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-foreground">Our Vision</h3>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                To empower the next generation of thinkers, innovators, and
                leaders by providing a dynamic and supportive learning
                environment where excellence is cultivated and potential is
                fully realized.
              </p>
            </div>
            <ImageSlot
              src="/images/home/about-vision.jpg"
              alt="Students gathered around a collaborative learning table"
              className="mt-7 aspect-video"
              width={1400}
              height={788}
              label="About vision image"
            />
            <div
              className="pointer-events-none absolute -right-16 -bottom-16 h-64 w-64 rounded-full blur-3xl"
              style={{
                background:
                  'color-mix(in oklab, var(--primary) 28%, transparent)',
              }}
            />
          </BentoCard>

          <BentoCard className="md:col-span-2" delayMs={180}>
            <div className="mb-6">
              <div
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{
                  background:
                    'color-mix(in oklab, var(--accent) 14%, transparent)',
                }}
              >
                <Lightbulb
                  className="h-8 w-8"
                  style={{
                    color:
                      'color-mix(in oklab, var(--accent) 86%, var(--white))',
                  }}
                  aria-hidden
                />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Our Mission
              </h3>
            </div>
            <p className="text-base leading-7 text-muted-foreground">
              Questura Academy is committed to delivering high-quality,
              engaging, and future-focused educational experiences that:
            </p>
            <ul className="mt-4 space-y-2 text-sm font-semibold leading-6 text-foreground">
              {[
                'Foster critical thinking, creativity, and problem-solving',
                'Build strong academic and technological foundations',
                'Develop leadership, character, and life skills',
                'Inspire a lifelong passion for learning and innovation',
              ].map((item) => (
                <li key={item} className="flex min-w-0 gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary"
                  />
                  <span className="min-w-0">{item}</span>
                </li>
              ))}
            </ul>
            <ImageSlot
              src="/images/home/about-mission.jpg"
              alt="Mentor assisting a student with a digital learning activity"
              className="mt-7 aspect-4/3"
              width={1200}
              height={900}
              label="About mission image"
            />
            <div className="mt-8 flex flex-wrap gap-2">
              <span
                className="rounded-md border px-3 py-1 text-sm font-semibold"
                style={{
                  background:
                    'color-mix(in oklab, var(--accent) 10%, transparent)',
                  borderColor:
                    'color-mix(in oklab, var(--accent) 24%, transparent)',
                  color:
                    'color-mix(in oklab, var(--foreground) 78%, var(--accent))',
                }}
              >
                Equitable
              </span>
              <span
                className="rounded-md border px-3 py-1 text-sm font-semibold"
                style={{
                  background:
                    'color-mix(in oklab, var(--accent) 10%, transparent)',
                  borderColor:
                    'color-mix(in oklab, var(--accent) 24%, transparent)',
                  color:
                    'color-mix(in oklab, var(--foreground) 78%, var(--accent))',
                }}
              >
                Future-Ready
              </span>
            </div>
          </BentoCard>

          <BentoCard className="md:col-span-3" delayMs={240}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-xl font-bold text-foreground">
                  What We Stand For
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  At Questura Academy, learning moves from curiosity to real
                  impact.
                </p>
              </div>
              <div
                className="flex size-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{
                  background:
                    'color-mix(in oklab, var(--accent) 14%, transparent)',
                }}
              >
                <Compass
                  className="h-6 w-6"
                  style={{
                    color:
                      'color-mix(in oklab, var(--accent) 84%, var(--white))',
                  }}
                  aria-hidden
                />
              </div>
            </div>

            <div className="relative mt-6">
              <div
                aria-hidden="true"
                className="absolute inset-x-8 top-1/2 hidden h-px -translate-y-1/2 md:block"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, color-mix(in oklab, var(--primary) 34%, transparent), color-mix(in oklab, var(--accent) 28%, transparent), transparent)',
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-y-8 left-1/2 hidden w-px -translate-x-1/2 md:block"
                style={{
                  background:
                    'linear-gradient(180deg, transparent, color-mix(in oklab, var(--accent) 26%, transparent), color-mix(in oklab, var(--primary) 28%, transparent), transparent)',
                }}
              />

              <div className="relative grid gap-3 sm:grid-cols-2">
                {standForItems.map(({ description, Icon, title, tone }) => (
                  <div
                    key={title}
                    className="min-w-0 rounded-2xl p-4 transition-transform duration-300 group-hover:odd:-translate-y-0.5 group-hover:even:translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
                    style={{
                      background: `color-mix(in oklab, var(--${tone}) 11%, transparent)`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="flex size-11 shrink-0 items-center justify-center rounded-xl"
                        style={{
                          background: `color-mix(in oklab, var(--${tone}) 18%, var(--background))`,
                          color: `color-mix(in oklab, var(--${tone}) 82%, var(--foreground))`,
                        }}
                      >
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-base font-extrabold text-foreground">
                          {title}
                        </p>
                        <p className="mt-0.5 text-sm leading-5 text-muted-foreground">
                          {description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 hidden size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-background shadow-[0_12px_30px_rgba(23,58,64,0.14)] md:flex"
              >
                <Waypoints
                  className="size-7"
                  style={{
                    color:
                      'color-mix(in oklab, var(--primary) 78%, var(--accent))',
                  }}
                />
              </div>
            </div>
          </BentoCard>

          <BentoCard className="md:col-span-3" delayMs={300}>
            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-foreground">
                    Our Commitment
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    We are committed to shaping a future where young minds are
                    not only academically equipped but also inspired to lead,
                    innovate, and thrive. Through a blend of technology,
                    creativity, and leadership development, Questura Academy
                    prepares students to succeed in both their educational
                    journey and beyond.
                  </p>
                </div>
                <div
                  className="flex size-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background:
                      'color-mix(in oklab, var(--primary) 14%, transparent)',
                  }}
                >
                  <ShieldCheck
                    className="h-6 w-6"
                    style={{
                      color:
                        'color-mix(in oklab, var(--primary) 85%, var(--white))',
                    }}
                    aria-hidden
                  />
                </div>
              </div>
            </div>
          </BentoCard>

          <BentoCard className="md:col-span-3" delayMs={360}>
            <div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
              style={{
                background:
                  'color-mix(in oklab, var(--primary) 14%, transparent)',
              }}
            >
              <Network
                className="h-6 w-6"
                style={{
                  color:
                    'color-mix(in oklab, var(--primary) 85%, var(--white))',
                }}
                aria-hidden
              />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              21st Century Skills
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Supplementing formal education with critical thinking, digital
              literacy, and collaboration.
            </p>
            <ImageSlot
              src="/images/home/about-skills.jpg"
              alt="Learners coding together on classroom laptops"
              className="mt-5 aspect-16/10"
              width={1280}
              height={800}
              label="Skills card image"
            />
          </BentoCard>

          <BentoCard className="md:col-span-3" delayMs={420}>
            <div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
              style={{
                background:
                  'color-mix(in oklab, var(--secondary) 36%, transparent)',
              }}
            >
              <Handshake
                className="h-6 w-6"
                style={{
                  color: 'color-mix(in oklab, var(--accent) 80%, var(--white))',
                }}
                aria-hidden
              />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              Equity &amp; Inclusion
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Creating safe, accessible environments for all children to explore
              STEM, arts, and leadership.
            </p>
            <ImageSlot
              src="/images/home/about-inclusion.jpg"
              alt="Diverse students participating in a group workshop"
              className="mt-5 aspect-16/10"
              width={1280}
              height={800}
              label="Inclusion card image"
            />
          </BentoCard>
        </div>
      </div>
    </section>
  )
}

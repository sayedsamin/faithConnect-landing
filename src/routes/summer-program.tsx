import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  BrainCircuit,
  Code2,
  Compass,
  Cpu,
  HeartHandshake,
  Lightbulb,
  Megaphone,
  Paintbrush,
  ShieldCheck,
  UserPlus,
} from 'lucide-react'
import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { getSupabaseBrowserClient } from '#/integrations/supabase/client'

export const Route = createFileRoute('/summer-program')({
  component: SummerProgramPage,
  head: () => ({
    meta: [
      {
        title: 'Summer Learning & Leadership Camp 2026 | Questura Academy',
      },
    ],
  }),
})

type Experience = {
  activities: string[]
  description: string
  Icon: LucideIcon
  imageLabel: string
  imageSrc: string
  title: string
}

const programFacts = [
  ['Ages', '11-17'],
  ['Year', '2026'],
  ['Cost', 'Free'],
  ['Focus', 'STEAM, coding, leadership'],
]

const experiences: Experience[] = [
  {
    title: 'STEAM Discovery and Innovation',
    description:
      'Students use science, technology, engineering, arts, and math in short build-and-test challenges.',
    Icon: Lightbulb,
    imageLabel: 'STEAM workshop image',
    imageSrc: '/summer-program/steam-workshop.avif',
    activities: [
      'Invention sketching',
      'Design thinking challenges',
      'Engineering builds',
      'Bridge, tower, and structure activities',
      'Balloon-powered car challenges',
      'Outdoor STEAM scavenger hunts',
    ],
  },
  {
    title: 'Coding and Computational Thinking',
    description:
      'Beginner-friendly activities introduce instructions, algorithms, logic, debugging, and step-by-step problem solving.',
    Icon: Code2,
    imageLabel: 'Coding lab image',
    imageSrc: '/summer-program/coding-lab.avif',
    activities: [
      'Unplugged coding games',
      'Flowchart design',
      'Algorithm relay races',
      'Visual programming with Scratch or Blockly',
      'Beginner Python activities',
      'Puzzle stations and coded treasure maps',
    ],
  },
  {
    title: 'Robotics, IoT, and Smart Systems',
    description:
      'Participants work with robots, sensors, and connected-device ideas used in schools, homes, and cities.',
    Icon: Cpu,
    imageLabel: 'Robotics and IoT image',
    imageSrc: '/summer-program/robotics-iot.avif',
    activities: [
      'Robot mission challenges',
      'Maze navigation activities',
      'Line-following concepts',
      'Sensor and actuator exploration',
      'Smart city network games',
      'Reusable-material robot design',
    ],
  },
  {
    title: 'Artificial Intelligence and Machine Learning',
    description:
      'Students look at everyday AI, pattern recognition, data, prediction, and responsible technology use.',
    Icon: BrainCircuit,
    imageLabel: 'AI learning image',
    imageSrc: '/summer-program/ai-learning.avif',
    activities: [
      'Classifying everyday AI examples',
      'Pattern-recognition games',
      'Prediction challenges',
      'Mini decision models',
      '"Train the model" movement games',
      'Responsible AI design challenges',
    ],
  },
  {
    title: 'Cybersecurity and Digital Safety',
    description:
      'Practical games and scenarios help students understand online risks, privacy, strong passwords, and responsible digital habits.',
    Icon: ShieldCheck,
    imageLabel: 'Cyber safety image',
    imageSrc: '/summer-program/cyber-safety.avif',
    activities: [
      'Phishing detection challenges',
      'Password-strength games',
      'Digital footprint discussions',
      'Two-factor authentication awareness',
      'Cyber detective mysteries',
      'Digital safety campaigns',
    ],
  },
  {
    title: 'Digital Arts, Media, and Creative Technology',
    description:
      'Students practise visual design, storytelling, media production, and responsible content creation.',
    Icon: Paintbrush,
    imageLabel: 'Digital media image',
    imageSrc: '/summer-program/digital-media.avif',
    activities: [
      'Poster and logo design',
      'Digital flyer creation',
      'Photography walks',
      'Podcast or audio projects',
      'Media ethics discussions',
      'Spoken word, talent, or performance activities',
    ],
  },
  {
    title: 'Leadership, Life Skills, and Wellness',
    description:
      'Students practise communication, teamwork, self-awareness, and everyday habits that support learning.',
    Icon: HeartHandshake,
    imageLabel: 'Leadership and wellness image',
    imageSrc: '/summer-program/leadership-wellness.avif',
    activities: [
      'Leadership games',
      'Goal-setting exercises',
      'Public speaking practice',
      'Conflict resolution role-play',
      'Team obstacle courses',
      'Reflection circles',
    ],
  },
  {
    title: 'Civic Engagement and Community Impact',
    description:
      'Teams plan final projects connected to school, family, neighbourhood, or community needs.',
    Icon: Megaphone,
    imageLabel: 'Community showcase image',
    imageSrc: '/summer-program/community-showcase.avif',
    activities: [
      'Community mapping',
      'Youth voice discussions',
      'Kindness challenges',
      'Project planning',
      'Presentation coaching',
      'Final showcase activities',
    ],
  },
]

const outcomes = [
  'An invention concept or STEAM journal',
  'A simple coded game, animation, or beginner program',
  'A robot mission idea or smart system model',
  'An AI idea pitch or classification activity',
  'A cyber safety campaign, poster, skit, or video',
  'A podcast, poster, short video, or digital storytelling product',
  'A leadership reflection or wellness plan',
  'A final capstone project for the showcase',
]

const summerProgramRegistrationPath = '/summer-program/register'

function RegisterButton() {
  const navigate = useNavigate()
  const [isCheckingSession, setIsCheckingSession] = useState(false)

  async function handleRegisterClick() {
    setIsCheckingSession(true)

    try {
      const supabase = getSupabaseBrowserClient()
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session?.user.id) {
        await navigate({ to: summerProgramRegistrationPath })
        return
      }

      await navigate({
        to: '/signin',
        search: { redirect: summerProgramRegistrationPath },
      })
    } catch {
      await navigate({
        to: '/signin',
        search: { redirect: summerProgramRegistrationPath },
      })
    } finally {
      setIsCheckingSession(false)
    }
  }

  return (
    <button
      type="button"
      className="inline-flex min-h-16 w-full touch-manipulation items-center justify-center rounded-md bg-brand-navy px-10 py-4 text-lg font-extrabold text-brand-white no-underline shadow-[0_14px_28px_rgba(0,0,0,0.18)] transition-[background-color,color,transform] duration-150 ease-out hover:-translate-y-0.5 hover:bg-brand-gold hover:text-brand-navy focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 disabled:cursor-wait disabled:opacity-78 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto sm:min-w-64"
      disabled={isCheckingSession}
      onClick={() => {
        void handleRegisterClick()
      }}
    >
      <UserPlus aria-hidden="true" className="mr-3 size-6" />
      <span>{isCheckingSession ? 'Checking… Register' : 'Register'}</span>
    </button>
  )
}

function SummerProgramPage() {
  return (
    <main className="pb-20">
      <section
        className="relative pt-28 pb-12 sm:pt-32 md:pb-16"
        aria-labelledby="camp-title"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-152"
          style={{
            background:
              'linear-gradient(135deg, color-mix(in oklab, var(--school-bus-yellow) 24%, transparent), transparent 38%, color-mix(in oklab, var(--primary) 14%, transparent))',
          }}
        />
        <div className="page-wrap relative px-4 sm:px-6">
          <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
            <div className="min-w-0">
              <p className="island-kicker">Questura Academy</p>
              <h1
                id="camp-title"
                className="display-title mt-4 max-w-5xl text-5xl leading-[1.04] font-bold text-foreground sm:text-6xl lg:text-7xl"
              >
                Summer Learning &amp; Leadership Camp 2026
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
                A summer camp for youth ages 11-17, with hands-on sessions in
                STEAM, coding, robotics, AI, cybersecurity, digital media,
                wellness, and leadership.
              </p>
              <p className="mt-5 max-w-3xl leading-8 text-muted-foreground">
                Students work in groups, try new tools, build small projects,
                and prepare work they can share at the end of the program.
              </p>

              <div className="mt-8">
                <RegisterButton />
              </div>
            </div>

            <div className="min-w-0">
              <div className="overflow-hidden rounded-md border border-brand-white/15 bg-shadow-grey p-3 shadow-[0_22px_44px_rgba(0,0,0,0.2)]">
                <img
                  src="/images/poster-summer-2026.avif"
                  alt="Questura Academy Summer Learning and Leadership Camp 2026 poster"
                  className="h-auto w-full rounded-md border border-brand-white/12 object-cover shadow-[0_1px_0_rgba(255,255,255,0.18)_inset]"
                  width="900"
                  height="1200"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {programFacts.map(([label, value], index) => (
              <article
                key={label}
                className={[
                  'rounded-md border p-5 shadow-[0_18px_34px_rgba(23,58,64,0.08)]',
                  index === 0 || index === 3
                    ? 'bg-shadow-grey text-brand-white'
                    : 'feature-card',
                  index === 1 || index === 2 ? 'md:translate-y-4' : '',
                ].join(' ')}
              >
                <p
                  className={[
                    'text-sm font-extrabold',
                    index === 0 || index === 3
                      ? 'text-brand-white/72'
                      : 'text-muted-foreground',
                  ].join(' ')}
                >
                  {label}
                </p>
                <p
                  className={[
                    'mt-2 text-2xl font-extrabold tabular-nums',
                    index === 0 || index === 3
                      ? 'text-school-bus-yellow'
                      : 'text-foreground',
                  ].join(' ')}
                >
                  {value}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="page-wrap px-4 py-16 sm:px-6"
        aria-labelledby="about-title"
      >
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
          <div className="rounded-md border border-primary/20 bg-primary p-6 text-primary-foreground shadow-[0_20px_40px_rgba(30,90,72,0.16)] sm:p-8">
            <p className="island-kicker">About the Program</p>
            <h2
              id="about-title"
              className="display-title mt-3 text-4xl font-bold sm:text-5xl"
            >
              Built for active learning.
            </h2>
            <p className="mt-5 text-lg leading-8 text-primary-foreground/86">
              A practical camp built around making, testing, discussing, and
              presenting.
            </p>
          </div>
          <div className="feature-card rounded-md border p-6 sm:p-8">
            <p className="text-lg leading-8 text-muted-foreground">
              Students spend the program actively creating, exploring, and
              solving problems.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              Participants take part in workshops, guided labs, outdoor
              activities, creative challenges, team tasks, and project sharing.
              They code, design, build, test, present, reflect, and collaborate.
            </p>
          </div>
        </div>
      </section>

      <section
        id="program-experience"
        className="page-wrap px-4 py-10 sm:px-6"
        aria-labelledby="experience-title"
      >
        <div className="mb-10 max-w-3xl">
          <p className="island-kicker">What Students Will Experience</p>
          <h2
            id="experience-title"
            className="display-title mt-3 text-4xl font-bold text-foreground sm:text-5xl"
          >
            Eight connected learning tracks.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Each track includes short lessons, group tasks, and activities that
            help students practise the topic in a concrete way.
          </p>
        </div>

        <div className="grid gap-6">
          {experiences.map(
            (
              { activities, description, Icon, imageLabel, imageSrc, title },
              index,
            ) => (
              <article
                key={title}
                className={[
                  'grid overflow-hidden rounded-md border shadow-[0_18px_34px_rgba(23,58,64,0.08)] lg:grid-cols-2',
                  index % 3 === 1
                    ? 'bg-shadow-grey text-brand-white'
                    : 'feature-card',
                ].join(' ')}
              >
                <div
                  className={['p-4', index % 2 === 1 ? 'lg:order-2' : ''].join(
                    ' ',
                  )}
                >
                  <img
                    src={imageSrc}
                    alt={imageLabel}
                    width={960}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="h-full min-h-72 w-full rounded-md object-cover"
                  />
                </div>
                <div className="p-5 sm:p-7">
                  <div className="flex items-start gap-4">
                    <span
                      className={[
                        'inline-flex size-12 shrink-0 items-center justify-center rounded-md',
                        index % 3 === 1
                          ? 'bg-school-bus-yellow text-shadow-grey'
                          : 'bg-primary text-primary-foreground',
                      ].join(' ')}
                    >
                      <Icon aria-hidden="true" className="size-6" />
                    </span>
                    <div className="min-w-0">
                      <p
                        className={[
                          'text-xs font-extrabold uppercase tracking-[0.12em]',
                          index % 3 === 1
                            ? 'text-school-bus-yellow'
                            : 'text-primary',
                        ].join(' ')}
                      >
                        Track {index + 1}
                      </p>
                      <h3
                        className={[
                          'mt-1 text-xl font-extrabold',
                          index % 3 === 1
                            ? 'text-brand-white'
                            : 'text-foreground',
                        ].join(' ')}
                      >
                        {title}
                      </h3>
                      <p
                        className={[
                          'mt-2 leading-7',
                          index % 3 === 1
                            ? 'text-brand-white/76'
                            : 'text-muted-foreground',
                        ].join(' ')}
                      >
                        {description}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {activities.map((activity) => (
                      <li
                        key={activity}
                        className={[
                          'flex min-w-0 items-start gap-2 rounded-md border p-3 text-sm font-semibold',
                          index % 3 === 1
                            ? 'border-brand-white/12 bg-brand-white/8 text-brand-white'
                            : 'border-border bg-background/60 text-foreground',
                        ].join(' ')}
                      >
                        <span
                          aria-hidden="true"
                          className={[
                            'mt-2 size-1.5 shrink-0 rounded-full',
                            index % 3 === 1
                              ? 'bg-school-bus-yellow'
                              : 'bg-primary',
                          ].join(' ')}
                        />
                        <span className="min-w-0 wrap-break-word">
                          {activity}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ),
          )}
        </div>
      </section>

      <section
        className="bg-shadow-grey py-16 text-brand-white"
        aria-labelledby="outcomes-title"
      >
        <div className="page-wrap grid gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-school-bus-yellow">
              Program Outcomes
            </p>
            <h2
              id="outcomes-title"
              className="display-title mt-3 text-4xl font-bold sm:text-5xl"
            >
              What students may create.
            </h2>
            <p className="mt-5 leading-8 text-brand-white/76">
              Depending on the activities completed, students may leave with
              draft projects, journals, prototypes, presentations, or campaign
              materials.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {outcomes.map((outcome, index) => (
              <article
                key={outcome}
                className={[
                  'flex min-w-0 items-start gap-3 rounded-md border p-4',
                  index % 2 === 0
                    ? 'border-brand-white/14 bg-brand-white/8'
                    : 'border-school-bus-yellow/28 bg-school-bus-yellow text-shadow-grey',
                ].join(' ')}
              >
                <Compass
                  aria-hidden="true"
                  className={[
                    'mt-1 size-5 shrink-0',
                    index % 2 === 0
                      ? 'text-school-bus-yellow'
                      : 'text-shadow-grey',
                  ].join(' ')}
                />
                <p className="min-w-0 font-semibold leading-7">{outcome}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="page-wrap px-4 py-16 sm:px-6"
        aria-labelledby="join-title"
      >
        <div className="relative overflow-hidden rounded-md border border-brand-white/15 bg-shadow-grey p-6 text-brand-white shadow-[0_18px_34px_rgba(0,0,0,0.18)] sm:p-8 lg:p-10">
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-70"
            style={{
              background:
                'linear-gradient(135deg, transparent, color-mix(in oklab, var(--school-bus-yellow) 16%, transparent))',
            }}
          />
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-school-bus-yellow">
                Registration
              </p>
              <h2
                id="join-title"
                className="display-title mt-3 text-4xl font-bold sm:text-5xl"
              >
                Ready to register?
              </h2>
              <div className="mt-7">
                <RegisterButton />
              </div>
            </div>
            <div className="relative">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  'Ages 11-17',
                  'Free registration',
                  'Hands-on workshops',
                  'Project sharing',
                  'Registration requires a Questura account.',
                ].map((line) => (
                  <p
                    key={line}
                    className="rounded-md border border-brand-white/14 bg-brand-white/8 p-4 font-bold leading-7 text-brand-white shadow-[0_10px_18px_rgba(0,0,0,0.12)]"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

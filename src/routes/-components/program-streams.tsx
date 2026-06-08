import { useRef, useState } from 'react'
import { Bot, FlaskConical, Handshake, Telescope } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Program = {
  title: string
  time: string
  description: string
  icon: LucideIcon
  iconGradient: string
  glowColor: string
}

const programs: Program[] = [
  {
    title: 'After-School Enrichment',
    time: 'Fall - Winter',
    description:
      'A hub for robotics, coding, and creative arts, blending homework support with digital literacy labs to foster the next wave of tech pioneers.',
    icon: Bot,
    iconGradient:
      'linear-gradient(145deg, color-mix(in oklab, var(--primary) 82%, var(--white)), color-mix(in oklab, var(--primary) 45%, var(--secondary)))',
    glowColor: 'color-mix(in oklab, var(--primary) 20%, transparent)',
  },
  {
    title: 'Weekend Learning Labs',
    time: 'Weekends',
    description:
      'Immersive project-based STEM challenges and science discovery workshops designed to fast-track critical thinking and problem-solving skills.',
    icon: FlaskConical,
    iconGradient:
      'linear-gradient(145deg, color-mix(in oklab, var(--accent) 82%, var(--white)), color-mix(in oklab, var(--secondary) 68%, var(--accent)))',
    glowColor: 'color-mix(in oklab, var(--accent) 22%, transparent)',
  },
  {
    title: 'Summer Learning Camps',
    time: 'Summer',
    description:
      'Immersive exploration of space, environmental science, and AI entrepreneurship. Where play meets profound discovery.',
    icon: Telescope,
    iconGradient:
      'linear-gradient(145deg, color-mix(in oklab, var(--secondary) 82%, var(--white)), color-mix(in oklab, var(--accent) 52%, var(--secondary)))',
    glowColor: 'color-mix(in oklab, var(--secondary) 24%, transparent)',
  },
  {
    title: 'Parent & Community',
    time: 'Year-Round',
    description:
      'Empowering families through child development seminars, digital safety workshops, and collaborative community showcase events.',
    icon: Handshake,
    iconGradient:
      'linear-gradient(145deg, color-mix(in oklab, var(--primary) 62%, var(--secondary)), color-mix(in oklab, var(--primary) 78%, var(--white)))',
    glowColor: 'color-mix(in oklab, var(--primary) 18%, transparent)',
  },
]

type SpotlightCardProps = {
  program: Program
  index: number
}

function SpotlightCard({ program, index }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [spotlightVisible, setSpotlightVisible] = useState(false)
  const [spotlight, setSpotlight] = useState({ x: '50%', y: '50%' })

  const updateSpotlight = (clientX: number, clientY: number) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setSpotlight({
      x: `${clientX - rect.left}px`,
      y: `${clientY - rect.top}px`,
    })
  }

  return (
    <article
      ref={ref}
      className="feature-card rise-in group relative overflow-hidden rounded-2xl border px-8 py-10"
      style={{ animationDelay: `${140 + index * 90}ms` }}
      onPointerMove={(event) => updateSpotlight(event.clientX, event.clientY)}
      onPointerEnter={() => setSpotlightVisible(true)}
      onPointerLeave={() => setSpotlightVisible(false)}
      onFocus={() => setSpotlightVisible(true)}
      onBlur={() => setSpotlightVisible(false)}
      tabIndex={0}
      aria-label={`${program.title}. ${program.description}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: spotlightVisible ? 1 : 0,
          background: `radial-gradient(650px circle at ${spotlight.x} ${spotlight.y}, ${program.glowColor}, transparent 80%)`,
        }}
      />
      <div className="relative z-10 flex h-full flex-col">
        <div
          className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-300 group-hover:rotate-6"
          style={{ background: program.iconGradient }}
        >
          <program.icon className="h-7 w-7" aria-hidden />
        </div>

        <div className="mb-3 flex items-center justify-between gap-4">
          <h3 className="text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
            {program.title}
          </h3>
        </div>

        <p className="mb-6 leading-relaxed text-muted-foreground">
          {program.description}
        </p>

        <div
          className="mt-auto flex items-center border-t pt-6"
          style={{ borderColor: 'var(--line)' }}
        >
          <span
            className="rounded-md border px-3 py-1 text-sm font-medium text-muted-foreground"
            style={{
              background:
                'color-mix(in oklab, var(--surface-strong) 84%, transparent)',
              borderColor: 'var(--line)',
            }}
          >
            {program.time}
          </span>
        </div>
      </div>
    </article>
  )
}

export function ProgramStreams() {
  return (
    <section
      id="program-streams"
      className="relative py-16 sm:py-20"
      aria-labelledby="program-streams-title"
    >
      <div className="page-wrap">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <h2
            id="program-streams-title"
            className="display-title rise-in text-3xl font-bold tracking-tight text-primary sm:text-5xl"
          >
            Our Program Streams
          </h2>
          <p
            className="rise-in mt-6 text-lg text-muted-foreground sm:text-xl"
            style={{ animationDelay: '120ms' }}
          >
            Dynamic, accessible programming designed to inspire curiosity and
            creativity for students aged 6-17.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {programs.map((program, index) => (
            <SpotlightCard
              key={program.title}
              program={program}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

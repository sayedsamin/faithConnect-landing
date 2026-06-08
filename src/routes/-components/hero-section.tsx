import { useMemo, useRef } from 'react'
import { Link } from '@tanstack/react-router'

type MagneticButtonProps = {
  children: React.ReactNode
  to: string
  variant?: 'primary' | 'secondary'
}

function MagneticButton({
  children,
  to,
  variant = 'primary',
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | null>(null)

  const glowStyle = useMemo(
    () => ({
      primary: {
        background:
          'linear-gradient(135deg, var(--brand-gold) 0%, color-mix(in oklab, var(--brand-gold) 82%, var(--brand-navy)) 100%)',
        color: 'var(--brand-navy)',
        boxShadow:
          '0 10px 24px color-mix(in oklab, var(--accent) 38%, transparent), inset 0 1px 0 color-mix(in oklab, var(--white) 60%, transparent)',
      },
      secondary: {
        background:
          'color-mix(in oklab, var(--surface-strong) 74%, transparent)',
        color: 'var(--foreground)',
        borderColor: 'color-mix(in oklab, var(--line) 85%, transparent)',
        boxShadow:
          '0 10px 20px color-mix(in oklab, var(--shadow-grey) 12%, transparent), inset 0 1px 0 color-mix(in oklab, var(--white) 65%, transparent)',
      },
    }),
    [],
  )

  const onPointerMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (!ref.current) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (reduceMotion) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const dx = (event.clientX - centerX) * 0.2
    const dy = (event.clientY - centerY) * 0.2

    ref.current.style.transform = `translate(${dx}px, ${dy}px)`
  }

  const onPointerLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0px, 0px)'
  }

  return (
    <Link
      ref={ref}
      to={to}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="inline-flex min-h-11 items-center justify-center rounded-full border px-7 py-3 text-base font-extrabold tracking-wide no-underline transition-transform duration-200 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 motion-reduce:transform-none"
      style={glowStyle[variant]}
    >
      {children}
    </Link>
  )
}

export function HeroSection() {
  return (
    <section
      className="relative min-h-svh overflow-hidden px-4 pt-24 pb-10 sm:px-6 sm:pt-24 sm:pb-12 lg:px-10 lg:pt-26 lg:pb-10 [@media(max-height:760px)]:pt-20 [@media(max-height:760px)]:pb-6"
      aria-labelledby="hero-title"
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl motion-safe:animate-[questura-hero-float_18s_ease-in-out_infinite]"
          style={{
            background:
              'color-mix(in oklab, var(--secondary) 64%, transparent)',
            opacity: 0.65,
          }}
        />
        <div
          className="absolute top-1/4 -right-24 h-96 w-96 rounded-full blur-3xl motion-safe:animate-[questura-hero-float_24s_ease-in-out_infinite]"
          style={{
            background: 'color-mix(in oklab, var(--primary) 52%, transparent)',
            animationDelay: '200ms',
            opacity: 0.56,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 15% 20%, color-mix(in oklab, var(--white) 30%, transparent) 0%, transparent 42%), radial-gradient(circle at 80% 80%, color-mix(in oklab, var(--accent) 14%, transparent) 0%, transparent 45%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid min-h-[calc(100svh-8.5rem)] grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.78fr)] lg:gap-8 xl:gap-10 [@media(max-height:760px)]:min-h-[calc(100svh-6.5rem)] [@media(max-height:760px)]:gap-6">
          <div className="order-1 flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1
              id="hero-title"
              className="display-title max-w-5xl text-balance text-4xl leading-[1.06] font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl [@media(max-height:760px)]:lg:text-5xl [@media(max-height:760px)]:xl:text-6xl"
            >
              <span className="block text-foreground">
                Inspiring Young Minds to
              </span>
              <span
                className="mt-2 block bg-clip-text text-transparent motion-safe:animate-[questura-hero-shimmer_7s_linear_infinite] sm:mt-3 [@media(max-height:760px)]:mt-2"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, var(--brand-navy) 0%, color-mix(in oklab, var(--brand-gold) 78%, var(--brand-navy)) 36%, var(--brand-gold) 70%, var(--brand-navy) 100%)',
                  backgroundSize: '220% 100%',
                }}
              >
                Explore, Discover, &amp; Thrive
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg md:text-xl [@media(max-height:760px)]:mt-4 [@media(max-height:760px)]:max-w-2xl [@media(max-height:760px)]:lg:text-lg">
              Questura Academy is Canada&apos;s leading innovation-driven
              learning center, empowering the next generation through curiosity,
              creativity, and character. We bridge the gap between traditional
              education and future-ready skills.
            </p>

            <div className="mt-6 flex w-full flex-col items-center justify-center gap-3 sm:mt-7 sm:w-auto sm:flex-row sm:gap-5 lg:justify-start [@media(max-height:760px)]:mt-5">
              <MagneticButton to="/summer-program" variant="primary">
                Register Now
              </MagneticButton>
              <MagneticButton to="/contact" variant="secondary">
                Contact
              </MagneticButton>
            </div>
          </div>

          <Link
            to="/summer-program"
            aria-label="View Summer Program details"
            className="group order-2 block w-full max-w-[min(100%,16rem)] justify-self-center overflow-hidden rounded-lg border border-brand-gold/35 bg-brand-navy p-2 no-underline shadow-[0_24px_54px_rgba(1,30,60,0.22)] transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-brand-gold/60 hover:shadow-[0_28px_62px_rgba(1,30,60,0.28)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/55 sm:max-w-[19rem] lg:max-w-[34rem] lg:justify-self-end [@media(max-height:760px)]:lg:max-w-[22rem] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <img
              src="/images/poster-summer-2026.avif"
              alt="Questura Academy summer program poster"
              width={5950}
              height={7700}
              loading="eager"
              decoding="async"
              className="h-auto w-full rounded-md border border-brand-white/12 object-contain shadow-[0_1px_0_rgba(255,255,255,0.18)_inset]"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}

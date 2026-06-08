import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { User } from '@supabase/supabase-js'
import type { LucideIcon } from 'lucide-react'
import {
  AlertTriangle,
  CheckCircle2,
  CreditCard,
  Mail,
  Ticket,
  UserPlus,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { z } from 'zod'
import { getSupabaseBrowserClient } from '#/integrations/supabase/client'

const registrationPath = '/summer-program/register'
const guardianDashboardPath = '/dashboard/guardian'
const zeffyEmbedScriptId = 'zeffy-embed-script'
const registrationCompleteMessageSchema = z.object({
  type: z.literal('questura:summer-registration-complete'),
})

type GuardianIdentity = {
  name: string
  email: string
}

type RegistrationStep = {
  title: string
  description: string
  emphasis?: string
}

type RegistrationNotice = {
  title: string
  description: string
  emphasis?: string
  Icon: LucideIcon
  isOptionalNotice?: boolean
}

export const Route = createFileRoute('/summer-program_/register')({
  component: SummerProgramRegistrationPage,
  head: () => ({
    meta: [{ title: 'Summer Program Registration | Questura Academy' }],
  }),
})

type ZeffyRegistrationEmbedProps = {
  className?: string
}

function ZeffyRegistrationEmbed({
  className = 'mt-6',
}: ZeffyRegistrationEmbedProps) {
  useEffect(() => {
    if (document.getElementById(zeffyEmbedScriptId)) {
      return
    }

    const script = document.createElement('script')
    script.id = zeffyEmbedScriptId
    script.src = 'https://www.zeffy.com/embed/v2/zeffy-embed.js'
    script.async = true
    script.onerror = () => {
      document
        .querySelectorAll<HTMLElement>('[data-zeffy-embed-fallback]')
        .forEach((element) => {
          element.style.display = 'block'
        })
    }
    document.body.appendChild(script)
  }, [])

  return (
    <div
      className={`${className} overflow-hidden rounded-md border border-border bg-background`}
    >
      <div
        data-zeffy-embed
        data-form-url="/embed/ticketing/summer-learning-and-leadership-camp"
      />
      <div data-zeffy-embed-fallback style={{ display: 'none' }}>
        <div className="relative h-112.5 w-full overflow-hidden pt-112.5">
          <iframe
            title="Donation form powered by Zeffy"
            className="absolute inset-0 h-full w-full border-0"
            src="https://www.zeffy.com/embed/ticketing/summer-learning-and-leadership-camp"
            allow="payment"
            allowTransparency
          />
        </div>
      </div>
    </div>
  )
}

function SummerProgramRegistrationPage() {
  const navigate = useNavigate()
  const [status, setStatus] = useState<'checking' | 'ready' | 'error'>(
    'checking',
  )
  const [guardianIdentity, setGuardianIdentity] =
    useState<GuardianIdentity | null>(null)
  const [isGuidanceOpen, setIsGuidanceOpen] = useState(false)
  const closeGuidanceButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    let isMounted = true

    async function verifySession() {
      try {
        const supabase = getSupabaseBrowserClient()
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!isMounted) {
          return
        }

        if (!session?.user.id) {
          await navigate({
            to: '/signin',
            search: { redirect: registrationPath },
            replace: true,
          })
          return
        }

        setGuardianIdentity(getGuardianIdentity(session.user))
        setStatus('ready')
      } catch {
        if (isMounted) {
          setStatus('error')
        }
      }
    }

    void verifySession()

    return () => {
      isMounted = false
    }
  }, [navigate])

  useEffect(() => {
    if (status !== 'ready') {
      return
    }

    const timer = window.setTimeout(() => {
      setIsGuidanceOpen(true)
    }, 1800)

    return () => window.clearTimeout(timer)
  }, [status])

  useEffect(() => {
    if (!isGuidanceOpen) {
      return
    }

    closeGuidanceButtonRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsGuidanceOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isGuidanceOpen])

  useEffect(() => {
    function handleRegistrationCompleteMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) {
        return
      }

      const parsed = registrationCompleteMessageSchema.safeParse(event.data)

      if (!parsed.success) {
        return
      }

      void navigate({ to: guardianDashboardPath, replace: true })
    }

    window.addEventListener('message', handleRegistrationCompleteMessage)
    return () =>
      window.removeEventListener('message', handleRegistrationCompleteMessage)
  }, [navigate])

  if (status === 'checking') {
    return (
      <section className="page-wrap flex min-h-[calc(100vh-6rem)] items-center px-4 py-28 sm:px-6">
        <p
          role="status"
          className="rounded-md border border-border bg-muted px-4 py-3 text-sm font-semibold text-foreground"
        >
          Checking your session…
        </p>
      </section>
    )
  }

  if (status === 'error') {
    return (
      <section className="page-wrap flex min-h-[calc(100vh-6rem)] items-center px-4 py-28 sm:px-6">
        <p
          role="alert"
          className="rounded-md border border-destructive bg-background px-4 py-3 text-sm font-semibold text-destructive"
        >
          Unable to load registration right now. Please sign in and try again.
        </p>
      </section>
    )
  }

  const registrationSteps: RegistrationStep[] = [
    {
      title: 'Choose participants',
      description: 'Click Add for each participant you are registering.',
    },
    {
      title: 'Enter participant details',
      description: "Enter each participant's basic info.",
    },
    {
      title: 'Continue',
      description: 'Review the participant details carefully, then continue.',
    },
    {
      title: 'Match your email',
      description:
        'Use the same email address as your signed-in Questura account.',
      emphasis: guardianIdentity?.email ?? 'your Questura account email',
    },
    {
      title: 'Set optional Zeffy donation',
      description:
        'Zeffy is the platform we use for registration. It may ask for an optional contribution to Zeffy. If you do not want to contribute, open the contribution dropdown, choose Other, then enter 0.',
    },
    {
      title: 'Complete registration',
      description:
        'Confirm the participant details and optional Zeffy contribution, then click Buy Tickets.',
    },
  ]

  const registrationNotices: RegistrationNotice[] = [
    {
      title: 'Use this exact email',
      description:
        'Enter this same email in the registration form so we can match it to your Questura account.',
      emphasis: guardianIdentity?.email ?? '',
      Icon: Mail,
    },
    {
      title: 'Zeffy contribution is totally optional',
      description:
        'Zeffy is the platform we use for registration. Its form may ask for a contribution to help cover platform costs. This is optional, and Questura does not receive it.',
      Icon: AlertTriangle,
      isOptionalNotice: true,
    },
    {
      title: 'Camp cost',
      description: 'Registration is free for each participant.',
      Icon: Ticket,
    },
  ]

  return (
    <section className="page-wrap px-4 pt-32 pb-16 sm:px-6">
      {isGuidanceOpen ? (
        <div
          className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-shadow-grey/62 px-4 py-6 backdrop-blur-sm"
          role="presentation"
          onClick={() => setIsGuidanceOpen(false)}
        >
          <div className="flex min-h-full items-start justify-center sm:items-center">
            <div
              aria-labelledby="registration-guidance-title"
              aria-modal="true"
              className="w-full max-w-xl overflow-hidden rounded-md border border-brand-white/18 bg-background text-foreground shadow-[0_28px_80px_rgba(0,0,0,0.32)]"
              role="dialog"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="bg-shadow-grey p-5 text-brand-white sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-school-bus-yellow">
                      Before you continue
                    </p>
                    <h2
                      id="registration-guidance-title"
                      className="mt-2 text-2xl font-extrabold leading-tight text-brand-white"
                    >
                      Three quick checks for a smooth registration
                    </h2>
                  </div>
                  <button
                    ref={closeGuidanceButtonRef}
                    type="button"
                    className="inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-brand-white/18 bg-brand-white/10 text-brand-white transition-[background-color,border-color] hover:border-school-bus-yellow/60 hover:bg-brand-white/16 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-school-bus-yellow/35"
                    aria-label="Close registration guidance"
                    onClick={() => setIsGuidanceOpen(false)}
                  >
                    <X aria-hidden="true" className="size-5" />
                  </button>
                </div>
              </div>

              <div className="grid gap-3 p-5 sm:p-6">
                {registrationNotices.map(
                  ({
                    description,
                    emphasis,
                    Icon,
                    isOptionalNotice,
                    title,
                  }) => (
                    <article
                      key={title}
                      className="grid grid-cols-[2.75rem_1fr] gap-3 rounded-md border border-border bg-muted/64 p-4"
                    >
                      <span className="inline-flex size-11 items-center justify-center rounded-md bg-school-bus-yellow text-shadow-grey">
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-sm font-extrabold text-foreground">
                          {title}
                        </h3>
                        {isOptionalNotice ? (
                          <div className="mt-2 space-y-3">
                            <p className="inline-flex min-h-8 items-center rounded-md border border-school-bus-yellow/45 bg-school-bus-yellow px-3 text-xs font-black uppercase tracking-[0.12em] text-shadow-grey shadow-[0_8px_16px_rgba(0,0,0,0.12)]">
                              If you prefer not to contribute
                            </p>
                            <ol className="grid gap-2 text-sm font-semibold leading-6 text-foreground">
                              <li>1. Click the contribution dropdown.</li>
                              <li>2. Select Other.</li>
                              <li>3. Enter 0 under contribution.</li>
                            </ol>
                          </div>
                        ) : null}
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {description}
                        </p>
                        {emphasis ? (
                          <p className="mt-2 wrap-break-word rounded-md border border-school-bus-yellow/24 bg-school-bus-yellow/14 px-3 py-2 text-sm font-extrabold text-foreground">
                            {emphasis}
                          </p>
                        ) : null}
                      </div>
                    </article>
                  ),
                )}

                <button
                  type="button"
                  className="mt-1 inline-flex min-h-12 items-center justify-center rounded-md bg-shadow-grey px-5 text-sm font-extrabold text-brand-white shadow-[0_10px_18px_rgba(0,0,0,0.14)] transition-[background-color,color,transform] hover:-translate-y-0.5 hover:bg-school-bus-yellow hover:text-shadow-grey focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  onClick={() => setIsGuidanceOpen(false)}
                >
                  Continue registration
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div className="rounded-md border border-brand-white/15 bg-shadow-grey p-6 text-brand-white shadow-[0_18px_34px_rgba(0,0,0,0.18)] sm:p-8 lg:sticky lg:top-28">
          <div className="border-b border-brand-white/14 pb-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-school-bus-yellow">
              Summer Program Registration
            </p>
            <h1 className="display-title mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              Complete your camp registration
            </h1>
            <p className="mt-4 text-base leading-7 text-brand-white/76">
              Use this checklist as you complete the form so your registration
              is matched correctly and the final amount is clear.
            </p>
          </div>

          <ol className="mt-6 space-y-4">
            {registrationSteps.map((step, index) => (
              <li
                key={step.title}
                className="grid grid-cols-[2.75rem_1fr] gap-3 rounded-md border border-brand-white/12 bg-brand-white/6 p-4"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="inline-flex size-11 items-center justify-center rounded-md bg-school-bus-yellow text-base font-extrabold tabular-nums text-shadow-grey shadow-[0_10px_18px_rgba(0,0,0,0.2)]">
                    {index + 1}
                  </span>
                </div>

                <div className="min-w-0">
                  <h2 className="text-base font-extrabold text-brand-white">
                    {step.title}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-brand-white/76">
                    {step.description}
                  </p>
                  {step.emphasis ? (
                    <p className="mt-2 wrap-break-word rounded-md border border-school-bus-yellow/24 bg-school-bus-yellow/12 px-3 py-2 text-sm font-extrabold text-school-bus-yellow">
                      {step.emphasis}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6 rounded-md border border-school-bus-yellow/36 bg-school-bus-yellow p-4 text-shadow-grey shadow-[0_12px_24px_rgba(0,0,0,0.16)]">
            <div className="flex items-start gap-3">
              <CheckCircle2
                aria-hidden="true"
                className="mt-1 size-5 shrink-0"
              />
              <div className="min-w-0">
                <h2 className="text-base font-extrabold">
                  Before clicking Buy Tickets
                </h2>
                <p className="mt-1 text-sm font-semibold leading-6">
                  Confirm the camper count, your account email, and any optional
                  Zeffy contribution before completing registration.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="feature-card rounded-md border p-6 shadow-[0_18px_34px_rgba(23,58,64,0.08)] sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="min-w-0 rounded-md border border-border bg-background/64 p-4">
              <UserPlus aria-hidden="true" className="size-5 text-primary" />
              <p className="mt-3 wrap-break-word text-sm font-extrabold text-foreground">
                {guardianIdentity?.name ?? 'Guardian'}
              </p>
              <p className="mt-1 wrap-break-word text-sm text-muted-foreground">
                {guardianIdentity?.email ?? ''}
              </p>
            </article>

            <article className="rounded-md border border-border bg-background/64 p-4">
              <CreditCard aria-hidden="true" className="size-5 text-primary" />
              <p className="mt-3 text-sm font-extrabold text-foreground">
                Free registration
              </p>
            </article>
          </div>

          <div className="-mx-6 mt-6 border-y border-border bg-muted/70 sm:mx-0 sm:rounded-md sm:border">
            <ZeffyRegistrationEmbed className="" />
          </div>
        </div>
      </div>
    </section>
  )
}

function getGuardianIdentity(user: User): GuardianIdentity {
  const metadata = user.user_metadata as Record<string, unknown>
  const name =
    getStringMetadataValue(metadata, 'guardian_name') ??
    getStringMetadataValue(metadata, 'full_name') ??
    getStringMetadataValue(metadata, 'name') ??
    user.email?.split('@')[0] ??
    'Guardian'

  return {
    name,
    email: user.email ?? '',
  }
}

function getStringMetadataValue(
  metadata: Record<string, unknown>,
  key: string,
) {
  const value = metadata[key]

  return typeof value === 'string' && value.trim() ? value.trim() : null
}

import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { User } from '@supabase/supabase-js'
import { CheckCircle2, ClipboardList, UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SummerProgramRegistrationForm } from '#/routes/-components/summer-program-registration-form'
import { getSupabaseBrowserClient } from '#/integrations/supabase/client'

const registrationPath = '/summer-program/register'

type GuardianIdentity = {
  name: string
  email: string
}

type RegistrationStep = {
  title: string
  description: string
}

export const Route = createFileRoute('/summer-program_/register')({
  component: SummerProgramRegistrationPage,
  head: () => ({
    meta: [{ title: 'Summer Program Registration | Questura Academy' }],
  }),
})

function SummerProgramRegistrationPage() {
  const navigate = useNavigate()
  const [status, setStatus] = useState<'checking' | 'ready' | 'error'>(
    'checking',
  )
  const [guardianIdentity, setGuardianIdentity] =
    useState<GuardianIdentity | null>(null)

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

  if (status === 'checking') {
    return (
      <section className="page-wrap flex min-h-[calc(100vh-6rem)] items-center px-4 py-28 sm:px-6">
        <p
          role="status"
          className="rounded-md border border-border bg-muted px-4 py-3 text-sm font-semibold text-foreground"
        >
          Checking your session...
        </p>
      </section>
    )
  }

  if (status === 'error' || !guardianIdentity) {
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
      title: 'Guardian details',
      description:
        'Confirm your name, email, phone, emergency contact, and pickup list.',
    },
    {
      title: 'Participant details',
      description:
        'Add each youth ages 11-17 who will attend the summer program.',
    },
    {
      title: 'Submit free registration',
      description:
        'Review the details, confirm consent, and submit the form. No payment is required.',
    },
  ]

  return (
    <section className="page-wrap px-4 pt-32 pb-16 sm:px-6">
      <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <aside className="rounded-md border border-brand-white/15 bg-shadow-grey p-6 text-brand-white shadow-[0_18px_34px_rgba(0,0,0,0.18)] sm:p-8 lg:sticky lg:top-28">
          <div className="border-b border-brand-white/14 pb-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-school-bus-yellow">
              Summer Program Registration
            </p>
            <h1 className="display-title mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              Register for free
            </h1>
            <p className="mt-4 text-base leading-7 text-brand-white/76">
              Complete the form below for the Summer Learning & Leadership Camp
              2026. Questura will review the registration and follow up by email
              or phone.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <article className="min-w-0 rounded-md border border-brand-white/12 bg-brand-white/6 p-4">
              <UserPlus
                aria-hidden="true"
                className="size-5 text-school-bus-yellow"
              />
              <p className="mt-3 wrap-break-word text-sm font-extrabold text-brand-white">
                {guardianIdentity.name}
              </p>
              <p className="mt-1 wrap-break-word text-sm text-brand-white/72">
                {guardianIdentity.email}
              </p>
            </article>

            <article className="rounded-md border border-school-bus-yellow/36 bg-school-bus-yellow p-4 text-shadow-grey">
              <CheckCircle2 aria-hidden="true" className="size-5" />
              <p className="mt-3 text-sm font-extrabold">Free registration</p>
              <p className="mt-1 text-sm font-semibold leading-6">
                No camp fee or payment step is required.
              </p>
            </article>
          </div>

          <ol className="mt-6 space-y-4">
            {registrationSteps.map((step, index) => (
              <li
                key={step.title}
                className="grid grid-cols-[2.75rem_1fr] gap-3 rounded-md border border-brand-white/12 bg-brand-white/6 p-4"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-md bg-school-bus-yellow text-base font-extrabold tabular-nums text-shadow-grey shadow-[0_10px_18px_rgba(0,0,0,0.2)]">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <h2 className="text-base font-extrabold text-brand-white">
                    {step.title}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-brand-white/76">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </aside>

        <div className="feature-card rounded-md border p-6 shadow-[0_18px_34px_rgba(23,58,64,0.08)] sm:p-8">
          <div className="mb-6 flex items-start gap-3">
            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <ClipboardList aria-hidden="true" className="size-6" />
            </span>
            <div className="min-w-0">
              <p className="island-kicker">Registration Form</p>
              <h2 className="display-title mt-2 text-3xl font-bold text-foreground">
                Participant information
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Fields marked by validation are required before submission.
              </p>
            </div>
          </div>

          <SummerProgramRegistrationForm guardianIdentity={guardianIdentity} />
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

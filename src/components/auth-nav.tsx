import { Link, useNavigate } from '@tanstack/react-router'
import type { AuthChangeEvent, Session } from '@supabase/supabase-js'
import { LogOut, UserRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getSupabaseBrowserClient } from '#/integrations/supabase/client'
import { getCurrentUserProfileRpc } from '#/lib/auth/profile-api'
import { getDashboardPathForRole } from '#/lib/auth/rbac'
import type { DashboardPath } from '#/lib/auth/rbac'

export function AuthNav() {
  const navigate = useNavigate()
  const [dashboardPath, setDashboardPath] = useState<DashboardPath | null>(null)
  const [email, setEmail] = useState('')
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    let isMounted = true

    setIsHydrated(true)

    try {
      const supabase = getSupabaseBrowserClient()

      async function syncSession(session: Session | null) {
        if (!isMounted) {
          return
        }

        setEmail(session?.user.email ?? '')
        setDashboardPath(null)

        if (!session?.user.id) {
          return
        }

        const profile = await getCurrentUserProfileRpc()
        setDashboardPath(profile ? getDashboardPathForRole(profile.role) : null)
      }

      void supabase.auth
        .getSession()
        .then(({ data }: { data: { session: Session | null } }) => {
          void syncSession(data.session)
        })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(
        (_event: AuthChangeEvent, session: Session | null) => {
          void syncSession(session)
        },
      )

      return () => {
        isMounted = false
        subscription.unsubscribe()
      }
    } catch {
      return () => {
        isMounted = false
      }
    }
  }, [])

  async function handleSignOut() {
    const supabase = getSupabaseBrowserClient()
    await supabase.auth.signOut()
    setDashboardPath(null)
    setEmail('')
    await navigate({ to: '/signin' })
  }

  if (!isHydrated || !email) {
    return (
      <Link
        to="/signin"
        className="order-2 inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-brand-gold px-6 text-sm font-extrabold text-brand-navy! no-underline shadow-[0_10px_18px_rgba(0,0,0,0.2)] transition-colors hover:bg-white hover:text-brand-navy! focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/25 sm:order-3"
      >
        Sign In
      </Link>
    )
  }

  return (
    <div className="order-2 flex min-w-0 shrink-0 items-center gap-2 sm:order-3">
      {dashboardPath ? (
        <Link
          to={dashboardPath}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 text-sm font-extrabold text-brand-white! no-underline transition-colors hover:bg-white/16 hover:text-brand-white! focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/25"
        >
          <UserRound aria-hidden="true" className="size-4 shrink-0" />
          Dashboard
        </Link>
      ) : null}
      <button
        type="button"
        onClick={handleSignOut}
        className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-brand-gold px-4 text-sm font-extrabold text-brand-navy shadow-[0_10px_18px_rgba(0,0,0,0.2)] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/25"
      >
        <LogOut aria-hidden="true" className="size-4" />
        Sign Out
      </button>
    </div>
  )
}

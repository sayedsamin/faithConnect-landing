import { Link } from '@tanstack/react-router'
import type { LinkProps } from '@tanstack/react-router'
import type { ReactNode } from 'react'

interface AuthLayoutProps {
  eyebrow: string
  title: string
  description: ReactNode
  children: ReactNode
  footer: ReactNode
}

export function AuthLayout({
  eyebrow,
  title,
  description,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <section className="page-wrap flex min-h-screen items-center justify-center px-4 pt-32 pb-14 sm:px-6">
      <div className="grid w-full max-w-5xl items-stretch gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="island-shell flex min-h-112 flex-col justify-between rounded-lg p-7 sm:p-9">
          <div>
            <p className="island-kicker">{eyebrow}</p>
            <h1 className="display-title mt-4 max-w-xl text-4xl leading-tight font-bold text-foreground sm:text-5xl">
              {title}
            </h1>
            <div className="mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
              {description}
            </div>
          </div>

          <div className="mt-10 rounded-lg border border-border bg-background/70 p-5">
            <p className="text-sm font-bold text-foreground">
              Your account stays connected to your family.
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Keep registration details, program messages, and important updates
              easy to find.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card/90 p-5 shadow-[0_18px_38px_rgba(30,90,72,0.12)] sm:p-8">
          {children}
          <div className="mt-7 border-t border-border pt-5 text-center text-sm text-muted-foreground">
            {footer}
          </div>
        </div>
      </div>
    </section>
  )
}

export function AuthTextLink({
  children,
  ...props
}: LinkProps & {
  children: ReactNode
}) {
  return (
    <Link
      {...props}
      className="font-bold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
    >
      {children}
    </Link>
  )
}

import { useEffect, useRef } from 'react'

export function useContactMotion<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const root = ref.current

    if (!root) {
      return
    }

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>('[data-contact-reveal]'),
    )
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'))
      root.classList.add('contact-motion-ready')
      return
    }

    targets.forEach((target) => {
      const rect = target.getBoundingClientRect()

      if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
        target.classList.add('is-visible')
      }
    })

    root.classList.add('contact-motion-ready')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      {
        rootMargin: '0px 0px -16% 0px',
        threshold: 0.12,
      },
    )

    targets.forEach((target) => {
      if (!target.classList.contains('is-visible')) {
        observer.observe(target)
      }
    })

    return () => observer.disconnect()
  }, [])

  return ref
}

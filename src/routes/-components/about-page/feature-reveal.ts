import { useEffect, useRef, useState } from 'react'

export function useFeatureReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [visibleStep, setVisibleStep] = useState(0)

  useEffect(() => {
    const node = ref.current

    if (!node) {
      return
    }

    let hasStarted = false

    const reveal = () => {
      if (hasStarted) {
        return undefined
      }

      hasStarted = true

      const timers = [1, 2, 3, 4, 5].map((step, index) =>
        window.setTimeout(() => {
          setVisibleStep((currentStep) => Math.max(currentStep, step))
        }, index * 180),
      )

      return () => {
        timers.forEach((timer) => window.clearTimeout(timer))
      }
    }

    const rect = node.getBoundingClientRect()
    const isAlreadyInView =
      rect.top < window.innerHeight * 0.78 &&
      rect.bottom > window.innerHeight * 0.18

    if (isAlreadyInView || !('IntersectionObserver' in window)) {
      return reveal()
    }

    let cleanupReveal: (() => void) | undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cleanupReveal = reveal()
          observer.disconnect()
        }
      },
      {
        rootMargin: '0px 0px -22% 0px',
        threshold: 0.12,
      },
    )

    const handleScrollFallback = () => {
      const nextRect = node.getBoundingClientRect()
      const shouldReveal =
        nextRect.top < window.innerHeight * 0.78 &&
        nextRect.bottom > window.innerHeight * 0.18

      if (shouldReveal) {
        cleanupReveal = reveal()
        observer.disconnect()
        window.removeEventListener('scroll', handleScrollFallback)
        window.removeEventListener('resize', handleScrollFallback)
      }
    }

    observer.observe(node)
    window.addEventListener('scroll', handleScrollFallback, { passive: true })
    window.addEventListener('resize', handleScrollFallback)

    return () => {
      cleanupReveal?.()
      observer.disconnect()
      window.removeEventListener('scroll', handleScrollFallback)
      window.removeEventListener('resize', handleScrollFallback)
    }
  }, [])

  return { ref, visibleStep }
}

export function getFeatureRevealClass(step: number, visibleStep: number) {
  return visibleStep >= step
    ? 'feature-reveal-item is-visible'
    : 'feature-reveal-item'
}

export function getBenefitRevealClass(step: number, visibleStep: number) {
  return visibleStep >= step
    ? 'benefit-reveal-item is-visible'
    : 'benefit-reveal-item'
}

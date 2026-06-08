import { RateLimiterMemory } from 'rate-limiter-flexible'

const apiRateLimiter = new RateLimiterMemory({
  points: 120,
  duration: 60,
})

export async function enforceRateLimit(key: string) {
  try {
    await apiRateLimiter.consume(key)
    return { allowed: true, retryAfterSeconds: 0 }
  } catch (error) {
    const msBeforeNext =
      typeof error === 'object' && error && 'msBeforeNext' in error
        ? Number(error.msBeforeNext)
        : 1000

    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil(msBeforeNext / 1000)),
    }
  }
}

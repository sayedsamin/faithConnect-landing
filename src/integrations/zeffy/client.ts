import type { z } from 'zod'
import { envServer } from '#/lib/env.server'
import { zeffyErrorSchema } from './schemas'

const DEFAULT_ZEFFY_BASE_URL = 'https://api.zeffy.com'

export class ZeffyApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code?: string,
    readonly param?: string | null,
  ) {
    super(message)
    this.name = 'ZeffyApiError'
  }
}

export function getZeffyBaseUrl() {
  return envServer.ZEFFY_API_BASE_URL ?? DEFAULT_ZEFFY_BASE_URL
}

export function getZeffyApiKey() {
  if (!envServer.ZEFFY_API_KEY) {
    throw new Error('ZEFFY_API_KEY is not configured')
  }

  return envServer.ZEFFY_API_KEY
}

export function createZeffyHeaders(headers = new Headers()) {
  headers.set('accept', 'application/json')
  headers.set('authorization', `Bearer ${getZeffyApiKey()}`)

  return headers
}

export function buildZeffyUrl(
  path: string,
  query?: Record<string, string | number | boolean | null | undefined>,
) {
  const url = new URL(path, getZeffyBaseUrl())

  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value))
    }
  }

  return url
}

export async function parseZeffyResponse<T>(
  schema: z.ZodType<T>,
  response: Response,
) {
  const body = await readJsonResponse(response)

  if (!response.ok) {
    throw mapZeffyError(response, body)
  }

  return schema.parse(body)
}

export async function zeffyFetch<T>(
  path: string,
  schema: z.ZodType<T>,
  options: RequestInit & {
    query?: Record<string, string | number | boolean | null | undefined>
  } = {},
) {
  const { query, headers, ...init } = options
  const response = await fetch(buildZeffyUrl(path, query), {
    ...init,
    headers: createZeffyHeaders(new Headers(headers)),
  })

  return parseZeffyResponse(schema, response)
}

export function mapZeffyError(response: Response, body: unknown) {
  const parsed = zeffyErrorSchema.safeParse(body)

  if (parsed.success) {
    return new ZeffyApiError(
      parsed.data.error.message,
      response.status,
      parsed.data.error.code,
      parsed.data.error.param,
    )
  }

  return new ZeffyApiError(
    `Zeffy API request failed with status ${response.status}`,
    response.status,
  )
}

async function readJsonResponse(response: Response) {
  const text = await response.text()

  if (!text) {
    return null
  }

  try {
    return JSON.parse(text) as unknown
  } catch {
    return text
  }
}

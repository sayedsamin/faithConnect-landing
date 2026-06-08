import { logger } from '#/lib/logger'

export type ActorContext = Readonly<{
  id?: string
  role?: string
}>

export type RequestAuditContext = Readonly<{
  requestId: string
  path: string
  method: string
  actor?: ActorContext
  ip?: string
  userAgent?: string
  startedAt: number
}>

type NormalizedError = {
  name: string
  message: string
  code?: string
}

export type RequestLogOptions = {
  context: RequestAuditContext
  action: string
  status: number
  durationMs: number
  metadata?: Record<string, unknown>
  error?: unknown
}

export type BusinessEventOptions = {
  requestId: string
  action: string
  actor?: ActorContext
  outcome: 'success' | 'failure'
  resource?: {
    type: string
    id?: string
  }
  metadata?: Record<string, unknown>
  error?: unknown
  status?: number
}

export async function withRequestContext<T>(params: {
  request: Request
  path: string
  method: string
  actor?: ActorContext
  run: (context: RequestAuditContext) => Promise<T>
}): Promise<T> {
  const context = createRequestContext({
    request: params.request,
    path: params.path,
    method: params.method,
    actor: params.actor,
  })

  return params.run(context)
}

export function createRequestContext({
  request,
  path,
  method,
  actor,
}: {
  request?: Request
  path: string
  method: string
  actor?: ActorContext
}): RequestAuditContext {
  const requestId = resolveRequestId(request)

  return {
    requestId,
    path,
    method,
    actor,
    ip: getRequestIp(request),
    userAgent: request?.headers.get('user-agent') ?? undefined,
    startedAt: Date.now(),
  }
}

export function setRequestIdHeader(headers: Headers, requestId: string) {
  headers.set('x-request-id', requestId)
  headers.set('x-correlation-id', requestId)
}

export function logRequest({
  context,
  action,
  status,
  durationMs,
  metadata = {},
  error,
}: RequestLogOptions): void {
  const payload = {
    event: 'http.request',
    action,
    requestId: context.requestId,
    method: context.method,
    path: context.path,
    status,
    actor: context.actor,
    ip: context.ip,
    durationMs,
    metadata: sanitizeForLog(metadata),
  }

  if (status >= 400 || error) {
    logger.error(
      {
        ...payload,
        error: normalizeError(error),
      },
      action,
    )

    return
  }

  logger.info(payload, action)
}

export function logRequestError({
  context,
  action,
  status,
  durationMs,
  metadata = {},
  error,
}: RequestLogOptions): void {
  logRequest({
    context,
    action,
    status,
    durationMs,
    metadata,
    error,
  })
}

export function logBusinessEvent({
  requestId,
  action,
  actor,
  outcome,
  resource,
  metadata = {},
  error,
  status,
}: BusinessEventOptions): void {
  const payload = {
    event: 'business',
    action,
    requestId,
    actor,
    outcome,
    status: status ?? 200,
    resource,
    metadata: sanitizeForLog(metadata),
  }

  if (outcome === 'failure' || payload.status >= 400) {
    logger.error(
      {
        ...payload,
        error: normalizeError(error),
      },
      action,
    )
    return
  }

  logger.info(payload, action)
}

export function addRequestId(
  responseOrHeaders: Response | Headers,
  requestId: string,
): Response | Headers {
  const headers =
    responseOrHeaders instanceof Headers
      ? responseOrHeaders
      : responseOrHeaders.headers

  setRequestIdHeader(headers, requestId)
  return responseOrHeaders
}

export function getRequestIp(request?: Request) {
  if (!request) {
    return undefined
  }

  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    undefined
  )
}

export function normalizeError(error: unknown): NormalizedError | null {
  if (!(error instanceof Error)) {
    return null
  }

  return {
    name: error.name,
    message: error.message,
    code: (error as { code?: string }).code,
  }
}

function sanitizeForLog(
  value: unknown,
  depth = 0,
  seen = new WeakSet<object>(),
): unknown {
  if (depth > 8) {
    return '[MAX_DEPTH_EXCEEDED]'
  }

  if (value === null || value === undefined) {
    return value
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeForLog(item, depth + 1, seen))
  }

  if (value instanceof Date) {
    return value.toISOString()
  }

  if (value instanceof Error) {
    return normalizeError(value)
  }

  if (typeof value !== 'object') {
    return value
  }

  if (seen.has(value)) {
    return '[CIRCULAR]'
  }

  seen.add(value)

  const source = value as Record<string, unknown>
  const output: Record<string, unknown> = {}

  for (const [key, val] of Object.entries(source)) {
    if (isSensitiveKey(key)) {
      output[key] = '[REDACTED]'
      continue
    }

    output[key] = sanitizeForLog(val, depth + 1, seen)
  }

  return output
}

function isSensitiveKey(key: string): boolean {
  return /password|secret|token|api[_-]?key|authorization|cookie/i.test(key)
}

function resolveRequestId(request?: Request): string {
  const requestId =
    request?.headers.get('x-request-id') ??
    request?.headers.get('x-correlation-id') ??
    ''

  if (requestId) {
    return requestId
  }

  if (typeof globalThis.crypto !== 'undefined') {
    return globalThis.crypto.randomUUID()
  }

  return `req_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 12)}`
}

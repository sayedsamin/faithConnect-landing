import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { logger } from '#/lib/logger'
import {
  addRequestId,
  createRequestContext,
  logBusinessEvent,
  logRequest,
} from '#/lib/observability/logging'

describe('observability logging', () => {
  let infoSpy: ReturnType<typeof vi.spyOn>
  let errorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    infoSpy = vi.spyOn(logger, 'info')
    errorSpy = vi.spyOn(logger, 'error')
  })

  afterEach(() => {
    infoSpy.mockRestore()
    errorSpy.mockRestore()
  })

  test('creates request context from headers and metadata', () => {
    const request = new Request('https://questura.ca/api/health', {
      headers: {
        'x-request-id': 'req-123',
        'x-forwarded-for': '203.0.113.10, 10.0.0.1',
        'user-agent': 'unit-test-agent',
      },
    })

    const context = createRequestContext({
      request,
      path: '/api/health',
      method: 'GET',
    })

    expect(context.requestId).toBe('req-123')
    expect(context.ip).toBe('203.0.113.10')
    expect(context.userAgent).toBe('unit-test-agent')
  })

  test('sets request and correlation headers on a response', () => {
    const headers = new Headers()
    addRequestId(headers, 'req-999')

    expect(headers.get('x-request-id')).toBe('req-999')
    expect(headers.get('x-correlation-id')).toBe('req-999')
  })

  test('logs successful request events with redacted metadata', () => {
    const context = createRequestContext({
      path: '/api/health',
      method: 'GET',
    })

    logRequest({
      context,
      action: 'api.health.success',
      status: 200,
      durationMs: 30,
      metadata: {
        apiKey: 'should-be-redacted',
        actor: {
          token: 'should-be-redacted',
        },
      },
    })

    const payload = infoSpy.mock.calls[0][0] as {
      event?: string
      metadata?: Record<string, unknown>
    }

    expect(payload.event).toBe('http.request')
    expect(payload.metadata).toMatchObject({
      apiKey: '[REDACTED]',
      actor: {
        token: '[REDACTED]',
      },
    })
  })

  test('logs request failure events with normalized error details', () => {
    const context = createRequestContext({
      path: '/api/contact',
      method: 'POST',
    })

    const error = new Error('webhook payload invalid')

    logRequest({
      context,
      action: 'api.contact.invalid_payload',
      status: 400,
      durationMs: 15,
      metadata: {
        password: 'hidden',
      },
      error,
    })

    const payload = errorSpy.mock.calls[0][0] as {
      event?: string
      error?: { name?: string; message?: string }
      metadata?: Record<string, unknown>
    }

    expect(payload.event).toBe('http.request')
    expect(payload.error).toMatchObject({
      name: 'Error',
      message: 'webhook payload invalid',
    })
    expect(payload.metadata).toMatchObject({
      password: '[REDACTED]',
    })
  })

  test('logs business events for successful and failed mutations', () => {
    logBusinessEvent({
      requestId: 'req-business-1',
      action: 'team.create',
      actor: {
        id: 'admin-id',
        role: 'admin',
      },
      outcome: 'success',
      resource: {
        type: 'team',
        id: 'team-1',
      },
      status: 200,
      metadata: {
        api_key: 'should-not-log',
      },
    })

    const successPayload = infoSpy.mock.calls[0][0] as {
      action?: string
      actor?: { id: string; role: string }
      metadata?: Record<string, unknown>
    }

    expect(successPayload.action).toBe('team.create')
    expect(successPayload.actor).toEqual({
      id: 'admin-id',
      role: 'admin',
    })
    expect(successPayload.metadata).toMatchObject({
      api_key: '[REDACTED]',
    })

    const businessError = new Error('team title already exists')
    logBusinessEvent({
      requestId: 'req-business-2',
      action: 'team.create',
      actor: {
        id: 'admin-id',
        role: 'admin',
      },
      outcome: 'failure',
      resource: {
        type: 'team',
      },
      status: 409,
      metadata: {
        error_code: 'unique_constraint',
      },
      error: businessError,
    })

    const failurePayload = errorSpy.mock.calls[0][0] as {
      outcome?: string
      status?: number
      error?: { name?: string; message?: string }
    }

    expect(failurePayload.outcome).toBe('failure')
    expect(failurePayload.status).toBe(409)
    expect(failurePayload.error).toMatchObject({
      name: 'Error',
      message: 'team title already exists',
    })
  })
})

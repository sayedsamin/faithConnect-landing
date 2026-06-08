import { zeffyPaymentCompletedEventSchema } from './schemas'
import type { ZeffyPaymentCompletedEvent } from './schemas'

export async function parseZeffyWebhookPayload(request: Request) {
  const payload = (await request.json()) as unknown
  return validateZeffyPaymentCompletedEvent(payload)
}

export function validateZeffyPaymentCompletedEvent(
  payload: unknown,
): ZeffyPaymentCompletedEvent {
  return zeffyPaymentCompletedEventSchema.parse(payload)
}

export function acknowledgeZeffyWebhook() {
  return new Response(null, { status: 204 })
}

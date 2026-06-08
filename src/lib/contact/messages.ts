import { createTransport } from 'nodemailer'
import { z } from 'zod'
import type { ContactRequest } from '#/contracts/contact'
import type { Prisma } from '#/generated/prisma/client'
import { getPrismaClient } from '#/integrations/prisma/server'
import { envServer, hasContactSmtpConfig } from '#/lib/env.server'

export const contactMessageInsertSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  phone: z.string().min(1),
  topic: z.string().min(1),
  message: z.string().min(1),
  ip_address: z.string().min(1),
  user_agent: z.string().nullable(),
  browser: z.string().nullable(),
  device: z.string().nullable(),
  referer: z.string().nullable(),
  accept_language: z.string().nullable(),
  metadata: z.record(z.string(), z.unknown()),
  email_status: z.enum(['pending', 'sent', 'failed']),
})

type ContactMessageInsert = z.infer<typeof contactMessageInsertSchema>
type PrismaContactClient = Pick<
  ReturnType<typeof getPrismaClient>,
  'contactMessage'
>

export class ContactSmtpConfigError extends Error {
  constructor() {
    super('Contact SMTP is not configured')
  }
}

export function getRequestMetadata(request: Request) {
  const userAgent = request.headers.get('user-agent')
  const ipAddress = getClientIp(request)

  return {
    ip_address: ipAddress,
    user_agent: userAgent,
    browser: getBrowserName(userAgent),
    device: getDeviceName(userAgent),
    referer: request.headers.get('referer'),
    accept_language: request.headers.get('accept-language'),
    metadata: {
      forwarded_for: request.headers.get('x-forwarded-for'),
      forwarded_host: request.headers.get('x-forwarded-host'),
      forwarded_proto: request.headers.get('x-forwarded-proto'),
      real_ip: request.headers.get('x-real-ip'),
      submitted_at: new Date().toISOString(),
    },
  }
}

export function mapContactRequestToInsert(
  contact: ContactRequest,
  request: Request,
) {
  return contactMessageInsertSchema.parse({
    ...contact,
    ...getRequestMetadata(request),
    email_status: 'pending',
  })
}

export async function createContactMessage(
  prisma: PrismaContactClient,
  insert: ContactMessageInsert,
) {
  const message = await prisma.contactMessage.create({
    data: {
      name: insert.name,
      email: insert.email,
      phone: insert.phone,
      topic: insert.topic,
      message: insert.message,
      ipAddress: insert.ip_address,
      userAgent: insert.user_agent,
      browser: insert.browser,
      device: insert.device,
      referer: insert.referer,
      acceptLanguage: insert.accept_language,
      metadata: toPrismaJson(insert.metadata),
      emailStatus: insert.email_status,
    },
    select: { id: true },
  })

  return message.id
}

export async function markContactMessageEmailStatus(
  prisma: PrismaContactClient,
  id: string,
  status: 'sent' | 'failed',
  errorMessage: string | null,
) {
  await prisma.contactMessage.update({
    where: { id },
    data: {
      emailStatus: status,
      emailError: errorMessage,
      emailedAt: status === 'sent' ? new Date() : null,
    },
  })
}

export async function sendContactEmail(contact: ContactRequest) {
  if (!hasContactSmtpConfig()) {
    throw new ContactSmtpConfigError()
  }

  const transporter = createTransport({
    host: envServer.SMTP_HOST,
    port: envServer.SMTP_PORT,
    secure: envServer.SMTP_SECURE === 'true',
    auth: {
      user: envServer.SMTP_USER,
      pass: envServer.SMTP_PASS,
    },
  })

  const subject = `Questura contact: ${getTopicLabel(contact.topic)}`
  const text = [
    `Name: ${contact.name}`,
    `Email: ${contact.email}`,
    `Phone: ${contact.phone}`,
    `Topic: ${getTopicLabel(contact.topic)}`,
    '',
    contact.message,
  ].join('\n')

  await transporter.sendMail({
    from: envServer.CONTACT_FROM_EMAIL,
    to: envServer.CONTACT_TO_EMAIL,
    replyTo: contact.email,
    subject,
    text,
  })
}

export async function handleContactSubmission(
  contact: ContactRequest,
  request: Request,
) {
  const prisma = getPrismaClient()
  const insert = mapContactRequestToInsert(contact, request)
  const messageId = await createContactMessage(prisma, insert)

  try {
    await sendContactEmail(contact)
    await markContactMessageEmailStatus(prisma, messageId, 'sent', null)
  } catch (error) {
    await markContactMessageEmailStatus(
      prisma,
      messageId,
      'failed',
      getErrorMessage(error),
    )
    throw error
  }

  return { messageId }
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const firstForwardedIp = forwardedFor?.split(',')[0]?.trim()

  return (
    firstForwardedIp ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  )
}

function getBrowserName(userAgent: string | null) {
  if (!userAgent) {
    return null
  }

  if (/Edg\//i.test(userAgent)) {
    return 'Edge'
  }

  if (/Chrome\//i.test(userAgent) && !/Chromium\//i.test(userAgent)) {
    return 'Chrome'
  }

  if (/Safari\//i.test(userAgent) && !/Chrome\//i.test(userAgent)) {
    return 'Safari'
  }

  if (/Firefox\//i.test(userAgent)) {
    return 'Firefox'
  }

  return 'Unknown'
}

function getDeviceName(userAgent: string | null) {
  if (!userAgent) {
    return null
  }

  if (/iPad|Tablet/i.test(userAgent)) {
    return 'Tablet'
  }

  if (/Mobile|iPhone|Android/i.test(userAgent)) {
    return 'Mobile'
  }

  return 'Desktop'
}

function getTopicLabel(topic: ContactRequest['topic']) {
  const topicLabels: Record<ContactRequest['topic'], string> = {
    general: 'General inquiry',
    programs: 'Programs',
    'summer-program': 'Summer Camp 2026',
    partnerships: 'Partnerships',
  }

  return topicLabels[topic]
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Unknown error'
}

function toPrismaJson(value: unknown) {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue
}

const DEFAULT_SECURITY_HEADERS = {
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'x-xss-protection': '1; mode=block',
  'permissions-policy': 'camera=(), microphone=(), geolocation=()',
  'strict-transport-security': 'max-age=63072000; includeSubDomains; preload',
  'content-security-policy':
    "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; connect-src 'self' https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; frame-src https://www.googletagmanager.com; frame-ancestors 'none';",
}

export function applySecurityHeaders(headers = new Headers()) {
  for (const [key, value] of Object.entries(DEFAULT_SECURITY_HEADERS)) {
    headers.set(key, value)
  }

  return headers
}

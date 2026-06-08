import pino from 'pino'

const isDevelopment = import.meta.env.DEV

export const logger = pino({
  name: 'questura-v2',
  level: isDevelopment ? 'debug' : 'info',
  browser: {
    asObject: true,
  },
  redact: {
    paths: [
      '*.password',
      '*.token',
      '*.jwt',
      '*.access_token',
      '*.refresh_token',
      '*.api_key',
      '*.secret',
      '*.client_secret',
      '*.Authorization',
      '*.authorization',
      '*.cookie',
      '*.body.password',
      '*.body.token',
      '*.body.secret',
      '*.body.jwt',
      '*.body.authorization',
      'req.body',
      'req.headers.authorization',
      'req.headers.cookie',
      'req.headers.x-api-key',
      'error.headers.authorization',
      'error.stack',
    ],
    censor: '[REDACTED]',
  },
})

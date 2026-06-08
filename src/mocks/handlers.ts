import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/health', () => {
    return HttpResponse.json({
      ok: true,
      service: 'questura-v2',
      timestamp: new Date().toISOString(),
    })
  }),
]

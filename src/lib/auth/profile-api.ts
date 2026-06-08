import { createServerFn } from '@tanstack/react-start'
import { getCurrentUserProfile } from './server'

export const getCurrentUserProfileRpc = createServerFn({
  method: 'GET',
}).handler(async () => getCurrentUserProfile())

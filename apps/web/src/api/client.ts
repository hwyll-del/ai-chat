import type { AppType } from '@repo/api'
import { hc } from 'hono/client'
import { getWebServerEnv } from '../env.server'

export function createApiClient() {
  const env = getWebServerEnv()

  return hc<AppType>(env.API_BASE_URL)
}

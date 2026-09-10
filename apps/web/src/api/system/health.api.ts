import type { InferResponseType } from 'hono/client'
import { createApiClient } from '../client'

export type HealthApiResponse = InferResponseType<
  ReturnType<typeof createApiClient>['health']['$get']
>

export async function getHealth(): Promise<HealthApiResponse> {
  const client = createApiClient()
  const response = await client.health.$get()

  return response.json()
}

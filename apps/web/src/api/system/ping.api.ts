import {
  BizCode,
  type ApiResponse,
  type PingRequest,
  type PingResponse,
} from '@repo/contracts'
import type { InferResponseType } from 'hono/client'
import { createApiClient } from '../client'

export type PingApiResponse = InferResponseType<
  ReturnType<typeof createApiClient>['rpc']['system']['ping']['$post']
>

export async function postPing(payload: PingRequest): Promise<PingApiResponse> {
  const client = createApiClient()

  try {
    const response = await client.rpc.system.ping.$post({
      json: payload,
    })

    return await response.json()
  } catch (error) {
    return {
      ok: false,
      error: {
        code: BizCode.SYSTEM_UPSTREAM_TIMEOUT,
        message: error instanceof Error ? error.message : 'API request failed',
      },
      meta: {
        requestId: 'unavailable',
        timestamp: new Date().toISOString(),
      },
    } satisfies ApiResponse<PingResponse>
  }
}

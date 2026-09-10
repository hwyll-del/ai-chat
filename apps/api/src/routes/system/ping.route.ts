import { zValidator } from '@hono/zod-validator'
import {
  BizCode,
  PingRequestSchema,
  buildFailure,
  buildSuccess,
} from '@repo/contracts'
import { Hono } from 'hono'
import type { ZodError } from 'zod'
import { getApiEnv } from '../../env'
import { createMeta } from '../../lib/response'

type Bindings = {
  APP_ENV: 'development' | 'test' | 'production'
}

const pingRoute = new Hono<{ Bindings: Bindings }>().post(
  '/',
  zValidator('json', PingRequestSchema, (result, c) => {
    if (result.success) {
      return
    }

    return c.json(
      buildFailure(
        {
          code: BizCode.COMMON_INVALID_REQUEST,
          message: 'Invalid request payload',
          details: (result.error as ZodError).flatten(),
        },
        createMeta(),
      ),
      400,
    )
  }),
  (c) => {
    const payload = c.req.valid('json')
    const env = getApiEnv(c.env)

    return c.json(
      buildSuccess(
        {
          service: 'api',
          message: 'pong, ' + payload.name,
          env: env.APP_ENV,
        },
        createMeta(),
      ),
    )
  },
)

export default pingRoute

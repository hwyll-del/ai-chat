import { buildSuccess } from '@repo/contracts'
import { Hono } from 'hono'
import { getApiEnv } from '../../env'
import { createMeta } from '../../lib/response'

type Bindings = {
  APP_ENV: 'development' | 'test' | 'production'
}

const healthRoute = new Hono<{ Bindings: Bindings }>().get('/', (c) => {
  const env = getApiEnv(c.env)

  return c.json(
    buildSuccess(
      {
        service: 'api',
        env: env.APP_ENV,
      },
      createMeta(),
    ),
  )
})

export default healthRoute

import {
  BizCode,
  buildFailure,
} from '@repo/contracts'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { HTTPException } from 'hono/http-exception'
import { createMeta } from './lib/response'
import routes from './routes'

type AppErrorStatus = 400 | 401 | 403 | 404 | 409 | 422 | 500 | 504

type Bindings = {
  APP_ENV: 'development' | 'test' | 'production'
}

class AppError extends Error {
  constructor(
    readonly code: BizCode,
    message: string,
    readonly status: AppErrorStatus,
    readonly details?: unknown,
  ) {
    super(message)
  }
}

const app = new Hono<{ Bindings: Bindings }>()

app.use(
  '*',
  cors({
    origin: [
      'http://localhost:3005',
      'http://127.0.0.1:3005',
      'http://localhost:3006',
      'http://127.0.0.1:3006',
    ],
  }),
)

app.onError((error, c) => {
  const meta = createMeta()

  if (error instanceof AppError) {
    return c.json(
      buildFailure(
        { code: error.code, message: error.message, details: error.details },
        meta,
      ),
      error.status,
    )
  }

  if (error instanceof HTTPException) {
    return c.json(
      buildFailure(
        { code: BizCode.COMMON_INVALID_REQUEST, message: error.message },
        meta,
      ),
      error.status,
    )
  }

  console.error(error)

  return c.json(
    buildFailure(
      { code: BizCode.SYSTEM_INTERNAL_ERROR, message: 'Internal server error' },
      meta,
    ),
    500,
  )
})

app.notFound((c) => {
  return c.json(
    buildFailure(
      { code: BizCode.COMMON_NOT_FOUND, message: 'Not found' },
      createMeta(),
    ),
    404,
  )
})

app.route('/', routes)

export type AppType = typeof routes

export default app

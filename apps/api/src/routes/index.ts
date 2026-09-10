import { Hono } from 'hono'
import healthRoute from './system/health.route'
import pingRoute from './system/ping.route'

type Bindings = {
  APP_ENV: 'development' | 'test' | 'production'
}

const routes = new Hono<{ Bindings: Bindings }>()

const appRoutes = routes
  .route('/health', healthRoute)
  .route('/rpc/system/ping', pingRoute)

export type RoutesType = typeof appRoutes

export default appRoutes

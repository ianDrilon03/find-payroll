import { stackMiddlewares } from '@/middlewares/stackMiddlewares'
import { protectedRoutesMiddlware } from './middlewares/protectedRoutesMiddleware'
import { externalMiddleware } from './middlewares/externa-domain/external-middleware-domain'

const middlewares = [externalMiddleware, protectedRoutesMiddlware] // Order matters!

export default stackMiddlewares(middlewares)

import fp from 'fastify-plugin'
import helmet from '@fastify/helmet'
export default fp(async (app) => {
  app.register(helmet)
})

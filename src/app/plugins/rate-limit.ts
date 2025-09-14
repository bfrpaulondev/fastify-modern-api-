import fp from 'fastify-plugin'
import rateLimit from '@fastify/rate-limit'
export default fp(async (app) => {
  app.register(rateLimit, { max: 300, timeWindow: '1 minute' })
})

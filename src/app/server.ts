import Fastify from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import autoload from '@fastify/autoload'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export async function buildServer() {
  const app = Fastify({
    logger: { level: process.env.NODE_ENV === 'production' ? 'info' : 'debug' },
    requestIdHeader: 'x-request-id',
    genReqId: () => crypto.randomUUID()
  }).withTypeProvider<ZodTypeProvider>()

  app.register((await import('./plugins/swagger.js')).default)
  app.register((await import('./plugins/cors.js')).default)
  app.register((await import('./plugins/helmet.js')).default)
  app.register((await import('./plugins/rate-limit.js')).default)
  app.register((await import('./plugins/health.js')).default)

  app.register(autoload, { dir: path.join(__dirname, '..', 'modules') })
  return app
}
